import React from 'react';

import {
  Modal,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TipoDePersona, Aplicativo, TiposDePersonaResponse } from 'api/types';
import {
  AplicativosModalContent,
  AplicativosModalHeader,
  AplicativosModalTitle,
  AplicativosModalCloseButton,
  AplicativosUpdateDetails,
  AplicativosModalFooter,
  ActionButton,
} from 'components/StyledComponents';

interface IManageTipoDePersonaModal {
  open: boolean;
  close: () => void;
  title: string;
  formData: TipoDePersona;
  aplicativos: Aplicativo[];
  handleTiposDePersonaChange: (tipo: SelectChangeEvent<string>) => void;
  handleAplicativoChange: (event: SelectChangeEvent) => void;
  handleCodigoExternoChange: (codigoExterno: string) => void;
  buttonName: string;
  handleGuardarTipoDePersona: () => void;
  isEdit: boolean;
  tiposDePersona: TiposDePersonaResponse;
}

const ManageTipoDePersonaModal: React.FC<IManageTipoDePersonaModal> = ({
  open,
  close,
  title,
  formData,
  aplicativos,
  handleTiposDePersonaChange,
  handleCodigoExternoChange,
  handleAplicativoChange,
  buttonName,
  handleGuardarTipoDePersona,
  tiposDePersona,
  isEdit
}) => {
  const isValidTipoPersona = formData.tipoPersona.length > 0;
  const isValidCodigoExterno = formData.codigoExternoProvincia.length > 0;
  const isValidAplicativo = formData.idAplicativo > 0;
  const canSubmit =
    isValidTipoPersona && isValidCodigoExterno && isValidAplicativo;

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

        <FormControl fullWidth sx={{ marginTop: 3 }}>
        <InputLabel id="tipo">Tipo De Persona *</InputLabel>
        <Select
          disabled={isEdit}
          id="tipo"
          value={formData.tipoPersona || ""}
          label="Tipo de Persona *"
          variant="outlined"
          onChange={handleTiposDePersonaChange}
        >
          {tiposDePersona.datos.map((tipo) => (
            <MenuItem key={tipo.id} value={tipo.tipoPersona}>
              {tipo.tipoPersona}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

        <FormControl fullWidth sx={{ marginTop: 3 }}>
          <InputLabel id="aplicativo">Aplicativo *</InputLabel>
          <Select
            id="aplicativo"
            value={
              formData.idAplicativo > 0 ? formData.idAplicativo.toString() : ''
            }
            label="Aplicativo *"
            onChange={handleAplicativoChange}
            MenuProps={{
              style: {
                maxHeight: 300,
              },
            }}
          >
            {aplicativos && aplicativos.length > 0 ? (
              aplicativos.map((aplicativo) => (
                <MenuItem
                  key={aplicativo.idAplicativo}
                  value={aplicativo.idAplicativo}
                >
                  {aplicativo.mnemonico || 'Sin nombre'}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>
                <em>No hay aplicativos disponibles</em>
              </MenuItem>
            )}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ marginTop: 3 }}>
          <TextField
            onChange={(event) =>
              handleCodigoExternoChange(event?.target.value)
            }
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
            onClick={handleGuardarTipoDePersona}
            disabled={!canSubmit}
          >
            {buttonName}
          </ActionButton>
        </AplicativosModalFooter>
      </AplicativosModalContent>
    </Modal>
  );
};

export default ManageTipoDePersonaModal;
