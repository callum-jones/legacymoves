(function () {
  var header = document.querySelector('.site-header');
  var headerTop = document.querySelector('.header-top');
  var toggle = document.querySelector('.nav-toggle');
  var siteNav = document.querySelector('.site-nav');
  if (!header || !headerTop || !toggle || !siteNav) return;

  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('open');
  }

  function openMenu() {
    toggle.setAttribute('aria-expanded', 'true');
    siteNav.classList.add('open');
  }

  // Measure whether logo + nav + button still fit on one line. Nav is only
  // ever removed from flow (fixed overlay) once collapsed, so briefly drop
  // the collapsed class to get a true natural-width reading, then decide.
  function checkFit() {
    var wasCollapsed = header.classList.contains('nav-collapsed');
    header.classList.remove('nav-collapsed');
    var overflowing = headerTop.scrollWidth > headerTop.clientWidth + 1;
    if (overflowing) {
      header.classList.add('nav-collapsed');
    } else if (wasCollapsed) {
      closeMenu();
    }
  }

  toggle.addEventListener('click', function () {
    var isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) closeMenu(); else openMenu();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(checkFit, 100);
  });

  checkFit();

  // Re-check once web fonts finish loading — font swap can change text
  // width enough to flip the fit decision after the initial check.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(checkFit);
  }
})();
