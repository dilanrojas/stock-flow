import type { CategoryResponse } from "../../lib/types/category";
import { getJSON } from "../api";

const ENDPOINT = '/categories';
export const getCategories = async () => {
    return getJSON<CategoryResponse[]>(`${ENDPOINT}`);
}