const closeMenu = document.querySelector('.nav--close');
const openMenu = document.querySelector('.nav--open');
const navMenu = document.querySelector('[data-nav-menu]');
const cartView = document.querySelector('[data-view-cart]');
const cart = document.querySelector('[data-cart]');
const buttons = document.querySelectorAll('[data-slide-button]');
const addToCart = document.querySelector('[data-add-to-cart]');
const viewItemCart = document.querySelector('[data-cart-item-added]');
const itemCount = document.querySelector('[data-item-count]');
const itemQuantity = document.querySelectorAll('[data-quantity]');
const itemQuantityPreview = document.querySelector('[data-quantity-preview]');

let deleteItem;
let initialQuantity = parseInt(itemCount.innerText);
let currentQuantity;
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

//Mobile Slider
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

//Add to Cart
const renderCartHandler = () => {
  let totalAmount;
  totalAmount = initialQuantity * 125.0;
  viewItemCart.innerHTML = '';
  viewItemCart.innerHTML = `<div class="cart-body">
                <div class="cart-image-container">
                  <img src="/images/image-product-1-thumbnail.jpg" alt="item" />
                </div>
                <div class="cart-description">
                  <p>Autumn Limited Edition</p>
                  <p>$125 x ${itemCount.innerText} <strong>${totalAmount}.00</strong></p>
                </div>
                <button class="cart-delete-container" data-delete-item>
                  <img src="/images/icon-delete.svg" alt="delete" />
                </button>
              </div>
              <div class="cart-btn-container">
                <button class="cart__btn--checkout">Checkout</button>
              </div> `;
  //Remove Item
  deleteItem = document.querySelector('[data-delete-item]');
  if (deleteItem) {
    deleteItem.addEventListener('click', deleteCart);
  }
  //set quantity at the top cart icon
  itemQuantityPreview.innerText = itemCount.innerText;
};

//Add and Deduct Quantity
itemQuantity.forEach((quantity) => {
  quantity.addEventListener('click', () => {
    if (quantity.dataset.quantity === 'add') {
      initialQuantity++;
    } else {
      if (initialQuantity > 0) initialQuantity--;
    }
    itemCount.innerText = initialQuantity;
  });
});

//Remove Item Function
function deleteCart() {
  viewItemCart.innerHTML = `<div class="cart--empty">
      <p>Your cart is empty</p>
      </div>;`;
  itemQuantityPreview.innerText = '';
}

addToCart.addEventListener('click', renderCartHandler);
openMenu.addEventListener('click', openMenuHandler);
closeMenu.addEventListener('click', closeMenuHandler);
cartView.addEventListener('click', cartViewHandler);
