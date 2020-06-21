const themeToggle = document.querySelector(
  '.theme-toggle input[type="checkbox"]'
);
themeToggle.addEventListener("change", switchTheme, false);

function switchTheme(e) {
  const theme = e.target.checked ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

function selectedTheme() {
  return localStorage.getItem("theme");
}

const currentTheme = selectedTheme();
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
}

const mql = matchMedia("(prefers-color-scheme: dark)");
if ((mql.matches && currentTheme != "light") || currentTheme === "dark") {
  themeToggle.checked = true;
}

mql.addListener((e) => {
  if (!selectedTheme()) {
    themeToggle.checked = e.matches;
  }
});

var paths = document.querySelectorAll('.st0');
var cssString = '';

paths.forEach((path, i) => {
  var length = path.getTotalLength();
  cssString += `
    @keyframes circuit_${i} {
      from {
        stroke-dashoffset: ${length}px;
      }
      to {
        stroke-dashoffset: 0px;
      }
    }
  `;
  path.style.strokeDashoffset = `${length}px`;
  path.style.strokeDasharray = `${length}px ${length}px`;
  path.style.animation = `circuit_${i} 4s ease-in-out both`;
});

var styleElement = document.createElement('style');
styleElement.textContent = cssString;
document.head.appendChild(styleElement);
