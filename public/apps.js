const DEFAULT_APPS = [
	{ id: 1, name: "YouTube", url: "https://youtube.com", color: "#FF0000", icon: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="28" height="28" rx="6" fill="#FF0000"/><path d="M21.593 7.203a2.506 2.506 0 0 0-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 0 0-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.515 2.515 0 0 0 1.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831zM9.996 15.005l.005-6 5.207 3.005-5.212 2.995z" fill="white"/></svg>` },
	{ id: 2, name: "GitHub", url: "https://github.com", color: "#24292e", icon: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="28" height="28" rx="6" fill="#24292e"/><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
	{ id: 3, name: "Discord", url: "https://discord.com", color: "#5865F2", icon: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="28" height="28" rx="6" fill="#5865F2"/><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" fill="white"/></svg>` },
	{ id: 4, name: "TikTok", url: "https://tiktok.com", color: "#010101", icon: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="28" height="28" rx="6" fill="#010101"/><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z" fill="white"/></svg>` },
	{ id: 5, name: "Google", url: "https://google.com", color: "#fff", icon: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="28" height="28" rx="6" fill="#fff"/><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>` },
	{ id: 6, name: "Twitter/X", url: "https://twitter.com", color: "#000", icon: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="28" height="28" rx="6" fill="#000"/><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="white"/></svg>` },
	{ id: 7, name: "Roblox", url: "https://roblox.com", color: "#E00", icon: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="28" height="28" rx="6" fill="#E00"/><rect x="9" y="9" width="10" height="10" rx="1" fill="white" transform="rotate(15 14 14)"/><rect x="11" y="11" width="6" height="6" rx="0.5" fill="#E00" transform="rotate(15 14 14)"/></svg>` },
	{ id: 8, name: "GeForce NOW", url: "https://play.geforcenow.com", color: "#76b900", icon: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="28" height="28" rx="6" fill="#1a1a1a"/><polygon points="15,4 7,16 14,16 13,24 21,12 14,12" fill="#76b900"/></svg>` },
	{ id: 9, name: "Movies", url: "https://filmex.to", color: "#e50914", icon: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="28" height="28" rx="6" fill="#1a1a1a"/><path d="M17 10l4.553-2.069A1 1 0 0 1 23 8.87v6.26a1 1 0 0 1-1.447.894L17 14M5 10a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
	{ id: 10, name: "AI", url: "https://duck.ai/", color: "#75ac2a", icon: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="28" height="28" rx="6" fill="#75ac2a"/><path d="M14 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H6v-2c0-2.21 3.58-4 8-4z" fill="white"/></svg>` },
	{ id: 11, name: "Music", url: "https://spotify.com", color: "#1DB954", icon: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="28" height="28" rx="6" fill="#1DB954"/><path d="M11 20V7l12-2v13M11 20a3 3 0 1 1-6 0 3 3 0 0 1 6 0M23 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
];

let apps = JSON.parse(localStorage.getItem("areoy-apps")) || DEFAULT_APPS;
let editMode = false;
let addingNew = false;

function saveApps() {
	localStorage.setItem("areoy-apps", JSON.stringify(apps));
}

function getInitials(name) {
	return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
}

function getColorFromName(name) {
	const colors = ["#6366f1","#8b5cf6","#ec4899","#f43f5e","#f97316","#eab308","#22c55e","#14b8a6","#06b6d4","#3b82f6"];
	let hash = 0;
	for (let c of name) hash = c.charCodeAt(0) + ((hash << 5) - hash);
	return colors[Math.abs(hash) % colors.length];
}

function renderApps() {
	const grid = document.getElementById("apps-grid");
	grid.innerHTML = "";

	apps.forEach(app => {
		const btn = document.createElement("div");
		btn.className = "app-btn-wrap";

		if (editMode) {
			btn.innerHTML = `
				<button class="remove-btn" data-id="${app.id}">✕</button>
				<button class="app-btn" disabled>
					<div class="app-icon">${app.icon || `<svg viewBox="0 0 28 28"><rect width="28" height="28" rx="6" fill="${getColorFromName(app.name)}"/><text x="14" y="19" text-anchor="middle" font-size="11" font-family="Inter,sans-serif" fill="white">${getInitials(app.name)}</text></svg>`}</div>
					<span>${app.name}</span>
				</button>`;
		} else {
			btn.innerHTML = `
				<button class="app-btn" onclick="goToSite('${app.url}')">
					<div class="app-icon">${app.icon || `<svg viewBox="0 0 28 28"><rect width="28" height="28" rx="6" fill="${getColorFromName(app.name)}"/><text x="14" y="19" text-anchor="middle" font-size="11" font-family="Inter,sans-serif" fill="white">${getInitials(app.name)}</text></svg>`}</div>
					<span>${app.name}</span>
				</button>`;
		}
		grid.appendChild(btn);
	});

	if (editMode) {
		const addBtn = document.createElement("div");
		addBtn.className = "app-btn-wrap";
		addBtn.innerHTML = `<button class="app-btn add-new-btn" id="show-add-form">
			<div class="app-icon add-icon"><svg viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="6" fill="rgba(255,255,255,0.08)"/><path d="M14 8V20M8 14H20" stroke="white" stroke-width="2" stroke-linecap="round"/></svg></div>
			<span>+ Add</span>
		</button>`;
		grid.appendChild(addBtn);

		document.getElementById("show-add-form").addEventListener("click", () => {
			document.getElementById("add-form").style.display = "block";
			addingNew = true;
		});

		document.querySelectorAll(".remove-btn").forEach(btn => {
			btn.addEventListener("click", () => {
				const id = parseInt(btn.dataset.id);
				apps = apps.filter(a => a.id !== id);
				saveApps();
				renderApps();
			});
		});
	}
}

document.getElementById("edit-toggle").addEventListener("click", () => {
	editMode = !editMode;
	document.getElementById("edit-toggle").textContent = editMode ? "Done" : "Edit";
	document.getElementById("add-form").style.display = "none";
	addingNew = false;
	renderApps();
});

document.getElementById("add-save").addEventListener("click", () => {
	const name = document.getElementById("add-name").value.trim();
	const url = document.getElementById("add-url").value.trim();
	if (!name || !url) return;

	const newApp = {
		id: Date.now(),
		name,
		url: url.startsWith("http") ? url : "https://" + url,
		icon: null,
	};
	apps.push(newApp);
	saveApps();
	document.getElementById("add-name").value = "";
	document.getElementById("add-url").value = "";
	document.getElementById("add-form").style.display = "none";
	renderApps();
});

document.getElementById("add-cancel").addEventListener("click", () => {
	document.getElementById("add-form").style.display = "none";
	document.getElementById("add-name").value = "";
	document.getElementById("add-url").value = "";
	addingNew = false;
});

renderApps();
