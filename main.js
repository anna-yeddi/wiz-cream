// new Vue instance:
const app = new Vue({
  // Vue options:
  el: '#app',
  data: {
    type: 'Ice Cream',
    product: 'Cone',
    description: 'Almond milk organic gelato served in a fresh crunchy waffle cone.',
    // see computed value for image:
    selectedVariant: 0,
      // image: {
      //   url: './assets/rachael-gorjestani-154906-unsplash.jpg',
      //   alt: 'Hand holding light beige ice cream in a waffle cone',
      //   link: '#',
      // },
    // see computed inStock value:
      // inStock: false,
    // see computed inventory value:
      // inventory: 9,
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
    ],
    cart: 0
  },
  methods: {
    // ES5:
    addToCart: function () {
      // scope is "data":
      this.cart += 1
    },
    removeFromCart() {
      // scope is "data":
      if (this.cart > 0) { this.cart--; }
    },
    // ES6 syntax:
    updateProduct(index) {
      this.selectedVariant = index;
      console.log(index);
    }
    // updateProduct(variantImage) {
    //   this.image = variantImage;
    // }
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
    }
  }
});