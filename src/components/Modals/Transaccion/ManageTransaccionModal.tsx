import React from "react";
import {
  Modal,
  Typography,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Checkbox,
  ListItemText,
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

interface ITransaccionFormData {
  aplicativo: string;
  codigoProductoAsociado: string;
  descripcionProducto: string;

  descripcion: string;
  codigoExterno: string;
  tipoOpMonetaria: string;
  impuestos: number[];
}

interface IManageTransaccionModalProps {
  open: boolean;
  close: () => void;
  title: string;

  formData: ITransaccionFormData;

  tipoOperacionOptions: string[];
  impuestosOptions?: { id: number; nombre: string }[];


  handleDescripcionChange: (value: string) => void;
  handleCodigoChange: (value: string) => void;
  handleTipoOpChange: (value: string) => void;
  handleImpuestosChange: (newValues: number[]) => void;

  buttonName: string;
  handleGuardarTransaccion: () => void;
  canSubmit: boolean;
}

const ManageTransaccionModal: React.FC<IManageTransaccionModalProps> = ({
  open,
  close,
  title,
  formData,
  tipoOperacionOptions,
  impuestosOptions = [],
  handleDescripcionChange,
  handleCodigoChange,
  handleTipoOpChange,
  handleImpuestosChange,
  buttonName,
  handleGuardarTransaccion,
  canSubmit,
}) => {
  const impuestosSeleccionados = formData.impuestos || [];

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
            label="Aplicativo"
            value={formData.aplicativo || ""}
            InputProps={{
              readOnly: true,
              style: { backgroundColor: "#f5f5f5" },
            }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginTop: 3 }}>
          <TextField
            label="Código del producto asociado"
            value={formData.codigoProductoAsociado || ""}
            InputProps={{
              readOnly: true,
              style: { backgroundColor: "#f5f5f5" },
            }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginTop: 3 }}>
          <TextField
            label="Descripción del producto"
            value={formData.descripcionProducto || ""}
            InputProps={{
              readOnly: true,
              style: { backgroundColor: "#f5f5f5" },
            }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginTop: 3 }}>
          <TextField
            required
            label="Descripción *"
            value={formData.descripcion}
            onChange={(e) => handleDescripcionChange(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginTop: 3 }}>
          <TextField
            required
            label="Código *"
            value={formData.codigoExterno}
            onChange={(e) => handleCodigoChange(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginTop: 3 }}>
          <InputLabel id="tipo-op-label">Tipo de Operación *</InputLabel>
          <Select
            labelId="tipo-op-label"
            label="Tipo de Operación *"
            value={formData.tipoOpMonetaria}
            onChange={(e) => handleTipoOpChange(e.target.value as string)}
          >
            {tipoOperacionOptions.map((op) => (
              <MenuItem key={op} value={op}>
                {op}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
          Impuestos
        </Typography>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="multi-impuesto-label">Impuestos *</InputLabel>
          <Select
            labelId="multi-impuesto-label"
            label="Impuestos *"
            multiple
            value={impuestosSeleccionados}
            onChange={(e) => {
              const values = e.target.value as number[];
              handleImpuestosChange(values);
            }}
            renderValue={(selected) => {
              const selectedImps = impuestosOptions
                .filter((imp) => (selected as number[]).includes(imp.id))
                .map((imp) => imp.nombre);
              return selectedImps.join(", ");
            }}
          >
            {impuestosOptions.map((imp) => {
              const isChecked = impuestosSeleccionados.includes(imp.id);
              return (
                <MenuItem key={imp.id} value={imp.id}>
                  <Checkbox checked={isChecked} />
                  <ListItemText primary={imp.nombre} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <Typography sx={{ color: "red", marginTop: 2 }}>
          * campos obligatorios
        </Typography>

        <AplicativosModalFooter>
          <OutlinedActionButton onClick={close}>Cancelar</OutlinedActionButton>
          <ActionButton onClick={handleGuardarTransaccion} disabled={!canSubmit}>
            {buttonName}
          </ActionButton>
        </AplicativosModalFooter>
      </AplicativosModalContent>
    </Modal>
  );
};

export default ManageTransaccionModal;
