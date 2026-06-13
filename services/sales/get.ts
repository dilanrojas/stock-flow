import type { PaginatedResponse } from '../../lib/types/page';
import type { SaleResponse} from '../../lib/types/sale';

import { getJSON } from '../api';

export const getSales = async (page = 0) =>
  getJSON<PaginatedResponse<SaleResponse>>(`/sales?page=${page}`);


export const getSaleById = async (resourceId: string) =>
  getJSON<SaleResponse>(`/sales/${resourceId}`);