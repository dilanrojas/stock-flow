import type { Column } from '../../../lib/types/column';
import { ChevronLeft, ChevronRight } from '../../assets/icons';

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  currentPage?: number;
  totalItems?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  getRowId?: (row: T) => string | number;
  emptyState?: React.ReactNode;
  isLoading?: boolean;
}

export function Table<T>({
  columns,
  data,
  currentPage = 1,
  totalItems,
  pageSize = 10,
  onPageChange,
  emptyState,
  isLoading = false,
}: TableProps<T>) {
  // --- Constants & Calculations ---
  const itemCount = totalItems ?? data.length;
  const totalPages = onPageChange ? Math.max(1, Math.ceil(itemCount / pageSize)) : 1;
  const startItem = itemCount > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const endItem = Math.min(currentPage * pageSize, itemCount);

  // Generating deterministic keyable arrays instead of using raw indices
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const loadingRows = Array.from({ length: Math.max(3, pageSize) }, (_, i) => `loading-row-${i}`);

  return (
    <div className='w-full overflow-x-auto rounded-lg border border-gray-100 bg-white shadow-sm'>
      <table className='w-full border-collapse text-left text-sm text-gray-600'>
        {/* --- Table Header --- */}
        <thead className='bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-400'>
          <tr>
            {columns.map((col) => {
              const headerKey = crypto.randomUUID();
              return (
                <th
                  key={headerKey}
                  className='px-6 py-4'
                >
                  {col.header}
                </th>
              );
            })}
          </tr>
        </thead>

        {/* --- Table Body --- */}
        <tbody className='divide-y divide-gray-100 border-t border-gray-100'>
          {isLoading ? (
            /* Loading State */
            loadingRows.map((_) => (
              <tr
                key={crypto.randomUUID()}
                className='animate-pulse'
              >
                {columns.map((_) => {
                  const cellKey = `${crypto.randomUUID()}`;
                  return (
                    <td
                      key={cellKey}
                      className='whitespace-nowrap px-6 py-4'
                    >
                      <div className='h-4 w-full rounded bg-gray-200' />
                    </td>
                  );
                })}
              </tr>
            ))
          ) : data.length === 0 ? (
            /* Empty State */
            <tr>
              <td
                colSpan={columns.length}
                className='px-6 py-8 text-center text-sm text-gray-500'
              >
                {emptyState ?? 'No records found.'}
              </td>
            </tr>
          ) : (
            /* Data State */
            data.map((row) => {
              const rowKey = crypto.randomUUID();

              return (
                <tr
                  key={rowKey}
                  className='transition-colors hover:bg-gray-50'
                >
                  {columns.map((col) => {
                    const cellKey = `${crypto.randomUUID()}`;
                    return (
                      <td
                        key={cellKey}
                        className='whitespace-nowrap px-6 py-4'
                      >
                        {col.render
                          ? col.render(row)
                          : col.accessor
                            ? String(row[col.accessor])
                            : null}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* --- Pagination Footer --- */}
      {onPageChange && (
        <div className='flex items-center justify-between border-t border-gray-100 px-6 py-4 text-sm text-gray-500'>
          <div>
            Showing{' '}
            <span className='font-medium text-gray-900'>
              {startItem}-{endItem}
            </span>{' '}
            of <span className='font-medium text-gray-900'>{itemCount.toLocaleString()}</span>
          </div>

          <div className='flex items-center gap-1'>
            <button
              type='button'
              onClick={() => !isLoading && onPageChange(Math.max(1, currentPage - 1))}
              disabled={isLoading || currentPage === 1}
              className='rounded border border-gray-200 p-2 transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white'
            >
              <span>
                <ChevronLeft />
              </span>
            </button>

            {pageNumbers.map((page) => (
              <button
                type='button'
                key={`page-${page}`}
                onClick={() => !isLoading && onPageChange(page)}
                disabled={isLoading}
                className={`rounded px-3 py-1.5 font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                } ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                {page}
              </button>
            ))}

            <button
              type='button'
              onClick={() => !isLoading && onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={isLoading || currentPage === totalPages}
              className='rounded border border-gray-200 p-2 transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white'
            >
              <span>
                <ChevronRight />
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
