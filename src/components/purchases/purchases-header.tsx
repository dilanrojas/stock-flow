import { Plus } from '../../assets/icons';
import { useStockContext } from '../../contexts/stock/stock-context';
import { useUI } from '../../contexts/ui-context';
import SectionHeader from '../ui/section-header';

export default function PurchasesHeader() {
  const { openModal } = useUI();

  const { stock } = useStockContext();

  const handleAdd = () => {
    if (stock.length === 0) {
      alert('Error: no products were found');
      return;
    }

    openModal({ type: 'ADD_PURCHASE' });
  };

  return (
    <SectionHeader
      title='Purchases'
      description='Product purchases and procurement records'
      actionLabel='Add purchase'
      icon={Plus}
      onAction={handleAdd}
    />
  );
}
