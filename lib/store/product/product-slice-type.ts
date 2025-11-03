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
    subCategoryId?:string,
    //for category name and sub-category name
    category?: {
        id?: string;
        categoryName: string;
    };
    subCategory?: {
        id?: string;
        subCategoryName: string;
    };

}

export interface IProductSliceState{
    product:IProductData | null,
    allProducts:IProductData[],
    status:Status,
    categoryProducts: Record<string, IProductData[]>;
}