import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductData, IProductSliceState } from "./product-slice-type";
import { Status } from "@/lib/global/type";
import { AppDispatch } from "../store";
import APIWITHTOKEN from "@/lib/http/APIWithToken";

const initialState:IProductSliceState = {
    product: null,
    status:Status.IDLE
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProduct(state:IProductSliceState, action:PayloadAction<IProductData>){
            state.product = action.payload;
        },
        setStatus(state:IProductSliceState, action:PayloadAction<Status>){
            state.status = action.payload;
        }
    }
})
export const { setProduct, setStatus } = productSlice.actions;
export default productSlice.reducer;

//fetch all products
export function fetchAllProducts() {
    return async function fetchAllProductsThunk(dispatch: AppDispatch) {
        dispatch(setStatus(Status.LOADING));
        try {
            const response=await APIWITHTOKEN.get("product");
            if(response.status===200){
                dispatch(setProduct(response.data.product));
                dispatch(setStatus(Status.SUCCESS));
            }else{
                dispatch(setStatus(Status.ERROR));
            }
            
        } catch (error) {
            console.error("Error fetching products:", error);
            dispatch(setStatus(Status.ERROR));
        }
    }
}
//fetch single product by id
export function fetchProductById(id:string) {
    return async function fetchProductByIdThunk(dispatch: AppDispatch) {
        dispatch(setStatus(Status.LOADING));
        try {
            const response=await APIWITHTOKEN.get(`product/${id}`);
            if(response.status===200){
                dispatch(setProduct(response.data.product));
                dispatch(setStatus(Status.SUCCESS));
            }else{
                dispatch(setStatus(Status.ERROR));
            }

        } catch (error) {
            console.error("Error fetching product:", error);
            dispatch(setStatus(Status.ERROR));
        }
    }
}
//create new product
export function createProduct(productData:IProductData){
    return async function createProductThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING));
        try {
            const response=await APIWITHTOKEN.post("product", productData,{
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if(response.status===201){
                dispatch(setProduct(response.data.product));
                dispatch(setStatus(Status.SUCCESS));
                dispatch(fetchAllProducts()); //refresh product list
            }else{
                dispatch(setStatus(Status.ERROR));
            }

        } catch (error) {
            console.error("Error creating product:", error);
            dispatch(setStatus(Status.ERROR));
        }
    }
}
//update existing product
export function updateProduct(id:string, productData:IProductData){
    return async function updateProductThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING));
        try {
            const response=await APIWITHTOKEN.put(`product/${id}`, productData,{
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if(response.status===200){
                dispatch(setProduct(response.data.product));
                dispatch(setStatus(Status.SUCCESS));
                dispatch(fetchAllProducts()); //refresh product list
            }else{
                dispatch(setStatus(Status.ERROR));
            }

        } catch (error) {
            console.error("Error updating product:", error);
            dispatch(setStatus(Status.ERROR));
        }
    }
}
//delete product
export function deleteProduct(id:string){
    return async function deleteProductThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING));
        try {
            const response=await APIWITHTOKEN.delete(`product/${id}`);
            if(response.status===204){
                dispatch(setStatus(Status.SUCCESS));
                dispatch(fetchAllProducts()); //refresh product list
            }else{
                dispatch(setStatus(Status.ERROR));
            }

        } catch (error) {
            console.error("Error deleting product:", error);
            dispatch(setStatus(Status.ERROR));
        }
    }
}