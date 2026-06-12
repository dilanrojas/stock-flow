import type { PurchaseSummaryResponseModel, PurchaseResponseModel} from '../../lib/types/purchase';
import type { PaginatedResponse } from '../../lib/types/page';
import { getJSON } from '../api';

// Obtener lista de compras (resumen)
export const getPurchases = async (page = 0) =>
  getJSON<PaginatedResponse<PurchaseSummaryResponseModel>>(`/purchases?page=${page}`);


export const getPurchaseById = async (resourceId: string) =>
  getJSON<PurchaseResponseModel>(`/purchases/${resourceId}`);
