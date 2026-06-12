export interface PurchaseResponseModel {
  date: string;
  reason: string;
  resourceId: string;
  purchaseTotal: number;
  totalProductsAmount: number;
}

export interface PurchaseRequestModel {
  date: string;
  reason: string;
  purchaseDetails: PurchaseDetailRequestModel[];
}

export interface PurchaseDetailRequestModel {
  stockResourceId: string;
  quantity: number;}