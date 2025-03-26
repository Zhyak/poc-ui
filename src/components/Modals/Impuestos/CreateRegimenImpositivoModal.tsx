import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";

import { IModal } from "api/types";
import useProvincias from "api/provincias";

import {
  AplicativosModalCloseButton,
  AplicativosModalContent,
  AplicativosModalHeader,
  AplicativosModalInput,
  AplicativosModalTitle,
} from "components/StyledComponents";
import TipoRegimenImpositivoModal from "components/Toggle/TipoRegimenImpositivo";

import "./styles.css";

interface IImpuesto {
  mnemonico: string;
  provincia: string;
  fechaActualizacion: Date;
  usuario: string;
  operacionMonetaria: string;
}

const emptyFormData: IImpuesto = {
  mnemonico: "",
  provincia: "",
  fechaActualizacion: new Date(),
  usuario: "",
  operacionMonetaria: "",
};

const CreateRegimenImpositivoModal = ({ onClose }: IModal) => {
  const { provincias } = useProvincias();

  const [formData, setFormData] = useState<IImpuesto>(emptyFormData);

  const handleMnemonicoChange = (newMnemonico?: string) => {
    setFormData({
      ...formData,
      mnemonico: newMnemonico || "",
    });
  };

  /*const cantSubmit = useMemo(() => {
    const aplicativosNames = aplicativos.map(({ mnemonico }) => mnemonico);
    const mnemonicoExists =
      formData.mnemonico.length < 3 ||
      aplicativosNames.includes(formData.mnemonico);
    const descripcionInvalid = formData.descripcion.length === 0;
    return mnemonicoExists || descripcionInvalid;
  }, [formData, aplicativos]);*/

  const handleFormChange = (ev: SelectChangeEvent<string>) => {
    setFormData({
      ...formData,
      [ev.target.name]: ev.target.value,
    });
  };

  return (
    <Modal id="regimen_impositivo_id" open={true} onClose={onClose}>
      <AplicativosModalContent>
        <AplicativosModalHeader>
          <AplicativosModalTitle>
            Agregar Régimen Impositivo
          </AplicativosModalTitle>

          <AplicativosModalCloseButton onClick={onClose}>
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
          <FormControl fullWidth sx={{ marginTop: 3 }}>
            <InputLabel id="tipo">Provincia *</InputLabel>
            <Select
              id="provincia"
              name="provincia"
              value={formData.provincia}
              label="Provincia *"
              variant="outlined"
              onChange={handleFormChange}
            >
              {provincias.map((provincia) => (
                <MenuItem key={provincia.id} value={provincia.id}>
                  {provincia.nombreProvincia}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ marginTop: 3 }}>
            <InputLabel id="tipo">Tipo de Operación Monetaria *</InputLabel>
            <Select
              id="op_monetaria"
              name="operacionMonetaria"
              value={formData.operacionMonetaria}
              label="Tipo de Operación Monetaria *"
              variant="outlined"
              onChange={handleFormChange}
            >
              []
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginTop: 3 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Fecha de Vigencia *" />
            </LocalizationProvider>
          </FormControl>

          <p className="text-xl text-violet-0 mt-8">Régimen proporcional</p>

          <TipoRegimenImpositivoModal />

          <p className="text-xl text-violet-0 mt-8">Montos</p>

          <FormControl fullWidth sx={{ marginTop: 3 }}>
            <TextField
              type="number"
              label="Monto Mínimo Imponible"
              className="w-full"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                },
                htmlInput: {
                  min: 0,
                },
              }}
            />
          </FormControl>

          <FormControl fullWidth sx={{ marginTop: 3 }}>
            <TextField
              type="number"
              label="Monto Máximo Imponible"
              className="w-full"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                },
                htmlInput: {
                  min: 0,
                },
              }}
            />
          </FormControl>

          <TextField
            type="number"
            label="Base Mínima no Imponible"
            className="w-full"
            sx={{
              marginTop: 3,
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              },
              htmlInput: {
                min: 0,
              },
            }}
          />

          <p className="text-xl text-violet-0 mt-8">Fórmula y Cálculo</p>

          <FormControl fullWidth sx={{ marginTop: 3 }}>
            <InputLabel id="tipo">Tipo de Fórmula *</InputLabel>
            <Select
              id="tipo_formula"
              name="tipo_formula"
              value={formData.provincia}
              label="Tipo de Fórmula *"
              variant="outlined"
              onChange={handleFormChange}
            >
              <MenuItem key={1} value={1}>
                Basica
              </MenuItem>
            </Select>
            <div className="mt-1">
              <InfoIcon
                sx={{
                  width: 14,
                  height: 14,
                  color: "grey",
                }}
                className="inline-block ml-2"
              />

              <FormHelperText className="inline-block" sx={{ marginLeft: 1 }}>
                Básica = Alicuota * Base
              </FormHelperText>
            </div>
          </FormControl>

          <FormControl fullWidth sx={{ marginTop: 3 }}>
            <InputLabel id="tipo">Base de Cálculo *</InputLabel>
            <Select
              id="base_calculo"
              name="base_calculo"
              value={formData.provincia}
              label="Base de Cálculo *"
              variant="outlined"
              onChange={handleFormChange}
            >
              <MenuItem key={1} value={1}>
                Monto Transacción
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <div className="flex justify-between items-center mt-8">
          <Typography className="text-red-danger">
            * campos obligatorios
          </Typography>

          <Button
            type="button"
            size="medium"
            className="h-11"
            style={{
              backgroundColor: "#9747ff",
              textTransform: "none",
              marginRight: 24,
            }}
            variant="outlined"
            onClick={() => {}}
          >
            <p style={{ color: "#fff" }}>Guardar</p>
          </Button>
        </div>
      </AplicativosModalContent>
    </Modal>
  );
};

export default CreateRegimenImpositivoModal;
