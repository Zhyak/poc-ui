import React, { useState } from 'react';

import { Aplicativo, IModal } from 'api/types';
import ManageAplicativoModal from './ManageAplicativoModal';
import useAplicativos from 'api/aplicativos';

const emptyFormData: Aplicativo = {
  id: '',
  idAplicativo: -1,
  mnemonico: '',
  descripcion: '',
  usuario: 'new@gmail.com',
  estado: 'Vigente',
};

const CreateAplicativoModal = ({ onClose }: IModal) => {
  const { createAplicativo } = useAplicativos();
  const [formData, setFormData] = useState<Aplicativo>(emptyFormData);

  const handleDescripcionChange = (newDescripcion?: string) => {
    setFormData({
      ...formData,
      descripcion: newDescripcion || '',
    });
  };

  const handleMnemonicoChange = (newMnemonico?: string) => {
    setFormData({
      ...formData,
      mnemonico: newMnemonico || '',
    });
  };

  const handleAddAplicativo = async () => {
    try {
      await createAplicativo(formData);
      onClose(true);
    } catch (error) {
      console.error('Error al crear aplicativo', error);
    }
  };

  return (
    <ManageAplicativoModal
      open={true}
      close={() => onClose()}
      title='Agregar Aplicativo'
      formData={formData}
      handleMnemonicoChange={handleMnemonicoChange}
      handleDescripcionChange={handleDescripcionChange}
      buttonName='Crear Aplicativo'
      handleGuardarAplicativo={handleAddAplicativo}
    />
  );
};

export default CreateAplicativoModal;
