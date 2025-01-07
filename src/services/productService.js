import { get } from "../utils/request"
import { delAuth } from "../utils/requestAuth";
import { postAuthFD, putAuthFD } from "../utils/requestFD";
export const getAllProducts = async()=>{
    const result = await get('products')
    return result;
}
export const deleteAProduct = async(id)=>{
    const result = await delAuth(`products/${id}`)
    return result
}
export const addAProduct = async(data)=>{
    const result = await postAuthFD('products',data)
    return result
}
export const updateAProduct = async(id,data)=>{
    const result = await putAuthFD(`products/${id}`,data)
    return result
}