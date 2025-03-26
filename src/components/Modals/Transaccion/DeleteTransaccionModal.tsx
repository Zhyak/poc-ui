import React, { useState } from "react";
import { Modal, Typography } from "@mui/material";
import {
  AplicativosModalContent,
  AplicativosModalTitle,
  AplicativosModalFooter,
  DeleteButton,
  CancelButton,
} from "components/StyledComponents";
import useTransacciones from "../../../api/transaccion";
import { Transaccion } from "api/types";

interface DeleteTransaccionModalProps {
  onClose: (success: boolean) => void;
  options: {
    transaccion: Transaccion;
  };
  actions?: any;
}

const DeleteTransaccionModal: React.FC<DeleteTransaccionModalProps> = ({
  onClose,
  options
}) => {
  const { eliminarTransaccion } = useTransacciones();
  const [loading, setLoading] = useState(false);

  // Extraemos la transaccion
  const { transaccion } = options;

  const handleDeleteTransaccion = async () => {
    setLoading(true);
    try {
      await eliminarTransaccion({ id: transaccion.id });
      onClose(true);
    } catch (error) {
      console.error("Error al eliminar la transacción:", error);
      onClose(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open
      onClose={() => onClose(false)}
      aria-labelledby="delete-transaccion-modal-title"
      aria-describedby="delete-transaccion-modal-description"
    >
      <AplicativosModalContent>
        <AplicativosModalTitle id="delete-transaccion-modal-title">
          {`¿Desea eliminar la transacción "${transaccion.descripcion}"?`}
        </AplicativosModalTitle>
        <Typography sx={{ color: "red", marginTop: 2 }} id="delete-transaccion-modal-description">
          Esta acción no se puede deshacer.
        </Typography>
        <AplicativosModalFooter>
          <DeleteButton onClick={handleDeleteTransaccion} disabled={loading}>
            {loading ? "Eliminando..." : "Eliminar"}
          </DeleteButton>
          <CancelButton onClick={() => onClose(false)}>Cancelar</CancelButton>
        </AplicativosModalFooter>
      </AplicativosModalContent>
    </Modal>
  );
};

export default DeleteTransaccionModal;
