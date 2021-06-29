let app = new Vue ({
    el: '#app',
    data: {
        product: 'Socks',
        description: 'A pair of warm, fuzzy socks',
        image: './assets/vmSocks-green-onWhite.jpg',
        link: 'http://google.com',
        inStock: true,
        onSale: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"]
    }
})