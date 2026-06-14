import type { SaleRequest, SaleResponse } from '../../lib/types/sale';
import { postJSON } from '../api';

export const createSale = async (Sale: SaleRequest): Promise<SaleResponse> =>
  postJSON<SaleResponse>('/sales', Sale);
