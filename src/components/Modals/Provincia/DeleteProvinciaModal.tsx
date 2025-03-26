import React from "react";

import { Modal } from "@mui/material";
import useProvincias from "api/provincias";
import { IModal } from "api/types";
import {
  AplicativosModalContent,
  AplicativosModalTitle,
  AplicativosModalFooter,
  DeleteButton,
  CancelButton,
} from "components/StyledComponents";

const DeleteAplicativoModal = ({ onClose, options }: IModal) => {
  const { deleteProvincia } = useProvincias();

  const handleDeleteProvincia = () => {
    const { idProvincia, idAplicativo } = options;
    if (idProvincia) {
      deleteProvincia({ idProvincia, idAplicativo });
      onClose();
    }
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <AplicativosModalContent>
        <AplicativosModalTitle className="text-center">{`¿Desea eliminar la Provincia ${options.nombreProvincia} - ${options.mnemonico}`}</AplicativosModalTitle>
        <AplicativosModalFooter>
          <DeleteButton onClick={handleDeleteProvincia}>Eliminar</DeleteButton>
          <CancelButton onClick={onClose}>Cancelar</CancelButton>
        </AplicativosModalFooter>
      </AplicativosModalContent>
    </Modal>
  );
};

export default DeleteAplicativoModal;
