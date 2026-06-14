import { useMemo, useState } from 'react';
import type { Column } from '../../../../lib/types/column';
import type { StockResponse } from '../../../../lib/types/stock';
import { formatPrice } from '../../../../lib/utils/format-price';
import { Empty, PencilSquare, Trash } from '../../../assets/icons';
import { useStockContext } from '../../../contexts/stock/stock-context';
import { useUI } from '../../../contexts/ui-context';
import Button from '../../ui/button';
import { Table } from '../../ui/table';
import styles from './products-table.module.css';
import { StockIndicator } from './stock-indicator';

export const ProductsTable = () => {
  const { stock, currentPage, pageSize, totalElements, isLoading, error, goToPage } =
    useStockContext();
  const { openModal } = useUI();
  const [imageError, setImageError] = useState<boolean>(false);

  const columns: Column<StockResponse>[] = useMemo(
    () => [
      {
        header: 'Image',
        render: (row) => {
          const url = row.productResponseModel.imageURL;

          if (!url || imageError) {
            return <Empty className={styles['fallback-image']}></Empty>;
          }

          return (
            <img
              className={styles['product-image']}
              alt='product-image'
              src={url}
              onError={() => setImageError(true)}
            ></img>
          );
        },
      },

      {
        header: 'Name',
        render: (row) => (
          <span className={styles['product-name']}>{row.productResponseModel.name}</span>
        ),
      },

      {
        header: 'Category',
        render: (row) => (
          <span className={styles['category-badge']}>
            {row.productResponseModel.categoryResponseModel.name}
          </span>
        ),
      },

      {
        header: 'Stock',
        render: (row) => (
          <span className={styles['stock-quantity']}>{`${row.quantity} units`}</span>
        ),
      },

      {
        header: 'Price',
        render: (row) => (
          <span className={styles['product-price']}>
            {formatPrice(row.productResponseModel.price)}
          </span>
        ),
      },

      {
        header: 'Availability',
        render: (row) => (
          <StockIndicator
            quantity={row.quantity}
            minimumQuantity={row.minimumQuantity}
          ></StockIndicator>
        ),
      },

      {
        header: 'Actions',
        render: (row) => {
          const isOptimistic = row.productResponseModel.resourceId.startsWith('temp');

          return (
            <div className={styles['acction-buttons']}>
              <Button
                disabled={isOptimistic}
                variant='tertiary'
                onClick={() =>
                  openModal({
                    type: 'EDIT_PRODUCT',
                    resourceId: row.productResponseModel.resourceId,
                  })
                }
              >
                <PencilSquare />
              </Button>

              <Button
                disabled={isOptimistic}
                variant='tertiary'
                onClick={() =>
                  openModal({
                    type: 'DELETE_PRODUCT',
                    resourceId: row.productResponseModel.resourceId,
                  })
                }
              >
                <Trash color='red' />
              </Button>
            </div>
          );
        },
      },
    ],
    [openModal, imageError],
  );

  return (
    <div className={styles.container}>
      {error ? <div className='error'>{error}</div> : null}

      <Table
        columns={columns}
        data={stock}
        currentPage={currentPage}
        totalItems={totalElements}
        pageSize={pageSize}
        onPageChange={goToPage}
        emptyState='Noy hay productos registrados'
        isLoading={isLoading}
      ></Table>
    </div>
  );
};
