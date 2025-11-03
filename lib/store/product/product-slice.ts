import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductData, IProductSliceState } from "./product-slice-type";
import { Status } from "@/lib/global/type";
import { AppDispatch } from "../store";
import APIWITHTOKEN from "@/lib/http/APIWithToken";
import API from "@/lib/http/API";

const initialState:IProductSliceState = {
    product:null,
    allProducts:[],
    categoryProducts: {},
    status:Status.IDLE
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProduct(state:IProductSliceState, action:PayloadAction<IProductData>){
            state.product = action.payload;
        },
    
        setAllProducts(state: IProductSliceState, action: PayloadAction<IProductData[]>) {
            state.allProducts = action.payload;
        },

        setStatus(state:IProductSliceState, action:PayloadAction<Status>){
            state.status = action.payload;
        },
                setCategoryProducts(state,action: PayloadAction<{ category: string; products: IProductData[] }>) {
            state.categoryProducts[action.payload.category] = action.payload.products;
        }
    }
})
export const { setProduct, setStatus,setCategoryProducts,setAllProducts } = productSlice.actions;
export default productSlice.reducer;

//fetch all products
export function fetchAllProducts() {
    return async function fetchAllProductsThunk(dispatch: AppDispatch) {
        dispatch(setStatus(Status.LOADING));
        try {
            const response=await APIWITHTOKEN.get("product");
            if(response.status===200){
                dispatch(setAllProducts(response.data.products));
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

//fetch products by category
export function fetchProductsByCategory(category: string) {
  return async function fetchProductsByCategoryThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));

    try {
      const response = await API.get(`product/category/${category}`);
      if (response.status === 200) {
        dispatch(setCategoryProducts({ category, products: response.data.data }));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}