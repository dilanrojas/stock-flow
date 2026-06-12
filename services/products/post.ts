import type { ProductRequest, ProductResponse } from '../../lib/types/product';
import { postJSON } from '../api';

const ENDPOINT = '/products';
export const createProduct = async (product: ProductRequest): Promise<ProductResponse> =>
  postJSON<ProductResponse>(`${ENDPOINT}`, product);
