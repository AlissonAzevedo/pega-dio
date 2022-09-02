import api from "../api/api"

export async function getAllproducts(){
    const response = await api.get("/products")
    return response.data;
}

export async function getProductbyId(id){
    const response = await api.get("/products/"+id)
    return response.data;
}

export async function getCategoryNameByid(id){
    const response = await api.get("/category/"+id)
    return response.data.name;
}