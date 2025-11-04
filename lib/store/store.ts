import { configureStore } from "@reduxjs/toolkit"
import authSlice from "../store/auth/auth-slice"
import adminProductSlice from "./admin/product/product-slice"
import categorySlice from "./admin/category/category-slice"
import subCategorySlice from "./admin/sub-category/sub-category-slice"
import productSlice from "../store/product/product-slice"
import cartSlice from "../store/user/cart/cart-slice"
import orderSlice from "../store/user/order/order-slice"

const store=configureStore({
    reducer:{
        authSlice,
        adminProductSlice,
        categorySlice,
        subCategorySlice,
        productSlice,
        cartSlice,
        orderSlice
    }
})

export default store
export type AppDispatch=typeof store.dispatch
export type RootState=ReturnType<typeof store.getState>