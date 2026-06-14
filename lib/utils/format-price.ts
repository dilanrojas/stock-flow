export const formatPrice = (price: number) => {
  return price.toLocaleString('es-CR', {
    style: 'currency',
    currency: 'CRC',
  });
};
