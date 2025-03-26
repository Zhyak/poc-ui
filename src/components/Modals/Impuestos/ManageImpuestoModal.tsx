import React from "react";
import {
  Modal,
  Typography,
  FormControl,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  AplicativosModalContent,
  AplicativosModalHeader,
  AplicativosModalTitle,
  AplicativosModalCloseButton,
  AplicativosModalFooter,
  ActionButton,
  OutlinedActionButton,
} from "components/StyledComponents";

interface IManageImpuestoModal {
  open: boolean;
  close: () => void;
  title: string;
  formData: {
    mnemonico: string;
    descripcion: string;
  };
  handleMnemonicoChange: (value: string) => void;
  handleDescripcionChange: (value: string) => void;
  buttonName: string;
  handleGuardarImpuesto: () => void;
  isEdit: boolean;
  children?: React.ReactNode;
}

const ManageImpuestoModal: React.FC<IManageImpuestoModal> = ({
  open,
  close,
  title,
  formData,
  handleMnemonicoChange,
  handleDescripcionChange,
  buttonName,
  handleGuardarImpuesto,
  isEdit,
  children
}) => {
  const canSubmit =
    formData.mnemonico.trim() &&
    formData.descripcion.trim();

  return (
    <Modal open={open} onClose={close}>
      <AplicativosModalContent>
        <AplicativosModalHeader>
          <AplicativosModalTitle>{title}</AplicativosModalTitle>
          <AplicativosModalCloseButton onClick={close}>
            <CloseIcon />
          </AplicativosModalCloseButton>
        </AplicativosModalHeader>

        <FormControl fullWidth sx={{ marginTop: 3 }}>
          <TextField
            label="Mnemonico *"
            placeholder="Ingrese mnemonico del impuesto"
            value={formData.mnemonico || ""}
            onChange={(e) => handleMnemonicoChange(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginTop: 3 }}>
          <TextField
            label="Descripción *"
            placeholder="Ingrese descripción del impuesto"
            value={formData.descripcion || ""}
            onChange={(e) => handleDescripcionChange(e.target.value)}
          />
        </FormControl>

        <Typography sx={{ color: "red", marginTop: 2 }}>
          * campos obligatorios
        </Typography>

        <AplicativosModalFooter>
          <OutlinedActionButton onClick={close}>Cancelar</OutlinedActionButton>
          <ActionButton onClick={handleGuardarImpuesto} disabled={!canSubmit}>
            {buttonName}
          </ActionButton>
        </AplicativosModalFooter>
      </AplicativosModalContent>
    </Modal>
  );
};

export default ManageImpuestoModal;
