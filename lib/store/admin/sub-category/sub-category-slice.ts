import { createSlice, PayloadAction } from "@reduxjs/toolkit";import { Status } from "@/lib/global/type";
import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/http/APIWithToken";
import { ISubCategoryData, ISubCategorySliceState } from "./sub-category-slice-type";

const initialState: ISubCategorySliceState = {
  subCategories: [],
  status: Status.IDLE,
};

const subCategorySlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {
    setSubCategories(state, action: PayloadAction<ISubCategoryData[]>) {
      state.subCategories = action.payload;
    },
    addSubCategory(state, action: PayloadAction<ISubCategoryData>) {
      state.subCategories.push(action.payload);
    },
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});

export const { setSubCategories, addSubCategory, setStatus } = subCategorySlice.actions;
export default subCategorySlice.reducer;

// ====================
// THUNKS
// ====================

// ✅ Fetch all subcategories
export function fetchAllSubCategories() {
  return async function fetchAllSubCategoriesThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.get(`sub-category`);
      if (response.status === 200) {
        dispatch(setSubCategories(response.data.subCategories));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// ✅ Create a new subcategory
export function createNewSubCategory(data: ISubCategoryData) {
  return async function createNewSubCategoryThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.post(`sub-category`, data);
      if (response.status === 200 || response.status === 201) {
        dispatch(addSubCategory(response.data.subCategory));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
