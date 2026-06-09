'use client';

import { createContext, useContext, useState } from 'react';
import { createMovement } from '../../services/movements/post';
import { getMovements } from '../../services/movements/get';
import type { MovementRequest, MovementResponse } from '../../lib/types/movement';

type MovementsContextType = {
  movements: MovementResponse[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  goToPage: (page: number) => Promise<void>;
  addMovement: (data: MovementRequest) => Promise<void>;
};

const MovementsContext = createContext<MovementsContextType | null>(null);

export default function MovementsProvider({
  initialMovements,
  initialPage,
  initialPageSize,
  initialTotalPages,
  initialTotalElements,
  children,
}: {
  initialMovements: MovementResponse[];
  initialPage: number;
  initialPageSize: number;
  initialTotalPages: number;
  initialTotalElements: number;
  children: React.ReactNode;
}) {
  const [movements, setMovements] = useState<MovementResponse[]>(initialMovements);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [totalElements, setTotalElements] = useState(initialTotalElements);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const goToPage = async (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await getMovements(page - 1, pageSize);

      setMovements(response.content ?? []);
      setCurrentPage(response.number + 1);
      setPageSize(response.size);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Unable to load movements');
    } finally {
      setIsLoading(false);
    }
  };

  const addMovement = async (data: MovementRequest) => {
    const optimisticMovement: MovementResponse = {
      resourceId: `temp-${Date.now()}-${Math.random()}`,
      note: data.note,
      createdAt: new Date().toISOString(),
      quantity: data.quantity,
      stockResourceId: data.stockResourceId,
    };

    setMovements((prev) => [...prev, optimisticMovement]);
    setTotalElements((prev) => prev + 1);
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await createMovement(data);

      setMovements((prev) =>
        prev.map((movement) =>
          movement.resourceId === optimisticMovement.resourceId ? response : movement,
        ),
      );
    } catch (fetchError) {
      setMovements((prev) => prev.filter((movement) => movement.resourceId !== optimisticMovement.resourceId));
      setTotalElements((prev) => Math.max(0, prev - 1));
      const message = fetchError instanceof Error ? fetchError.message : 'Unable to create movement';
      setError(message);
      console.error('Failed to create movement', fetchError);
      throw fetchError;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MovementsContext.Provider
      value={{
        movements,
        currentPage,
        pageSize,
        totalPages,
        totalElements,
        isLoading,
        isSubmitting,
        error,
        goToPage,
        addMovement,
      }}
    >
      {children}
    </MovementsContext.Provider>
  );
}

export function useMovements() {
  const ctx = useContext(MovementsContext);
  if (!ctx) throw new Error('useMovements must be used inside MovementsProvider');
  return ctx;
}
