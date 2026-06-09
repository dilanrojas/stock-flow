import { Plus } from '../../assets/icons';
import { useUI } from '../../contexts/ui-context';
import SectionHeader from '../ui/section-header';

export default function MovementsHeader() {
  const { openModal } = useUI();

  return (
    <SectionHeader
      title='Inventory movements'
      description='Inflows and outflows of stock items'
      actionLabel='Add movement'
      icon={Plus}
      onAction={() => openModal({ type: 'ADD_MOVEMENT' })}
    />
  );
}
