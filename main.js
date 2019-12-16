// new Vue.component:
Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    },
    cart: {
      type: Array,
      required: true,
      default: []
    }
  },
  template: `
    <div class="product">

      <!-- Product image -->
      <a class="product__img"
        :href="image.link">
        <!-- binding attributes to the {{ expression }} -->
        <img class="product__img--pic  product__img--border"
            :src="image.url"
            :alt="image.alt">
      </a>


      <div class="product__info">

        <!-- Vue {{ expression }} -->
        <!-- Computed value -->
        <h1 class="product__info--name">
          {{ title }}
        </h1>
        <p class="product__info--desc">
          {{ description }}
        </p>

        <!-- Collection of ingredients -->
        <product-ingredients :details="details"></product-ingredients>

        <!-- inventory conditionals -->
        <p v-show="onSale" class="product__info--sale">
          Psst... It's On Sale!
        </p>


        <!-- Flavor variants: -->
        <fieldset class="product__variants">

          <legend id="flavors">Flavors:</legend>

            <div v-for="(variant, index) in variants" 
                :key="variant.variantId"
                class="picker__radio--label">
              <input type="radio" name="flavor"
                    class="picker__radio--btn offscreen"
                    :value="variant.variantFlavor"
                    :id="variant.variantId">
                    <!-- :checked="[(variants[0]) ? 'true' : 'false']"> -->
                    <!-- :checked="[(index == 0) ? 'true' : 'false']"> -->
              <label :for="variant.variantId"
                    @mouseover="updateProduct(index)"
                    @focus="updateProduct(index)">
                    <!-- @mouseover="updateProduct(variant.variantImage)"
                    @focus="updateProduct(variant.variantImage)"> -->
                <img class="picker__radio--pic"
                    :src="variant.variantIcon"
                    role="presentation">
                {{ variant.variantFlavor }}
              </label>
            </div>

        </fieldset>

        <!-- Size variants: -->
        <fieldset class="product__variants">

          <legend>Sizes:</legend>

          <div class="picker__radio--label"
              v-for="size in sizes"
              :key="size.sizeId">
            <input type="radio"
                  name="size"
                  class="picker__radio--btn offscreen"
                  :value="size.label"
                  :id="size.sizeId">
            <label :for="size.sizeId">
              <div class="picker__radio--num">
                {{ size.label[0] }}
              </div>
              {{ size.label }}
            </label>
          </div>

        </fieldset>


        <!-- Inventory details -->
        <!-- <p v-if="inStock">In Stock</p> -->
        <p v-if="inventory > 10">
          In Stock
        </p>
        <p v-else-if="inventory <= 10 && inventory > 0">
          <span class="product__info--inventory">
            Almost Sold Out
          </span>
          (but it looks like we still have a couple of
          {{ product + 's' }} for you)
        </p>
        <p v-else
            :style="{ textDecoration: 'line-through'}">
          Out of Stock
        </p>
        <p>Shipping: {{ shipping }}</p>


        <!-- Cart Controls -->
        <button v-on:click="addToCart"
                class="card__btn card__btn--left"
                :disabled="!inStock"
                :class="{ 'card__btn--disabled': !inStock }">
          Add to Cart
        </button>

        <button v-on:click="removeFromCart"
                class="card__btn card__btn--right"
                :disabled="cartIsEmpty"
                :class="{ 'card__btn--disabled': cartIsEmpty }">
                <!-- :class="[cartIsEmpty ? 'card__btn--disabled' : '']"> -->
                <!-- :class="[(cart > 0) ? '' : 'card__btn--disabled']"> -->
          Remove one from Cart
        </button>

      </div>

    </div>
  `,
  data() {
    return {
      type: 'Ice Cream',
      product: 'Cone',
      description: 'Almond milk organic gelato served in a fresh crunchy waffle cone.',
      // for computed values of image and inventory
      selectedVariant: 0,
      onSale: true,
      // collection of alias ingredients to loop over
      details: ["Organic gelato","Almond milk","Diary-free","Farm to table ingredients"],
      // collection of variants
      variants: [
        {
          variantId: 3976,
          variantQuantity: 10,
          variantFlavor: "mango",
          variantIcon: "./assets/icons/mango-icon.png",
          variantImage: {
            url: "./assets/rachael-gorjestani-154906-unsplash.jpg",
            alt: "Hand holding light beige ice cream in a waffle cone",
            link: "#"
          }
        },
        {
          variantId: 3977,
          variantQuantity: 0,
          variantFlavor: "pear",
          variantIcon: "./assets/icons/pear-icon.png",
          variantImage: {
            url: "./assets/ian-dooley-281897-unsplash.jpg",
            alt: "Hand holding pink and beige ice cream in a waffle cone",
            link: "#"
          }
        },
        {
          variantId: 3978,
          variantQuantity: 3,
          variantFlavor: "grapes",
          variantIcon: "./assets/icons/grapes-icon.png",
          variantImage: {
            url: "./assets/sharon-mccutcheon-qtYxt46As60-unsplash.jpg",
            alt: "Big scoop of purple ice cream",
            link: "#"
          }
        },
        {
          variantId: 3979,
          variantQuantity: 15,
          variantFlavor: "watermelon",
          variantIcon: "./assets/icons/watermelon-icon.png",
          variantImage: {
            url: "./assets/markus-spiske-755509-unsplash.jpg",
            alt: "Bowl with two scoops of bright pink ice cream and a spoon",
            link: "#"
          }
        },
      ],
      // sizes: ["1 scoop","2 scoops","3 scoops"],
      sizes: [
        {
          label: "1 scoop",
          sizeId: 001
        },
        {
          label: "2 scoops",
          sizeId: 002
        },
        {
          label: "3 scoops",
          sizeId: 003
        }
      ]
    }
  },
  methods: {
    // ES5:
    addToCart: function () {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
    },
    // ES6 syntax:
    updateProduct(index) {
      this.selectedVariant = index;
      // console.log(index);
    }
  },
  computed: {
    title() {
      return this.type + ' ' + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inventory() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    inStock() {
      return this.inventory > 0;
    },
    cartIsEmpty() {
      return this.cart === 0;
    },
    shipping() {
      if (this.premium) {
        return "Free"
      } 
      return "$2.99"
    }
  }
})

Vue.component('product-ingredients', {
  props: {
    details: {
      type: Array,
      required: true,
      default: ["Organic ingredients"]
    }
  },
  template: `
    <div>
      <!-- Collection of ingredients -->
      <ul class="product__info--desc">
        <li v-for="detail in details">
          {{ detail }}
        </li>
      </ul>
    </div>
  `,
  // data() {
  //   return {
  //     // details: ["Organic gelato","Almond milk","Diary-free","Farm to table ingredients"]
  //   }
  // }
})

// new Vue instance:
const app = new Vue({
  // Vue options:
  el: '#app',
  data: {
    userIsPremium: false,
    cart: []
  },
  methods: {
    updateCartIncr(id) {
      // scope is "data" on #app with emitted event:
      this.cart.push(id);
    },
    updateCartDecr(id) {
      // scope is "data" on #app with emitted event:
      if (this.cart.length > 0) {
        this.cart.pop(id);
      }
    }
  }
});