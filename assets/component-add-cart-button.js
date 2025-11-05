/**
 * AddCartButton，加购按钮，点击元素本身触发
 *
 * Attributes:
 * @param {String} data-variant-id 产品变体 ID
 * @param {String} data-quantity 购买数量，可选，默认为1
 *
 * @example
 * ```html
 * <add-cart-button data-variant-id="{{ product.first_available_variant.id }}" data-quantity="1" class="button round">
 *   Add to cart
 *   {%- render 'loading-spinner' -%}
 * </add-cart-button>
 * ```
 */
if (!customElements.get("add-cart-button")) {
  class AddCartButton extends HTMLElement {
    // 标记
    _marks = {
      loading: "loading",
    };

    _shopify_features_script = document.querySelector(
      "script[id='shopify-features']"
    );
    _shopify_features_json = JSON.parse(
      this._shopify_features_script.innerHTML
    );
    _checkout_headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: "Basic " + btoa(this._shopify_features_json.accessToken),
    };

    get _variantId() {
      return this.getAttribute("data-variant-id");
    }
    get _quantity() {
      return this.getAttribute("data-quantity") ?? 1;
    }

    constructor() {
      super();
    }

    connectedCallback() {
      this.elements = {
        loadingSpinner: this.querySelector(".loading__spinner"),
      };
      this.addEventListener("click", (e) => {
        this.startLoading();
        this.addToCart().finally(() => {
          this.finishLoading();
        });
      });
    }

    onCartUpdate() {
      fetch(`${routes.cart_url}?section_id=cart-drawer`)
        .then((response) => response.text())
        .then((responseText) => {
          const html = new DOMParser().parseFromString(
            responseText,
            "text/html"
          );
          const targetElement = document.querySelector("cart-drawer");
          const sourceElement = html.querySelector("cart-drawer");
          targetElement.innerHTML = sourceElement.innerHTML;
          targetElement.classList.add("active");
          targetElement.classList.remove("is-empty");
          // document.querySelector("body").classList.add("overflow-hidden");
        })
        .catch((e) => {
          console.error(e);
        });

        fetch(`${routes.cart_url}.js`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((cartData) => {
          const cartItemCount = cartData.item_count;
          let cartCountBubble = document.querySelector('#cart-icon-bubble .cart-count-bubble');
          if (!cartCountBubble) {
            cartCountBubble = document.createElement('div');
            cartCountBubble.className = 'cart-count-bubble';
            cartCountBubble.innerHTML = `<span aria-hidden="true">${cartItemCount}</span><span class="visually-hidden">${cartItemCount} item</span>`;
            document.querySelector('#cart-icon-bubble').appendChild(cartCountBubble);
          } else {
            cartCountBubble.querySelector('span[aria-hidden="true"]').textContent = cartItemCount;
            cartCountBubble.querySelector('.visually-hidden').textContent = `${cartItemCount} item`;
          }
        })
        .catch((error) => {
          console.error('There has been a problem with your fetch operation:', error);
        });
    }

    /**
     * 加购
     */
    async addToCart() {
      const variantIds = this._variantId.split(",");

      const items = variantIds.map((id) => {
        return {
          form_type: "product",
          utf8: "✓",
          id: parseInt(id, 10),
          quantity: this._quantity,
        };
      });

      let data_json = {
        items: items,
      };

      let data = JSON.stringify(data_json);
      return fetch("/cart/add.json", {
        method: "POST",
        headers: this._checkout_headers,
        body: data,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            if (response.status === 422) {
              alert("Inventory shortage!");
            }
            throw new Error("请求失败");
          }
        })
        .then((response) => {
          return this.updateCart(response);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    /**
     * 更新购物车，并弹出侧边购物车
     * @returns
     */
    async updateCart(response) {
      this.onCartUpdate();
    }

    startLoading() {
      this.setAttribute("aria-disabled", true);
      this.classList.add(this._marks.loading);
      this.elements.loadingSpinner?.classList.remove("hidden");
    }

    finishLoading() {
      this.removeAttribute("aria-disabled");
      this.classList.remove(this._marks.loading);
      this.elements.loadingSpinner?.classList.add("hidden");
    }
  }

  customElements.define("add-cart-button", AddCartButton);
}
