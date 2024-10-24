import { createApp, reactive, onBeforeMount, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { getProducts } from './communicationManager.js';

createApp({
    setup() {
        const productes =  reactive({datos:[]});
        let preuTotal  = reactive({ total: 0 });
        let nProductes = ref(0);

        onBeforeMount(async () => {
            const data = await getProducts();
            //console.log(data);
            
            productes.datos = data;

            // Calcular el preu total de tots els productes dins del carret
            for (let index = 0; index < productes.datos.length; index++) {
                productes.datos[index].quantitat = 1;
                nProductes.value ++;
                //preuTotal.total += productes.datos[index].price;
                //console.log(productes.datos[index].price);
                console.log(preuTotal.total)
            }
            calcularTotal();
        })
        
        function calcularTotal() {
            preuTotal.total = 0;
            productes.datos.forEach(producte => {
                preuTotal.total += producte.price * producte.quantitat;
            });
        }

        function eliminarProducte(producteToRemove) {
            const index = productes.datos.indexOf(producteToRemove);
            if (index !== -1) {
                productes.datos.splice(index, 1);
                nProductes.value--;
                calcularTotal(); 
            }
        }
        
        return {
            productes, preuTotal, calcularTotal, nProductes, eliminarProducte
        };
    }
}).mount('#appVue');