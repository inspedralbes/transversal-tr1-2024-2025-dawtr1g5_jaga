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
