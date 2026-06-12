import { createContext, useContext, useState } from 'react';
import type { PurchaseRequestModel, PurchaseResponseModel } from '../../../lib/types/purchase';
import { getPurchases } from '../../../services/purchases/get';
import { createPurchase } from '../../../services/purchases/post';

type PurchaseContextType = {
  purchases: PurchaseResponseModel[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  isLoading: boolean;
  error: string | null;
  goToPage: (page: number) => Promise<void>;
  addPurchase: (purchase: PurchaseRequestModel) => Promise<void>;
};

const PurchaseContext = createContext<PurchaseContextType | null>(null);

export default function PurchaseListProvider({
  initialPurchases,
  initialPage,
  initialPageSize,
  initialTotalPages,
  initialTotalElements,
  children,
}: {
  initialPurchases: PurchaseResponseModel[];
  initialPage: number;
  initialPageSize: number;
  initialTotalPages: number;
  initialTotalElements: number;
  children: React.ReactNode;
}) {
  const [purchases, setPurchases] = useState<PurchaseResponseModel[]>(initialPurchases);
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
      const response = await getPurchases(page - 1);

      setPurchases(response.content ?? []);
      setCurrentPage(response.number + 1);
      setPageSize(response.size);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Unable to load purchases');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPurchase = async (purchase: PurchaseRequestModel) => {
    const optimisticPurchase: PurchaseResponseModel = {
      resourceId: `temp-${Date.now()}-${Math.random()}`,
      date: new Date().toISOString().split('T')[0],
      reason: purchase.reason,
      purchaseTotal: 0,
      totalProductsAmount: purchase.purchaseDetails.reduce((sum, detail) => sum + detail.quantity, 0),
    };

    const shouldShowOptimisticPurchase = currentPage === 1;

    if (shouldShowOptimisticPurchase) {
      setPurchases((prev) => [optimisticPurchase, ...prev].slice(0, pageSize));
    }

    setTotalElements((prev) => prev + 1);
    setError(null);

    try {
      const response = await createPurchase(purchase);

      if (shouldShowOptimisticPurchase) {
        setPurchases((prev) =>
          prev.map((p) =>
            p.resourceId === optimisticPurchase.resourceId ? response : p,
          ),
        );
      }
    } catch (fetchError) {
      if (shouldShowOptimisticPurchase) {
        setPurchases((prev) =>
          prev.filter((p) => p.resourceId !== optimisticPurchase.resourceId),
        );
      }
      setTotalElements((prev) => prev - 1);
      setError(fetchError instanceof Error ? fetchError.message : 'Unable to create purchase');
      throw fetchError;
    }
  };

  return (
    <PurchaseContext.Provider
      value={{
        purchases,
        currentPage,
        pageSize,
        totalPages,
        totalElements,
        isLoading,
        error,
        goToPage,
        addPurchase: handleAddPurchase,
      }}
    >
      {children}
    </PurchaseContext.Provider>
  );
}

export function usePurchaseContext() {
  const context = useContext(PurchaseContext);
  if (!context) {
    throw new Error('usePurchaseContext must be used within PurchaseListProvider');
  }

  return context;
}
