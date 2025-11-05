document.addEventListener('DOMContentLoaded', () => {
  const $productsContainer = $('.home-collection-products-container');
  const $products = $productsContainer.find('.card-product-item');
  const $nonBestSellers = $products.not('.best-sellers');
  const $typeItems = $('.home-collection-list li');
  const $activeTypeItem = $('.home-collection-products-new .home-type-item-active');
  
  // 和语言插件冲突，注释掉
  // $nonBestSellers.hide();

  const useSwiper = $('.home-collection-products-new').data('useSwiper');
  let homeCollectionNew = null;

  if (useSwiper) {
    homeCollectionNew = new Swiper('.home-collection-products-container', {
      lazy: true,
      slidesPerView: 4,
      loop: false,
      spaceBetween: 24,
      observer: true,
      observeParents: true,
      navigation: {
        nextEl: '.home-collection-products-new .swiper-button-next-home',
        prevEl: '.home-collection-products-new .swiper-button-prev-home',
      },
      pagination: {
        el: '.home-collection-products-new .swiper-pagination-new-home',
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1.2,
          spaceBetween: 20
        },
        500: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 24
        },
        1400: {
          slidesPerView: 4,
          spaceBetween: 24
        }
      }
    });
  }

  // 分类切换点击事件
  $typeItems.on('click', function () {
    const $clickedItem = $(this);
    const type = $clickedItem.data('type');

    $clickedItem.closest('.home-collection-list')
      .find('.home-type-item-active')
      .removeClass('home-type-item-active');

    $clickedItem.addClass('home-type-item-active');

    $products.hide().filter(`.${type}`).show();

    homeCollectionNew?.update();
  });
});