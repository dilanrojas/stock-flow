import { Plus } from '../../assets/icons';
import { useStockContext } from '../../contexts/stock/stock-context';
import { useUI } from '../../contexts/ui-context';
import SectionHeader from '../ui/section-header';

export default function MovementsHeader() {
  const { openModal } = useUI();
  const { stock } = useStockContext();

  const handleAdd = () => {
    if (stock.length === 0) {
      alert('Error: no products were found');
      return;
    }

    openModal({ type: 'ADD_MOVEMENT' });
  };

  return (
    <SectionHeader
      title='Inventory movements'
      description='Inflows and outflows of stock items'
      actionLabel='Add movement'
      icon={Plus}
      onAction={handleAdd}
    />
  );
}
