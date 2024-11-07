import { createApp, ref, onBeforeMount, reactive } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { getProducts, postOrder, searchProd, orderId, registerUser, loginUser, logoutUser, getCategories, getCategoryProducts } from './communicationManager.js';

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

        let fullnameCustomer = ref('');
        let emailCustomer = ref('');
        let phoneCustomer = ref('');
        let isGift = ref(false);
        let orderId = ref('');
        let barcodeOrder = ref('');
        
        let cartVisible = ref(false); // Controla la visibilidad del carrito
        let productVisible = ref(false);
        let landingVisible = ref(true);
        let searchInputVisible = ref(false);
        let searchVisible = ref(false);
        let checkoutVisible = ref(false);
        let ticketVisible = ref(false);
        let preCheckoutVisible = ref(true);
        let postCheckoutVisible = ref(false);
        let registerLoginVisible = ref(false);
        const loginEmail = ref('');
        const loginPassword = ref('');
        let quiSomVisible = ref(false);

        const categories = reactive ({ datos: [] });
        let categoriesVisible = ref(false);
        let products = ref(true);
        let regVisible = ref(false);

        let productsCategory = reactive({ datos:[] });
        let productsCategVisible = ref(false);
        let categSeleccionada = ref('');
        let productoActualId = ref('');

        let juegosSimilaresVisible = ref(false);
        let itemsPerPage = ref(8);
        let currentPage = ref(1);

        // Cargar los productos
        onBeforeMount(async () => {
            try {
                const data = await getProducts();
                const dataCateg = await getCategories();
                infoTotal.datos = data;
                categories.datos = dataCateg;
            } catch (error) {
                console.error("Error al carregar els productes:", error);
            }
            // calcularTotal();
        });

        const totalPages = () => {
            return Math.ceil(infoTotal.datos.length / itemsPerPage.value);
        };
      
        // Función para obtener los productos de la página actual
        const paginatedProducts = () => {
            const start = (currentPage.value - 1) * itemsPerPage.value;
            const end = start + itemsPerPage.value;
            return infoTotal.datos.slice(start, end);
        };
    
        // Función para ir a la siguiente página
        const nextPage = () => {
            if (currentPage.value < totalPages()) {
                currentPage.value++;
            }
        };
    
        // Función para ir a la página anterior
        const prevPage = () => {
            if (currentPage.value > 1) {
                currentPage.value--;
            }
        };

        function reiniciarVisible () {
            cartVisible.value = false; // Controla la visibilidad del carrito
            productVisible.value = false;
            landingVisible.value = true;
            searchInputVisible.value = false;
            searchVisible.value = false;
            checkoutVisible.value = false;
            ticketVisible.value = false;
            preCheckoutVisible.value = false;
            postCheckoutVisible.value = false;
            registerLoginVisible.value = false;
            quiSomVisible.value = false;
            categoriesVisible.value = false;
            products.value = true;
            regVisible.value = false;
            productsCategVisible.value = false;
            juegosSimilaresVisible.value = false;
        }

        function productosMasVendidos () {
            console.log(infoTotal)
            return infoTotal.datos.filter(producto => producto.stock < 8);
        }

        async function showProducts (categ) {
            categSeleccionada.value = categ.category;
            productsCategVisible.value = !productsCategVisible.value;
            try {
                const data = await getCategoryProducts(categ);
                productsCategory.datos = data;
            } catch (error) {
                console.error("Error al carregar els productes de la categoria:", error);
            }
            categoriesVisible.value = false;
        }

        function toggleInici () {
            reiniciarVisible();
            document.getElementById('menu_burger').checked = false;
        }
        
        function toggleCategories() {
            categoriesVisible.value = true;
            landingVisible.value = false;
            products.value = false;
            registerLoginVisible.value = false;
            document.getElementById('menu_burger').checked = false;
        }
        
        function toggleQuiSom() {
            quiSomVisible.value = !quiSomVisible.value;  
            landingVisible.value = !landingVisible.value;
            document.getElementById('menu_burger').checked = false;
        }

        function toggleAdmin () {
            document.getElementById('menu_burger').checked = false;
        }

        function toggleLoginRegister() {
            registerLoginVisible.value = true;
            landingVisible.value = false;
            products.value = false;
            categoriesVisible.value = false;
            document.getElementById('menu_burger').checked = false;
        }

        async function toggleLogout() {
            try {
                const success = await logoutUser();
                if (success) {
                    alert("Has cerrado sesión correctamente.");
                }
            } catch (error) {
                console.error("Error en la solicitud de logout:", error);
                alert("Error de red al intentar cerrar sesión.");
            }
            document.getElementById('menu_burger').checked = false;
        }

        function toggleOrders () {
            document.getElementById('menu_burger').checked = false;
        }

        // Alternar visibilidad del carrito
        function toggleCart() {
            cartVisible.value = !cartVisible.value;
        }


        //Mostrar pantalla de información del producto
        function mostrarProd(productId) {
            productoActualId.value = productId;
            console.log(productId);
            if(productsCategVisible.value) {
                juegosSimilaresVisible.value = true;
            }

            if (!productVisible.value) {
                registerLoginVisible.value = false;
                landingVisible.value = false;
                products.value = false;
                categoriesVisible.value = false;
                productVisible.value = !productVisible.value;
                productsCategVisible.value = !productsCategVisible.value
                //toggleLandingProd();

            }
            if (searchInputVisible.value) {
                toggleSearch();
            }
            this.prodActual = infoTotal.datos.find(p => p.id === productId);
        }

        function toggleLandingProd() {
            reiniciarVisible();
            quantitat.value = 1;
        }


        function toggleMenu () {
            searchInputVisible.value = false;
        }

        function toggleRegLog () {
            regVisible.value = !regVisible.value;
        }

        function backToHome() {
            landingVisible.value = true;
            checkoutVisible.value = false;
            ticketVisible.value = false;
        }

        function toggleSearch() {
            searchInputVisible.value = !searchInputVisible.value;
            query.value = '';
            queryProducts.value = [];
        }

        function backToCart() {
            cartVisible.value = true;
            checkoutVisible.value = false;
            landingVisible.value = true;
        }

        function showCheckout() {
            if (cart.datos.length > 0) {
                cartVisible.value = false;
                landingVisible.value = false;
                productVisible.value = false;
                checkoutVisible.value = true;
            } else {
                alert("Cart is empty");
            }
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
            orderId.value = generarUUID();
            barcodeOrder.value = 'https://barcode.tec-it.com/barcode.ashx?data='+orderId.value+'&code=Code128&translate-esc=on';

            if (cart.datos.length > 0) {
                const orders = cart.datos.map(producte => ({ //genero un nuevo array orders
                    product_id: producte.product.id,
                    quantity: producte.product.quantitat,
                    amount: producte.product.price * producte.product.quantitat
                }));

                const orderTotal = { //obj info gnral de la orden
                    user_id: 1,  // reemplazar "x" con el ID real del usuario 
                    totalAmount: preuTotal.total.toFixed(2), //total de la compra ejem:45,9
                    fullname: fullnameCustomer.value,
                    email: emailCustomer.value,
                    phone: phoneCustomer.value,
                    gift: isGift.value,
                    uuid: orderId.value
                };

                const orderData = { orders, orderTotal }; //obj q se enviará la servidor

                if (postOrder(orderData)) {
                    orders.forEach((prod) => {
                        let productoEncontrado = infoTotal.datos.find(p => p.id === prod.product_id);
                        productoEncontrado.stock -= prod.quantity;
                    })

                    //Resetear todos los valores
                    cart.datos = [];
                    totalCart.value = 0;
                    calcularTotal();
                    fullnameCustomer.value = '';
                    emailCustomer.value = '';
                    phoneCustomer.value = '';
                    isGift.value = false;
                    cartVisible.value = false;
                    checkoutVisible.value = false;
                    landingVisible.value = false; //Para mostrar la pantalla del checkout mejor
                    ticketVisible.value = true;
                }
            } else {
                alert("La cistella està buida");
            }
        }

        function generarUUID() {
            const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let resultado = '';
            for (let i = 0; i < 8; i++) {
                const indice = Math.floor(Math.random() * caracteres.length);
                resultado += caracteres.charAt(indice);
            }

            return resultado;
        }        

        async function buscarProd() {
            if (query.value.length >= 2) {
                if (!searchVisible.value) {
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
            } else {
                searchVisible.value = false;
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
                    landingVisible.value = true; 

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
                email: loginEmail.value,
                password: loginPassword.value
            };
        
            try {
                const success = await loginUser(userData);
                if (success) {
                    alert("Inicio de sesión exitoso");
                    registerLoginVisible.value = false;
                    landingVisible.value = true;

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
                queryProducts.value = [];
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
            fullnameCustomer,
            emailCustomer,
            phoneCustomer,
            isGift,
            showCheckout,
            checkoutVisible,
            backToCart,
            ticketVisible,
            orderId,
            barcodeOrder,
            preCheckoutVisible,
            postCheckoutVisible,
            backToHome,
            toggleLoginRegister,
            registerLoginVisible,
            register,
            login,
            loginEmail, 
            loginPassword,
            toggleLogout,
            quiSomVisible,
            toggleQuiSom,
            categories,
            toggleCategories,
            categoriesVisible,
            toggleInici,
            toggleAdmin,
            toggleOrders,
            products,
            toggleMenu,
            regVisible,
            toggleRegLog,
            showProducts,
            productsCategVisible,
            categSeleccionada,
            productsCategory,
            productosMasVendidos,
            productoActualId,
            juegosSimilaresVisible,
            itemsPerPage,
            currentPage,
            totalPages,
            paginatedProducts,
            nextPage,
            prevPage
        };
    }
}).mount('#appVue');
