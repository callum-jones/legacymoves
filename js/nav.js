(function () {
  var toggle = document.querySelector('.nav-toggle');
  var navRow = document.querySelector('.nav-row');
  if (!toggle || !navRow) return;

  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    navRow.classList.remove('open');
  }

  function openMenu() {
    toggle.setAttribute('aria-expanded', 'true');
    navRow.classList.add('open');
  }

  toggle.addEventListener('click', function () {
    var isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) closeMenu(); else openMenu();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', function (e) {
    if (!navRow.contains(e.target) && !toggle.contains(e.target)) closeMenu();
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 1024) closeMenu();
  });
})();
