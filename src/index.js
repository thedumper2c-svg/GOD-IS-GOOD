import { createServer } from "node:http";
import { fileURLToPath } from "url";
import { hostname } from "node:os";

import { server as wisp, logging } from "@mercuryworkshop/wisp-js/server";

import Fastify from "fastify";
import fastifyStatic from "@fastify/static";

import { scramjetPath } from "@mercuryworkshop/scramjet/path";
import { libcurlPath } from "@mercuryworkshop/libcurl-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";

// Paths
const publicPath = fileURLToPath(new URL("../public/", import.meta.url));

// Wisp Configuration
logging.set_level(logging.NONE);

Object.assign(wisp.options, {
	allow_udp_streams: false,
	hostname_blacklist: [/example\.com/],
	dns_servers: ["1.1.1.3", "1.0.0.3"],
});

// Fastify Instance
const fastify = Fastify({
	serverFactory: (handler) => {
		return createServer()
			.on("request", (req, res) => {
				// Required headers for Scramjet isolation
				res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
				res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");

				handler(req, res);
			})
			.on("upgrade", (req, socket, head) => {
				// WebSocket routing for Wisp
				if (req.url.endsWith("/wisp/")) {
					wisp.routeRequest(req, socket, head);
				} else {
					socket.end();
				}
			});
	},
});

// Serve frontend files
fastify.register(fastifyStatic, {
	root: publicPath,
	prefix: "/",
	decorateReply: true,
});

// Serve Scramjet client files
fastify.register(fastifyStatic, {
	root: scramjetPath,
	prefix: "/scram/",
	decorateReply: false,
});

// Serve Libcurl transport
fastify.register(fastifyStatic, {
	root: libcurlPath,
	prefix: "/libcurl/",
	decorateReply: false,
});

// Serve BareMux
fastify.register(fastifyStatic, {
	root: baremuxPath,
	prefix: "/baremux/",
	decorateReply: false,
});

// Root route
fastify.get("/", async (request, reply) => {
	return reply.sendFile("index.html");
});

// Optional health check
fastify.get("/health", async () => {
	return {
		status: "ok",
	};
});

// 404 handler
fastify.setNotFoundHandler((request, reply) => {
	return reply.code(404).type("text/html").sendFile("404.html");
});

// Startup logging
fastify.server.on("listening", () => {
	const address = fastify.server.address();

	console.log("Listening on:");
	console.log(`\thttp://localhost:${address.port}`);
	console.log(`\thttp://${hostname()}:${address.port}`);
	console.log(
		`\thttp://${
			address.family === "IPv6"
				? `[${address.address}]`
				: address.address
		}:${address.port}`
	);
});

// Graceful shutdown
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
	console.log("Shutdown signal received");

	fastify.close(() => {
		process.exit(0);
	});
}

// Port handling
let port = parseInt(process.env.PORT || "");

if (isNaN(port)) {
	port = 8080;
}

// Start server
try {
	await fastify.listen({
		port,
		host: "0.0.0.0",
	});
} catch (err) {
	console.error(err);
	process.exit(1);
}
