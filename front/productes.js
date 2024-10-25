import { createApp, ref, onBeforeMount, reactive } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { getProducts } from './communicationManager.js';

createApp({
    setup() {
        const infoTotal = reactive({ datos: [] });
        let cart = reactive({ datos: [] });
        let preuTotal = reactive({ total: 0 });
        let totalCart = ref(0);

        const productosVisible = ref(false);
        const sloganVisible = ref(true);
        let cartVisible = ref(false); // Controla la visibilidad del carrito

        // Cargar los productos
        onBeforeMount(async () => {
            try {
                const data = await getProducts();
                infoTotal.datos = data;
            } catch (error) {
                console.error("Error al carregar els productes:", error);
            }
            calcularTotal();
        });

        // Función para mostrar productos
        function mostrarProductos() {
            productosVisible.value = true;
            sloganVisible.value = false;
            cartVisible.value = false; 
        }

        // Alternar visibilidad del carrito
        function toggleCart() {
            cartVisible.value = !cartVisible.value;
        }

        // Tornar a l'inici
        function volverAlInicio() {
            productosVisible.value = false;
            sloganVisible.value = true;
            cartVisible.value = false; 
        }

        // Añadir producto al carret
        function addCart(productId) {
            const product = infoTotal.datos.find(p => p.id === productId);
            if (product && product.stock > 0) {
                const existingProduct = cart.datos.find(p => p.product.id === product.id);
                if (existingProduct) {
                    existingProduct.product.quantitat += 1;
                } else {
                    cart.datos.push({ product: { ...product, quantitat: 1 } });
                }
                totalCart.value += 1;
                product.stock -= 1;
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
                totalCart.value -= cart.datos[index].product.quantitat;
                cart.datos.splice(index, 1);
                calcularTotal();
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
            mostrarProductos,
            toggleCart,
            volverAlInicio,
            addCart,
            calcularTotal,
            eliminarProducte,
            preuTotal,
            totalCart,
            cart,
            cartVisible,
            productosVisible,
            sloganVisible,
            finalitzarCompra 
        };
    }
}).mount('#appVue');
