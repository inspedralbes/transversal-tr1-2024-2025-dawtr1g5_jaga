export async function getProducts() {
    const URL = `http://127.0.0.1:8000/api/products`;
    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error("Error");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al carregar els productes:", error);
        return []; 
    }
}

export async function postOrder(orderData){
    try {
        const response = await fetch("http://127.0.0.1:8000/api/createOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        });

        if (response.ok) {
            const result = await response.json();
            console.log("Ordre creada amb èxit:", result);
        } else {
            console.error("Error al crear la orden:", response.statusText);
            alert("Error al crear la orden. Inténtalo de nuevo.");
        }
    } catch (error) {
        console.error("error:", error);
        alert("Error de red");
    }
}

// export async function updateStock(X, idProd){
//     try {
//         const response = await fetch("http://tr1g5.daw.inspedralbes.cat/public/api/updateStock/"+idProd, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(X),
//         });

//         if (response.ok) {
//             const result = await response.json();
//             console.log("Stock actualitzat amb èxit:", result);
//         } else {
//             console.error("Error al actualizar el stock:", response.statusText);
//             alert("Error al actualizar el stock.");
//         }
//     } catch (error) {
//         console.error("error:", error);
//         alert("Error");
//     }
// }