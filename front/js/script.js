import { createApp, reactive, onBeforeMount } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { getProducts } from './communicationManager.js';

createApp({
    setup() {
        const productes =  reactive({datos:[]})
        let preuTotal  = reactive({ total: 0 });

        let order = {
            orders: [],
            orderTotal: {
                user_id: null,
                totalAmount: 0
            }
        };
        
        onBeforeMount(async () => {
            const data = await getProducts();
            console.log(data);
            
            productes.datos = data;

            // Calcular el preu total de tots els productes dins del carret
            for (let index = 0; index < productes.datos.length; index++) {
                let prod_id = productes.datos[index].id;
                let prod_quant = productes.datos[index].quantity;
                let prod_price = productes.datos[index].price;

                order.orders.push({
                    product_id: prod_id,
                    quantity: 1,
                    amount: (prod_price)*1,
                });

                order.orderTotal.totalAmount += order.orders[index].amount;

            }
            console.log(order);
        });
        

        return {
            productes, preuTotal, order
        };
    }
}).mount('#appVue');