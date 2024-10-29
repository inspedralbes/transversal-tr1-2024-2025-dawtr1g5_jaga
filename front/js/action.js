import { createApp, ref, onBeforeMount, reactive } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { getProducts, postOrder, registerUser, loginUser } from './communicationManager.js';

createApp({
    setup() {
        // Declarar reactive y ref para manejar el estado del login
        const infoTotal = reactive({ datos: [] });
        let cart = reactive({ datos: [] });
        let preuTotal = reactive({ total: 0 });
        let prodActual = reactive({ datos: [] });
        let totalCart = ref(0);
        let quantitat = ref(1);

        let cartVisible = ref(false);
        let registerLoginVisible = ref(false);
        let productVisible = ref(false);
        let landingVisible = ref(true);

        // Refs para email y password del login
        const loginEmail = ref('');
        const loginPassword = ref('');

        // Cargar los productos
        onBeforeMount(async () => {
            try {
                const data = await getProducts();
                infoTotal.datos = data;
            } catch (error) {
                console.error("Error al cargar los productos:", error);
            }
        });

        // Alternar visibilidad del carrito
        function toggleCart() {
            cartVisible.value = !cartVisible.value;
        }

        // Mostrar pantalla de información del producto
        function mostrarProd(productId) {
            toggleLandingProd();
            prodActual.datos = infoTotal.datos.find(p => p.id === productId);
        }

        function toggleLandingProd() {
            landingVisible.value = !landingVisible.value;
            productVisible.value = !productVisible.value;
            quantitat.value = 1;
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

        // Alternar visibilidad del login/register
        function toggleLoginRegister() {
            registerLoginVisible.value = !registerLoginVisible.value;
            landingVisible.value = !landingVisible.value;
        }
        //Registre d'usuari
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
                    landingVisible.value = true; 
                    registerLoginVisible.value = false;

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
        //Fer Login
        async function login() {
            const userData = {
                email: loginEmail.value,
                password: loginPassword.value
            };
        
            try {
                const success = await loginUser(userData);
                if (success) {
                    alert("Inicio de sesión exitoso");
                    registerLoginVisible.value = false;
                    landingVisible.value = true; 
                    registerLoginVisible.value = false;

                    loginEmail.value = '';
                    loginPassword.value = '';
                } else {
                    alert("Usuario o contraseña incorrectos.");
                }
            } catch (error) {
                console.error("Error en el inicio de sesión:", error);
                alert("Error inesperado en el inicio de sesión.");
            }
        }

        async function logout() {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/logout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
        
                if (response.ok) {
                    const result = await response.json();
                    alert(result.message); 
                } else {
                    const error = await response.json();
                    alert("Error al cerrar sesión: " + error.message);
                }
            } catch (error) {
                console.error("Error en la solicitud de logout:", error);
                alert("Error de red al intentar cerrar sesión.");
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
            loginEmail, 
            loginPassword, 
            mostrarProd,
            logout
        };
    }
}).mount('#appVue');
