import type { PurchaseResponseModel } from '../../lib/types/purchase';
import type { PurchaseRequestDTO } from '../../lib/types/purchase';
import { postJSON } from '../api';

// Crear nueva compra
export const addPurchase = async (purchaseRequest: PurchaseRequestDTO) =>
  postJSON<PurchaseResponseModel>('/purchases', purchaseRequest);