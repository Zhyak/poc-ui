import React from "react";

import { Box, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Aplicativo } from "api/types";
import {
  AplicativosModalContent,
  AplicativosModalHeader,
  AplicativosModalTitle,
  AplicativosModalCloseButton,
  AplicativosModalInput,
  AplicativosUpdateDetails,
  AplicativosModalFooter,
  ActionButton,
} from "components/StyledComponents";

interface IManageAplicativoModal {
  open: boolean;
  close: () => void;
  title: string;
  formData: Aplicativo;
  handleMnemonicoChange: (mnemonico: string) => void;
  handleDescripcionChange: (descripcion: string) => void;
  buttonName: string;
  handleGuardarAplicativo: () => void;
}

const ManageAplicativoModal: React.FC<IManageAplicativoModal> = ({
  open,
  close,
  title,
  formData,
  handleMnemonicoChange,
  handleDescripcionChange,
  buttonName,
  handleGuardarAplicativo,
}) => {
  const isValidMnemonico = formData.mnemonico.length > 0;
  const isValidDescripcion = formData.descripcion.length > 0;
  const canSubmit = isValidMnemonico && isValidDescripcion;

  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <AplicativosModalContent>
        <AplicativosModalHeader>
          <AplicativosModalTitle>{title}</AplicativosModalTitle>

          <AplicativosModalCloseButton onClick={close}>
            <CloseIcon />
          </AplicativosModalCloseButton>
        </AplicativosModalHeader>
        <Box>
          <AplicativosModalInput
            onChange={(event) => handleMnemonicoChange(event?.target.value)}
            value={formData.mnemonico}
            fullWidth
            id="mnemonico"
            label="Mnemónico *"
            variant="outlined"
          />
          <AplicativosModalInput
            fullWidth
            onChange={(event) => handleDescripcionChange(event?.target.value)}
            value={formData.descripcion}
            id="descripcion"
            label="Descripcion del aplicativo *"
            variant="outlined"
            multiline
            rows={2}
          />
        </Box>
        {formData.fechaActualizacion && (
          <AplicativosUpdateDetails>
            <Typography>{`Ultima actualización: ${new Date(
              formData.fechaActualizacion
            ).toDateString()}`}</Typography>
            <Typography>{`Realizada por: ${formData.usuario}`}</Typography>
          </AplicativosUpdateDetails>
        )}
        <AplicativosModalFooter>
          <Typography>* campos obligatorios</Typography>

          <ActionButton onClick={handleGuardarAplicativo} disabled={!canSubmit}>
            {buttonName}
          </ActionButton>
        </AplicativosModalFooter>
      </AplicativosModalContent>
    </Modal>
  );
};

export default ManageAplicativoModal;
