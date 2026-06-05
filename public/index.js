"use strict";

/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("sj-form");
/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("sj-address");
/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("sj-search-engine");
/**
 * @type {HTMLParagraphElement}
 */
const error = document.getElementById("sj-error");
/**
 * @type {HTMLPreElement}
 */
const errorCode = document.getElementById("sj-error-code");

// Smart search suggestions
const searchSuggestions = [
	"john bolton",
	"jalen brunson",
	"june 2026 calendar",
	"jetblue airlines",
	"jira",
	"jcpenney",
	"jimmy john's",
	"join my quiz",
	"youtube",
	"gmail",
	"google drive",
	"stack overflow",
	"github",
	"twitter",
	"reddit",
	"wikipedia",
	"amazon",
	"netflix",
	"discord",
	"slack",
	"figma",
	"notion",
	"trello"
];

let suggestionsDropdown = null;

function createSuggestionsDropdown() {
	const dropdown = document.createElement("div");
	dropdown.id = "sj-suggestions";
	dropdown.className = "search-suggestions";
	dropdown.style.cssText = `
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background: rgba(4, 2, 15, 0.95);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-top: none;
		border-radius: 0 0 8px 8px;
		max-height: 300px;
		overflow-y: auto;
		z-index: 1000;
		display: none;
	`;
	return dropdown;
}

function updateSuggestions(input) {
	if (!suggestionsDropdown) return;
	
	const trimmed = input.trim().toLowerCase();
	if (!trimmed) {
		suggestionsDropdown.display = "none";
		return;
	}
	
	const filtered = searchSuggestions.filter(s => s.toLowerCase().includes(trimmed));
	
	if (filtered.length === 0) {
		suggestionsDropdown.style.display = "none";
		return;
	}
	
	suggestionsDropdown.innerHTML = filtered.map(suggestion => `
		<div class="suggestion-item" style="
			padding: 12px 16px;
			cursor: pointer;
			color: rgba(232, 224, 255, 0.8);
			border-bottom: 1px solid rgba(255, 255, 255, 0.05);
			transition: background 0.2s;
		" data-suggestion="${suggestion}">
			${suggestion}
		</div>
	`).join("");
	
	suggestionsDropdown.style.display = "block";
	
	// Add click listeners to suggestions
	suggestionsDropdown.querySelectorAll(".suggestion-item").forEach(item => {
		item.addEventListener("click", () => {
			address.value = item.dataset.suggestion;
			suggestionsDropdown.style.display = "none";
		});
		
		item.addEventListener("mouseover", () => {
			item.style.background = "rgba(255, 255, 255, 0.07)";
		});
		
		item.addEventListener("mouseout", () => {
			item.style.background = "transparent";
		});
	});
}

const { ScramjetController } = $scramjetLoadController();
const scramjet = new ScramjetController({
	files: {
		wasm: "/assest/scramjet.wasm.wasm",
		all: "/assest/kedirjitogijtoi.js",
		sync: "/assest/scramjet.sync.js",
	},
});
scramjet.init();

const connection = new BareMux.BareMuxConnection("/bare/worker.js");

/**
 * Encode a real URL into the proxy route format.
 * Result: /search?query=<base64url>&v="1"
 * @param {string} realUrl
 * @returns {string} route string
 */
function encodeRoute(realUrl) {
	const b64 = btoa(realUrl);
	return `/search?query=${encodeURIComponent(b64)}&v="1"`;
}

/**
 * Build the full proxy href from a real URL.
 * Looks like: https://host/?route=%2Fsearch%3Fquery%3D...
 * @param {string} realUrl
 * @returns {string}
 */
function buildProxyHref(realUrl) {
	const route = encodeRoute(realUrl);
	return `${location.origin}/?route=${encodeURIComponent(route)}`;
}

/**
 * Navigate to a URL through the proxy by updating location.href.
 * @param {string} realUrl
 */
function goToSite(realUrl) {
	if (!realUrl) return;
	location.href = buildProxyHref(realUrl);
}

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const input = address.value.trim();
	if (!input) return;
	// Encode the raw input directly as base64, so "hey" → search?query=aGV5
	// search() resolves it to a full URL inside the proxy worker
	const b64 = btoa(unescape(encodeURIComponent(input)));
	location.href = `${location.origin}/?route=${encodeURIComponent(`/search?query=${encodeURIComponent(b64)}&v="1"`)}`;
});

// Initialize suggestions dropdown and add event listeners
document.addEventListener("DOMContentLoaded", () => {
	const formWrapper = form.parentElement;
	suggestionsDropdown = createSuggestionsDropdown();
	formWrapper.style.position = "relative";
	formWrapper.appendChild(suggestionsDropdown);
	
	address.addEventListener("input", (e) => {
		updateSuggestions(e.target.value);
	});
	
	address.addEventListener("focus", () => {
		if (address.value.trim()) {
			updateSuggestions(address.value);
		}
	});
	
	address.addEventListener("blur", () => {
		// Delay to allow suggestion click to register
		setTimeout(() => {
			if (suggestionsDropdown) {
				suggestionsDropdown.style.display = "none";
			}
		}, 200);
	});
});

// Auto-navigate if ?route= param is present
window.addEventListener("load", async () => {
	const params = new URLSearchParams(location.search);
	const route = params.get("route");
	if (!route) return;

	// Decode the route to get the query param
	const routeParams = new URLSearchParams(route.split("?")[1]);
	const query = routeParams.get("query");
	if (!query) return;

	// Decode base64 → raw input (could be "hey", "youtube.com", or "https://youtube.com")
	let rawInput;
	try {
		rawInput = decodeURIComponent(escape(atob(decodeURIComponent(query))));
	} catch {
		return;
	}

	try {
		await registerSW();
	} catch (err) {
		error.textContent = "Failed to register service worker.";
		errorCode.textContent = err.toString();
		return;
	}

	// search() turns raw input into a full URL:
	// Search Engine Kamsi Using Duckduck go because why not
	const url = search(rawInput, searchEngine.value);

	let wispUrl =
		(location.protocol === "https:" ? "wss" : "ws") +
		"://" +
		location.host +
		"/wisp/";

	await connection.setTransport("/libcurl/index.mjs", [{ websocket: wispUrl }]);

	// Wait until transport is confirmed ready
	let attempts = 0;
	while ((await connection.getTransport()) !== "/libcurl/index.mjs") {
		if (attempts++ > 20) {
			error.textContent = "Transport failed to initialize.";
			return;
		}
		await new Promise((r) => setTimeout(r, 200));
	}

	const frame = scramjet.createFrame();
	frame.frame.id = "sj-frame";

	// KAMSI TODO: FIX THE PROXY UNIT TO STOP Static flick backs
	frame.frame.dataset.realUrl = url;

	document.body.appendChild(frame.frame);
	frame.go(url);
});
