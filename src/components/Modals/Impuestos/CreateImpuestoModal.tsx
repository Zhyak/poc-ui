import React, { useState } from 'react';
import useImpuestos from '../../../api/impuestos';
import ManageImpuestoModal from './ManageImpuestoModal';
import { ImpuestoCrear } from '../../../api/types'; // Importa el tipo adecuado

const CrearImpuestoModal = ({
  onClose,
}: {
  onClose: (success: boolean) => void;
}) => {
  const { agregarImpuesto } = useImpuestos();

  const [formData, setFormData] = useState<ImpuestoCrear>({
    mnemonico: '',
    descripcion: '',
    tipoImpuesto: undefined,
    alicuota: undefined,
    montoFijo: undefined,
    provincia: undefined,
    tipoOperacionMonetaria: undefined,
    usuario: 'test_user',
  });

  const handleGuardarImpuesto = async () => {
    try {
      await agregarImpuesto(formData);
      onClose(true);
    } catch (error) {
      console.error('Error al crear el impuesto:', error);
      onClose(false);
    }
  };

  return (
    <ManageImpuestoModal
      open={true}
      close={() => onClose(false)}
      title='Agregar Impuesto'
      formData={formData}
      handleMnemonicoChange={(value: string) =>
        setFormData((prev) => ({ ...prev, mnemonico: value }))
      }
      handleDescripcionChange={(value: string) =>
        setFormData((prev) => ({ ...prev, descripcion: value }))
      }
      buttonName='Crear'
      handleGuardarImpuesto={handleGuardarImpuesto}
      isEdit={false}
    />
  );
};

export default CrearImpuestoModal;
