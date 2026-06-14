import type { CategoryResponse } from './category';

export type ProductResponse = {
  name: string;
  description: string;
  price: number;
  resourceId: string;
  categoryResponseModel: CategoryResponse;
  minimumQuantity: number,
  imageURL: string;
};

export type ProductRequest = {
  name: string;
  description?: string;
  price: number;
  categoryResourceId: string;
  minimumQuantity: number;
  imageURL: string;
};
