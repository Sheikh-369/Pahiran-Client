// import { Status } from "@/lib/global/type"

// export interface IUserData{
//     id?:string,
//     userName?:string,
//     userEmail:string,
//     userPassword?:string,
//     confirmPassword?:string,
//     OTP?:string,
//     userPhoneNumber?:string,
//     newPassword?:string,
//     confirmNewPassword?:string,
//     role?:string,
//     name?: string;
// }

// export interface IUserSliceState{
//     user:IUserData | null,
//     status:Status
// }

import { Status } from "@/lib/global/type"

export interface IUserData {
    id?: string;
    userName?: string;
    userEmail: string;
    userPassword?: string;
    confirmPassword?: string;
    OTP?: string;
    userPhoneNumber?: string;
    newPassword?: string;
    confirmNewPassword?: string;
    role?: string;
    name?: string;
    email?:string;

    // New fields for profile edit
    bio?: string;
    addressLine?: string;
    province?: string;
    district?: string;
    city?: string;
    tole?: string;
    profileImage?:File | string;
}

export interface IUserSliceState {
    user: IUserData | null;
    status: Status;
}
