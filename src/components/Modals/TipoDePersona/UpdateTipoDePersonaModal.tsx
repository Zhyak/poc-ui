import React, { useState } from "react";
import { TipoDePersona, IModal } from "api/types";
import ManageTipoDePersonaModal from "./ManageTipoDePersonaModal";
import useTiposDePersona from "api/tiposDePersona";
import useAplicativos from "api/aplicativos";
import { SelectChangeEvent } from "@mui/material";

const UpdateTipoDePersonaModal = ({ onClose, options, actions }: IModal) => {
  const [formData, setFormData] = useState<TipoDePersona>({ ...options });
  const { data: aplicativos } = useAplicativos();
  const { tiposDePersona } = useTiposDePersona(); // Obtener los tipos de persona

  const { updateTipoDePersona } = useTiposDePersona();

  const handleTiposDePersonaChange = (event: SelectChangeEvent<string>) => {
    const newTipoPersona = event.target.value;
    setFormData((prev) => ({
      ...prev,
      tipoPersona: newTipoPersona || "",
    }));
  };

  const handleCodigoExternoChange = (newCodigoExterno?: string) => {
    setFormData((prev) => ({
      ...prev,
      codigoExternoProvincia: newCodigoExterno || "",
    }));
  };

  const handleAplicativoChange = (event: SelectChangeEvent<string>) => {
    setFormData((prev) => ({
      ...prev,
      idAplicativo: event.target.value ? parseInt(event.target.value, 10) : -1,
    }));
  };

  const handleUpdateTipoDePersona = async () => {
    try {
      const sanitizedData = {
        ...formData,
        usuarioModificacion: formData.usuarioModificacion || "defaultUser",
      };

      await updateTipoDePersona(sanitizedData);
      if (actions && actions.onConfirm) {
        actions.onConfirm();
      }
      onClose(true);
    } catch (error) {
      console.error("Error al actualizar el Tipo de Persona:", error);
      onClose(false);
    }
  };

  return (
    <ManageTipoDePersonaModal
      open={true}
      close={() => onClose(false)}
      title="Editar Tipo de Persona"
      formData={formData}
      handleTiposDePersonaChange={handleTiposDePersonaChange}
      handleCodigoExternoChange={handleCodigoExternoChange}
      handleAplicativoChange={handleAplicativoChange}
      buttonName="Guardar Cambios"
      handleGuardarTipoDePersona={handleUpdateTipoDePersona}
      aplicativos={aplicativos || []}
      tiposDePersona={{ datos: tiposDePersona, paginas: 1, elementos: tiposDePersona.length }}
      isEdit={true}
    />
  );
};

export default UpdateTipoDePersonaModal;
