export async function getProducts(){
    const URL = `http://127.0.0.1:8000/api/products`
    const response = await fetch(URL);
    const data = await response.json();
    return data;
}