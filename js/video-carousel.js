(function () {
  var carousels = document.querySelectorAll('.video-carousel');

  carousels.forEach(function (carousel) {
    var slides = Array.prototype.slice.call(carousel.querySelectorAll('.video-carousel-slide'));
    var dots = Array.prototype.slice.call(carousel.querySelectorAll('.video-carousel-dot'));
    var prevBtn = carousel.querySelector('.video-carousel-prev');
    var nextBtn = carousel.querySelector('.video-carousel-next');
    if (slides.length < 2) return;

    var index = 0;

    function show(next) {
      slides[index].classList.remove('is-active');
      if (dots[index]) dots[index].classList.remove('is-active');
      index = (next + slides.length) % slides.length;
      slides[index].classList.add('is-active');
      if (dots[index]) dots[index].classList.add('is-active');
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { show(index - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { show(index + 1); });
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { show(i); });
    });
  });
})();
