import type { ProductResponse } from './product';

export type StockResponse = {
  quantity: number;
  minimumQuantity: number;
  resourceId: string;
  productResponseModel: ProductResponse;
};
