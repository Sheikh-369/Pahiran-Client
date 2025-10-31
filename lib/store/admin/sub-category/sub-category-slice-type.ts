import { Status } from "@/lib/global/type";

export interface ISubCategoryData {
  id?: string;
  subCategoryName: string;
}

export interface ISubCategorySliceState {
  subCategories: ISubCategoryData[];
  status: Status;
}
