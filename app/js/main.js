const closeMenu = document.querySelector('.nav--close');
const openMenu = document.querySelector('.nav--open');
const mobileBackdrop = document.querySelector('.mobile-backdrop');
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
const thumbnailSlider = document.querySelectorAll('[data-item-thumbnail]');
let deleteItem;
let initialQuantity = parseInt(itemCount.innerText);
let currentQuantity;

//Show Menu
const closeMenuHandler = () => {
  navMenu.classList.remove('nav__lists-container--show');
  mobileBackdrop.classList.remove('mobile-backdrop--show');
};
const openMenuHandler = () => {
  navMenu.classList.add('nav__lists-container--show');
  mobileBackdrop.classList.add('mobile-backdrop--show');
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

//Add to Cart
const renderCartHandler = () => {
  let totalAmount;

  totalAmount = initialQuantity * 125.0;
  if (initialQuantity) {
    viewItemCart.innerHTML = '';
    viewItemCart.innerHTML = `<div class="cart-body">
                <div class="cart-image-container">
                  <img src="/images/image-product-1-thumbnail.jpg" alt="item" />
                </div>
                <div class="cart-description">
                  <p>Autumn Limited Edition</p>
                  <p>$125 x ${itemCount.innerText} = <strong>$${totalAmount}.00</strong></p>
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
  } else {
    alert('No item added. Please select quantity.');
  }
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
      </div>`;
  itemQuantityPreview.innerText = '';
}

// Function Thumbnail Slider Selector
function sliderImages(
  slides,
  slidesThumbnail,
  activeSlide,
  activeSlideThumbnail,
  thumbnail,
  ...thumbnailSlider
) {
  delete activeSlide.dataset.active;
  delete activeSlideThumbnail.dataset.thumbnailActive;
  let newIndex = [...thumbnailSlider].indexOf(thumbnail);
  slides.children[newIndex].dataset.active = true;
  slidesThumbnail.children[newIndex].dataset.thumbnailActive = true;
}

/**
 * LightBox Desktop
 * 01 - Create a copy of  Desktop Slider
 */

const lightboxSlidesHandler = (e) => {
  const lightbox = document.createElement('div');
  const newLightboxSlidesContainer =
    lightboxSlidesContainer.cloneNode(true); /**01 */
  const lightboxButton = newLightboxSlidesContainer.querySelectorAll(
    '[data-slide-button]'
  );
  const newButtonClose = newLightboxSlidesContainer.querySelector(
    '[ data-lightbox-button-close]'
  );
  const newThumbnailSlider = newLightboxSlidesContainer.querySelectorAll(
    '[data-item-thumbnail]'
  );

  lightbox.className = 'lightbox';
  document.body.appendChild(lightbox);
  lightbox.classList.add('active');

  newButtonClose.style.display = 'flex';
  newButtonClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    lightbox.remove();
  });

  //Lightbox Slider
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

  //Lightbox Thumbnail Selector
  newThumbnailSlider.forEach((thumbnail) => {
    thumbnail.addEventListener('click', () => {
      const slides = newLightboxSlidesContainer.querySelector('[data-slides]');
      const activeSlide = slides.querySelector('[data-active]');
      const slidesThumbnail = newLightboxSlidesContainer.querySelector(
        '[data-item-thumbnails]'
      );
      const activeSlideThumbnail = newLightboxSlidesContainer.querySelector(
        '[data-thumbnail-active]'
      );
      sliderImages(
        slides,
        slidesThumbnail,
        activeSlide,
        activeSlideThumbnail,
        thumbnail,
        ...newThumbnailSlider
      );
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

//Desktop Image Thumbnail Selector

let currentIndex;
thumbnailSlider.forEach((thumbnail) => {
  thumbnail.addEventListener('click', () => {
    const slides = document.querySelector('[data-slides]');
    const slidesThumbnail = document.querySelector('[data-item-thumbnails]');
    const activeSlide = slides.querySelector('[data-active]');
    const activeSlideThumbnail = slidesThumbnail.querySelector(
      '[data-thumbnail-active]'
    );
    sliderImages(
      slides,
      slidesThumbnail,
      activeSlide,
      activeSlideThumbnail,
      thumbnail,
      ...thumbnailSlider
    );
  });
});

//Handlers
lightboxSlides.addEventListener('click', lightboxSlidesHandler);
addToCart.addEventListener('click', renderCartHandler);
openMenu.addEventListener('click', openMenuHandler);
closeMenu.addEventListener('click', closeMenuHandler);
mobileBackdrop.addEventListener('click', closeMenuHandler);
cartView.addEventListener('click', cartViewHandler);
