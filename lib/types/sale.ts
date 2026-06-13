
export type SaleResponse = {
  date: string;
  resourceId: string;
  saleTotal: number;
  totalProductsAmount: number;
  saleDetails: SaleDetailResponse[];
};

export type SaleRequest = {
  date: string;
  saleDetails: SaleDetailRequest[];
};

export type SaleDetailRequest = {
  stockResourceId: string;
  quantity: number;
}

export type SaleDetailResponse = {
  resourceId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;};
