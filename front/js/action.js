import { createApp, ref, computed, onBeforeMount, reactive } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { getProducts, postOrder, searchProd, getMyOrders, registerUser, loginUser, logoutUser, getCategories, getCategoryProducts, getUserInfo } from './communicationManager.js';

createApp({
    setup() {
        const infoTotal = reactive({ datos: [] });
        const myOrders = reactive({ datos: [] });
        const user = reactive({ datos: [] });
        let productosAleatorios = ref('');
        let productosFiltrados = ref('');
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
        let MyOrdersVisible = ref(false);
        let isLogged = ref(false);

        const loginEmail = ref('');
        const loginPassword = ref('');
        let quiSomVisible = ref(false);

        const categories = reactive({ datos: [] });
        let categVisible = ref(false);
        let categoriesVisible = ref(false);
        let products = ref(true);
        let regVisible = ref(false);

        let productsCategory = reactive({ datos: [] });
        let productsCategVisible = ref(false);
        let categSeleccionada = ref('');
        let productoActualId = ref('');

        let juegosSimilaresVisible = ref(false);

        let itemsPerPage = ref(8);
        let itemsPerPageCateg = ref(9);
        let currentPage = ref(1);

        let mesProductes = ref([]);

        let adminLoginVisible = ref(false);

        // Cargar los productos
        onBeforeMount(async () => {
            try {
                const data = await getProducts();
                infoTotal.datos = data;

                productosFiltrados.value = productosMasVendidos();

                if (localStorage.getItem('token')) {
                    const orders = await getMyOrders();
                    myOrders.datos = orders;
                    localStorage.removeItem('token');
                }
                const dataCateg = await getCategories();
                categories.datos = dataCateg;
            } catch {
                console.error("Error al carregar els productes");
            }
            // calcularTotal();
        });

        const totalPages = () => {
            const pages = infoTotal.datos.length / itemsPerPage.value;
            return pages === parseInt(pages) ? pages : parseInt(pages) + 1;
        };

        const paginatedProducts = () => {
            const start = (currentPage.value - 1) * itemsPerPage.value;
            const end = start + itemsPerPage.value;
            return infoTotal.datos.slice(start, end);
        };

        const nextPage = () => {
            if (currentPage.value < totalPages()) {
                currentPage.value++;
            }
        };

        const prevPage = () => {
            if (currentPage.value > 1) {
                currentPage.value--;
            }
        };

        const totalPagesCateg = () => {
            const pages = categories.datos.length / itemsPerPageCateg.value;
            return pages === parseInt(pages) ? pages : parseInt(pages) + 1;
        };

        const paginatedCategories = () => {
            const start = (currentPage.value - 1) * itemsPerPageCateg.value;
            const end = start + itemsPerPageCateg.value;
            return categories.datos.slice(start, end);
        };

        const nextPageCateg = () => {
            if (currentPage.value < totalPagesCateg()) {
                currentPage.value++;
            }
        };

        const totalPagesProductCategory = () => {
            const pages = productsCategory.datos.length / itemsPerPage.value;
            return pages === parseInt(pages) ? pages : parseInt(pages) + 1;
        };

        const paginatedProductsCategories = () => {
            const start = (currentPage.value - 1) * itemsPerPage.value;
            const end = start + itemsPerPage.value;
            return productsCategory.datos.slice(start, end);
        };

        const nextPageProdCateg = () => {
            if (currentPage.value < totalPagesProductCategory()) {
                currentPage.value++;
            }
        };

        function reiniciarVisible() {
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
            categVisible.value = false;
            adminLoginVisible.value = false;
        }

        function productosMasVendidos() {
            console.log(infoTotal);
            let aux = infoTotal;
            return aux.datos.filter(producto => producto.stock < 8);
        }

        function productosRandom() {
            let aux = JSON.parse(JSON.stringify(infoTotal.datos));
            console.log(aux);
            return aux.sort(() => Math.random() - 0.5).slice(0, 15);
        };

        async function showProducts(categ) {
            if (categoriesVisible.value) {
                categVisible.value = true;
                productsCategVisible.value = true;
            }
            currentPage.value = 1;
            categSeleccionada.value = categ.category;
            try {
                const data = await getCategoryProducts(categ);
                productsCategory.datos = data;
            } catch (error) {
                console.error("Error al carregar els productes de la categoria:", error);
            }
            categoriesVisible.value = false;
        }

        function toggleInici() {
            reiniciarVisible();
            currentPage.value = 1;
            document.getElementById('menu_burger').checked = false;
        }

        function toggleCategories() {
            reiniciarVisible();
            categoriesVisible.value = true;
            categVisible.value = true;
            juegosSimilaresVisible.value = false;
            landingVisible.value = false;
            products.value = false;
            registerLoginVisible.value = false;
            currentPage.value = 1;
            document.getElementById('menu_burger').checked = false;
        }

        function toggleQuiSom() {
            quiSomVisible.value = true;
            landingVisible.value = false;
            adminLoginVisible.value = false;
            categoriesVisible.value = false;
            document.getElementById('menu_burger').checked = false;
        }

        function toggleAdmin() {
            adminLoginVisible.value = true;
            landingVisible.value = false;
            products.value = false;
            categoriesVisible.value = false;
            quiSomVisible.value = false;
            document.getElementById('menu_burger').checked = false;
        }

        function toggleLoginRegister() {
            registerLoginVisible.value = true;
            landingVisible.value = false;
            products.value = false;
            checkoutVisible.value = false;
            categoriesVisible.value = false;
            document.getElementById('menu_burger').checked = false;
        }

        async function toggleLogout() {
            try {
                const success = await logoutUser();
                if (success) {
                    alert("Has cerrado sesión correctamente.");
                    isLogged.value = false;
                    cart.datos = [];
                    myOrders.datos = '';
                    totalCart.value = 0;
                }
            } catch (error) {
                console.error("Error en la solicitud de logout:", error);
                alert("Error de red al intentar cerrar sesión.");
            }
            document.getElementById('menu_burger').checked = false;
        }

        function toggleCart() {
            cartVisible.value = !cartVisible.value;
        }

        function toggleMyOrders() {
            MyOrdersVisible.value = !MyOrdersVisible.value;
            if (MyOrdersVisible.value) {
                products.value = false;
            } else {
                products.value = true;
            }
            document.getElementById('menu_burger').checked = false;
        }

        function mostrarProd(productId) {
            productVisible.value = false;
            productoActualId.value = productId;
            productosAleatorios.value = productosRandom();

            // Mostrar los productos/datos dentro de Categoria
            if (productsCategVisible.value) {
                juegosSimilaresVisible.value = true;
            }

            if (!productVisible.value) {
                landingVisible.value = false; // imagen portada
                products.value = false;
                categoriesVisible.value = false;
                productsCategVisible.value = false;
                productVisible.value = true;

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

        function toggleMenu() {
            searchInputVisible.value = false;
        }

        function toggleRegLog() {
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

        function calcularTotal() {
            preuTotal.total = 0;
            cart.datos.forEach(producte => {
                preuTotal.total += producte.product.price * producte.product.quantitat;
            });
        }

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

        async function finalitzarCompra() {
            orderId.value = generarUUID();
            barcodeOrder.value = 'https://barcode.tec-it.com/barcode.ashx?data=' + orderId.value + '&code=Code128&translate-esc=on';

            if (cart.datos.length > 0) {
                const orders = cart.datos.map(producte => ({ //genero un nuevo array orders
                    product_id: producte.product.id,
                    quantity: producte.product.quantitat,
                    amount: producte.product.price * producte.product.quantitat
                }));

                const orderTotal = { //obj info gnral de la orden
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
                    if (localStorage.getItem('token')) {
                        myOrders.datos = await getMyOrders();
                    }

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
                    landingVisible.value = false;
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
            } else {
                searchVisible.value = false;
            }
        }

        async function register() {
            const userData = {
                name: document.querySelector('input[name="txt"]').value,
                email: document.querySelector('input[name="email"]').value,
                password: document.querySelector('input[name="pswd"]').value,
                phone: document.querySelector('input[name="phone"]').value
            };

            try {
                const success = await registerUser(userData);
                if (success) {
                    // alert("Registro exitoso");
                    loginEmail.value = '';
                    loginPassword.value = '';
                    regVisible.value = !regVisible.value;

                    document.querySelector('input[name="txt"]').value = '';
                    document.querySelector('input[name="email"]').value = '';
                    document.querySelector('input[name="pswd"]').value = '';
                    document.querySelector('input[name="phone"]').value = '';
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
                    // alert("Inicio de sesión exitoso");
                    reiniciarVisible();

                    loginEmail.value = '';
                    loginPassword.value = '';

                    isLogged.value = true;
                    myOrders.datos = await getMyOrders();
                    user.datos = await getUserInfo();
                } else {
                    alert("Usuario o contraseña incorrectos.");
                }
            } catch (error) {
                console.error("Error en el inicio de sesión:", error);
                alert("Error inesperado en el inicio de sesión.");
            }
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
            isLogged,
            quiSomVisible,
            toggleQuiSom,
            toggleMyOrders,
            MyOrdersVisible,
            myOrders,
            categories,
            toggleCategories,
            categoriesVisible,
            toggleInici,
            toggleAdmin,
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
            prevPage,
            totalPagesCateg,
            paginatedCategories,
            itemsPerPageCateg,
            nextPageCateg,
            totalPagesProductCategory,
            paginatedProductsCategories,
            nextPageProdCateg,
            categVisible,
            productosAleatorios,
            adminLoginVisible,
            user,
            productosFiltrados,
        };
    }
}).mount('#appVue');
