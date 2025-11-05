document.addEventListener("DOMContentLoaded", () => {
  // card-product, 产品颜色切换
  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  }

  // 事件处理函数
  const handleMouseEnterLeave = debounce(function (event) {
    var $this = $(this);
    var $wrapper = $this.parents(".product-card-wrapper");
    if (event.type === "mouseover" || event.type === "click") {
      // 鼠标移入或点击时
      $this.siblings(".color-btn").removeClass("active");
      $this.addClass("active");

      var url = $this.attr("data-img");
      $wrapper.find(".pro-featured-media").attr("srcset", url);
      $wrapper.addClass("card-wrapper-hover");
    } else if (event.type === "mouseout") {
      // 鼠标移出时
      $wrapper.removeClass("card-wrapper-hover");
    }
  }, 200);

  // 绑定事件
  $(".pro-color-list .color-btn").on(
    "mouseover mouseout click",
    handleMouseEnterLeave
  );

  const handleMouseEnterLeaveFakeColor = debounce(function (event) {
    const $this = $(this);
    const $wrapper = $this.parents(".product-card-wrapper");
    const eImage = $wrapper.find(".pro-featured-media");

    if (event.type === "mouseover" || event.type === "click") {
      // 鼠标移入或点击时
      $this.siblings(".color-btn").removeClass("active");
      $this.addClass("active");

      const url =
        window.Shopify.routes.root +
        "products/" +
        $this.attr("data-product-handle");
      $.getJSON(url, function (product) {
        eImage.attr("srcset", product.product.image.src);
      });

      $wrapper.addClass("card-wrapper-hover");
    } else if (event.type === "mouseout") {
      // 鼠标移出时
      $wrapper.removeClass("card-wrapper-hover");
    }
  }, 200);

  // 绑定事件
  $(".product-card-wrapper .fake-color-list [data-fake-color-swatch-item]").on(
    "mouseover mouseout click",
    handleMouseEnterLeaveFakeColor
  );

  // 检测筛选，给产品颜色重新添加事件
  function ExamineGrid() {
    const ExamineElement = document.querySelector(".product-grid-container");
    if (ExamineElement) {
      const GridObserver = new MutationObserver(function (mutationsList) {
        for (const mutation of mutationsList) {
          if (mutation.type === "childList" || mutation.type === "attributes") {
            $(".pro-color-list .color-btn").on(
              "mouseover mouseout click",
              handleMouseEnterLeave
            );
            $(
              ".product-card-wrapper .fake-color-list [data-fake-color-swatch-item]"
            ).on("mouseover mouseout click", handleMouseEnterLeaveFakeColor);
          }
        }
      });

      const config = {
        attributes: true,
        childList: true,
        subtree: true,
      };

      GridObserver.observe(ExamineElement, config);
    }
  }

  ExamineGrid();

  // 监测侧边购物车类名变化
  var element = document.querySelector("cart-drawer");
  var observer = new MutationObserver(function (mutationsList, observer) {
    for (var mutation of mutationsList) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        // 检查是否有 .active 类
        // if (element.classList.contains("active")) {
        //     // $('body').addClass('overflow-hidden')
        //     // $('body').css('overflow', 'hidden')
        // } else {
        //   // $('body').removeClass('overflow-hidden')
        //   $('body').css('overflow', 'visible')
        // }

        closeCart();
      }
    }
  });
  observer.observe(element, { attributes: true });

  function closeCart() {
    $(".cart-drawer__overlay").click(function () {
      if ($("cart-drawer").hasClass("active")) {
        $("cart-drawer").removeClass("active");
        $("body").css("overflow", "visible");
      }
    });
  }

  closeCart();

  // smile 插件
  var lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      $(".smile-launcher-frame-container").css("display", "none");
    } else {
      $(".smile-launcher-frame-container").css("display", "block");
    }

    lastScrollTop = scrollTop;
  });
});
