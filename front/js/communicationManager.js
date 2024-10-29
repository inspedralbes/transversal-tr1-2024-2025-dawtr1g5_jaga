export async function getProducts() {
    const URL = `http://tr1g5.daw.inspedralbes.cat/public/api/products`;
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

export async function registerUser(userData) {
    const URL = "http://127.0.0.1:8000/api/register"; 
    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            const result = await response.json();
            return true; // Indica éxito
        } else {
            const error = await response.json();
            console.error("Error en el registro:", error);
            return false; // Indica fallo
        }
    } catch (error) {
        console.error("Error de red:", error);
        return false; // Indica fallo
    }
}


export async function loginUser(userData) {
    const URL = "http://127.0.0.1:8000/api/login"; 
    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            const result = await response.json();
            console.log("Inicio de sesión exitoso:", result);
            return result;
        } else {
            const errorData = await response.json();
            console.error("Error en el inicio de sesión:", errorData.message);
            alert(errorData.message || "Error en el inicio de sesión");
            return null; 
        }
    } catch (error) {
        console.error("Error de red:", error);
        alert("Error de red");
        return null; 
    }
}
