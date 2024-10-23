fetch(`products.json`)
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
    let htmlString = `<div class = "cartHead">
                        <h1>CART</h1>
                      </div>`;
    for (let index = 0; index < productes.length; index++) {
        let product = productes[index];
        htmlString += `<h4>${product.title}</h4>`;
    }
    htmlString += `</div>`;
    document.getElementById('cartContainer').innerHTML = htmlString;
}

