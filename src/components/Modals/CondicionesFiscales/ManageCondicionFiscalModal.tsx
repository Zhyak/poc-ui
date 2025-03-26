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
  CondicionesFiscalesResponse,
  CondicionFiscalAplicativo,
} from "api/types";

interface ICrearCondicionFiscalModal {
  open: boolean;
  onClose: () => void;
  title: string;
  formData: CondicionFiscalAplicativo;
  handleAplicativoChange: (aplicativo: SelectChangeEvent<string>) => void;
  handleCondicionFiscalChange: (provincia: SelectChangeEvent<string>) => void;
  handleCodigoExternoChange: (codigo: string) => void;
  buttonName: string;
  handleGuardarCondicionFiscal: () => void;
  canSubmit: boolean;
  condicionesFiscales: CondicionesFiscalesResponse;
  aplicativos: Aplicativo[];
  isEdit: boolean;
}

const CreateCondicionFiscalModal: React.FC<ICrearCondicionFiscalModal> = ({
  open,
  onClose,
  title,
  formData,
  handleAplicativoChange,
  handleCondicionFiscalChange,
  handleCodigoExternoChange,
  buttonName,
  handleGuardarCondicionFiscal,
  canSubmit,
  condicionesFiscales,
  aplicativos,
  isEdit,
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
          <InputLabel id="condicion_fiscal">Condición Fiscal *</InputLabel>
          <Select
          disabled={isEdit}
            id="condicion_fiscal"
            value={formData.idCondicionesFiscales.toString()}
            label="Condición Fiscal *"
            onChange={handleCondicionFiscalChange}
            MenuProps={{
              style: {
                maxHeight: 300,
              },
            }}
          >
            {condicionesFiscales.map((condicion) => (
              <MenuItem key={condicion.id} value={condicion.id}>
                {condicion.descripcion}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ marginTop: 3 }}>
          <InputLabel id="provincia">Aplicativo *</InputLabel>
          <Select
            id="aplicativo"
            value={formData.idAplicativo.toString()}
            label="Aplicativo *"
            variant="outlined"
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
                {aplicativo.descripcion}
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
            <Typography>{`Realizada por: ${formData.usuarioModificacion}`}</Typography>
          </AplicativosUpdateDetails>
        )}
        <AplicativosModalFooter>
          <Typography>* campos obligatorios</Typography>

          <ActionButton
            onClick={handleGuardarCondicionFiscal}
            disabled={!canSubmit}
          >
            {buttonName}
          </ActionButton>
        </AplicativosModalFooter>
      </AplicativosModalContent>
    </Modal>
  );
};

export default CreateCondicionFiscalModal;
