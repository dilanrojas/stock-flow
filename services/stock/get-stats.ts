import type { StockStatsResponse } from '../../lib/types/stock';
import { getJSON } from '../api';

const ENDPOINT = '/stock/stats';
export const getStockStats = async () => getJSON<StockStatsResponse>(`${ENDPOINT}`);
