const lines = document.querySelector("#lines").children;
[...lines].forEach(line => {
  line.style.setProperty("--length", line.getTotalLength());
});

const themeToggle = document.querySelector(
  '.theme-toggle input[type="checkbox"]'
);
themeToggle.addEventListener("change", switchTheme, false);

function switchTheme(e) {
  const theme = e.target.checked ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

const currentTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", currentTheme);
if (currentTheme === "dark") {
  themeToggle.checked = true;
}

const activeStyleSheet = document.getElementById("stylesheet");
const c64Toggle = document.querySelector(".c64Toggle");
c64Toggle.style.cursor = "pointer";
c64Toggle.onclick = function() {
  setStylesheet(
    `/theme/${
      // activeStyleSheet.href.includes("c64") ? "default" : "c64"
      "c64"
    }/custom.css`
  );
};

function setStylesheet(styleSheet) {
  activeStyleSheet.href = styleSheet;
}
