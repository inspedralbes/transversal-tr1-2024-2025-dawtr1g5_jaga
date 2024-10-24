import { createApp, reactive, onBeforeMount } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { getProducts } from './communicationManager.js';

createApp({
    setup() {
        const productes =  reactive({datos:[]})
        let preuTotal  = reactive({ total: 0 });
        
        onBeforeMount(async () => {
            const data = await getProducts();
            console.log(data);
            
            productes.datos = data;

            // Calcular el preu total de tots els productes dins del carret
            for (let index = 0; index < productes.datos.length; index++) {
                preuTotal.total += productes.datos[index].price;
                //console.log(productes.datos[index].price);
                console.log(preuTotal.total)
            }
        })

        /*function increment(producte) {
            cantitat ++;
        }

        function increment(producte) {
            cantitat --;
        }*/

        return {
            productes, preuTotal
        };
    }
}).mount('#appVue');