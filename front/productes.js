import { createApp, ref, onBeforeMount, reactive } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { getProducts } from './communicationManager.js';

createApp({
    setup() {
        let totalCart = ref(0);
        const infoTotal = reactive({ datos: [] });

        const productosVisible = ref(false); 

        
        onBeforeMount(async () => {
            try {
                const data = await getProducts(); // Obtengo los productos
                console.log(data);
                infoTotal.datos = data;
            } catch (error) {
                console.error("Error al cargar productos:", error);
            }
        });

        function mostrarProductos() {
            productosVisible.value = true; 
        }

        function ocultarProductos() {
            productosVisible.value = false; 
        }

        function addCart(productId) {
            const product = infoTotal.datos.find(p => p.id === productId); 
            if (product && product.stock > 0) {
                totalCart.value += 1; 
                product.stock -= 1;
            } else {
                alert("No hay stock disponible para este producto.");
            }
        }

        function removeCart(productId) {
            const product = infoTotal.datos.find(p => p.id === productId);
            if (product) {
                totalCart.value -= 1; 
                product.stock += 1; 
            }
        }
        

        return {
            infoTotal,
            mostrarProductos,
            ocultarProductos, 
            productosVisible,
            addCart,
            removeCart,
        };
    }
}).mount('#appVue');
