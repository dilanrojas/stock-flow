import styles from './sock-indicator.module.css';

type StockIndicatorProps = {
  quantity: number;
  minimumQuantity: number;
};

const getStockStatus = (quantity: number, minimumQuantity: number) => {
  const isLowStock = quantity <= minimumQuantity;

  if (quantity === 0) {
    return {
      label: 'Out of Stock',
      className: styles['out-of-stock'],
    };
  }

  if (isLowStock) {
    return {
      label: 'Low Stock',
      className: styles['low-stock'],
    };
  }

  return {
    label: 'Available',
    className: styles.available,
  };
};

export const StockIndicator = ({ quantity, minimumQuantity }: StockIndicatorProps) => {
  const status = getStockStatus(quantity, minimumQuantity);

  return <span className={`${styles['stock-status']} ${status.className}`}>{status.label}</span>;
};
