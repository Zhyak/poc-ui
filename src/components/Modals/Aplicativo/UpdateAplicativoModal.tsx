import { Aplicativo, IModal } from "api/types";
import ManageAplicativoModal from "./ManageAplicativoModal";
import React, { useState } from "react";
import useAplicativos from "api/aplicativos";

const UpdateAplicativoModal = ({ onClose, options, actions }: IModal) => {
  const [formData, setFormData] = useState<Aplicativo>(options);

  const { updateAplicativo } = useAplicativos();

  const handleDescripcionChange = (newDescripcion?: string) => {
    setFormData({
      ...formData,
      descripcion: newDescripcion || "",
    });
  };

  const handleMnemonicoChange = (newMnemonico?: string) => {
    setFormData({
      ...formData,
      mnemonico: newMnemonico || "",
    });
  };

  const handleUpdateAplicativo = async () => {
    try {
      await updateAplicativo(formData);
      if (actions && actions.onConfirm) {
        actions.onConfirm();
      }
      onClose(true);
    } catch (error) {
      console.error("Error al actualizar el aplicativo:", error);
    }
  };

  const handleCancel = () => {
    onClose(false);
    if (actions && actions.onCancel) {
      actions.onCancel();
    }
  };

  return (
    <ManageAplicativoModal
      open={true}
      close={handleCancel}
      title="Editar Aplicativo"
      formData={formData}
      handleMnemonicoChange={handleMnemonicoChange}
      handleDescripcionChange={handleDescripcionChange}
      buttonName="Guardar Cambios"
      handleGuardarAplicativo={handleUpdateAplicativo}
    />
  );
};

export default UpdateAplicativoModal;

