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

function setGithubContributors(contributors) {
  if (contributors === undefined ) {
    return;
  }
  document.getElementById('contributors').innerText = contributors.length + ' contributors';
}