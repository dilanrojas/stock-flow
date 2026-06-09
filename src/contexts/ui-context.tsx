import { createContext, useContext, useState } from 'react';

import type { ModalState } from '../../lib/types/modal';

type UIContextType = {
  modalState: ModalState;
  openModal: (modalState: ModalState) => void;
  closeModal: () => void;
};

const UIContext = createContext<UIContextType | undefined>(undefined);

export default function UIProvider({ children }: { children: React.ReactNode }) {
  const [modalState, setModalState] = useState<ModalState>({ type: 'ADD_MOVEMENT' });

  const openModal = (state: ModalState) => setModalState(state);
  const closeModal = () => setModalState({ type: 'NONE' });

  return (
    <UIContext.Provider value={{ modalState, openModal, closeModal }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within a UIContextProvider');
  return ctx;
}
