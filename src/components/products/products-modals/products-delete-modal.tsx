import { useStockContext } from '../../../contexts/stock/stock-context'; 
import Modal from '../../modals/modal'; 

type DeleteModalProps = {
  resourceId : string

}
export default function DeleteProductModal({resourceId} : DeleteModalProps) {
  const { stock, deleteProduct } = useStockContext();

  const currentStock = stock.find(
    (item) => item.productResponseModel.resourceId === resourceId,
  )!;
  const productName = currentStock.productResponseModel.name;

  const handleDelete = (): boolean => {
    deleteProduct(resourceId);
    return true;
  };

  return (
    <Modal title='Eliminar producto' action={handleDelete} buttonSubmitLabel='Confirm'>
      <p>
        ¿Estás seguro de que deseas eliminar <strong>{productName}</strong>
      </p>
    </Modal>
  );
}