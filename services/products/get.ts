import type { ProductResponse } from '../../lib/types/product';
import { getJSON } from '../api';

const ENDPOINT = '/products';
export const getProducts = async () => {
  return getJSON<ProductResponse[]>(`${ENDPOINT}`);
};
