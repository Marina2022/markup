if (document.querySelector('.hero__slider-primary')) {
  const swiper = new Swiper('.hero__slider-primary', {
    direction: 'horizontal',
    loop: true,
    pagination: {
      el: '.slider-primary__swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
  })

  if (document.querySelector('.hero__slider-secondary')) {
    const swiper2 = new Swiper('.hero__slider-secondary', {
      direction: 'horizontal',
      loop: true,
      pagination: {
        el: '.slider-secondary__swiper-pagination',
        clickable: true,
      },
    })
  }
}

if (window.innerWidth > 767) {  // на мобильных скрипт запускать не надо
  const spheres = document.querySelectorAll('.spheres-card');
  if (spheres) {
    spheres.forEach((sphere) => {
      sphere.addEventListener('mouseover', () => {
        spheres.forEach(item => item.classList.remove('spheres-card--active'));
        sphere.classList.add('spheres-card--active');
      })
    })
  }
}
