import { useEffect, useState } from 'react';
import type { CategoryResponse } from '../../lib/types/category';
import type { MovementResponse } from '../../lib/types/movement';
import type { PurchaseResponseModel } from '../../lib/types/purchase';
import type { StockResponse } from '../../lib/types/stock';
import { getCategories } from '../../services/categories/get';
import { getMovements } from '../../services/movements/get';
import { getPurchases } from '../../services/purchases/get';
import { getStock } from '../../services/stock/get';

type PaginatedState<T> = {
  data: T[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
};

function paginatedDefaults<T>(pageSize: number): PaginatedState<T> {
  return { data: [], page: 1, pageSize, totalPages: 1, totalElements: 0 };
}

export function useAppData() {
  const [movements, setMovements] = useState<PaginatedState<MovementResponse>>(
    paginatedDefaults(5),
  );
  const [stock, setStock] = useState<PaginatedState<StockResponse>>(paginatedDefaults(10));
  const [purchases, setPurchases] = useState<PaginatedState<PurchaseResponseModel>>(
    paginatedDefaults(10),
  );
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadAll = async () => {
      try {
        const [movementsResponse, stockResponse, categoriesResponse, purchasesResponse] =
          await Promise.all([getMovements(), getStock(), getCategories(), getPurchases()]);

        if (active) {
          setMovements({
            data: movementsResponse.content ?? [],
            page: movementsResponse.number + 1,
            pageSize: movementsResponse.size,
            totalPages: movementsResponse.totalPages,
            totalElements: movementsResponse.totalElements,
          });
          setStock({
            data: stockResponse.content ?? [],
            page: stockResponse.number + 1,
            pageSize: stockResponse.size,
            totalPages: stockResponse.totalPages,
            totalElements: stockResponse.totalElements,
          });
          setPurchases({
            data: purchasesResponse.content ?? [],
            page: purchasesResponse.number + 1,
            pageSize: purchasesResponse.size,
            totalPages: purchasesResponse.totalPages,
            totalElements: purchasesResponse.totalElements,
          });
          setCategories(categoriesResponse);
        }
      } catch (fetchError) {
        if (active) {
          setError(fetchError instanceof Error ? fetchError.message : 'Unable to load app data');
        }
      } finally {
        if (active) setIsLoading(false);
      }
    };

    loadAll();
    return () => {
      active = false;
    };
  }, []);

  return {
    movements: movements.data,
    movementsPage: movements.page,
    movementsPageSize: movements.pageSize,
    movementsTotalPages: movements.totalPages,
    movementsTotalElements: movements.totalElements,
    stock: stock.data,
    stockPage: stock.page,
    stockPageSize: stock.pageSize,
    stockTotalPages: stock.totalPages,
    stockTotalElements: stock.totalElements,
    purchases: purchases.data,
    purchasesPage: purchases.page,
    purchasesPageSize: purchases.pageSize,
    purchasesTotalPages: purchases.totalPages,
    purchasesTotalElements: purchases.totalElements,
    categories,
    isLoading,
    error,
  };
}
