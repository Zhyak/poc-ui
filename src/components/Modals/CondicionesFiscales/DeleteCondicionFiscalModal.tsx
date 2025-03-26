import React from "react";
import { Modal } from "@mui/material";

import { IModal } from "api/types";
import {
  AplicativosModalContent,
  AplicativosModalTitle,
  AplicativosModalFooter,
  DeleteButton,
  CancelButton,
} from "components/StyledComponents";
import useCondicionFiscal from "api/condicionesFiscales";

import { useState } from "react";
import { Snackbar } from "@mui/material";

const DeleteCondicionFiscalModal = ({ onClose, options }: IModal) => {
  const { deleteCondicionFiscal } = useCondicionFiscal();
  const { descripcionCondicionFiscal, id } = options || {};
  const [error, setError] = useState<string | null>(null);

  const handleDeleteCondicionFiscal = async () => {
    if (!id) {
      return;
    }
    try {
      await deleteCondicionFiscal({ id });
      onClose(true);
    } catch (error) {
      setError("No se pudo eliminar la Condición Fiscal. Intente nuevamente.");
    }
  };

  return (
    <>
      <Modal
        open={true}
        onClose={() => onClose(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <AplicativosModalContent>
          <AplicativosModalTitle className="text-center">
            {`¿Desea eliminar la Condición Fiscal "${descripcionCondicionFiscal || "Sin descripción"}"?`}
          </AplicativosModalTitle>
          <AplicativosModalFooter>
            <DeleteButton onClick={handleDeleteCondicionFiscal}>
              Eliminar
            </DeleteButton>
            <CancelButton onClick={() => onClose(false)}>Cancelar</CancelButton>
          </AplicativosModalFooter>
        </AplicativosModalContent>
      </Modal>
      {error && (
        <Snackbar
          open={!!error}
          message={error}
          autoHideDuration={3000}
          onClose={() => setError(null)}
        />
      )}
    </>
  );
};

export default DeleteCondicionFiscalModal;
