import type { MovementResponse } from '../../lib/types/movement';
import type { PaginatedResponse } from '../../lib/types/page';
import { getJSON } from '../api';

export const getMovements = async (page = 0) =>
  getJSON<PaginatedResponse<MovementResponse>>(`/movements?page=${page}`);
