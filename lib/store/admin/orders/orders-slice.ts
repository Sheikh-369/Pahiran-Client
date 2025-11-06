import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAdminOrderData, IAdminOrderSliceState } from "./orders-slice-type";
import { Status } from "@/lib/global/type";
import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/http/APIWithToken";

const initialState:IAdminOrderSliceState={
    orders:[],
    status:Status.IDLE
}

const adminOrderSlice=createSlice({
    name:"adminOrders",
    initialState,
    reducers:{
        setAdminOrders(state:IAdminOrderSliceState,action:PayloadAction<IAdminOrderData[]>){
            state.orders=action.payload
        },

        setStatus(state:IAdminOrderSliceState,action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

export const{setAdminOrders,setStatus}=adminOrderSlice.actions
export default adminOrderSlice.reducer

//fetch all orders
export function fetchAllOrdersForAdmin(){
    return async function fetchAllOrdersForAdminThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.get("all-orders")
            if(response.status===200){
                dispatch(setAdminOrders(response.data.data))
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}

//edit order
interface IEditOrderPayload {
  orderId: string;
  orderStatus: string;
  paymentStatus: string;
}
export function editAdminOrder(payload: IEditOrderPayload) {
  return async function editAdminOrderThunk(dispatch: AppDispatch, getState: any) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.patch(`order/${payload.orderId}`, {
        orderStatus: payload.orderStatus,
        paymentStatus: payload.paymentStatus,
      });

      if (response.status === 200) {
        const updated = response.data.data;

        // Update orders in slice
        const { orders } = getState().adminOrdersSlice;
        const newOrders: IAdminOrderData[] = orders.map((o: IAdminOrderData) =>
          o.orderId === updated.orderId
            ? { ...o, orderStatus: updated.orderStatus, paymentStatus: updated.paymentStatus }
            : o
        );

        dispatch(setAdminOrders(newOrders));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error: any) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
