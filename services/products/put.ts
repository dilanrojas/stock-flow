import type { ProductRequest, ProductResponse } from '../../lib/types/product';
import { putJSON } from '../api';

const ENDPOINT = '/products';
export const updateProduct = async (productResourceId: string, product: ProductRequest): Promise<ProductResponse> =>
  putJSON<ProductResponse>(`${ENDPOINT}/${productResourceId}`, product);
