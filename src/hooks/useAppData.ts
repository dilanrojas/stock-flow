import { useEffect, useState } from 'react';
import type { CategoryResponse } from '../../lib/types/category';
import type { MovementResponse } from '../../lib/types/movement';
import type { ProductResponse } from '../../lib/types/product';
import type { PurchaseResponseModel } from '../../lib/types/purchase';
import type { StockResponse } from '../../lib/types/stock';
import { getCategories } from '../../services/categories/get';
import { getMovements } from '../../services/movements/get';
import { getProducts } from '../../services/products/get';
import { getPurchases } from '../../services/purchases/get';
import { getStock } from '../../services/stock/get';

export function useAppData() {
  const [movements, setMovements] = useState<MovementResponse[]>([]);
  const [movementsPage, setMovementsPage] = useState(1);
  const [movementsPageSize, setMovementsPageSize] = useState(5);
  const [movementsTotalPages, setMovementsTotalPages] = useState(1);
  const [movementsTotalElements, setMovementsTotalElements] = useState(0);

  const [stock, setStock] = useState<StockResponse[]>([]);
  const [stockPage, setStockPage] = useState(1);
  const [stockPageSize, setStockPageSize] = useState(10);
  const [stockTotalPages, setStockTotalPages] = useState(1);
  const [stockTotalElements, setStockTotalElements] = useState(0);

  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [purchases, setPurchases] = useState<PurchaseResponseModel[]>([]);
  const [purchasesPage, setPurchasesPage] = useState(1);
  const [purchasesPageSize, setPurchasesPageSize] = useState(10);
  const [purchasesTotalPages, setPurchasesTotalPages] = useState(1);
  const [purchasesTotalElements, setPurchasesTotalElements] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadAll = async () => {
      try {
        const [
          movementsResponse,
          stockResponse,
          categoriesResponse,
          productsResponse,
          purchasesResponse,
        ] = await Promise.all([
          getMovements(),
          getStock(),
          getCategories(),
          getProducts(),
          getPurchases(),
        ]);

        if (active) {
          setMovements(movementsResponse.content ?? []);
          setMovementsPage(movementsResponse.number + 1);
          setMovementsPageSize(movementsResponse.size);
          setMovementsTotalPages(movementsResponse.totalPages);
          setMovementsTotalElements(movementsResponse.totalElements);

          setStock(stockResponse.content ?? []);
          setStockPage(stockResponse.number + 1);
          setStockPageSize(stockResponse.size);
          setStockTotalPages(stockResponse.totalPages);
          setStockTotalElements(stockResponse.totalElements);

          setCategories(categoriesResponse);
          setProducts(productsResponse);
          setPurchases(purchasesResponse.content ?? []);
          setPurchasesPage(purchasesResponse.number + 1);
          setPurchasesPageSize(purchasesResponse.size);
          setPurchasesTotalPages(purchasesResponse.totalPages);
          setPurchasesTotalElements(purchasesResponse.totalElements);
        }
      } catch (fetchError) {
        if (active) {
          setError(fetchError instanceof Error ? fetchError.message : 'Unable to load app data');
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    loadAll();
    return () => {
      active = false;
    };
  }, []);

  return {
    movements,
    movementsPage,
    movementsPageSize,
    movementsTotalPages,
    movementsTotalElements,
    stock,
    stockPage,
    stockPageSize,
    stockTotalPages,
    stockTotalElements,
    categories,
    products,
    purchases,
    purchasesPage,
    purchasesPageSize,
    purchasesTotalPages,
    purchasesTotalElements,
    isLoading,
    error,
  };
}
