import { createContext, useContext, useState } from 'react';
import type { ProductRequest } from '../../../lib/types/product';
import type { StockResponse } from '../../../lib/types/stock';
import { deleteProduct as deleteProductService } from '../../../services/products/delete';
import { createProduct } from '../../../services/products/post';
import { updateProduct as updateProductService } from '../../../services/products/put';
import { getStock } from '../../../services/stock/get';
import { useCategoryContext } from '../categories/categories-context';
import { useProductContext } from '../products/products-context';
import { useStockStatsContext } from './stock-stats-context';

type StockContextType = {
  stock: StockResponse[];
  isLoading: boolean;
  error: string | null;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  totalElements: number;
  goToPage: (page: number) => Promise<void>;
  addProduct: (product: ProductRequest) => Promise<void>;
  updateProduct: (productResourceId: string, product: ProductRequest) => Promise<void>;
  deleteProduct: (productResourceId: string) => Promise<void>;
};

const StockContext = createContext<StockContextType | null>(null);

export default function StockProvider({
  initialStock,
  initialPage,
  initialPageSize,
  initialTotalPages,
  initialTotalElements,
  children,
}: {
  initialStock: StockResponse[];
  initialPage: number;
  initialPageSize: number;
  initialTotalPages: number;
  initialTotalElements: number;
  children: React.ReactNode;
}) {
  const [stock, setStock] = useState<StockResponse[]>(() => initialStock);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [totalElements, setTotalElements] = useState(initialTotalElements);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { categories } = useCategoryContext();
  const { refreshStats } = useStockStatsContext();
  const { refreshProducts } = useProductContext();

  const goToPage = async (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await getStock(page - 1);
      setStock(response.content ?? []);
      setCurrentPage(response.number + 1);
      setPageSize(response.size);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Unable to load stock');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProduct = async (product: ProductRequest) => {
    const category = categories.find(
      (category) => category.resourceId === product.categoryResourceId,
    );

    if (!category) return;

    const optimisticResponse: StockResponse = {
      resourceId: `temp-${Date.now()}-${Math.random()}`,
      quantity: 0,
      minimumQuantity: product.minimumQuantity,
      productResponseModel: {
        name: product.name,
        description: product.description ?? '',
        price: product.price,
        resourceId: `temp-${Date.now()}-${Math.random()}`,
        categoryResponseModel: category,
        imageURL: product.imageURL,
      },
    };

    const shouldShowOptimistic = currentPage === 1;

    if (shouldShowOptimistic) {
      setStock((prev) => [optimisticResponse, ...prev].slice(0, pageSize));
    }

    setTotalElements((prev) => prev + 1);
    setError(null);

    try {
      await createProduct(product);
      await goToPage(currentPage);
      await refreshStats();
      await refreshProducts();
    } catch (fetchError) {
      if (shouldShowOptimistic) {
        setStock((prev) => prev.filter((s) => s.resourceId !== optimisticResponse.resourceId));
      }
      setTotalElements((prev) => Math.max(0, prev - 1));
      setError(fetchError instanceof Error ? fetchError.message : 'Unable to create product');
      throw fetchError;
    }
  };

  const handleUpdateProduct = async (resourceId: string, product: ProductRequest) => {
    const category = categories.find(
      (category) => category.resourceId === product.categoryResourceId,
    );

    const currentStock = stock.find((item) => item.productResponseModel.resourceId === resourceId);

    if (!category || !currentStock) return;

    const optimisticResponse: StockResponse = {
      ...currentStock,
      productResponseModel: {
        name: product.name,
        description: product.description ?? '',
        price: product.price,
        resourceId: resourceId,
        categoryResponseModel: category,
        imageURL: product.imageURL,
      },
    };

    setStock((prev) =>
      prev.map((item) =>
        item.productResponseModel.resourceId === resourceId ? optimisticResponse : item,
      ),
    );

    try {
      await updateProductService(resourceId, product);
      await refreshStats();
    } catch (fetchError) {
      setStock((prev) =>
        prev.map((item) =>
          item.productResponseModel.resourceId === resourceId ? currentStock : item,
        ),
      );
      setError(fetchError instanceof Error ? fetchError.message : 'Unable to update product');
      throw fetchError;
    }
  };

  const handleDeleteProduct = async (resourceId: string) => {
    const currentStock = stock.find((item) => item.productResponseModel.resourceId === resourceId);

    if (!currentStock) return;

    setStock((prev) => prev.filter((item) => item.productResponseModel.resourceId !== resourceId));
    setTotalElements((prev) => Math.max(0, prev - 1));

    try {
      await deleteProductService(resourceId);
      await refreshStats();
      await refreshProducts();
    } catch (fetchError) {
      setStock((prev) => {
        const index = prev.findIndex((item) => item.productResponseModel.resourceId === resourceId);
        const insertAt = index === -1 ? prev.length : index;
        return [...prev.slice(0, insertAt), currentStock, ...prev.slice(insertAt)];
      });
      setTotalElements((prev) => prev + 1);
      setError(fetchError instanceof Error ? fetchError.message : 'Unable to delete product');
      throw fetchError;
    }
  };

  return (
    <StockContext.Provider
      value={{
        stock,
        isLoading,
        error,
        pageSize,
        currentPage,
        totalPages,
        totalElements,
        goToPage,
        addProduct: handleAddProduct,
        updateProduct: handleUpdateProduct,
        deleteProduct: handleDeleteProduct,
      }}
    >
      {children}
    </StockContext.Provider>
  );
}

export function useStockContext() {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStock must be used within a StockProvider');
  }
  return context;
}
