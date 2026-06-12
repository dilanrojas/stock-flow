import type { CategoryRequest, CategoryResponse } from '../../lib/types/category';
import { postJSON } from '../api';

const ENDPOINT = '/categories';
export const createCategory = async (categoryName: CategoryRequest): Promise<CategoryResponse> => {
  return postJSON<CategoryResponse>(`${ENDPOINT}`, categoryName);
};
