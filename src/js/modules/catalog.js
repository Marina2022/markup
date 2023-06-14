const overlay = document.querySelector('.catalog__overlay');
const page = document.querySelector('body');
const filters = document.querySelector('.catalog__filters');

// Переключения вида карточек
const dashboardBtn = document.querySelector('.products-section__dashboard-button');
const tableBtn = document.querySelector('.products-section__table-button');
const cards = document.querySelectorAll('.product-card');


if (dashboardBtn && tableBtn && cards) {
  dashboardBtn.addEventListener('click', (e) => {
    if (!dashboardBtn.classList.contains('view-types-button--active')) {
      // Делаем табличный вид для карточек
      cards.forEach((card) => {
        card.classList.remove('product-card--table-view');
      })

      dashboardBtn.classList.toggle('view-types-button--active');
      tableBtn.classList.toggle('view-types-button--active');
    }
  })

  tableBtn.addEventListener('click', (e) => {
    if (!tableBtn.classList.contains('view-types-button--active')) {
      // Убираем табличный вид для карточек
      cards.forEach((card) => {
        card.classList.add('product-card--table-view');
      })

      tableBtn.classList.toggle('view-types-button--active');
      dashboardBtn.classList.toggle('view-types-button--active');
    }
  })
}

// Кнопка сортировки
const sortBtn = document.querySelector('.products-section__sort-btn');

if (sortBtn) {
  const sortBtnLabel = document.querySelector('.products-section__sort-btn-label');

  sortBtn.addEventListener('click', () => {
    sortBtn.classList.toggle('products-section__sort-btn--expensive');
    if (sortBtn.classList.contains('products-section__sort-btn--expensive')) {
      sortBtnLabel.textContent = 'Сначала дорогие'
    } else {
      sortBtnLabel.textContent = 'Сначала дешевые'
    }
  })
}


// Аккордеон в фильтрах
const sphereTitles = document.querySelectorAll('.sphere-block__title');

if (sphereTitles) {
  sphereTitles.forEach((sphereTitle) => {
    sphereTitle.addEventListener('click', () => {
      const sphereBlock = sphereTitle.closest('.sphere-block');
      sphereBlock.classList.toggle('sphere-block--closed');
      sphereBlock.querySelector('.subspheres-list').classList.toggle('hidden')
    })
  })
}


// Открытие модального окна - Фильтр по минералам

const openMinerals = document.querySelector('.filters__card-link--round');
const mineralsBlock = document.querySelector('.filters__minerals-list-wrapper');

if (openMinerals) {

  openMinerals.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    mineralsBlock.classList.remove('hidden');

    // Закрытие модального окна - Фильтр по минералам

    const closeMinerals = document.querySelector('.filters__minerals-close-btn');

    const escHandler = (e) => {
      if (e.keyCode === 27) {
        mineralsBlock.classList.add('hidden');
        overlay.classList.add('hidden');
      }
      page.removeEventListener('keydown', escHandler);
    }

    const clickOverlayHandler = (e) => {
      mineralsBlock.classList.add('hidden');
      overlay.classList.add('hidden');
      page.removeEventListener('keydown', escHandler);
    }

    const closeMineralsHandler = () => {
      mineralsBlock.classList.add('hidden');
      overlay.classList.add('hidden');
      page.removeEventListener('keydown', escHandler);
    }

    closeMinerals.addEventListener('click', closeMineralsHandler);
    page.addEventListener('keydown', escHandler)
    overlay.addEventListener('click', clickOverlayHandler)
  })
}


// Открытие фильтровна мобилке

const filterBtn = document.querySelector('.products-section__filter-btn');

if (filterBtn) {
  filterBtn.addEventListener('click', () => {
    filters.style.display = 'block';
    filters.style.position = 'absolute';
    mineralsBlock.classList.remove('hidden');
    overlay.classList.remove('hidden');

  // Закрытие модального окна - фильтры на мобилке

  const closeMobileFilters = document.querySelector('.filters__mobile-close-btn');

    const escHandler = (e) => {
      if (e.keyCode === 27) {
        filters.style.position = 'static';
        filters.style.display = 'none';
        overlay.classList.add('hidden');
      }
      page.removeEventListener('keydown', escHandler);
    }

    const clickOverlayHandler = (e) => {
      filters.style.position = 'static';
      filters.style.display = 'none';
      overlay.classList.add('hidden');
      page.removeEventListener('keydown', escHandler);
    }

    const closeFiltersHandler = () => {
      filters.style.position = 'static';
      filters.style.display = 'none';
      overlay.classList.add('hidden');
      page.removeEventListener('keydown', escHandler);
    }

    closeMobileFilters.addEventListener('click', closeFiltersHandler);
    page.addEventListener('keydown', escHandler);
    overlay.addEventListener('click', clickOverlayHandler);
  })
}


