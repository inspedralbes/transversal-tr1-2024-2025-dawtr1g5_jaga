import { createApp } from 'https://unpkg.com/vue@3.2.0/dist/vue.esm-browser.js';

const app = createApp({
    data() {
        return {
            productes: [], 
            productesComprats: [],
            producteSeleccionat: null, 
            mostrarMesInfo: false 
        };
    },
    mounted() {
        // Carregar els productes del fitxer JSON
        fetch('http://127.0.0.1:8000/api/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en carregar els productes');
                }
                return response.json();
            })
            .then(data => {
                this.productes = data; 
            })
            .catch(error => {
                console.error('Error:', error);
            });
    },
    methods: {
        comprarProducte(producte) {
            this.productesComprats.push(producte);
            alert(`Has comprat ${producte.title} per ${producte.price} €!`);
        },
        alternarInfo(producte) {
            // Alternar la visualització de la informació addicional
            if (this.producteSeleccionat === producte.id) {
                this.mostrarMesInfo = !this.mostrarMesInfo;
            } else {
                this.producteSeleccionat = producte.id;
                this.mostrarMesInfo = true;
            }
        },
        reiniciarProductesComprats() {
            // Reiniciar la llista de productes comprats
            this.productesComprats = [];
        }
    }
});

app.mount('#app');
