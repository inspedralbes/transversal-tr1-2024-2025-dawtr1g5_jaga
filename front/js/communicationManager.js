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

export async function postOrder(orderData, token) {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/createOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Incluir el token en la cabecera
            },
            body: JSON.stringify(orderData),
        });

        if (response.ok) {
            const result = await response.json();
            console.log("Orden creada con éxito:", result);
            return true; // Retornar true si la orden fue creada exitosamente
        } else {
            const errorData = await response.json();
            console.error("Error al crear la orden:", errorData.message);
            alert("Error al crear la orden: " + errorData.message);
            return false; // Retornar false si hubo un error
        }
    } catch (error) {
        console.error("Error de red:", error);
        alert("Error de red al intentar crear la orden.");
        return false; // Retornar false en caso de error
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
            console.log("Usuario registrado exitosamente:", result);
            if (result.token) {
                localStorage.setItem('token', result.token);
                console.log("Token almacenado:", result.token);
            } else {
                console.error("El token no está definido en la respuesta");
            }
            
            // Mostrar el contenido de localStorage
            console.log("Contenido de localStorage:", localStorage);

            return true; 
        } else {
            const errorBody = await response.text();
            console.error("Error en el registro:", errorBody);
            alert("Error en el registro. Respuesta del servidor: " + errorBody);
            return false; 
        }
    } catch (error) {
        console.error("Error de red:", error);
        alert("Error de red. No se pudo completar el registro.");
        return false; 
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

            // Almacenar el token en localStorage
            if (result.token) {
                localStorage.setItem('token', result.token);
                console.log("Token almacenado:", result.token);
            } else {
                console.error("El token no está definido en la respuesta");
            }
            
            // Mostrar el contenido de localStorage
            console.log("Contenido de localStorage:", localStorage);

            return true;
        } else {
            const errorData = await response.json();
            console.error("Error en el inicio de sesión:", errorData.message);
            alert(errorData.message || "Error en el inicio de sesión");
            return false;
        }
    } catch (error) {
        console.error("Error de red:", error);
        alert("Error de red. No se pudo completar el inicio de sesión.");
        return false;
    }
}

export async function logoutUser() {
    const URL = "http://127.0.0.1:8000/api/logout"; 
    try {
        // Obtenemos el token del localStorage
        const token = localStorage.getItem('token');

        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Incluir el token en el header para la autenticación
                "Authorization": `Bearer ${token}`
            },
        });

        if (response.ok) {
            console.log("Cierre de sesión exitoso");
            // Eliminar el token del localStorage
            localStorage.removeItem('token');
            return true; 
        } else {
            const errorData = await response.json();
            console.error("Error en el cierre de sesión:", errorData.message);
            alert(errorData.message || "Error en el cierre de sesión");
            return false; 
        }
    } catch (error) {
        console.error("Error de red:", error);
        alert("Error de red");
        return false; 
    }
}




export async function searchProd(query){
    const URL = "http://127.0.0.1:8000/api/productsearch?query="+query;
    const response = await fetch(URL);
    return response;
}