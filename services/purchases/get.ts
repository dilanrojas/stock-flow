import type { PaginatedResponse } from '../../lib/types/page';
import type { PurchaseResponseModel} from '../../lib/types/purchase';

import { getJSON } from '../api';

export const getPurchases = async (page = 0) =>
  getJSON<PaginatedResponse<PurchaseResponseModel>>(`/purchases?page=${page}`);


export const getPurchaseById = async (resourceId: string) =>
  getJSON<PurchaseResponseModel>(`/purchases/${resourceId}`);
