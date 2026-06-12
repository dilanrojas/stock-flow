import { useMemo } from 'react';
import type { Column } from '../../../lib/types/column';
import type { PurchaseResponseModel } from '../../../lib/types/purchase';
import { usePurchaseContext } from '../../contexts/purchases/purchases-context';
import { Table } from '../ui/table';

export default function PurchasesTable() {
  const { purchases, currentPage, pageSize, totalElements, isLoading, error, goToPage } =
    usePurchaseContext();

  const columns: Column<PurchaseResponseModel>[] = useMemo(
    () => [
      { header: 'Resource', accessor: 'resourceId' },
      { header: 'Date', accessor: 'date' },
      { header: 'Reason', accessor: 'reason' },
      { header: 'Total Products', accessor: 'totalProductsAmount' },
      { header: 'Purchase Total', accessor: 'purchaseTotal' },
    ],
    [],
  );

  return (
    <div className='space-y-4'>
      {error ? (
        <div className='rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700'>
          {error}
        </div>
      ) : null}

      <Table
        columns={columns}
        data={purchases}
        currentPage={currentPage}
        totalItems={totalElements}
        pageSize={pageSize}
        onPageChange={goToPage}
        getRowId={(row) => row.resourceId}
        emptyState='No purchase records available.'
        isLoading={isLoading}
      />
    </div>
  );
}
