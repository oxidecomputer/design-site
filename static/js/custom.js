/**
 * Runs when the theme toggle has been changed.
 * 
 * Sets the theme on the document and in local storage.
 * 
 * @param {object} e the change event
 */
function changeThemeToggle(e) {
  updateTheme(e.target.checked ? 'dark' : 'light', true);
}

/**
 * Sets the theme on the page and in local storage. 
 * 
 * @param {string} newTheme the new theme to be applied
 * @param {boolean} save whether the page should save the preference for the next visit
 */
function updateTheme(newTheme, save) {
  const themeToggle = document.querySelector('.theme-toggle input[type="checkbox"]');

  document.documentElement.setAttribute('data-theme', newTheme);
  if (themeToggle) themeToggle.checked = newTheme === 'dark';
  if (save) localStorage.setItem('theme', newTheme);
}

/**
 * Get the user's system theme if available.
 */
function getSystemTheme() {
  // Assume light as it is the system default and most old OS's only have light themes
  const systemTheme = 'light';

  if (typeof window.matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches) {
    systemTheme = 'dark';
  }

  return systemTheme;
}

/**
 * Gets the theme override from localstorage if it has been set.
 */
function getThemeOverride() {
  return localStorage.getItem('theme');
}

/**
 * Get the current theme, which is either the user's preference or the current system theme
 */
function getCurrentTheme() {
  let theme = 'light';
  const themeOverride = getThemeOverride();

  if (themeOverride !== 'undefined' && themeOverride !== 'null') {
    theme = themeOverride;
  } else {
    theme = getSystemTheme();
  }

  return theme;
}

// Update the theme ASAP to avoid flash
updateTheme(getCurrentTheme(), false);

window.addEventListener('load', function() {
  // Find the theme toggle and listen for changes
  const themeToggle = document.querySelector(
    '.theme-toggle input[type="checkbox"]'
  );
  if (themeToggle) {
    themeToggle.checked = getCurrentTheme() === 'dark';
    themeToggle.addEventListener('change', changeThemeToggle, false);
  }

  // Listen for system theme changes (only has an effect if the user has not set a preference)
  const mql = matchMedia('(prefers-color-scheme: dark)');
  mql.addListener((e) => {
    updateTheme(getCurrentTheme(), false);
  });
  
  // TODO: moderinise this code
  var paths = document.querySelectorAll('.st0');
  [].forEach.call(paths, function (path) {
    var length = path.getTotalLength();
    path.style.transition = path.style.WebkitTransition = 'none';
    path.style.strokeDasharray = length + ' ' + length;
    path.style.strokeDashoffset = length;
    path.getBoundingClientRect();
    path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 4s ease-in-out';
    path.style.strokeDashoffset = '0';
  });
});
