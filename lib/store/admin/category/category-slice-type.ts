// types/category-type.ts
import { Status } from "@/lib/global/type";

export interface ICategoryData {
    id?: string;
    categoryName: string;
    categoryDescription?: string | null;
}

export interface ICategorySliceState {
    categories: ICategoryData[];
    status: Status;
}
