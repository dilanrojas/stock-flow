'use client';

import { useUI } from '../../contexts/ui-context';
import MovementsModal from '../movements/movements-modal';

export default function ModalRoot() {
  const { modalState } = useUI();

  switch (modalState.type) {
    case 'ADD_MOVEMENT':
      return <MovementsModal />;
    default:
      return null;
  }
}
