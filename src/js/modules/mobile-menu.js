const mobileMenuOpenBtn = document.querySelector('.main-header__mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuOpenBtn) {
  mobileMenuOpenBtn.addEventListener('click', (e) => {
    mobileMenu.classList.remove('hidden');
    e.stopPropagation();
  })

  document.addEventListener('click', (e)=>{
    if(e.target.closest('.mobile-menu') !== mobileMenu && e.target.closest('.main-header__mobile-menu-btn') !==  mobileMenuOpenBtn) {
      mobileMenu.classList.add('hidden');
    }
  })
}

const mobileMenuCloseBtn = document.querySelector('.mobile-menu__close-btn');
if (mobileMenuCloseBtn) {
  mobileMenuCloseBtn.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
}
