(function () {
  var HOLD_MS = 5000;

  var cyclers = Array.prototype.slice.call(document.querySelectorAll('.quote-cycler'))
    .map(function (cycler) {
      return {
        slides: Array.prototype.slice.call(cycler.querySelectorAll('.quote-slide')),
        index: 0
      };
    })
    .filter(function (c) { return c.slides.length > 1; });

  if (!cyclers.length) return;

  setInterval(function () {
    cyclers.forEach(function (c) {
      c.slides[c.index].classList.remove('is-active');
      c.index = (c.index + 1) % c.slides.length;
      c.slides[c.index].classList.add('is-active');
    });
  }, HOLD_MS);
})();
