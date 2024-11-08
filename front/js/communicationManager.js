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

export async function getCategories() {
    const URL = `http://127.0.0.1:8000/api/categories`;
    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error("Error");
        }
        const categories = await response.json();
        return categories;
    } catch (error) {
        console.error("Error al carregar les categories:", error);
        return []; 
    }
}

export async function getCategoryProducts(categ) {
    const URL = `http://127.0.0.1:8000/api/productsCateg/${categ.id}`;
    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error("Error");
        }
        const categoryProducts = await response.json();
        return categoryProducts;
    } catch (error) {
        console.error("Error al carregar los productos de la categoria" + categ.category + " :", error);
        return [];
    }
}

let aux;

export async function postOrder(orderData){
    // try {
        const token = localStorage.getItem('token');
        const response = await fetch("http://127.0.0.1:8000/api/createOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
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

export async function getMyOrders(user_id){
    const response = await fetch("http://127.0.0.1:8000/api/myOrders?id="+user_id); //CAMBIAR USER_ID POR TOKEN AUTH
    return response.json();
}