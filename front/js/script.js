fetch(`http://127.0.0.1:8000/api/products`)
.then(response => response.json())
.then(info => {
    dadesProductes = info;
    console.log(dadesProductes);
    mostrarCarret(dadesProductes);
})
.catch(error => {
    console.error('Error al carregar els productes:', error);
});

function mostrarCarret(productes) {
    let htmlString = `<div class="cartHead">
                        <h1>CART</h1>
                        </div>
                      <div class="cartBody">`;

    productes.sort(() => Math.random() - 0.5);
    for (let index = 0; index < productes.length; index++) {
      let product = productes[index];
      htmlString += `<div class="productItem">
                       <img src = "" alt = " ">
                       <h4>${product.title}</h4>
                       <div class="butons">
                           <input type="button" value="-">
                           <input type="text" id="macarrons" name="id1" min=0 max=9>
                           <input type="button" value="+">
                       </div>
                       <p class="productPrice">€${product.price.toFixed(2)}</p>
                     </div>`;
    }
    
    htmlString += `</div>`;
    document.getElementById('cartContainer').innerHTML = htmlString;
  }

