import React, { useState } from "react";
import { CondicionFiscalAplicativo, IModal } from "api/types";
import ManageCondicionFiscalModal from "./ManageCondicionFiscalModal";
import { SelectChangeEvent } from "@mui/material";
import useAplicativos from "api/aplicativos";
import useCondicionFiscal from "api/condicionesFiscales";

const emptyCondicionFiscalAplicativo: CondicionFiscalAplicativo = {
  id: -1,
  idAplicativo: -1,
  usuarioCreacion: "",
  usuarioModificacion: "",
  codigoExternoProvincia: "",
  estado: "vigente",
  descripcionCondicionFiscal: "",
  idCondicionesFiscales: -1,
};

const CreateCondicionFiscalModal = ({ onClose, actions }: IModal) => {
  const { condicionesFiscales, agregarCondicionFiscal } = useCondicionFiscal();
  const { data } = useAplicativos();
  const [formData, setFormData] = useState<CondicionFiscalAplicativo>(
    emptyCondicionFiscalAplicativo
  );

  const handleCondicionFiscalChange = (event: SelectChangeEvent<string>) => {
    setFormData({
      ...formData,
      idCondicionesFiscales: +event.target.value,
    });
  };

  const handleAplicativoChange = (event: SelectChangeEvent<string>) => {
    setFormData({
      ...formData,
      idAplicativo: +event.target.value,
    });
  };

  const handleCodigoExternoChange = (codigoExternoProvincia: string) => {
    setFormData({
      ...formData,
      codigoExternoProvincia,
    });
  };

  const handleCreateCondicionFiscal = async () => {
    try {
      await agregarCondicionFiscal(formData);
      onClose(true);
      if (actions && actions.onConfirm) {
        actions.onConfirm({ success: true });
      }
    } catch (error: any) {
      const errorMessage =
        error.message || "Error desconocido al crear la Condición Fiscal";
  
      onClose(false);
      if (actions && actions.onConfirm) {
        actions.onConfirm({ success: false, message: errorMessage });
      }
    }
  };

  const canSubmit =
    formData.idAplicativo > 0 &&
    formData.idCondicionesFiscales > 0 &&
    formData.codigoExternoProvincia.length > 0;

  return (
    <ManageCondicionFiscalModal
      open={true}
      onClose={() => onClose(false)}
      title="Agregar Condición Fiscal"
      formData={formData}
      handleCodigoExternoChange={handleCodigoExternoChange}
      handleAplicativoChange={handleAplicativoChange}
      handleCondicionFiscalChange={handleCondicionFiscalChange}
      buttonName="Guardar"
      handleGuardarCondicionFiscal={handleCreateCondicionFiscal}
      condicionesFiscales={condicionesFiscales}
      aplicativos={data}
      canSubmit={canSubmit}
      isEdit={false}
    />
  );
};

export default CreateCondicionFiscalModal;
