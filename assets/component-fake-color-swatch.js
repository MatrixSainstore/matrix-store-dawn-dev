/**
 * 将假的产品变体提取出 Color 选项，渲染成色板色块
 * 列表项事件可依据：[data-fake-color-swatch-item]
 *
 * @param {String} data-metafield-options 产品假变体的元属性
 * @param {String} data-list-class 列表的类名
 * @param {String} data-item-class 列表项的类名
 *
 * @example
 * <script src="{{ 'component-fake-color-swatch.js' | asset_url }}" defer="defer"></script>
 * <fake-color-swatch
 *   data-metafield-options="{{ customDesc.variant_option }}"
 *   data-list-class="color-list fake-color-list"
 *   data-item-class="color-btn fake-color-btn"
 * >
 * </fake-color-swatch>
 */
/**
 * @typedef {{name: String, value: String, actived: Boolean, productHandle: String}}  Option
 * @typedef {{name: String, options: Option[]}}  OptionGroup
 */
if (!customElements.get("fake-color-swatch")) {
  customElements.define(
    "fake-color-swatch",
    class ColorSwatchFake extends HTMLElement {
      get listClass() {
        return this.getAttribute("data-list-class");
      }
      get itemClass() {
        return this.getAttribute("data-item-class");
      }
      get metafield() {
        return this.getAttribute("data-metafield-options");
      }

      constructor() {
        super();
        this.init();
      }

      attributeChangedCallback() {
        this.init();
      }

      init() {
        const tempElement = document.createElement("div");
        tempElement.innerHTML = this.metafield;
        const labels = tempElement.querySelectorAll("label");
        /** @type {[OptionGroup]} */
        const optionGroups = [];
        for (let i = 0; i < labels.length; i++) {
          const labelElement = labels[i];
          const selectorWrapperElement = labelElement.nextElementSibling;
          const optionName = labelElement.innerText.trim();
          if (!optionName.includes("Color")) continue;
          /** @type {OptionGroup} */
          const newOptionGroup = {
            name: optionName,
            options: [],
          };
          for (const aElement of selectorWrapperElement.querySelectorAll("a")) {
            const isActived = aElement.classList.contains("active-optionss");
            const hrefTemp = aElement.getAttribute("href")?.split("/");
            newOptionGroup.options.push({
              name: optionName,
              value: aElement.innerText.trim(),
              actived: isActived,
              productHandle: hrefTemp ? hrefTemp[hrefTemp.length - 1] : "",
            });
          }
          optionGroups.push(newOptionGroup);
        }
        // console.log("optionGroups: ", optionGroups);
        let innerHTML = ``;
        for (const optionGroup of optionGroups) {
          innerHTML += `<ul class="${this.listClass}" data-fake-color-swatch>`;
          for (const option of optionGroup.options) {
            innerHTML += `<li class="${this.itemClass} bgc-${
              option.value.includes("&")
                ? option.value
                    .toLocaleLowerCase()
                    .replace(/\s/g, "")
                    .split("&")[1]
                : option.value.toLocaleLowerCase().replace(/\s/g, "")
            } ${option.actived ? "active" : ""}" 
                  data-option-name="${option.name}" 
                  data-option-value="${option.value}" 
                  data-product-handle="${option.productHandle}"
                  data-fake-color-swatch-item
                ></li>`;
          }
          innerHTML += `</ul>`;
        }
        this.innerHTML = innerHTML;
      }
    }
  );
}
