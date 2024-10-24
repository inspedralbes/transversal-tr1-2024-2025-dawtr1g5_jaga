import { createApp, ref, onBeforeMount, reactive } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { getProducts } from './communicationManager.js';

createApp({
    setup() {
        const infoTotal = reactive({ datos: [] }); // Datos originaes
        let cart = reactive({ datos: [] }); // Guarda los productos que quiere comprar
        let preuTotal  = reactive({ total: 0 }); // Guarda el valor total de los productos
        let totalCart = ref(0); // Cantidad de los productos

        const productosVisible = ref(false); 

        
        onBeforeMount(async () => {
            try {
                const data = await getProducts(); // Obtengo los productos
                console.log(data);
                infoTotal.datos = data;
            } catch (error) {
                console.error("Error al cargar productos:", error);
            }

            // Calcular el preu total de tots els infoTotal dins del carret
            for (let index = 0; index < infoTotal.datos.length; index++) {
                infoTotal.datos[index].quantitat = 1;
                //totalCart.value ++;
                //preuTotal.total += infoTotal.datos[index].price;
                //console.log(infoTotal.datos[index].price);
                console.log(preuTotal.total)
            }
            calcularTotal();
        });

        // functions index html
        function mostrarProductos() {
            productosVisible.value = true; 
        }

        function ocultarProductos() {
            productosVisible.value = false; 
        }

        function addCart(productId) {
            const product = infoTotal.datos.find(p => p.id === productId); 
            if (product && product.stock > 0) {
                cart.datos.push({product});
                console.log(cart.datos);
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

        // functions cart html

        function calcularTotal() {
            preuTotal.total = 0;

            for (let index = 0; index < cart.datos.length; index++) {
                const producte = cart.datos[index];
                preuTotal.total += producte.product.price * producte.product.quantitat; // Calculate the total
            }
        }

        function eliminarProducte(producteToRemove) {
            const index = infoTotal.datos.indexOf(producteToRemove);
            if (index !== -1) {
                infoTotal.datos.splice(index, 1);
                totalCart.value--;
                calcularTotal(); 
            }
        }

        return {
            infoTotal,
            mostrarProductos,
            ocultarProductos, 
            productosVisible,
            addCart,
            removeCart,
            calcularTotal,
            eliminarProducte,
            preuTotal,
            totalCart,
            cart
        };
    }
}).mount('#appVue');
