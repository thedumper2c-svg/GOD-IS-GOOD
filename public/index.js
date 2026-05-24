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
form.addEventListener("submit", async (event) => {
	event.preventDefault();
	try {
		await registerSW();
	} catch (err) {
		error.textContent = "Failed to register service worker.";
		errorCode.textContent = err.toString();
		throw err;
	}
	const url = search(address.value, searchEngine.value);
	let wispUrl =
		(location.protocol === "https:" ? "wss" : "ws") +
		"://" +
		location.host +
		"/wisp/";
	if ((await connection.getTransport()) !== "/libcurl/index.mjs") {
		await connection.setTransport("/libcurl/index.mjs", [
			{ websocket: wispUrl },
		]);
	}
	const frame = scramjet.createFrame();
	frame.frame.id = "sj-frame";
	document.body.appendChild(frame.frame);
	frame.go(url);
});

// Auto-navigate if ?route= param is present
window.addEventListener("load", async () => {
	const params = new URLSearchParams(location.search);
	const route = params.get("route");
	if (!route) return;

	const routeParams = new URLSearchParams(route.split("?")[1]);
	const query = routeParams.get("query");
	if (!query) return;

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

	// Always set transport before navigating
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
	document.body.appendChild(frame.frame);
	frame.go(url);
});
