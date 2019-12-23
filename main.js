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
                    <!-- :checked="[(variants[0]) ? 'true' : 'false']">
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
                :class="[cartIsEmpty ? 'card__btn--disabled' : '']">
                <!-- :disabled="[(cartIsEmpty || !cartHasItem)]" -->
                <!-- :class="[(cartIsEmpty || !cartHasItem) ? 'card__btn--disabled' : '']"> -->
                <!-- :class="[(cart > 0) ? '' : 'card__btn--disabled']"> -->
          Remove from Cart
        </button>

      </div>
      
      <!-- Product review component's data -->
      <div class="product__reviews">

        <div>
          <h2>Reviews</h2>
          <p v-if="!reviews.length">There are no reviews yet.</p>
          <ul>
            <li v-for="review in reviews">
              <p>
                <strong>{{ review.name }}</strong>
                rated this product at
                <strong>{{ review.rating }}/5</strong>
              </p>
              <p>"{{ review.review }}"</p>
            </li>
          </ul>
        </div>
        
        <!-- Product review component -->
        <!-- lestens to review-submitted to trigger method addReview -->
        <product-review class="product__review"
                        @review-submitted="addReview">
        </product-review>

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
          variantId: 3901,
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
          variantId: 3902,
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
          variantId: 3903,
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
          variantId: 3904,
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
      ],
      reviews: []
    }
  },
  methods: {
    // ES5:
    addToCart: function () {
      this.$emit('cart-add', this.variants[this.selectedVariant].variantId)
    },
    removeFromCart() {
      this.$emit('cart-remove', this.variants[this.selectedVariant].variantId)
    },
    // ES6 syntax:
    updateProduct(index) {
      this.selectedVariant = index;
      // console.log(index);
    },
    addReview(productReview) {
      this.reviews.push(productReview);
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
      return this.cart.length === 0;
    },
    cartHasItem() {
      for (let i = this.cart.length - 1; i >= 0; i--) {
        if (this.cart[i] === this.variants[this.selectedVariant].variantId) {
          return true
        }
      };
      return false
    },
    shipping() {
      if (this.premium) {
        return "Free"
      } 
      return "$2.99"
    }
  }
});

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

Vue.component('product-review', {
  template: `
    <form @submit.prevent="onSubmit">

      <h3>Leave Your Review</h3>

      <p v-if="errors.length" class="form__errors">
        <strong>Please correct the following error(s):</strong>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>

      <p>
        <label for="name">Name*:
          <span class="offscreen">required field</span>
        </label>
        <input id="name"
                v-model="name">
      </p>

      <p>
        <label for="rating">Rating (out of 5)*:
          <span class="offscreen">required field</span>
        </label>
        <select id="rating"
                v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>
        <label for="review">Review:</label>
        <textarea id="review"
                  v-model="review"></textarea>
      </p>

      <p>
        <input type="submit" value="Submit"
              class="card__btn card__btn--left">
      </p>

    </form>
  `,
  data() {
    return {
      name: null,
      rating: null,
      review: null,
      errors: []
    }
  },
  methods: {
    onSubmit() {
      // custom form validation
      if (this.name && this.rating) {

        // take input values to
        // create an object from input
        let productReview = {
          name: this.name,
          rating: this.rating,
          review: this.review
        }
        // emit data to parent component
        // (what to trigger, what to send)
        this.$emit('review-submitted', productReview);
        // reset input values
        this.name = null;
        this.rating = null;
        this.review = null
      } else {
        if (!this.name) this.errors.push("Error: Name is required.")
        if (!this.rating) this.errors.push("Error: Rating is required.")
      }      
    }
  }
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
    cartAdd(id) {
      // scope is "data" on #app with emitted event:
      this.cart.push(id);
    },
    cartRemove(id) {
      // scope is "data" on #app with emitted event:
      if (this.cart.length > 0) {
        for (let i = this.cart.length - 1; i >= 0; i--) {
          if (this.cart[i] == id) {
            this.cart.splice(i, 1);
          }
        }
      }
    }
  }
});