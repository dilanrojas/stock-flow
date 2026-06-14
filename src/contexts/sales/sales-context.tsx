import { createContext, useContext, useState } from 'react';
import type { SaleRequest, SaleResponse } from '../../../lib/types/sale';
import { getSales } from '../../../services/sales/get';
import { createSale } from '../../../services/sales/post';

type SaleContextType = {
  sales: SaleResponse[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  isLoading: boolean;
  error: string | null;
  goToPage: (page: number) => Promise<void>;
  addSale: (sale: SaleRequest) => Promise<void>;
};

const SaleContext = createContext<SaleContextType | null>(null);

export default function SaleListProvider({
  initialSales,
  initialPage,
  initialPageSize,
  initialTotalPages,
  initialTotalElements,
  children,
}: {
  initialSales: SaleResponse[];
  initialPage: number;
  initialPageSize: number;
  initialTotalPages: number;
  initialTotalElements: number;
  children: React.ReactNode;
}) {
  const [sales, setSales] = useState<SaleResponse[]>(initialSales);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [totalElements, setTotalElements] = useState(initialTotalElements);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const goToPage = async (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await getSales(page - 1);

      setSales(response.content ?? []);
      setCurrentPage(response.number + 1);
      setPageSize(response.size);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Unable to load sales');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSale = async (sale: SaleRequest) => {
    const optimisticSale: SaleResponse = {
      resourceId: `temp-${Date.now()}-${Math.random()}`,
      date: sale.date,
      saleTotal: 0,
      totalProductsAmount: sale.saleDetails.reduce((sum, detail) => sum + detail.quantity, 0),
      saleDetails: [],
    };

    const shouldShowOptimisticSale = currentPage === 1;

    if (shouldShowOptimisticSale) {
      setSales((prev) => [optimisticSale, ...prev].slice(0, pageSize));
    }

    setTotalElements((prev) => prev + 1);
    setError(null);

    try {
      const response = await createSale(sale);

      if (shouldShowOptimisticSale) {
        setSales((prev) =>
          prev.map((s) => (s.resourceId === optimisticSale.resourceId ? response : s)),
        );
      }
    } catch (fetchError) {
      if (shouldShowOptimisticSale) {
        setSales((prev) => prev.filter((s) => s.resourceId !== optimisticSale.resourceId));
      }
      setTotalElements((prev) => prev - 1);
      setError(fetchError instanceof Error ? fetchError.message : 'Unable to create sale');
      throw fetchError;
    }
  };

  return (
    <SaleContext.Provider
      value={{
        sales,
        currentPage,
        pageSize,
        totalPages,
        totalElements,
        isLoading,
        error,
        goToPage,
        addSale: handleAddSale,
      }}
    >
      {children}
    </SaleContext.Provider>
  );
}

export function useSalesContext() {
  const context = useContext(SaleContext);
  if (!context) {
    throw new Error('useSalesContext must be used within SaleListProvider');
  }

  return context;
}
