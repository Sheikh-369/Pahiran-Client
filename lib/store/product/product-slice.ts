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
    status:Status.IDLE,
    featured:[]
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
        },

        setFeaturedProducts(state, action: PayloadAction<IProductData[]>) {
          state.featured = action.payload;
        }
    }
})
export const { setProduct, setStatus,setCategoryProducts,setAllProducts,setFeaturedProducts } = productSlice.actions;
export default productSlice.reducer;

//fetch all products
export function fetchAllProducts() {
    return async function fetchAllProductsThunk(dispatch: AppDispatch) {
        dispatch(setStatus(Status.LOADING));
        try {
            const response=await API.get("product");
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
      const response = await API.get(`products/category/${category}`);
      if (response.status === 200) {
        dispatch(setCategoryProducts({ category, products: response.data.data }));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error:any) {
        if (error.response?.status === 404) {
          // No products found → just set empty array
          dispatch(setCategoryProducts({ category, products: [] }));
          dispatch(setStatus(Status.SUCCESS));
        } else {
          console.error(error);
          dispatch(setStatus(Status.ERROR));
        }
    }
  };
}

//fetch product by isFeatured
export function fetchFeaturedProducts() {
  return async function fetchFeaturedProductsThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));

    try {
      const response = await API.get('products/featured'); // your backend endpoint
      if (response.status === 200) {
        dispatch(setFeaturedProducts(response.data.data)); // IMPORTANT: dispatch action to update state here
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