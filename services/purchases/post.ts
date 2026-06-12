import type { PurchaseRequestModel, PurchaseResponseModel } from "../../lib/types/purchase";
import { postJSON } from "../api";

export const createPurchase = async(Purchase: PurchaseRequestModel): Promise<PurchaseResponseModel> => 
    postJSON<PurchaseResponseModel>('/purchases', Purchase); 