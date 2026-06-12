import type {  PurchaseResponseModel} from '../../lib/types/purchase';
import type { PaginatedResponse } from '../../lib/types/page';
import { getJSON } from '../api';


export const getPurchaseById = async (resourceId: string) =>
  getJSON<PurchaseResponseModel>(`/purchases/${resourceId}`);
