import { createContext, useContext, useEffect, useState } from 'react';
import type { MovementStats } from '../../../lib/types/movement';
import { getJSON } from '../../../services/api';

type MovementStatsContextType = {
  stats: MovementStats | null;
  isLoading: boolean;
  error: string | null;
  adjustStatsForMovement: (quantity: number, delta?: number) => void;
};

const MovementStatsContext = createContext<MovementStatsContextType | null>(null);

export function useMovementStats() {
  const context = useContext(MovementStatsContext);
  if (!context) {
    throw new Error('useMovementStats must be used within MovementStatsProvider');
  }
  return context;
}

export default function MovementStatsProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<MovementStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const adjustStatsForMovement = (quantity: number, delta = 1) => {
    setStats((prev) => {
      if (!prev) return prev;

      return {
        totalMovements: prev.totalMovements + delta,
        totalInflows: prev.totalInflows + (quantity > 0 ? quantity * delta : 0),
        totalOutflows: prev.totalOutflows + (quantity < 0 ? Math.abs(quantity) * delta : 0),
      };
    });
  };

  useEffect(() => {
    let active = true;

    const loadStats = async () => {
      try {
        const data = await getJSON<MovementStats>('/movements/stats');
        if (active) {
          setStats(data);
        }
      } catch (fetchError) {
        if (active) {
          setError(
            fetchError instanceof Error ? fetchError.message : 'Failed to fetch movement stats',
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    loadStats();

    return () => {
      active = false;
    };
  }, []);

  return (
    <MovementStatsContext.Provider
      value={{
        stats,
        isLoading,
        error,
        adjustStatsForMovement,
      }}
    >
      {children}
    </MovementStatsContext.Provider>
  );
}
