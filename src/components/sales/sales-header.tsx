import { Plus } from '../../assets/icons';
import { useStockContext } from '../../contexts/stock/stock-context';
import { useUI } from '../../contexts/ui-context';
import SectionHeader from '../ui/section-header';

export default function SalesHeader() {
  const { openModal } = useUI();

  const { stock } = useStockContext();

  const handleAdd = () => {
    if (stock.length === 0) {
      alert('Error: no products were found');
      return;
    }

    openModal({ type: 'ADD_SALE' });
  };

  return (
    <SectionHeader
      title='Sales'
      description='Product sales'
      actionLabel='Add sale'
      icon={Plus}
      onAction={handleAdd}
    />
  );
}
