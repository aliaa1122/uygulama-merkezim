const grid = document.getElementById("app-grid");
const filters = document.querySelectorAll(".filter");
document.getElementById("year").textContent = new Date().getFullYear();

function safeLink(url) {
  return typeof url === "string" && /^https:\/\/\S+/i.test(url);
}
function render(filter = "all") {
  const visible = apps.filter(app => filter === "all" || app.platforms.includes(filter));
  grid.innerHTML = "";
  if (!visible.length) {
    grid.innerHTML = '<p class="empty">Bu platform için henüz uygulama eklenmemiş.</p>';
    return;
  }
  visible.forEach(app => {
    const links = Object.entries(app.links || {}).filter(([platform, url]) => app.platforms.includes(platform) && safeLink(url));
    const actions = links.length
      ? links.map(([platform, url]) => `<a class="small-button ${platform === links[0][0] ? "" : "alt"}" href="${url}" target="_blank" rel="noopener noreferrer">${platform} ↗</a>`).join("")
      : '<span class="small-button alt">İndirme bağlantısı yakında</span>';
    const card = document.createElement("article");
    card.className = "app-card";
    card.innerHTML = `
      <div class="app-top"><div class="app-icon">${app.icon || "▣"}</div><span class="status">${app.status || "Yayında"}</span></div>
      <h3>${escapeHtml(app.name)}</h3><p>${escapeHtml(app.description)}</p>
      <div class="tags">${app.platforms.map(p => `<span class="tag">${escapeHtml(p)}</span>`).join("")}<span class="tag">v${escapeHtml(app.version || "1.0")}</span></div>
      <p class="guide-copy">${escapeHtml(app.guide || "Kullanım rehberi yakında.")}</p>
      <div class="card-actions">${actions}</div>`;
    grid.appendChild(card);
  });
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
filters.forEach(button => button.addEventListener("click", () => {
  filters.forEach(item => item.classList.toggle("active", item === button));
  render(button.dataset.filter);
}));
render();