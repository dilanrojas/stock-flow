import type { PaginatedResponse } from "../../lib/types/page";
import type { StockResponse } from "../../lib/types/stock";
import { getJSON } from "../api";

const ENDPOINT = '/stock';
export const getStock = async (page = 0) => {
   return  getJSON<PaginatedResponse<StockResponse>>(`${ENDPOINT}?page=${page}`);

}