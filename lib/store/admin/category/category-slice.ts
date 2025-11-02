// slices/category-slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "@/lib/global/type";
import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/http/APIWithToken";
import { ICategoryData, ICategorySliceState } from "./category-slice-type";

const initialState: ICategorySliceState = {
    categories: [],
    status: Status.IDLE
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategories(state: ICategorySliceState, action: PayloadAction<ICategoryData[]>) {
            state.categories = action.payload;
        },
        setStatus(state: ICategorySliceState, action: PayloadAction<Status>) {
            state.status = action.payload;
        }
    }
});

export const { setCategories, setStatus } = categorySlice.actions;
export default categorySlice.reducer;

// Thunk to fetch all categories
export function fetchAllCategories() {
    return async function fetchAllCategoriesThunk(dispatch: AppDispatch) {
        dispatch(setStatus(Status.LOADING));
        try {
            const response = await APIWITHTOKEN.get(`category`);
            if (response.status === 200) {
                dispatch(setCategories(response.data.categories));
                dispatch(setStatus(Status.SUCCESS));
            } else {
                dispatch(setStatus(Status.ERROR));
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR));
        }
    };
}

// Thunk to create a new category
export function createNewCategory(categoryData: ICategoryData) {
    return async function createNewCategoryThunk(dispatch: AppDispatch) {
        dispatch(setStatus(Status.LOADING));
        try {
            const response = await APIWITHTOKEN.post(`category`, categoryData);
            if (response.status === 201 || response.status === 200) {
                dispatch(setStatus(Status.SUCCESS));
                dispatch(fetchAllCategories()); // Refresh list after creation
            } else {
                dispatch(setStatus(Status.ERROR));
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR));
        }
    };
}


// Thunk to update a category
export function updateCategory(updateCategoryData: ICategoryData,id:string) {
    return async function updateCategoryThunk(dispatch: AppDispatch) {
        dispatch(setStatus(Status.LOADING));
        try {
            const response = await APIWITHTOKEN.patch(`category/${id}`, updateCategoryData);
            if (response.status === 201 || response.status === 200) {
                dispatch(setStatus(Status.SUCCESS));
                dispatch(fetchAllCategories()); // Refresh list after creation
            } else {
                dispatch(setStatus(Status.ERROR));
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR));
        }
    };
}

// Thunk to update a category
export function deleteCategory(id:string) {
    return async function deleteCategoryThunk(dispatch: AppDispatch) {
        dispatch(setStatus(Status.LOADING));
        try {
            const response = await APIWITHTOKEN.delete(`category/${id}`);
            if (response.status === 201 || response.status === 200) {
                dispatch(setStatus(Status.SUCCESS));
                dispatch(fetchAllCategories()); // Refresh list after creation
            } else {
                dispatch(setStatus(Status.ERROR));
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR));
        }
    };
}