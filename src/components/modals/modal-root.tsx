import { useUI } from '../../contexts/ui-context';
import MovementsModal from '../movements/movements-modal';
import PurchasesModal from '../purchases/purchases-modal';
import SalesModal from '../sales/sales-modal';

export default function ModalRoot() {
  const { modalState } = useUI();

  switch (modalState.type) {
    case 'ADD_MOVEMENT':
      return <MovementsModal />;
    case 'ADD_PURCHASE':
      return <PurchasesModal />;
    case 'ADD_SALE':
      return <SalesModal />;
    default:
      return null;
  }
}
