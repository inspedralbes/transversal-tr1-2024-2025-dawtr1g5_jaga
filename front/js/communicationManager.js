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
    // try {
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
            return true;
        } else {
            console.error("Error al crear la orden:", response.statusText);
            alert("Error al crear la orden. Inténtalo de nuevo.");
            return false;
        }
    // } catch (error) {
    //     console.error("error:", error);
    //     alert("Error de red");
    //     return false;
    // }
}

export async function searchProd(query){
    const URL = "http://127.0.0.1:8000/api/productsearch?query="+query;
    const response = await fetch(URL);
    return response;
}

export async function getMyOrders(user_id){
    const response = await fetch("http://127.0.0.1:8000/api/myOrders?id="+user_id); //CAMBIAR USER_ID POR TOKEN AUTH
    return response.json();
}