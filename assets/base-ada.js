// 目录：
// 将声明的内容复制到屏幕可见区域
//判断元素是否包含title字眼，如果是则role=heading
// 给图片添加alt属性，如果图片本身不带文字，则需要alt控制，如果图片带文字，需要写alt具体文字
// 给所有的svg判断是否包含aria-hidden，如果不包含，则添加
// 给所有的input添加aria-label，值是placeholder或者value；如果是required，则添加属性值aria-required=true
// tab键盘focus元素，当按下enter回车则触发元素的click事件

/**
 * 公告栏弹窗
 *
 */
function announcementAccessFun() {
  document.addEventListener("DOMContentLoaded", function () {
    const announcement = document.getElementById("accessibility-announcement");
    // 创建一个函数来发布声明
    function announceAccessibilityStatement() {
      // 将声明的内容复制到屏幕可见区域
      const visibleAnnouncement = document.createElement("div");
      visibleAnnouncement.style.position = "absolute";
      visibleAnnouncement.style.top = "0";
      visibleAnnouncement.style.left = "0";
      visibleAnnouncement.style.width = "1px";
      visibleAnnouncement.style.height = "1px";
      visibleAnnouncement.style.overflow = "hidden";
      visibleAnnouncement.innerHTML = announcement.innerHTML;
      document.body.appendChild(visibleAnnouncement);
      // 移除声明内容（可选）
      setTimeout(() => {
        document.body.removeChild(visibleAnnouncement);
      }, 5000); // 保留一段时间以确保屏幕阅读器能够读取
    }

    // 调用函数发布声明
    announceAccessibilityStatement();
  });
}
/**
 * 新窗口打开外部链接
 *
 */
function targetlinkFun() {
  // ADA: Open a new window for external website links
  var links = document.querySelectorAll("a[href]");
  var currentHost = window.location.hostname;

  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    link.setAttribute("tabindex", "0");
    if (!link.hasAttribute("aria-label")) {
      // 添加 aria-label 属性，并设置值为元素的文本内容
      var text = link.textContent;
      link.setAttribute("aria-label", text);
    }

    if (!link.target && isExternalLink(link.href, currentHost)) {
      link.target = "_blank";
      link.setAttribute("role", "button");
      link.setAttribute("aria-label", link.innerText + ", open in a new tab");
      link.rel = "noopener noreferrer nofollow";
    }
  }

  function isExternalLink(href, currentHost) {
    var url = new URL(href);
    return url.hostname !== currentHost;
  }
}
/**
 * 判断元素是否包含title字眼，如果是则添加heading角色
 *
 */
function titleroleFun() {
  // 判断元素是否包含title字眼，如果是则添加heading角色

  // 获取所有class包含'title'的元素
  // const elementsWithTitleClass = document.querySelectorAll('[class*="title"]');
  // const elementsWithH1Class = document.querySelectorAll('h1');
  // const elementsWithH2 = document.querySelectorAll('h2');
  // 遍历这些元素并执行操作
  // elementsWithTitleClass.forEach(function(element) {
  //   if (element.className.includes('title')) {
  //     element.setAttribute('role', 'heading');
  //     if (!element.hasAttribute('aria-label')) {

  //       // 添加 aria-label 属性，并设置值为元素的文本内容
  //       var text = element.textContent;
  //       element.setAttribute('aria-label', text);
  //     }

  //   }
  // });
  // elementsWithH1Class.forEach(function (element) {
  //   element.setAttribute('role', 'heading');
  // });
  // elementsWithH2.forEach(function (element) {
  //   element.setAttribute('role', 'heading');
  // });
  const elementstitle = document.querySelectorAll("h2, h3, h4, h5, h6");
  // 遍历这些元素并执行操作
  elementstitle.forEach(function (element) {
    if (!element.hasAttribute("role")) {
      element.setAttribute("role", "heading");
    }

    if (!element.hasAttribute("aria-label")) {
      // 添加 aria-label 属性，并设置值为元素的文本内容
      var text = element.textContent;
      element.setAttribute("aria-label", text);
    }
  });
}

/**
 * 给图片添加alt属性，如果图片本身不带文字，则需要alt控制，如果图片带文字，需要写alt具体文字
 *
 */
function imgALTFun() {
  const images = document.getElementsByTagName("img");

  Array.from(images).forEach((image) => {
    if (!image.hasAttribute("alt")) {
      image.setAttribute("alt", "Redragon");
    }
  });
}
/**
 * 给所有的svg判断是否包含aria-hidden，如果不包含，则添加
 *
 */
function svgariaFun() {
  const svgs = document.getElementsByTagName("svg");

  Array.from(svgs).forEach((svg) => {
    if (!svg.hasAttribute("aria-hidden")) {
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("focusable", "false");
    }
  });
}
/**
 * 给所有的input添加aria-label，值是placeholder或者value；如果是required，则添加属性值aria-required=true
 *
 */
function inputlabelFun() {
  const inputs = document.getElementsByTagName("input");

  Array.from(inputs).forEach((input) => {
    if (!input.hasAttribute("aria-label")) {
      const placeholder = input.getAttribute("placeholder");
      const value = input.value;
      const labelValue = placeholder || value;
      input.setAttribute("aria-label", labelValue);
    }
    if (input.hasAttribute("required")) {
      input.setAttribute("aria-required", "true");
    }
  });
}
/**
 * 监听键盘事件，当按下tab后锁定元素 ，再按enter，则触发click事件
 *
 */
function tabtoClickFun() {
  // 监听键盘事件
  document.addEventListener("keydown", function (event) {
    // 检查按下的键是否为 Tab 键
    if (event.key === "Tab") {
      // 获取当前焦点元素
      var focusedElement = document.activeElement;

      // 监听当前焦点元素的键盘事件
      focusedElement.addEventListener("keydown", function (event) {
        // 检查按下的键是否为 Enter 键
        if (event.key === "Enter") {
          // 触发当前焦点元素的 click 事件
          focusedElement.click();
        }
      });
    }
  });
}

/**
 * 产品页内related video 页签内的图片动态加alt值，a标签动态加aria-label值
 *
 */
function tosotrwdvidoeFun() {
  if (document.body.classList.contains("template-product")) {
    // 获取所有具有样式名为 "rwd-video" 的元素
    var rwdVideos = document.getElementsByClassName("rwd-video");

    // 遍历每个 rwd-video 元素
    for (var i = 0; i < rwdVideos.length; i++) {
      var rwdVideo = rwdVideos[i];

      // 获取 rwd-video 元素内的 h2 元素、a 元素和图片元素
      var h2Element = rwdVideo.querySelector("h2");
      var aElement = rwdVideo.querySelector("a");
      var imgElement = rwdVideo.querySelector("img");

      // 设置 a 元素的 aria-label 属性为 h2 元素的文本内容
      aElement.setAttribute("aria-label", h2Element.textContent);
      // 设置图片元素的 alt 属性为 h2 元素的文本内容
      imgElement.alt = h2Element.textContent;
    }
  }
}

// 按下ESC, 关闭弹窗
function closeDialog() {
  let scrollTop = "";
  $(document).on("keydown", function (event) {
    scrollTop = $(window).scrollTop();
    if (event.key === "Escape") {
      scrollTop = $(window).scrollTop();
      $(".product_dialog").css("display", "none");
      $("body").removeClass("noscroll");
      $(window).scrollTop(scrollTop);
    }
  });
}

announcementAccessFun();
targetlinkFun();
titleroleFun();
imgALTFun();
svgariaFun();
inputlabelFun();
tabtoClickFun();
tosotrwdvidoeFun();
closeDialog();
