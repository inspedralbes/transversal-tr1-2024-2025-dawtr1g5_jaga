import { createApp, ref, onBeforeMount, reactive } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { getProducts } from './communicationManager.js';

createApp({
    setup() {
        let totalCart = ref(0);
        const infoTotal = reactive({ datos: [] });

        const productosVisible = ref(false); 

        // Cargar productos desde la API
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

        return {
            infoTotal,
            mostrarProductos,
            ocultarProductos, 
            productosVisible,
            totalCart,
        };
    }
}).mount('#appVue');
