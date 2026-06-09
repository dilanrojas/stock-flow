'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getJSON } from '../../services/api';
import type { MovementStats } from '../../lib/types/movement';

type MovementStatsContextType = {
  stats: MovementStats | null;
  isLoading: boolean;
  error: string | null;
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
      }}
    >
      {children}
    </MovementStatsContext.Provider>
  );
}
