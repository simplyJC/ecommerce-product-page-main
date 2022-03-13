const closeMenu = document.querySelector('.nav--close');
const openMenu = document.querySelector('.nav--open');
const navMenu = document.querySelector('[data-nav-menu]');
const cartView = document.querySelector('[data-view-cart]');
const cart = document.querySelector('[data-cart]');
const buttons = document.querySelectorAll('[data-slide-button]');
console.log(buttons);
//Show Menu
const closeMenuHandler = () => {
  navMenu.classList.remove('nav__lists-container--show');
};
const openMenuHandler = () => {
  navMenu.classList.add('nav__lists-container--show');
};

//View Cart
const cartViewHandler = () => {
  cart.classList.toggle('cart--show');
};

//Slide Button Next and Previous
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const offset = button.dataset.slideButton === 'next' ? 1 : -1;
    console.log(offset);
    const slides = button
      .closest('[data-carousel]')
      .querySelector('[data-slides]');

    const activeSlide = slides.querySelector('[data-active');
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) {
      newIndex = slides.children.length - 1;
    }
    if (newIndex >= slides.children.length) {
      newIndex = 0;
    }
    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  });
});

openMenu.addEventListener('click', openMenuHandler);
closeMenu.addEventListener('click', closeMenuHandler);
cartView.addEventListener('click', cartViewHandler);
