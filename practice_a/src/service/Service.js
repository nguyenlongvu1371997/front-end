import axios from "axios";

export async function getListProduct() {
    const res = await axios.get('http://localhost:8080/products');
    return res.data;
}

export async function getListProductAndSordByAmount() {
    const res = await axios.get('http://localhost:8080/products?_sort=amount');
    return res.data;
}

export async function getListProductByNameAndType(name, type) {
    const res = await axios.get(`http://localhost:8080/products?name_like=${name}&types.name_like=${type}&_sort=amount`);
    return res.data;
}

export async function deleteProductById(id) {
    await axios.delete('http://localhost:8080/products/' + id);
}

export async function getListTypeProduct() {
    const res = await axios.get('http://localhost:8080/types');
    return res.data;
}

export async function getProductById(id) {
    const res = await axios.get('http://localhost:8080/products/' + id);
    return res.data;
}

export async function editProduct(product) {
    await axios.put('http://localhost:8080/products/' + product.id, product);
}



