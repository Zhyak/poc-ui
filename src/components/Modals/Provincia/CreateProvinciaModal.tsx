import React, { useState } from "react";

import useProvincias from "api/provincias";
import ManageProvinciaModal from "./ManageProvinciaModal";
import { IModal, ProvinciasAplicativos } from "api/types";
import { SelectChangeEvent } from "@mui/material";
import useAplicativos from "api/aplicativos";

const emptyProvinciasData: ProvinciasAplicativos = {
  idProvinciaInterna: -1,
  idAplicativo: -1,
  codigoExternoProvincia: "",
  nombreProvincia: "",
  mnemonico: "",
  usuario: "",
  estado: "vigente",
};

const CreateProvinciaModal = ({ onClose }: IModal) => {
  const { provincias, createProvincia } = useProvincias();
  const { data } = useAplicativos();

  const [formData, setFormData] =
    useState<ProvinciasAplicativos>(emptyProvinciasData);

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

  const handleProvinciaChange = (event: SelectChangeEvent<number>) => {
    setFormData({
      ...formData,
      idProvinciaInterna: +event.target.value,
    });
  };

  const handleAddProvincia = () => {
    createProvincia(formData);
  };

  const canSubmit =
    formData.idAplicativo > 0 &&
    formData.idProvinciaInterna >= 0 &&
    formData.codigoExternoProvincia.length > 0 &&
    formData.codigoExternoProvincia.length < 5;

  return (
    <ManageProvinciaModal
      open={true}
      title="Agregar Provincia"
      formData={formData}
      handleCodigoExternoChange={handleCodigoExternoChange}
      handleAplicativoChange={handleAplicativoChange}
      handleProvinciaChange={handleProvinciaChange}
      buttonName="Crear Provincia"
      handleGuardarProvincia={handleAddProvincia}
      canSubmit={canSubmit}
      provincias={provincias}
      aplicativos={data}
      onClose={onClose}
    />
  );
};

export default CreateProvinciaModal;
