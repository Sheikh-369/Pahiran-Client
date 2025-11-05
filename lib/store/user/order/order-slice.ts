import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrderData, IOrderItems, IOrderSliceState } from "./order-slice-type";
import { Status } from "@/lib/global/type";
import APIWITHTOKEN from "@/lib/http/APIWithToken";
import { AppDispatch } from "../../store";


const initialState: IOrderSliceState = {
  items: [],
  status: Status.IDLE,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setItems(state: IOrderSliceState, action: PayloadAction<IOrderItems[]>) {
      state.items = action.payload;
    },
    setStatus(state: IOrderSliceState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});

export const { setItems, setStatus } = orderSlice.actions;
export default orderSlice.reducer;

//place an order
export function createAnOrder(finalData: IOrderData | FormData) {
  return async function createAnOrderThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));

    try {
      const isFormData = finalData instanceof FormData;

      const response = await APIWITHTOKEN.post("/order", finalData, {
        headers: {
          "Content-Type": isFormData ? "multipart/form-data" : "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("❌ Order creation failed:", error);
      dispatch(setStatus(Status.ERROR));
    }
  }
}
