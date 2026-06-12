import { Plus } from '../../assets/icons';
import { useUI } from '../../contexts/ui-context';
import SectionHeader from '../ui/section-header';

export default function PurchasesHeader() {
  const { openModal } = useUI();

  return (
    <SectionHeader
      title='Purchases'
      description='Product purchases and procurement records'
      actionLabel='Add purchase'
      icon={Plus}
      onAction={() => openModal({ type: 'ADD_PURCHASE' })}
    />
  );
}
