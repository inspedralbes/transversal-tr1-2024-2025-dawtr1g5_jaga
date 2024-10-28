import { createApp, ref, onBeforeMount, reactive } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { getProducts } from './communicationManager.js';

createApp({
    setup() {
        const infoTotal = reactive({ datos: [] });
        let cart = reactive({ datos: [] });
        let preuTotal = reactive({ total: 0 });
        let prodActual = reactive({datos: []})
        let totalCart = ref(0);
        let quantitat = ref(1);

        let cartVisible = ref(false); // Controla la visibilidad del carrito
        let productVisible = ref(false);
        let landingVisible = ref(true);
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
        function mostrarProd(productId){
            toggleLandingProd();
            this.prodActual = infoTotal.datos.find(p => p.id === productId);
        }

        function toggleLandingProd(){
            landingVisible.value = !landingVisible.value;
            productVisible.value = !productVisible.value;
            quantitat.value = 1;
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
                //product.stock -= 1; CAMBIARLO PARA QUE SOLO RESTE AL MOMENTO DE PAGAR
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

        function increment(productId){
            const product = infoTotal.datos.find(p => p.id === productId);
            if(product){
                const stockActual = product.stock;
                let cartStock = cart.datos.find(p => p.product.id === productId);
                if(cartStock){
                    cartStock = cartStock.product.quantitat;
                }
                if(quantitat.value < stockActual){
                    if(cartStock){
                        if((quantitat.value + cartStock) < stockActual){
                            quantitat.value+=1;
                        }
                    }else{
                        quantitat.value+=1;
                    }
                }
            }
        }

        function decrement(){
            if(quantitat.value > 1){
                quantitat.value -= 1;
            }
        }

        // Función para finalizar la compra
        async function finalitzarCompra() {
            const orders = cart.datos.map(producte => ({ //genero un nuevo array orders
                product_id: producte.product.id,
                quantify: producte.product.quantitat,
                amount: producte.product.price * producte.product.quantitat
            }));

            const orderTotal = { //obj info gnral de la orden
                user_id: "x",  // reemplazar "x" con el ID real del usuario 
                totalAmount: preuTotal.total.toFixed(2) //total de la compra ejem:45,9
            };

            const orderData = { orders, orderTotal }; //obj q se enviará la servidor

            try {
                const response = await fetch("http://127.0.0.1:8000/api/createOrder", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(orderData),
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log("Ordre creada amb èxit:", result);
                    cart.datos = [];
                    totalCart.value = 0;
                    calcularTotal();
                } else {
                    console.error("Error al crear la orden:", response.statusText);
                    alert("Error al crear la orden. Inténtalo de nuevo.");
                }
            } catch (error) {
                console.error("error:", error);
                alert("Error de red");
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
            finalitzarCompra
        };
    }
}).mount('#appVue');
