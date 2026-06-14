import { useUI } from '../../contexts/ui-context';
import MovementsModal from '../movements/movements-modal';
import AddProductModal from '../products/products-modals/products-add-modal';
import DeleteProductModal from '../products/products-modals/products-delete-modal';
import EditProductModal from '../products/products-modals/products-edit-modal';
import PurchasesModal from '../purchases/purchases-modal';
import SalesModal from '../sales/sales-modal';

export default function ModalRoot() {
  const { modalState } = useUI();

  switch (modalState.type) {
    case 'ADD_MOVEMENT':
      return <MovementsModal />;
    case 'ADD_PURCHASE':
      return <PurchasesModal />;

    case 'ADD_PRODUCT':
      return <AddProductModal />;

    case 'EDIT_PRODUCT':
      return <EditProductModal resourceId={modalState.resourceId} />;

    case 'DELETE_PRODUCT':
      return <DeleteProductModal resourceId={modalState.resourceId} />;

    case 'ADD_SALE':
      return <SalesModal />;
    default:
      return null;
  }
}
