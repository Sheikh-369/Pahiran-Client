import { Status } from "@/lib/global/type"

export interface IProductData{
    id?:string,
    productName:string,
    productDescription:string,
    productPrice:number,
    productBrand?:string,
    productStock:number,
    productImage?:File | string | null,
    isFeatured?: boolean,
    categoryId?:string
    subCategoryId?:string
}

export interface IProductSliceState{
    product:IProductData | null,
    status:Status
}