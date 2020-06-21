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

/*
SVG line animations - override static CSS.

To fully sync up all the line animations, each line really needs to have its
own set of keyframes using its individual line length. Percentage values for
stroke-dashoffset and stroke-dasharray are relative to the viewport instead of
the line length, as would be more useful here.

This allows all the lines to start and finish their animations at the same time.
*/

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
