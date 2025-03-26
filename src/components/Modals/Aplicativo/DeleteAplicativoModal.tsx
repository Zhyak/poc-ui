import React, { useState } from "react";
import { Modal } from "@mui/material";
import {
  AplicativosModalContent,
  AplicativosModalFooter,
  AplicativosModalTitle,
  CancelButton,
  DeleteButton,
} from "components/StyledComponents";
import useAplicativos from "api/aplicativos";
import { IModal } from "api/types";
import Toast from "../../shared/toast";

const DeleteAplicativoModal = ({ onClose, options, actions }: IModal) => {
  const { deleteAplicativo } = useAplicativos();
  const { mnemonico, idAplicativo } = options;

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleDeleteAplicativo = async () => {
    if (idAplicativo) {
      try {
        await deleteAplicativo({ idAplicativo });
        onClose(true);
        if (actions && actions.onConfirm) {
          actions.onConfirm({ success: true });
        }
      } catch (error: any) {
        const errorMessage = error.message || 'Error desconocido al eliminar el aplicativo';
        onClose(false);
        if (actions && actions.onConfirm) {
          actions.onConfirm({ success: false, message: errorMessage });
        }
      }
    }
  };
  
  const handleCancel = () => {
    onClose(false);
    if (actions && actions.onCancel) {
      actions.onCancel();
    }
  };

  return (
    <>
      <Modal
        open={true}
        onClose={() => handleCancel()}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <AplicativosModalContent>
          <AplicativosModalTitle className="text-center">{`¿Desea eliminar el aplicativo ${mnemonico}?`}</AplicativosModalTitle>
          <AplicativosModalFooter>
            <DeleteButton onClick={handleDeleteAplicativo}>Eliminar</DeleteButton>
            <CancelButton onClick={handleCancel}>Cancelar</CancelButton>
          </AplicativosModalFooter>
        </AplicativosModalContent>
      </Modal>
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </>
  );
};

export default DeleteAplicativoModal;
