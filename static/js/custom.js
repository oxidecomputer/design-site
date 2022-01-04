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
[].forEach.call(paths, function (path) {
  path.setAttribute('style', '--plen:'+path.getTotalLength());
});

csvg = document.querySelector('.circuit-svg');
window.addEventListener('mousemove', e => {
  x = e.pageX;
  y = e.pageY;
  xy = x + " "  + y;
  gold = "rgba(212,175,55,0.75)";
  bgWebKit = `-webkit-gradient(radial, ${xy}, 0, ${xy}, 200, from(${gold}), to(rgba(34, 34, 34, 0.0))), #212121`;
  bgMoz = "-moz-radial-gradient(" + x + "px " + y + "px 45deg, circle, " + gold + " 0%, #212121 200px)";
  csvg.style["background"] = bgWebKit;
});

csvg.addEventListener('mouseleave', e => {
  csvg.style['background'] = '';
});