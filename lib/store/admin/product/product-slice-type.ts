import { Status } from "@/lib/global/type";

export interface IAdminProductData{
    id?:string,
    productName:string,
    productDescription:string,
    productPrice:number,
    productBrand:string,
    productStock:number,
    isFeatured:boolean,
    categoryId?:string,
    subCategoryId?:string,
    productImage?:File | string | null
}

export interface IAdminProductSliceState{
    product:IAdminProductData[],
    status:Status
}