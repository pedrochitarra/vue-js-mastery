Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
            <img :src="image" alt="">
            
        </div>
        <div class="product-info">
            <h1> {{ title }} </h1>
            <p v-if="inStock">In Stock</p>
            <p 
                v-else
                :class="{outOfStockClass: !inStock}">
            Out of Stock</p>
            <p>{{ sale }}</p>
            <p>Shipping: {{ shipping }}</p>
            
            <div v-for="(variant, index) in variants" 
                :key="variant.variantId"
                class="color-box"
                :style="{backgroundColor: variant.variantColor}"
                @mouseover="updateProduct(index)">
            </div>

            <button 
                v-on:click="addToCart" 
                :disabled="!inStock"
                :class="{disabledButton: !inStock }">Add to Cart</button>

            <button v-on:click="removeFromCart">Remove From Cart</button>

            <div class="cart">
                <p>Cart ({{cart}})</p>
            </div>

        </div>
    </div>`,

    data() {
        return {
            brand: 'Vuejs Mastery',
            product: 'Socks',
            description: 'A pair of warm, fuzzy socks',
            selectedVariant: 0,
            link: 'http://google.com',
            onSale: true,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0
                }
            ],
            sizes: ["Small", "Medium", "Large"],
            cart: 0
        }
    },
    methods: {
        addToCart: function() {
            this.cart += 1
        },
        removeFromCart: function () {
            if (this.cart > 0) {
                this.cart -= 1
            }
        },
        updateProduct: function (index) {
            this.selectedVariant = index
        }
    },
    computed: {
        title () {
            return `${this.brand} ${this.product}`
        },
        image () {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock () {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if (this.onSale) {
              return this.brand + ' ' + this.product + ' are on sale!'
            } 
              return  this.brand + ' ' + this.product + ' are not on sale'
        },
        shipping () {
            if (this.premium) {
                return "Free"
            }
            else {
                return "$2.99"
            }
        }
    }

})

let app = new Vue ({
    el: '#app',
    data: {
        premium: false
    }
})