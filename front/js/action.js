import { createApp, ref, onBeforeMount, reactive } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { getProducts, postOrder, searchProd } from './communicationManager.js';

createApp({
    setup() {
        const infoTotal = reactive({ datos: [] });
        let cart = reactive({ datos: [] });
        let preuTotal = reactive({ total: 0 });
        let prodActual = reactive({ datos: [] })
        let totalCart = ref(0);
        let quantitat = ref(1);
        let query = ref('');
        let queryProducts = ref([]);

        let cartVisible = ref(false); // Controla la visibilidad del carrito
        let productVisible = ref(false);
        let landingVisible = ref(true);
        let searchInputVisible = ref(false);
        let searchVisible = ref(false);
        // Cargar los productos
        onBeforeMount(async () => {
            try {
                const data = await getProducts();
                infoTotal.datos = data;
            } catch (error) {
                console.error("Error al carregar els productes:", error);
            }
            // calcularTotal();
        });

        // Alternar visibilidad del carrito
        function toggleCart() {
            cartVisible.value = !cartVisible.value;
        }

        //Mostrar pantalla de información del producto
        function mostrarProd(productId) {
            toggleLandingProd();
            toggleSearch();
            this.prodActual = infoTotal.datos.find(p => p.id === productId);
        }

        function toggleLandingProd() {
            landingVisible.value = !landingVisible.value;
            productVisible.value = !productVisible.value;
            quantitat.value = 1;
        }

        function toggleSearch(){
            searchInputVisible.value = !searchInputVisible.value;
            query.value = '';
            queryProducts.value = [];
        }

        // Añadir producto al carret
        function addCart(productId) {
            const product = infoTotal.datos.find(p => p.id === productId);
            if (product && product.stock > 0) {
                const existingProduct = cart.datos.find(p => p.product.id === product.id);
                if (existingProduct) {
                    existingProduct.product.quantitat += quantitat.value;
                } else {
                    cart.datos.push({ product: { ...product, quantitat: quantitat.value } });
                    totalCart.value += 1;
                }
                calcularTotal();
            } else {
                alert("No hay stock disponible para este producto.");
            }
        }

        // Calcular el total del carrito
        function calcularTotal() {
            preuTotal.total = 0;
            cart.datos.forEach(producte => {
                preuTotal.total += producte.product.price * producte.product.quantitat;
            });
        }

        // Eliminar producto del carrito
        function eliminarProducte(producteToRemove) {
            const index = cart.datos.findIndex(p => p.product.id === producteToRemove.product.id);
            if (index !== -1) {
                totalCart.value -= 1;
                cart.datos.splice(index, 1);
                calcularTotal();
            }
        }

        function increment(productId) {
            const product = infoTotal.datos.find(p => p.id === productId);
            if (product) {
                const stockActual = product.stock;
                let cartStock = cart.datos.find(p => p.product.id === productId);
                if (cartStock) {
                    cartStock = cartStock.product.quantitat;
                }
                if (quantitat.value < stockActual) {
                    if (cartStock) {
                        if ((quantitat.value + cartStock) < stockActual) {
                            quantitat.value += 1;
                        }
                    } else {
                        quantitat.value += 1;
                    }
                }
            }
        }

        function decrement() {
            if (quantitat.value > 1) {
                quantitat.value -= 1;
            }
        }

        // Función para finalizar la compra
        async function finalitzarCompra() {
            if (cart.datos) {
                const orders = cart.datos.map(producte => ({ //genero un nuevo array orders
                    product_id: producte.product.id,
                    quantity: producte.product.quantitat,
                    amount: producte.product.price * producte.product.quantitat
                }));

                const orderTotal = { //obj info gnral de la orden
                    user_id: 1,  // reemplazar "x" con el ID real del usuario 
                    totalAmount: preuTotal.total.toFixed(2) //total de la compra ejem:45,9
                };

                const orderData = { orders, orderTotal }; //obj q se enviará la servidor

                if (postOrder(orderData)) {
                    orders.forEach((prod) => {
                        let productoEncontrado = infoTotal.datos.find(p => p.id === prod.product_id);
                        productoEncontrado.stock -= prod.quantity;
                    })
                    cart.datos = [];
                    totalCart.value = 0;
                    calcularTotal();
                    toggleCart();
                    toggleLandingProd();
                }
            } else {
                alert("La cistella està buida");
            }
        }

        async function buscarProd() {
            if(query.value.length >= 2){
                if(!searchVisible.value){
                    searchVisible.value = true;
                }
                await searchProd(query.value)
                .then(response => response.json())
                .then(data => queryProducts.value = data);
                // if(queryProducts.length != 0){
                //     queryProducts.forEach((prod)=>{
                //         console.log(prod.title);
                //     });
                // }else{
                //     console.log("No s'ha trobat cap producte");
                // }
            }else{
                searchVisible.value = false;
            }
        }

        return {
            infoTotal,
            toggleCart,
            addCart,
            calcularTotal,
            eliminarProducte,
            preuTotal,
            totalCart,
            cart,
            cartVisible,
            productVisible,
            landingVisible,
            prodActual,
            mostrarProd,
            quantitat,
            decrement,
            increment,
            toggleLandingProd,
            finalitzarCompra,
            buscarProd,
            query,
            searchVisible,
            queryProducts,
            toggleSearch,
            searchInputVisible,
        };
    }
}).mount('#appVue');
