import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import type { MovementResponse } from '../../lib/types/movement';
import { getMovements } from '../../services/movements/get';
import ModalRoot from '../components/modals/modal-root';
import Sidebar from '../components/sidebar/sidebar';
import AppSkeleton from '../components/skeletons/app-skeleton';
import MovementStatsProvider from '../contexts/movement-stats-context';
import MovementsProvider from '../contexts/movements-context';
import UIProvider from '../contexts/ui-context';
import styles from './app-layout.module.css';

export default function AppLayout() {
  const [movements, setMovements] = useState<MovementResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadMovements = async () => {
      try {
        const response = await getMovements();

        if (active) {
          setMovements(response.content ?? []);
          setCurrentPage(response.number + 1);
          setPageSize(response.size);
          setTotalPages(response.totalPages);
          setTotalElements(response.totalElements);
        }
      } catch (fetchError) {
        if (active) {
          setError(fetchError instanceof Error ? fetchError.message : 'Unable to load movements');
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    loadMovements();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main>
        {isLoading ? (
          <AppSkeleton />
        ) : error ? (
          <div className='rounded-lg border border-red-200 bg-red-50 p-8 text-center text-sm text-red-700 shadow-sm'>
            {error}
          </div>
        ) : (
          <MovementStatsProvider>
            <MovementsProvider
              initialMovements={movements}
              initialPage={currentPage}
              initialPageSize={pageSize}
              initialTotalPages={totalPages}
              initialTotalElements={totalElements}
            >
              <UIProvider>
                <Outlet />
                <ModalRoot />
              </UIProvider>
            </MovementsProvider>
          </MovementStatsProvider>
        )}
      </main>
    </div>
  );
}
