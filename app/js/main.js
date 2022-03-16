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
const lightboxSlides = document.querySelector('[data-slides]');
let lightboxSlidesContainer = document.querySelector('[data-carousel]');
const slideImages = document.querySelectorAll('.slide');
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
    const slides = button
      .closest('[data-carousel]')
      .querySelector('[data-slides]');
    const activeSlide = slides.querySelector('[data-active]');
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

//mobile slider handler

//Function Slider

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

//Lightbox
const lightboxSlidesHandler = (e) => {
  const lightbox = document.createElement('div');
  //const closeButton = document.createElement('img');
  //closeButton.classList.add('lightbox__button--close');

  //const imageArray = [];
  //const images = Array.of(document.querySelectorAll('.slide'));
  const image = document.querySelector('.slide img');
  const images = document.querySelectorAll('.slide img');
  const newIMage = document.createElement('img');
  newIMage.src = image.src;

  const ul = document.querySelector('.slide-container');
  let newDiv = document.createElement('div');

  lightbox.className = 'lightbox';
  document.body.appendChild(lightbox);
  lightbox.classList.add('active');
  //lightbox.appendChild(closeButton);

  // newDiv.appendChild(ul);
  // lightbox.appendChild(newDiv);
  //newUl = ul;
  //lightbox.appendChild(newUL);
  // imageArray.forEach((image) => {
  //   lightbox.appendChild(image);
  // });
  //console.log(images);
  //lightbox.appendChild(newIMage);
  // images.forEach((picture) => {
  //   console.log(picture);
  //   lightbox.appendChild(picture);
  // });

  // lightbox.innerHTML = `<img src="/images/image-product-1.jpg" alt="product 1" />`;

  const newLightboxSlidesContainer = lightboxSlidesContainer.cloneNode(true);
  const lightboxButton = newLightboxSlidesContainer.querySelectorAll(
    '[data-slide-button]'
  );

  const newButtonClose = newLightboxSlidesContainer.querySelector(
    '[ data-lightbox-button-close]'
  );

  newButtonClose.style.display = 'flex';
  newButtonClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    lightbox.remove();
  });
  //lightboxButton.classList.add('lightbox--button');

  // newDataCarousel.innerHTML = `<div class="lightbox__button-container">
  //         <button class="lightbox__button--close">
  //           <img src="/images/icon-close.svg" alt="button close test" />
  //         </button>
  //       </div>`;

  lightboxButton.forEach((button) => {
    button.style.display = 'block';
    button.classList.add('lightbox__button');
    button.addEventListener('click', () => {
      const offset = button.dataset.slideButton === 'next' ? 1 : -1;
      const slides = button
        .closest('[data-carousel]')
        .querySelector('[data-slides]');

      const activeSlide = slides.querySelector('[data-active]');
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

  const newThumbnailSlider = newLightboxSlidesContainer.querySelectorAll(
    '[data-item-thumbnail]'
  );
  console.log(newThumbnailSlider);

  newThumbnailSlider.forEach((thumbnail) => {
    thumbnail.addEventListener('click', () => {
      console.log('its working');
      const slides = newLightboxSlidesContainer.querySelector('[data-slides]');
      const activeSlide = slides.querySelector('[data-active]');
      delete activeSlide.dataset.active;
      let newIndex = [...newThumbnailSlider].indexOf(thumbnail);
      let activeThumbnail;
      console.log(thumbnail);
      let currentSlide = (slides.children[newIndex].dataset.active = true);
      slides.children[newIndex].dataset.active = true;
    });
  });

  lightbox.appendChild(newLightboxSlidesContainer);
  lightbox.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      lightbox.classList.remove('active');
      lightbox.remove();
    }
  });
};

lightboxSlides.addEventListener('click', lightboxSlidesHandler);
//Image Thumbnail Slider
const thumbnailSlider = document.querySelectorAll('[data-item-thumbnail]');
let currentIndex;
thumbnailSlider.forEach((thumbnail) => {
  thumbnail.addEventListener('click', () => {
    const slides = document.querySelector('[data-slides]');
    const activeSlide = slides.querySelector('[data-active]');
    delete activeSlide.dataset.active;
    let newIndex = [...thumbnailSlider].indexOf(thumbnail);
    let activeThumbnail;
    console.log(thumbnail);
    let currentSlide = (slides.children[newIndex].dataset.active = true);
    slides.children[newIndex].dataset.active = true;
  });
});

addToCart.addEventListener('click', renderCartHandler);
openMenu.addEventListener('click', openMenuHandler);
closeMenu.addEventListener('click', closeMenuHandler);
cartView.addEventListener('click', cartViewHandler);
