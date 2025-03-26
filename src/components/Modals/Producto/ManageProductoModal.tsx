import React from "react";
import {
  Modal,
  Typography,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
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

interface IManageProductoModal {
  open: boolean;
  close: () => void;
  title: string;
  formData: {
    descripcion: string;
    codigoExterno: string;
    idAplicativo: number;
  };
  aplicativos: { idAplicativo: number; mnemonico: string }[];
  handleDescripcionChange: (value: string) => void;
  handleCodigoChange: (value: string) => void;
  handleAplicativoChange: (value: number) => void;
  buttonName: string;
  handleGuardarProducto: () => void;
  isEdit: boolean;
  children?: React.ReactNode;
}

const ManageProductoModal: React.FC<IManageProductoModal> = ({
  open,
  close,
  title,
  formData,
  aplicativos,
  handleDescripcionChange,
  handleCodigoChange,
  handleAplicativoChange,
  buttonName,
  handleGuardarProducto,
  isEdit,
  children
}) => {
  const canSubmit =
    formData.descripcion.trim() &&
    formData.codigoExterno.trim() &&
    formData.idAplicativo > 0;

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
            label="Descripción *"
            placeholder="Ingrese descripción del producto"
            value={formData.descripcion || ""}
            onChange={(e) => handleDescripcionChange(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginTop: 3 }}>
          <InputLabel id="aplicativo">Aplicativo *</InputLabel>
          <Select
            id="aplicativo"
            value={formData.idAplicativo || ""}
            label="Aplicativo *"
            onChange={(e) => handleAplicativoChange(Number(e.target.value))}
          >
            {aplicativos.map((aplicativo) => (
              <MenuItem
                key={aplicativo.idAplicativo}
                value={aplicativo.idAplicativo}
              >
                {aplicativo.mnemonico || "Sin nombre"}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ marginTop: 3 }}>
          <TextField
            label="Código *"
            placeholder="Ingrese código del producto"
            value={formData.codigoExterno || ""}
            onChange={(e) => handleCodigoChange(e.target.value)}
          />
        </FormControl>

        <Typography sx={{ color: "red", marginTop: 2 }}>
          * campos obligatorios
        </Typography>

        <AplicativosModalFooter>
          <OutlinedActionButton onClick={close}>Cancelar</OutlinedActionButton>
          <ActionButton onClick={handleGuardarProducto} disabled={!canSubmit}>
            {buttonName}
          </ActionButton>
        </AplicativosModalFooter>
      </AplicativosModalContent>
    </Modal>
  );
};

export default ManageProductoModal;
