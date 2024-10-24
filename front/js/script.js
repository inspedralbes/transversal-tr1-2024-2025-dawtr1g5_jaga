import { createApp, reactive, onBeforeMount, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { getProducts } from './communicationManager.js';

createApp({
    setup() {
        const infoTotal =  reactive({datos:[]});
        let preuTotal  = reactive({ total: 0 });
        let nInfoTotal = ref(0); 

        onBeforeMount(async () => {
            const data = await getProducts();
            console.log(data);
            
            infoTotal.datos = data;

            // Calcular el preu total de tots els infoTotal dins del carret
            for (let index = 0; index < infoTotal.datos.length; index++) {
                infoTotal.datos[index].quantitat = 1;
                nInfoTotal.value ++;
                //preuTotal.total += infoTotal.datos[index].price;
                //console.log(infoTotal.datos[index].price);
                console.log(preuTotal.total)
            }
            calcularTotal();
        })
        
        function calcularTotal() {
            preuTotal.total = 0;
            infoTotal.datos.forEach(producte => {
                preuTotal.total += producte.price * producte.quantitat;
            });
        }

        function eliminarProducte(producteToRemove) {
            const index = infoTotal.datos.indexOf(producteToRemove);
            if (index !== -1) {
                infoTotal.datos.splice(index, 1);
                nInfoTotal.value--;
                calcularTotal(); 
            }
        }
        
        return {
            infoTotal, preuTotal, calcularTotal, nInfoTotal, eliminarProducte
        };
    }
}).mount('#appVue');