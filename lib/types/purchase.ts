export interface PurchaseSummaryResponseModel {
  date: string;
  reason: string;
  resourceId: string;
  purchaseTotal: number;
  totalProductsAmount: number;
}

export interface PurchaseDetailResponseModel {
  resourceId: string;
  productName: string;
  imageURL: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface PurchaseResponseModel {
  date: string;
  reason: string;
  resourceId: string;
  purchaseTotal: number;
  totalProductsAmount: number;
  purchaseDetails: PurchaseDetailResponseModel[];
}
