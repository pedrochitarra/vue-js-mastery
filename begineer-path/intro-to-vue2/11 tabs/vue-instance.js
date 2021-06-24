let eventBus = new Vue()

Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
})

Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    },
    cart: {
      type: Array
    }
  },
  template: `
   <div class="product">
        
      <div class="product-image">
        <img :src="image" />
      </div>

      <div class="product-info">
          <h1>{{ product }}</h1>
          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p>
          <p>Shipping: {{ shipping }}</p>

          <product-details :details="details"></product-details>

          <div class="color-box"
               v-for="(variant, index) in variants" 
               :key="variant.variantId"
               :style="{ backgroundColor: variant.variantColor }"
               @mouseover="updateProduct(index)"
               >
          </div> 

          <button v-on:click="addToCart" 
            :disabled="!inStock"
            :class="{ disabledButton: !inStock }"
            >
          Add to cart
          </button>

          <button v-on:click="removeFromCart" 
            :disabled="cart.length == 0"
            :class="{ disabledButton: cart.length == 0 }"
          >
          Remove from cart
          </button>

          <product-tabs :reviews="reviews" :details="details" :shipping="shipping"></product-tabs>



       </div>  
    
    </div>
   `,
 
  data() {
    return {
        product: 'Socks',
        brand: 'Vue Mastery',
        selectedVariant: 0,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
          {
            variantId: 2234,
            variantColor: 'green',
            variantImage:  'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
            variantQuantity: 10     
          },
          {
            variantId: 2235,
            variantColor: 'blue',
            variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
            variantQuantity: 0     
          }
        ],
        reviews: []

    }
  },
  methods: {
      addToCart: function() {
          this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
      },
      removeFromCart: function () {
        this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
      },
      updateProduct: function(index) {  
          this.selectedVariant = index
      },

  },
  computed: {
        title() {
            return this.brand + ' ' + this.product  
        },
        image(){
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
          if (this.premium) {
            return "Free"
          }
            return 2.99
        }
  },
  mounted () {
    eventBus.$on('review-submitted', productReview => {
      this.reviews.push(productReview)
    })
  }
})

Vue.component('product-review', {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">
    
    <p v-if="errors.length">
      <b>Please correct the following error (s):</b>
      <ul>
        <li v-for="error in errors">{{error}}</li>
      </ul>
    </p>

    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name">
    </p>

    <p>
      <label for="review">Review:</label>
      <textarea id="review" v-model="review"></textarea>
    </p>

    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>

    <p>
      <p>Would you recommend this product?</p>

      <input id="doRecommend" type="checkbox" v-model="doRecommend" name="recommend">

    </p>

    <p>
      <input type="submit" value="Submit">
    </p>


    
    </form>
  `,
  data () {
    return {
      name: null,
      review: null,
      rating: null,
      doRecommend: null,
      errors: []
    }
  },
  methods: {
    onSubmit () {
      if (this.name && this.review && this.rating) {
        let productReview = {
          name : this.name,
          review : this.review,
          rating : this.rating,
          doRecommend: this.doRecommend,
          dontRecommend: this.dontRecommend
        }
        eventBus.$emit('review-submitted', productReview)
        this.name = null
        this.review = null
        this.rating = null
      }
      else {
        if (!this.name) {
          this.errors.push("Name required")
        }
        if (!this.review) {
          this.errors.push("Review required")
        }
        if (!this.rating) {
          this.errors.push("Rating required")
        }
      }
    }
  }
})

Vue.component('product-tabs',{
  props: {
    reviews: {
      type: Array,
      required: true
    },
    shipping: {
      type: String,
      required: true
    },
    details: {
      type: Array,
      required: true
    }
  },
  template: `
      <div>

        <span class="tab"
              :class="{activeTab: selectedTab === tab}"
              v-for="(tab,index) in tabs" :key="index"
              @click="selectedTab = tab">
              {{tab}}
        </span>

      
        <div v-show="selectedTab === 'Reviews'">
          <p v-if="reviews.length == 0">There are no reviews yet.</p>
          <ul>
            <li v-for="review in reviews">
            <p>{{review.name}}</p>
            <p>Rating: {{review.rating}}</p>
            <p>{{review.review}}</p>
            </li>
          </ul>
        </div>

        <div v-show="selectedTab === 'Make a Review'">
          <product-review></product-review>
        </div>

        <div v-show="selectedTab === 'Shipping'">
          <p>Shipping</p>
          The shipping cost is {{shipping}}
        </div>

        <div v-show="selectedTab === 'Details'">
          <p>Details</p>
          <ul>
            <li v-for="detail in details">{{detail}}</li>
          </ul>
        </div>

      </div>
  `,
  data() {
    return {
      tabs: ['Reviews', 'Make a Review', 'Shipping', 'Details'],
      selectedTab: 'Reviews'
    }
  }
})

var app = new Vue({
    el: '#app',
    data: {
      premium: true,
      cart: []
    },
    methods: {
      addToCart (id) {
        this.cart.push(id)
      },     
      removeFromCart (id) {
        const indexToRemove = this.cart.indexOf(id)
        console.log(indexToRemove)
        this.cart.splice(indexToRemove, 1)
      },
      
    }
})