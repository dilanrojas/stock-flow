import { Outlet } from 'react-router-dom';
import ModalRoot from '../components/modals/modal-root';
import Sidebar from '../components/sidebar/sidebar';
import AppSkeleton from '../components/skeletons/app-skeleton';
import CategoryListProvider from '../contexts/categories/categories-context';
import MovementStatsProvider from '../contexts/movements/movement-stats-context';
import MovementsProvider from '../contexts/movements/movements-context';
import ProductListProvider from '../contexts/products/products-context';
import PurchaseListProvider from '../contexts/purchases/purchases-context';
import StockProvider from '../contexts/stock/stock-context';
import StockStatsProvider from '../contexts/stock/stock-stats-context';
import UIProvider from '../contexts/ui-context';
import { useAppData } from '../hooks/useAppData';
import styles from './app-layout.module.css';

export default function AppLayout() {
  const {
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
  } = useAppData();

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
              initialPage={movementsPage}
              initialPageSize={movementsPageSize}
              initialTotalPages={movementsTotalPages}
              initialTotalElements={movementsTotalElements}
            >
              <StockStatsProvider>
                <CategoryListProvider initialCategories={categories}>
                  <StockProvider
                    initialStock={stock}
                    initialPage={stockPage}
                    initialPageSize={stockPageSize}
                    initialTotalPages={stockTotalPages}
                    initialTotalElements={stockTotalElements}
                  >
                    <ProductListProvider initialProducts={products}>
                      <PurchaseListProvider
                        initialPurchases={purchases}
                        initialPage={purchasesPage}
                        initialPageSize={purchasesPageSize}
                        initialTotalPages={purchasesTotalPages}
                        initialTotalElements={purchasesTotalElements}
                      >
                        <UIProvider>
                          <Outlet />
                          <ModalRoot />
                        </UIProvider>
                      </PurchaseListProvider>
                    </ProductListProvider>
                  </StockProvider>
                </CategoryListProvider>
              </StockStatsProvider>
            </MovementsProvider>
          </MovementStatsProvider>
        )}
      </main>
    </div>
  );
}
