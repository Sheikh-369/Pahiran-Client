import { Status } from "@/lib/global/type"

export interface IUserData{
    id?:string,
    userName:string,
    userEmail:string,
    userPassword:string,
    confirmPassword:string,
    userPhoneNumber:string
}

export interface IUserSliceState{
    user:IUserData | null,
    status:Status
}