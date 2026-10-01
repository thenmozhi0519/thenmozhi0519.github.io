// PANEL NAVIGATION: one section visible at a time, no long scrolling
const ids = ["home", "about", "projects", "skills", "services", "contact"];
const panels = document.querySelectorAll(".panel");
const navLinks = document.querySelectorAll(".nav a");
const stage = document.querySelector(".stage");

function show(id) {
  if (!ids.includes(id)) id = "home";
  panels.forEach(function (p) { p.classList.toggle("active", p.id === id); });
  navLinks.forEach(function (a) { a.classList.toggle("current", a.dataset.go === id); });
  stage.scrollTop = 0;
  history.replaceState(null, "", "#" + id);   // keeps the URL shareable
}

// Anything with data-go="projects" (menu links and buttons) opens that panel
document.querySelectorAll("[data-go]").forEach(function (el) {
  el.addEventListener("click", function (e) { e.preventDefault(); show(el.dataset.go); });
});

// Left/right arrow keys move between panels
document.addEventListener("keydown", function (e) {
  const now = ids.findIndex(function (id) { return document.getElementById(id).classList.contains("active"); });
  if (e.key === "ArrowRight" && now < ids.length - 1) show(ids[now + 1]);
  if (e.key === "ArrowLeft" && now > 0) show(ids[now - 1]);
});

// PROJECT FILTER chips
const chips = document.querySelectorAll(".chip");
const cards = document.querySelectorAll(".project");
chips.forEach(function (chip) {
  chip.addEventListener("click", function () {
    chips.forEach(function (c) { c.classList.toggle("active", c === chip); });
    cards.forEach(function (card) {
      card.hidden = chip.dataset.filter !== "all" && card.dataset.cat !== chip.dataset.filter;
    });
  });
});

show(location.hash.slice(1));   // open the panel from the URL, else Home