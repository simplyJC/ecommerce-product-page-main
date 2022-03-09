const closeMenu = document.querySelector('.nav--close');
const openMenu = document.querySelector('.nav--open');
const navMenu = document.querySelector('[data-nav-menu]');
const cartView = document.querySelector('[data-view-cart]');
const cart = document.querySelector('[data-cart]');

const closeMenuHandler = () => {
  navMenu.classList.remove('nav__lists-container--show');
};
const openMenuHandler = () => {
  navMenu.classList.add('nav__lists-container--show');
};

const cartViewHandler = () => {
  cart.classList.toggle('cart--show');
};

openMenu.addEventListener('click', openMenuHandler);
closeMenu.addEventListener('click', closeMenuHandler);
cartView.addEventListener('click', cartViewHandler);
