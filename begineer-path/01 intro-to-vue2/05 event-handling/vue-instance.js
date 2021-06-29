let app = new Vue ({
    el: '#app',
    data: {
        product: 'Socks',
        description: 'A pair of warm, fuzzy socks',
        image: './assets/vmSocks-green-onWhite.jpg',
        link: 'http://google.com',
        inStock: true,
        onSale: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: "./assets/vmSocks-green-onWhite.jpg"
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: "./assets/vmSocks-blue-onWhite.jpg"
            }
        ],
        sizes: ["Small", "Medium", "Large"],
        cart: 0
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
        updateProduct: function (variantImage) {
            this.image = variantImage
        }
    }
})