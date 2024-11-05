import { createApp, ref, onBeforeMount, reactive } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { getProducts, getCategories, postOrder, registerUser, loginUser } from './communicationManager.js';

createApp({
    setup() {
        const infoTotal = reactive({ datos: [] });
        const categories = reactive({ datos: [] });
        let cart = reactive({ datos: [] });
        let preuTotal = reactive({ total: 0 });
        let prodActual = reactive({ datos: [] });
        let totalCart = ref(0);
        let quantitat = ref(1);

        let cartVisible = ref(false); // Controla la visibilidad del carrito
        let registerLoginVisible = ref(false); // Controla la visibilidad del register/login
        let productVisible = ref(false);
        let landingVisible = ref(true);

        // Cargar los productos
        onBeforeMount(async () => {
            try {
                const data = await getProducts();
                const dataCateg = await getCategories();
                infoTotal.datos = data;
                categories.datos = dataCateg;
                console.log(infoTotal);
                console.log(categories);
            } catch (error) {
                console.error("Error al carregar les dades del JSON", error);
            }
        });

        // Alternar visibilidad del carrito
        function toggleCart() {
            cartVisible.value = !cartVisible.value;
        }

        // Alternar visibilidad del login/register
        function toggleLoginRegister() {
            registerLoginVisible.value = !registerLoginVisible.value;
            landingVisible.value = !landingVisible.value;
            document.getElementById('menu_burger').checked = false;
        }

        function toggleLandingProd() {
            landingVisible.value = !landingVisible.value;
            productVisible.value = !productVisible.value;
            quantitat.value = 1;
        }

        function toggleInici() {
            registerLoginVisible.value = false;
            landingVisible.value = true;
            document.getElementById('menu_burger').checked = false;
        }

        // Mostrar pantalla de información del producto
        function mostrarProd(productId) {
            toggleLandingProd();
            prodActual.datos = infoTotal.datos.find(p => p.id === productId);
        }

        // Añadir producto al carrito
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
            const orders = cart.datos.map(producte => ({
                product_id: producte.product.id,
                quantity: producte.product.quantitat,
                amount: producte.product.price * producte.product.quantitat
            }));

            const orderTotal = {
                user_id: 1,  // reemplazar "x" con el ID real del usuario 
                totalAmount: preuTotal.total.toFixed(2)
            };

            const orderData = { orders, orderTotal };
            
            if (await postOrder(orderData)) {
                cart.datos = [];
                totalCart.value = 0;
                calcularTotal();
            }
        }

        async function register() {
            const userData = {
                name: document.querySelector('input[name="txt"]').value,
                email: document.querySelector('input[name="email"]').value,
                password: document.querySelector('input[name="pswd"]').value,
            };
        
            try {
                const success = await registerUser(userData);
                if (success) {
                    alert("Registro exitoso");
                    registerLoginVisible.value = false;
                    // Limpiar campos de entrada
                    document.querySelector('input[name="txt"]').value = '';
                    document.querySelector('input[name="email"]').value = '';
                    document.querySelector('input[name="pswd"]').value = '';
                } else {
                    alert("Error en el registro");
                }
            } catch (error) {
                alert("Error en el registro: " + error.message);
            }
        }
        
        async function login() {
            const userData = {
                email: document.querySelector('input[name="email"]').value,
                password: document.querySelector('input[name="pswd"]').value
            };
        
            try {
                const success = await loginUser(userData);
                if (success) {
                    alert("Inicio de sesión exitoso");
                    registerLoginVisible.value = false;
                    // Limpiar campos de entrada
                    document.querySelector('input[name="email"]').value = '';
                    document.querySelector('input[name="pswd"]').value = '';
                } else {
                    alert("Error en el inicio de sesión");
                }
            } catch (error) {
                alert("Error en el inicio de sesión: " + error.message);
            }
        }

        return {
            toggleCart,
            toggleLoginRegister,
            finalitzarCompra,
            addCart,
            increment,
            decrement,
            eliminarProducte,
            toggleLandingProd,
            productVisible,
            landingVisible,
            quantitat,
            totalCart,
            preuTotal,
            cart,
            infoTotal,
            registerLoginVisible,
            register,
            login,
            mostrarProd,
            toggleInici,
            categories,
            cartVisible,
            prodActual
        };
    }
}).mount('#appVue');
