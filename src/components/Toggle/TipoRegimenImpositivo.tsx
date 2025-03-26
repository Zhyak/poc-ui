import React, { useState } from "react";

import {
  InputAdornment,
  InputLabel,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

enum TipoRegimen {
  ALICUOTA = "alicuota",
  MONTO_FIJO = "montoFijo",
}

const TipoRegimenImpositivoModal = () => {
  const [tipoRegimen, setTipoRegimen] = useState<string>(TipoRegimen.ALICUOTA);

  const handleChange = (_: React.MouseEvent<HTMLElement>, tipo: string) => {
    setTipoRegimen(tipo);
  };

  return (
    <>
      <div className="flex items-center gap-2 my-8">
        <InputLabel id="tipo">Tipo *</InputLabel>
        <ToggleButtonGroup
          color="primary"
          value={tipoRegimen}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value={TipoRegimen.ALICUOTA}>Alícuota</ToggleButton>
          <ToggleButton value={TipoRegimen.MONTO_FIJO}>Monto Fijo</ToggleButton>
        </ToggleButtonGroup>
      </div>

      {tipoRegimen === TipoRegimen.ALICUOTA ? (
        <TextField
          type="number"
          label="Alicuota"
          className="w-full"
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
            htmlInput: {
              min: 0,
              max: 100,
            },
          }}
        />
      ) : (
        <TextField
          type="number"
          label="Monto Fijo"
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
      )}
    </>
  );
};

export default TipoRegimenImpositivoModal;
