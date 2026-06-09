'use client';

'use client';

import { useMemo } from 'react';
import type { Column } from '../../../lib/types/column';
import type { MovementResponse } from '../../../lib/types/movement';
import { useMovements } from '../../contexts/movements-context';
import { Table } from '../ui/table';

export default function MovementsTable() {
  const { movements, currentPage, pageSize, totalElements, isLoading, error, goToPage } =
    useMovements();

  const columns: Column<MovementResponse>[] = useMemo(
    () => [
      { header: 'Resource', accessor: 'resourceId' },
      { header: 'Quantity', accessor: 'quantity' },
      { header: 'Note', accessor: 'note' },
      { header: 'Created At', accessor: 'createdAt' },
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
        data={movements}
        currentPage={currentPage}
        totalItems={totalElements}
        pageSize={pageSize}
        onPageChange={goToPage}
        getRowId={(row) => row.resourceId}
        emptyState='No movement records available.'
        isLoading={isLoading}
      />
    </div>
  );
}
