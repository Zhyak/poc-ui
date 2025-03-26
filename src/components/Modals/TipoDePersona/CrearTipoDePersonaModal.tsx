import React, { useState } from "react";
import { TipoDePersona } from "api/types";
import ManageTipoDePersonaModal from "./ManageTipoDePersonaModal";
import useTiposDePersona from "api/tiposDePersona";
import useAplicativos from "api/aplicativos";
import { SelectChangeEvent } from "@mui/material";

const emptyFormData: TipoDePersona = {
  id: -1,
  tipoPersona: "",
  idAplicativo: -1,
  codigoExternoProvincia: "",
  estado: "Vigente",
  usuarioCreacion: "",
  usuarioModificacion: "",
};

const CrearTipoDePersonaModal = ({
  onClose,
}: {
  onClose: (success: boolean) => void;
}) => {
  const { agregarTipoDePersona, tiposDePersona } = useTiposDePersona(); // Obtener tiposDePersona del hook
  const { data: aplicativos, isLoading } = useAplicativos();
  const [formData, setFormData] = useState<TipoDePersona>(emptyFormData);

  const handleTipoPersonaChange = (event: SelectChangeEvent<string>) => {
    setFormData((prev) => ({ ...prev, tipoPersona: event.target.value }));
  };

  const handleCodigoExternoChange = (codigoExternoProvincia: string) => {
    setFormData((prev) => ({ ...prev, codigoExternoProvincia }));
  };

  const handleAplicativoChange = (event: SelectChangeEvent<string>) => {
    setFormData({
      ...formData,
      idAplicativo: +event.target.value,
    });
  };

  const handleGuardarTipoDePersona = async () => {
    try {
      await agregarTipoDePersona(formData);
      onClose(true);
    } catch (error) {
      console.error("Error al crear el Tipo de Persona:", error);
      onClose(false);
    }
  };

  if (isLoading) {
    return <div>Cargando aplicativos...</div>;
  }

  return (
    <ManageTipoDePersonaModal
      open={true}
      close={() => onClose(false)}
      title="Agregar Tipo de Persona"
      formData={formData}
      handleTiposDePersonaChange={handleTipoPersonaChange}
      handleCodigoExternoChange={handleCodigoExternoChange}
      handleAplicativoChange={handleAplicativoChange}
      buttonName="Crear"
      handleGuardarTipoDePersona={handleGuardarTipoDePersona}
      aplicativos={aplicativos || []}
      tiposDePersona={{ datos: tiposDePersona, paginas: 1, elementos: tiposDePersona.length }}
      isEdit={false}
    />
  );
};

export default CrearTipoDePersonaModal;
