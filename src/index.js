import { createServer } from "node:http";
import { fileURLToPath } from "url";
import { hostname } from "node:os";
import { server as wisp, logging } from "@mercuryworkshop/wisp-js/server";
import Fastify from "fastify";
import compression from "@fastify/compress";
import fastifyStatic from "@fastify/static";

import { scramjetPath } from "@mercuryworkshop/scramjet/path";
import { libcurlPath } from "@mercuryworkshop/libcurl-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";

const publicPath = fileURLToPath(new URL("../public/", import.meta.url));

logging.set_level(logging.NONE);
Object.assign(wisp.options, {
	allow_udp_streams: false,
	hostname_blacklist: [/example\.com/],
	dns_servers: ["1.1.1.3", "1.0.0.3"],
});

const fastify = Fastify({
	logger: false,
	keepAliveTimeout: 65,
	headersTimeout: 70,
	serverFactory: (handler) => {
		return createServer()
			.on("request", (req, res) => {
				res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
				res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
				handler(req, res);
			})
			.on("upgrade", (req, socket, head) => {
				if (req.url.endsWith("/wisp/")) wisp.routeRequest(req, socket, head);
				else socket.end();
			});
	},
});

await fastify.register(compression, {
	global: true,
	threshold: 1024,
});

fastify.register(fastifyStatic, {
	root: publicPath,
	decorateReply: true,
	etag: true,
	lastModified: true,
	maxAge: 1000 * 60 * 60 * 24 * 30,
	cacheControl: true,
	immutable: true,
});

fastify.register(fastifyStatic, {
	root: scramjetPath,
	prefix: "/assets/",
	decorateReply: false,
	etag: true,
	lastModified: true,
	maxAge: 1000 * 60 * 60 * 24 * 30,
	cacheControl: true,
	immutable: true,
});

fastify.register(fastifyStatic, {
	root: libcurlPath,
	prefix: "/libcurl/",
	decorateReply: false,
	etag: true,
	lastModified: true,
	maxAge: 1000 * 60 * 60 * 24 * 30,
	cacheControl: true,
	immutable: true,
});

fastify.register(fastifyStatic, {
	root: baremuxPath,
	prefix: "/bare/",
	decorateReply: false,
	etag: true,
	lastModified: true,
	maxAge: 1000 * 60 * 60 * 24 * 30,
	cacheControl: true,
	immutable: true,
});

fastify.setNotFoundHandler((req, reply) => {
	return reply.code(404).type("text/html").sendFile("404.html");
});

function shutdown() {
	console.log("SIGTERM signal received: closing HTTP server");
	fastify.close(() => process.exit(0));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

const port = Number.parseInt(process.env.PORT || "", 10);
const listenPort = Number.isNaN(port) ? 8080 : port;

async function start() {
	try {
		await fastify.listen({
			port: listenPort,
			host: "0.0.0.0",
		});

		const address = fastify.server.address();
		console.log("Listening on:");
		console.log(`\thttp://localhost:${address.port}`);
		console.log(`\thttp://${hostname()}:${address.port}`);
		console.log(
			`\thttp://${
				address.family === "IPv6" ? `[${address.address}]` : address.address
			}:${address.port}`
		);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
}

start();
