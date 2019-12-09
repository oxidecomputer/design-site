const lines = document.querySelector('#lines').children;
[...lines].forEach(line => {
    line.style.setProperty('--length', line.getTotalLength());
});

const themeToggle = document.querySelector('.theme-toggle input[type="checkbox"]');
themeToggle.addEventListener('change', switchTheme, false);

function switchTheme(e) {
    const color = e.target.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', color);
    localStorage.setItem('theme', color);
}

const currentTheme = localStorage.getItem('theme') || 'dark';

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeToggle.checked = true;
    }
}
