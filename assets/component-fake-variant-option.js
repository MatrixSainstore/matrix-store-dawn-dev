/**
 * 渲染假的变体选项，但过滤掉颜色 "Color" 选项
 * 列表项事件可依据：[data-fake-variant-option]
 *
 * @param {String} data-metafield-options 产品假变体的元属性
 * @param {String} data-group-class 组的类名
 * @param {String} data-label-class 组名称的类名
 * @param {String} data-list-class 列表的类名
 * @param {String} data-item-class 列表项的类名
 *
 * @example
 * <script src="{{ 'component-fake-variant-option.js' | asset_url }}" defer="defer"></script>
 * <fake-variant-option
 *   data-metafield-options="{{ customDesc.variant_option }}"
 *   data-list-class="color-list fake-color-list"
 *   data-item-class="color-btn fake-color-btn"
 * >
 * </fake-variant-option>
 */
/**
 * @typedef {{name: String, value: String, actived: Boolean, productHandle: String}}  Option
 * @typedef {{name: String, options: Option[]}}  OptionGroup
 */
if (!customElements.get("fake-variant-option")) {
  customElements.define(
    "fake-variant-option",
    class ColorSwatchFake extends HTMLElement {
      get groupClass() {
        return this.getAttribute("data-group-class");
      }
      get labelClass() {
        return this.getAttribute("data-label-class");
      }
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
          if (optionName.includes("Color")) continue;
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
          innerHTML += `<div class="${this.groupClass}" data-fake-variant-group>`;
          innerHTML += `<label class="${this.labelClass}">${optionGroup.name}</label>`;
          innerHTML += `<ul class="${this.listClass}">`;
          for (const option of optionGroup.options) {
            innerHTML += `<li class="${this.itemClass} ${
              option.actived ? "active" : ""
            }" 
                  data-option-name="${option.name}" 
                  data-option-value="${option.value}" 
                  data-product-handle="${option.productHandle}"
                  data-fake-variant-option
                >${option.value}</li>`;
          }
          innerHTML += `</ul>`;
          innerHTML += `</div>`;
        }
        this.innerHTML = innerHTML;
      }
    }
  );
}
