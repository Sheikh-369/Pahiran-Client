import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAdminProductData, IAdminProductSliceState } from "./product-slice-type";
import { Status } from "@/lib/global/type";
import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/http/APIWithToken";
import API from "@/lib/http/API";

const initialState:IAdminProductSliceState={
    product:[],
    status:Status.IDLE
}

const adminProductSlice=createSlice({
    name:"adminProduct",
    initialState,
    reducers:{
        setProduct(state:IAdminProductSliceState,action:PayloadAction<IAdminProductData[]>){
            state.product=action.payload
        },

        setStatus(state:IAdminProductSliceState,action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

export const {setProduct,setStatus}=adminProductSlice.actions
export default adminProductSlice.reducer

//fetch all products for admin
export function fetchAllAdminProducts(){
    return async function fetchAllAdminProductsThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.get(`product`)
            if(response.status===200){
                dispatch(setProduct(response.data.products))
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}

//fetch single product by id for admin
export function fetchAdminProductById(id:string){
    return async function fetchAdminProductByIdThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.get(`product/${id}`)
            if(response.status===200){
                dispatch(setProduct(response.data.product))
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}
//create new product
export function createAdminProduct(productData:IAdminProductData){
    return async function createAdminProductThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await API.post(`product`,productData,{
                headers:{"Content-Type":"multipart/form-data"}
            })
            if(response.status===200 || response.status===201){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(fetchAllAdminProducts())
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}

//update product by id
export function updateAdminProduct(id:string,productData:IAdminProductData){
    return async function updateAdminProductThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.patch(`product/${id}`,productData,{
                headers:{"Content-Type":"multipart/form-data"}
            })
            if(response.status===200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(fetchAllAdminProducts())
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}

//delete product by id
export function deleteAdminProduct(id:string){
    return async function deleteAdminProductThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.delete(`product/${id}`)
            if(response.status===200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(fetchAllAdminProducts())
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}
