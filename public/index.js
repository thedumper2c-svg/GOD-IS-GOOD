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

const { ScramjetController } = $scramjetLoadController();
const scramjet = new ScramjetController({
	files: {
		wasm: "/scram/scramjet.wasm.wasm",
		all: "/scram/scramjet.all.js",
		sync: "/scram/scramjet.sync.js",
	},
});
scramjet.init();

const connection = new BareMux.BareMuxConnection("/baremux/worker.js");

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
	const url = search(input, searchEngine.value);
	goToSite(url);
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

	// Decode base64 → real URL
	let targetUrl;
	try {
		targetUrl = atob(decodeURIComponent(query));
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

	const url = search(targetUrl, searchEngine.value);

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

	// Store the REAL url on the frame element so browser-chrome.js
	// can display it in the address bar instead of the scramjet proxy URL.
	frame.frame.dataset.realUrl = url;

	document.body.appendChild(frame.frame);
	frame.go(url);
});
