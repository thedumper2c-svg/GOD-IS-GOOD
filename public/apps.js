const DEFAULT_APPS = [
	{ id: 1, name: "YouTube", url: "https://youtube.com", color: "#FF0000", icon: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="28" height="28" rx="6" fill="#FF0000"/><polygon points="11,8 22,14 11,20" fill="white"/></svg>` },
	{ id: 2, name: "Discord", url: "https://discord.com", color: "#5865F2", icon: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="28" height="28" rx="6" fill="#5865F2"/><path d="M19.5 9.5C18.3 8.9 17 8.5 15.6 8.3L15.4 8.7C16.7 9 17.9 9.5 19 10.2C17.2 9.2 15.1 8.7 13 8.7C10.9 8.7 8.8 9.2 7 10.2C8.1 9.5 9.4 9 10.6 8.7L10.4 8.3C9 8.5 7.7 8.9 6.5 9.5C4.7 12.2 4 14.8 4.3 17.3C5.7 18.4 7 19.1 8.3 19.5L8.9 18.7C8.1 18.4 7.3 18 6.7 17.4C7.4 17.8 8.4 18.2 10 18.5L10.2 18C8.3 17.6 7 17 6.3 16.3C7.2 16.8 8.8 17.3 11 17.5L11.1 17C9.8 16.9 8 16.4 7.5 15.5C7.9 15.7 9 16 10.5 16.2V15.7C9.3 15.5 8.2 15.1 7.8 14.5C8.5 14.8 9.5 15 11 15.2V14.5C9 14.2 7.5 13.7 7 13C7.8 13.3 9 13.6 11 13.8V13C9.5 12.8 8.3 12.4 7.8 12C8.5 12.2 9.8 12.5 11.5 12.7L11.8 11C11.2 11 10.5 11 10 11.1C10.7 10.5 11.8 10.1 13 10C13.5 10 14 10 14.5 10.1C14.2 10 13.7 10 13 10C14.2 10.1 15.3 10.5 16 11.1C15.5 11 14.8 11 14.2 11L14.5 12.7C16.2 12.5 17.5 12.2 18.2 12C17.7 12.4 16.5 12.8 15 13V13.8C17 13.6 18.2 13.3 19 13C18.5 13.7 17 14.2 15 14.5V15.2C16.5 15 17.5 14.8 18.2 14.5C17.8 15.1 16.7 15.5 15.5 15.7V16.2C17 16 18.1 15.7 18.5 15.5C18 16.4 16.2 16.9 14.9 17L15 17.5C17.2 17.3 18.8 16.8 19.7 16.3C19 17 17.7 17.6 15.8 18L16 18.5C17.6 18.2 18.6 17.8 19.3 17.4C18.7 18 17.9 18.4 17.1 18.7L17.7 19.5C19 19.1 20.3 18.4 21.7 17.3C22 14.8 21.3 12.2 19.5 9.5ZM10.8 15.5C10.1 15.5 9.5 14.8 9.5 14C9.5 13.2 10.1 12.5 10.8 12.5C11.5 12.5 12.1 13.2 12.1 14C12.1 14.8 11.5 15.5 10.8 15.5ZM17.2 15.5C16.5 15.5 15.9 14.8 15.9 14C15.9 13.2 16.5 12.5 17.2 12.5C17.9 12.5 18.5 13.2 18.5 14C18.5 14.8 17.9 15.5 17.2 15.5Z" fill="white"/></svg>` },
	{ id: 3, name: "Twitter/X", url: "https://twitter.com", color: "#000", icon: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="28" height="28" rx="6" fill="#000"/><path d="M7 7.5L12.5 14.8L7 21H8.5L13.2 15.7L17.5 21H22L16.2 13.3L21.3 7.5H19.8L15.5 12.4L11.5 7.5H7ZM9.5 8.5H11L20 20H18.5L9.5 8.5Z" fill="white"/></svg>` },
	{ id: 4, name: "TikTok", url: "https://tiktok.com", color: "#010101", icon: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="28" height="28" rx="6" fill="#010101"/><path d="M19.5 8.5C18.5 8.3 17.6 7.8 17 7C16.4 6.2 16 5.2 16 4.2H13V17.5C13 18.6 12.1 19.5 11 19.5C9.9 19.5 9 18.6 9 17.5C9 16.4 9.9 15.5 11 15.5C11.3 15.5 11.5 15.6 11.7 15.6V12.5C11.5 12.5 11.2 12.4 11 12.4C8.2 12.4 6 14.7 6 17.4C6 20.2 8.2 22.4 11 22.4C13.8 22.4 16 20.2 16 17.4V10.7C17.2 11.5 18.7 12 20.2 12V9C20 9 19.8 8.8 19.5 8.5Z" fill="white"/></svg>` },
	{ id: 5, name: "Google", url: "https://google.com", color: "#fff", icon: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="28" height="28" rx="6" fill="#fff"/><path d="M22 14.2C22 13.5 21.9 12.9 21.8 12.3H14V15.9H18.5C18.3 17 17.6 17.9 16.6 18.5V20.8H19.4C21.1 19.2 22 16.9 22 14.2Z" fill="#4285F4"/><path d="M14 23C16.4 23 18.4 22.2 19.8 20.8L17 18.5C16.2 19 15.2 19.3 14 19.3C11.7 19.3 9.7 17.7 9 15.6H6.1V17.9C7.5 20.8 10.5 23 14 23Z" fill="#34A853"/><path d="M9 15.6C8.8 15 8.7 14.5 8.7 14C8.7 13.5 8.8 13 9 12.4V10.1H6.1C5.4 11.5 5 13.2 5 15C5 16.8 5.4 18.5 6.1 19.9L9 15.6Z" fill="#FBBC05"/><path d="M14 8.7C15.3 8.7 16.5 9.2 17.4 10L19.9 7.5C18.4 6.1 16.4 5.2 14 5.2C10.5 5.2 7.5 7.4 6.1 10.3L9 12.6C9.7 10.5 11.7 8.7 14 8.7Z" fill="#EA4335"/></svg>` },
	{ id: 6, name: "Roblox", url: "https://roblox.com", color: "#E00", icon: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="28" height="28" rx="6" fill="#E00"/><rect x="9" y="9" width="10" height="10" rx="1" fill="white" transform="rotate(15 14 14)"/><rect x="11" y="11" width="6" height="6" rx="0.5" fill="#E00" transform="rotate(15 14 14)"/></svg>` },
	{ id: 7, name: "Reddit", url: "https://reddit.com", color: "#FF4500", icon: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="28" height="28" rx="6" fill="#FF4500"/><circle cx="14" cy="15" r="6" fill="white"/><circle cx="11.5" cy="14.5" r="1" fill="#FF4500"/><circle cx="16.5" cy="14.5" r="1" fill="#FF4500"/><path d="M11.5 17.5C12.2 18.2 15.8 18.2 16.5 17.5" stroke="#FF4500" stroke-width="1" stroke-linecap="round"/><circle cx="19.5" cy="9.5" r="1.5" fill="white"/><path d="M14 9C14 9 15.5 7 19.5 8" stroke="white" stroke-width="1.2" stroke-linecap="round"/><path d="M8 13C8.5 11.5 10 11 11 11.5" stroke="white" stroke-width="1" stroke-linecap="round"/><path d="M20 13C19.5 11.5 18 11 17 11.5" stroke="white" stroke-width="1" stroke-linecap="round"/></svg>` },
	{ id: 8, name: "Spotify", url: "https://spotify.com", color: "#1DB954", icon: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="28" height="28" rx="6" fill="#1DB954"/><path d="M8.5 11.5C11 10.5 17 10.5 20 12" stroke="white" stroke-width="1.5" stroke-linecap="round"/><path d="M9.5 14C11.5 13.2 16.5 13.2 19 14.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/><path d="M10.5 16.5C12 15.9 16 15.9 18 17" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>` },
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
