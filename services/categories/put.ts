import type { CategoryRequest, CategoryResponse } from '../../lib/types/category';
import { putJSON } from '../api';

const ENDPOINT = '/categories';
export const updateCategory = async (
  categoryName: CategoryRequest,
  categoryResourceID: string,
): Promise<CategoryResponse> =>
  putJSON<CategoryResponse>(`${ENDPOINT}/${categoryResourceID}`, categoryName);
