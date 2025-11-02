import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserData, IUserSliceState } from "./auth-slice-type";
import { Status } from "@/lib/global/type";
import { AppDispatch } from "../store";
import API from "@/lib/http/API";
import APIWITHTOKEN from "@/lib/http/APIWithToken";

const initialState:IUserSliceState={
    user:null,
    status:Status.IDLE
}

const userSlice=createSlice({
    name:"authSlice",
    initialState,
    reducers:{
        setUser(state:IUserSliceState,action:PayloadAction<IUserData | null>){
            state.user=action.payload
        },

        setStatus(state:IUserSliceState,action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

export const{setUser,setStatus}=userSlice.actions
export default userSlice.reducer

//user register
export function userRegister(userData:IUserData){
    return async function userRegisterThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await API.post("/register",userData)
            if(response.status===200 || response.status===201){
                dispatch(setUser(response.data.data))
                dispatch(setStatus(Status.SUCCESS))
                return { success: true, message: response.data.message }//for toast messages
            }else{
                dispatch(setStatus(Status.ERROR))
                return { success: false, message: response.data.message || "Something went wrong" }//for toast messages
            }
        } catch (error:any) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
            return { success: false, message: error.response?.data?.message || "Registration failed" } //toast error
        }
    }
}

//user login
export function userLogin(loginData:IUserData){
    return async function userLoginThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await API.post("login",loginData)
            if(response.status===200 || response.status===201){
                dispatch(setUser(response.data.token))
                localStorage.setItem("token", response.data.token);
                dispatch(setStatus(Status.SUCCESS))
                return { success: true, message: response.data.message }
            }else{
                dispatch(setStatus(Status.ERROR))
                return { success: false, message: response.data.message || "Something went wrong" }
            }
        } catch (error:any) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
            return { success: false, message: error.response?.data?.message || "Registration failed" }
        }
    }
}

//forgot password
export function forgotPassword(forgotPasswordData:IUserData){
    return async function forgotPasswordThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await API.post("forgot-password",forgotPasswordData)
            if(response.status===200 || response.status===201){
                dispatch(setStatus(Status.SUCCESS))
                return { success: true, message: response.data.message }
            }else{
                dispatch(setStatus(Status.ERROR))
                return { success: false, message: response.data.message || "Something went wrong" }
            }
        } catch (error:any) {
            console.log(error)
            return { success: false, message: error.response?.data?.message || "Registration failed" }
        }
    }
}

//Reset Password
export function resetPassword(resetPasswordData: IUserData) {
  return async function resetPasswordThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("reset-password", resetPasswordData);
      if (response.status === 200 || response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
        return { success: true, message: response.data.message }
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, message: response.data.message || "Something went wrong" }
      }
    } catch (error:any) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
      return { success: false, message: error.response?.data?.message || "Registration failed" }
    }
  };
}

//fetch all users
export function fetchAllUsers(){
    return async function fetchAllUsersThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.get("/customers")
            if(response.status===200 || response.status===201){
                dispatch(setUser(response.data.data))
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error:any) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}