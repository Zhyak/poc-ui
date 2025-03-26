import React from "react";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  SelectChangeEvent,
  Select,
  Typography,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import {
  ActionButton,
  AplicativosModalCloseButton,
  AplicativosModalContent,
  AplicativosModalFooter,
  AplicativosModalHeader,
  AplicativosModalTitle,
  AplicativosUpdateDetails,
} from "components/StyledComponents";
import {
  Aplicativo,
  IModal,
  ProvinciasAplicativos,
  ProvinciasType,
} from "api/types";

interface ICrearProvinciaModal extends IModal {
  open: boolean;
  title: string;
  formData: ProvinciasAplicativos;
  handleAplicativoChange: (aplicativo: SelectChangeEvent<string>) => void;
  handleProvinciaChange: (provincia: SelectChangeEvent<number>) => void;
  handleCodigoExternoChange: (codigo: string) => void;
  buttonName: string;
  handleGuardarProvincia: () => void;
  canSubmit: boolean;
  provincias: ProvinciasType[];
  aplicativos: Aplicativo[];
}

const ManageProvinciaModal: React.FC<ICrearProvinciaModal> = ({
  open,
  onClose,
  title,
  formData,
  handleAplicativoChange,
  handleProvinciaChange,
  handleCodigoExternoChange,
  buttonName,
  handleGuardarProvincia,
  canSubmit,
  provincias,
  aplicativos,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <AplicativosModalContent>
        <AplicativosModalHeader>
          <AplicativosModalTitle>{title}</AplicativosModalTitle>

          <AplicativosModalCloseButton onClick={onClose}>
            <CloseIcon />
          </AplicativosModalCloseButton>
        </AplicativosModalHeader>

        <FormControl fullWidth sx={{ marginTop: 3 }}>
          <InputLabel id="aplicativo">Aplicativo *</InputLabel>
          <Select
            id="aplicativo"
            value={formData.idAplicativo.toString()}
            label="Aplicativo *"
            onChange={handleAplicativoChange}
            MenuProps={{
              style: {
                maxHeight: 300,
              },
            }}
          >
            {aplicativos.map((aplicativo) => (
              <MenuItem
                key={aplicativo.idAplicativo}
                value={aplicativo.idAplicativo}
              >
                {aplicativo.mnemonico}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ marginTop: 3 }}>
          <InputLabel id="provincia">Provincia *</InputLabel>
          <Select
            id="provincia"
            value={formData.idProvinciaInterna}
            label="Provincia *"
            variant="outlined"
            onChange={handleProvinciaChange}
          >
            {provincias.map((provincia) => (
              <MenuItem key={provincia.id} value={provincia.id}>
                {provincia.nombreProvincia}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ marginTop: 3 }}>
          <TextField
            onChange={(event) => handleCodigoExternoChange(event?.target.value)}
            value={formData.codigoExternoProvincia}
            fullWidth
            id="codigoExterno"
            label="Código Externo *"
            className="mt-2"
          />
        </FormControl>

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

          <ActionButton onClick={handleGuardarProvincia} disabled={!canSubmit}>
            {buttonName}
          </ActionButton>
        </AplicativosModalFooter>
      </AplicativosModalContent>
    </Modal>
  );
};

export default ManageProvinciaModal;
