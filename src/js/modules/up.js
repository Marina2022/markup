const upBtn = document.querySelector('.up-btn');

upBtn.addEventListener('click', ()=>{
  window.scrollTo({top:0, behavior: 'smooth'})
})

window.onscroll = () => {
  if (window.scrollY > 300) {
    upBtn.style.display = "block";
  } else {
    upBtn.style.display = "none";
  }

}

