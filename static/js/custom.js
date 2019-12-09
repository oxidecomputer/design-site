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
  updateLogo(theme);
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

function updateLogo(theme) {
  const companyLogo = document.querySelector("#oxide-logo");
  companyLogo.src = theme === "dark" ? "/images/logo.png" : "/images/logo.dark.png";
}

const currentTheme = localStorage.getItem("theme") || "dark";

document.documentElement.setAttribute("data-theme", currentTheme);
updateLogo(currentTheme)
if (currentTheme === "dark") {
  themeToggle.checked = true;
}
