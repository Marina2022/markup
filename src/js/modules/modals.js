const scrollWidth =  parseInt(window.innerWidth) - parseInt(document.documentElement.clientWidth);

const showModal = (modal) => {
  const overlay = document.querySelector('.overlay');
  const page = document.querySelector('body');
  const closeBtn = modal.querySelector('.modal__close-btn');

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');

  const escHandler = (e) => {
    if (e.keyCode === 27) {
      modal.classList.add('hidden');
      overlay.classList.add('hidden');
      page.removeEventListener('keydown', escHandler);
      page.style.overflow = 'auto';
      page.style.paddingRight = '0px';
    }
  }

  const clickOverlayHandler = (e) => {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    page.removeEventListener('keydown', escHandler);
    page.style.overflow = 'auto';
    page.style.paddingRight = '0px';
  }

  const closeBtnHandler = () => {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    page.removeEventListener('keydown', escHandler);
    page.style.overflow = 'auto';
    page.style.paddingRight = '0px';
  }

  closeBtn.addEventListener('click', closeBtnHandler);
  page.addEventListener('keydown', escHandler)
  overlay.addEventListener('click', clickOverlayHandler)

  page.style.overflow = 'hidden';
  page.style.paddingRight = `${scrollWidth}px`;
}

const sendRequestBtn = document.querySelector('.slider-primary__btn');

if (sendRequestBtn) {
  const requestModal = document.querySelector('.modal--request');
  sendRequestBtn.addEventListener(('click'), () => showModal(requestModal));
}

const orderCallBtn = document.querySelector('.order-call-btn');

if (orderCallBtn) {
  const orderCallBtns = document.querySelectorAll('.order-call-btn');
  const orderCallModal = document.querySelector('.modal--order-call');
  orderCallBtns.forEach((btn) => {
    btn.addEventListener('click', () => showModal(orderCallModal))
  })
}


const priceRequestBtn = document.querySelector('#price-request');

if (priceRequestBtn) {
  const priceRequestModal = document.querySelector('.modal--price-request');
    priceRequestBtn.addEventListener('click', () => showModal(priceRequestModal))
}


// Маска для input с номером в модалке узнать цену
const priceRequestPhoneInput = document.querySelector('#price-request-phone')
if (priceRequestPhoneInput) {
  const im = new Inputmask("+7 (999) 999-99-99");
  im.mask(priceRequestPhoneInput);
}

// Маска для input с номером в модалке заказать звонок
const orderCallPhoneInput = document.querySelector('#order-call-phone')
if (orderCallPhoneInput) {
  const im = new Inputmask("+7 (999) 999-99-99");
  im.mask(orderCallPhoneInput);
}

// Маска для input с номером в модалке отправить заявку
const requestPhoneInput = document.querySelector('#request-phone')
if (requestPhoneInput) {
  const im = new Inputmask("+7 (999) 999-99-99");
  im.mask(requestPhoneInput);
}
