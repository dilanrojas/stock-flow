import { Plus } from '../../assets/icons';
import { useUI } from '../../contexts/ui-context';
import SectionHeader from '../ui/section-header';

export default function ProductsHeader() {
  const { openModal } = useUI();

  const handleOpenModal = () => {
    openModal({ type: 'ADD_PRODUCT' });
  };

  return (
    <SectionHeader
      title='Products'
      description='Manage your products inventory'
      actionLabel='Add Product'
      onAction={handleOpenModal}
      icon={Plus}
    />
  );
}
