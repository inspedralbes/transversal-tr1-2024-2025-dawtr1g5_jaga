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
    let htmlString = '';
    for (let index = 0; index < productes.length; index++) {
        let product = productes;
        htmlString += `<h1>${productes}</h1><br>`;
    }
    document.getElementById('cartContainer').innerHTML = htmlString;
}