import {createApp, ref, onBeforeMount, reactive} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import {getProducts} from './communicationManager.js';

  createApp({
    setup() {

        let divActual = ref('portada');
        let totalCart = ref(0);
        
        const infoTotal =  reactive({datos:[]})
        onBeforeMount(async () => {
            const data = await getProducts();
            console.log(data);
            
            infoTotal.datos = data;
        })

        function mostrarDiv(divID){
            divActual.value = divID;
        }

        function mostrar(id){
            return id==divActual.value;
        }

        function addCart(id){
            this.totalCart += 1;
        }

        function removeCart(id){
            this.totalCart -= 1;
        }
        
        return{
            infoTotal, mostrar, mostrarDiv,
            addCart, removeCart, totalCart,
        };
    }
  }).mount('#appVue');