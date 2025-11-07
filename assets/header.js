document.addEventListener("DOMContentLoaded", () => {
  $(".mega-menu").hover(
    function () {
      $(this).attr("open", "open");
    },
    function () {
      $(this).removeAttr("open");
    }
  );

  // M端导航
  $('.menu-pull-down').click(function() {
    var arrow = $(this).find('svg')

    if(arrow.hasClass('arrow-rotation')) {
      arrow.removeClass('arrow-rotation')
    } else {
      arrow.addClass('arrow-rotation')
    }

    $(this).siblings('.mb-secondary-menu').fadeToggle()
  })

  $('.close-mb-menu-btn').click(function() {
    $('.menu-drawer-container').removeClass('menu-opening')
    $('.menu-drawer-container').removeAttr('open')
    $('.menu-drawer-container .header__icon--menu').attr('aria-expanded', 'false')
    // $('body').removeClass('overflow-hidden-tablet')
  })

});