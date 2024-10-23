export async function getProducts(){
    const URL = `https://fakestoreapi.com/products/`
    const response = await fetch(URL);
    const data = await response.json();
    return data;
}