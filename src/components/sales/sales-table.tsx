import { useMemo } from 'react';
import type { Column } from '../../../lib/types/column';
import type { SaleResponse } from '../../../lib/types/sale';
import { useSalesContext } from '../../contexts/sales/sales-context';
import { Table } from '../ui/table';


export default function SalesTable() {
  const { sales, currentPage, pageSize, totalElements, isLoading, error, goToPage } =
    useSalesContext();

  const columns: Column<SaleResponse>[] = useMemo(
    () => [
      { header: 'Date', accessor: 'date' },
      { header: 'Resource', accessor: 'resourceId' },
      { header: 'Total Products', accessor: 'totalProductsAmount' },
      { header: 'Sale Total', accessor: 'saleTotal' },
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
        data={sales}
        currentPage={currentPage}
        totalItems={totalElements}
        pageSize={pageSize}
        onPageChange={goToPage}
        emptyState='No sale records available.'
        isLoading={isLoading}
      />
    </div>
  );
}