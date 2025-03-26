import React from "react";
import { Modal } from "@mui/material";
import {
  AplicativosModalContent,
  AplicativosModalTitle,
  AplicativosModalFooter,
  DeleteButton,
  CancelButton,
} from "components/StyledComponents";
import useTiposDePersona from "api/tiposDePersona";
import { IModal } from "api/types";

const DeleteTipoDePersonaModal = ({ onClose, options }: IModal) => {
  const { deleteTipoDePersona } = useTiposDePersona();

  const handleDeleteTipoDePersona = async () => {
    const { id } = options;

    if (id !== undefined) {
      try {
        await deleteTipoDePersona({ id });
        onClose(true);
      } catch (error) {
        console.error("Error al eliminar el Tipo de Persona:", error);
        onClose(false);
      }
    } else {
      console.warn("ID no proporcionado para eliminar el Tipo de Persona.");
      onClose(false);
    }
  };

  return (
    <Modal
      open={true}
      onClose={() => onClose(false)}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <AplicativosModalContent>
        <AplicativosModalTitle className="text-center">
          {`¿Desea eliminar el tipo de persona "${options.tipoPersona}" del aplicativo con ID ${options.idAplicativo}?`}
        </AplicativosModalTitle>
        <AplicativosModalFooter>
          <DeleteButton onClick={handleDeleteTipoDePersona}>
            Eliminar
          </DeleteButton>
          <CancelButton onClick={() => onClose(false)}>Cancelar</CancelButton>
        </AplicativosModalFooter>
      </AplicativosModalContent>
    </Modal>
  );
};

export default DeleteTipoDePersonaModal;
