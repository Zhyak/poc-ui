import React, { ReactNode, createContext, useState } from "react";
import Modals from "..";

type ModalContextType = {
  openedModals: {
    type: string;
    options: any;
    actions?: { onConfirm: (props: any) => void; onCancel: () => void };
  }[];
  openModal: (
    type: string,
    props?: any,
    actions?: { onConfirm: (props: any) => void; onCancel: () => void }
  ) => void;
  closeModal: () => void;
  closeAllModals: () => void;
};

const ModalContextValues = {
  openedModals: [],
  openModal: () => {},
  closeModal: () => {},
  closeAllModals: () => {},
};

const ModalContext = createContext<ModalContextType>(ModalContextValues);

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [openedModals, setOpenedModals] = useState<
    {
      type: string;
      options: any;
      actions?: { onConfirm: (props?: any) => void; onCancel: () => void };
    }[]
  >([]);

  const openModal = (
    type: string,
    options: any,
    actions?: { onConfirm: (props: any) => void; onCancel: () => void }
  ) => setOpenedModals([...openedModals, { type, options, actions }]);

  const closeModal = (confirmed = false) => {
    const lastModal = openedModals[openedModals.length - 1];
    if (confirmed && lastModal?.actions?.onConfirm) {
      lastModal.actions.onConfirm();
    }
    if (!confirmed && lastModal?.actions?.onCancel) {
      lastModal.actions.onCancel();
    }
    setOpenedModals(openedModals.slice(0, -1));
  };

  const closeAllModals = () => {
    setOpenedModals([]);
  };

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, closeAllModals, openedModals }}
    >
      {/* Envolver Modals en un fragmento */}
      <Modals />
      {children}
    </ModalContext.Provider>
  );
};

export { ModalProvider, ModalContext, ModalContextValues };

export type { ModalContextType };
