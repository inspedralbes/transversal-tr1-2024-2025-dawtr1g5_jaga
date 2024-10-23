import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
    setup() {
        const productes = ref([]); 

        fetch(`http://127.0.0.1:8000/api/products`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(info => {
                productes.value = info; 
                console.log(productes.value);
            })
            .catch(error => {
                console.error('Error loading products:', error);
            });

        return {
            productes 
        };
    }
}).mount('#appVue');

/*function mostrarCarret(productes) {
    let htmlString = `<div class="cartHead">
                        <h1>CART</h1>
                      </div>
                      <div class="cartBody">`;  
    productes.sort(() => Math.random() - 0.5);
    for (let index = 0; index < productes.length; index++) {
        let product = productes[index];
        htmlString += `<div class="productItem">
                           <img src="${product.image}">
                           <h4>${product.title}</h4>
                           <div class="butons">
                               <input type="button" value="-">
                               <input type="text" id="macarrons" name="id1" min=0 max=9>
                               <input type="button" value="+">
                           </div>
                           <p class="productPrice">€${product.price.toFixed(2)}</p>
                           <p class="remove">&#10060;</p>
                       </div>`;
    }
    htmlString += `</div>`;
    document.getElementById('cartContainer').innerHTML = htmlString;
}*/

