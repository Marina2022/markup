const backBtn = document.querySelector('.back-btn');


if (backBtn) {
  backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.history.back();
  })

}
