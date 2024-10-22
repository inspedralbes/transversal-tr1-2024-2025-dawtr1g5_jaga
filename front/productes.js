import { createApp } from 'https://unpkg.com/vue@3.2.0/dist/vue.esm-browser.js';

const app = createApp({
    data() {
        return {
            products: [] 
        };
    },
    mounted() {
        fetch('./products.json') 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al carregar els productes');
                }
                return response.json(); 
            })
            .then(data => {
                this.products = data; 
            })
            .catch(error => {
                console.error('Error:', error); 
            });
    },
    methods: {
        buyProduct(product) {
            alert(`Has comprat ${product.title} per ${product.price} €!`);
        }
    }
});

app.mount('#app');
