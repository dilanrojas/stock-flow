import type { MovementRequest, MovementResponse } from '../../lib/types/movement';
import { postJSON } from '../api';

export const createMovement = async (movement: MovementRequest): Promise<MovementResponse> =>
  postJSON<MovementResponse>('/movements', movement);
