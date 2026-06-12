import { useMemo } from 'react';
import type { Column } from '../../../lib/types/column';
import type { MovementResponse } from '../../../lib/types/movement';
import { formatDate } from '../../../lib/utils/format-date';
import { useMovements } from '../../contexts/movements/movements-context';
import { useStockContext } from '../../contexts/stock/stock-context';
import { Table } from '../ui/table';

export default function MovementsTable() {
  const { movements, currentPage, pageSize, totalElements, isLoading, error, goToPage } =
    useMovements();
  const { stock } = useStockContext();

  const stockMap = useMemo(
    () => new Map(stock.map((item) => [item.resourceId, item.productResponseModel.name])),
    [stock],
  );

  const columns: Column<MovementResponse>[] = useMemo(
    () => [
      {
        header: 'Product',
        accessor: 'stockResourceId',
        render: (row) => stockMap.get(row.stockResourceId) ?? row.stockResourceId,
      },
      { header: 'Quantity', accessor: 'quantity' },
      { header: 'Note', accessor: 'note' },
      { header: 'Created At', accessor: 'createdAt', render: (row) => formatDate(row.createdAt) },
    ],
    [stockMap],
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
        data={movements}
        currentPage={currentPage}
        totalItems={totalElements}
        pageSize={pageSize}
        onPageChange={goToPage}
        emptyState='No movement records available.'
        isLoading={isLoading}
      />
    </div>
  );
}
