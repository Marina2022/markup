// слайдер под изображением товара

if (document.querySelector('.big-card__slider')) {
  const swiper3 = new Swiper('.big-card__slider', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 5.5,
    spaceBetween: 8,
    freeMode: true,
    breakpoints: {
      767: {
        slidesPerView: 4.5,
        spaceBetween: 8,
      },
      1199: {
        slidesPerView: 5.5,
        spaceBetween: 16,
      },
    },
  })


  //слайдер - главная большая картинка
  const swiper4 = new Swiper('.big-card__main-slider', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    // spaceBetween: 8,
    freeMode: true,

    thumbs: {
      swiper: swiper3,
    },
  })

}


// Вкладки на странице товара

const bigCardTabs = document.querySelectorAll('.big-card__tab');
if (bigCardTabs) {
  bigCardTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      bigCardTabs.forEach((tabItem) => {
        tabItem.classList.remove('big-card__tab--active')
      });
      tab.classList.add('big-card__tab--active');
      document.querySelectorAll('.big-card__tab-content').forEach((content) => {
        content.classList.add('hidden');
      })
      document.querySelector(`#${tab.dataset.tab}`).classList.remove('hidden')
    })
  })
}

// Всплывашка по кнопке Литейная промышленность


const sphereBtn = document.querySelector('.big-card__sphere-btn');

if (sphereBtn) {

  sphereBtn.addEventListener('click', () => {
    const page = document.querySelector('body');
    const sphereModal = document.querySelector('.big-card__sphere-modal');
    const overlay = document.querySelector('.overlay');

    const sphereModalCloseBtn = document.querySelector('.sphere-modal__close-btn');

    const escHandler = (e) => {
      if (e.keyCode === 27) {
        sphereModal.classList.add('hidden');
        overlay.classList.add('hidden');
      }
      page.removeEventListener('keydown', escHandler);
    }

    const clickOverlayHandler = (e) => {
      sphereModal.classList.add('hidden');
      overlay.classList.add('hidden');
      page.removeEventListener('keydown', escHandler);
    }

    const closeSphereModalHandler = () => {
      sphereModal.classList.add('hidden');
      overlay.classList.add('hidden');
      page.removeEventListener('keydown', escHandler);
    }

    sphereModalCloseBtn.addEventListener('click', closeSphereModalHandler)
    page.addEventListener('keydown', escHandler)
    overlay.addEventListener('click', clickOverlayHandler)

    sphereModal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  })
}

// Кнопка Сделать заказ

const bigCardBtn = document.querySelector('.big-card__btn');

if (bigCardBtn) {
  let step = 1

  bigCardBtn.addEventListener('click', (e) => {
    if (step === 1) {
      bigCardBtn.textContent = 'В корзину';
      bigCardBtn.classList.add('big-card__btn--stroke');
    } else {
      document.location = '/cart.html'
    }
    step++;
  })
}
