import React, { useState } from 'react';
import { CondicionFiscalAplicativo, IModal } from 'api/types';
import ManageCondicionFiscalModal from './ManageCondicionFiscalModal';
import { SelectChangeEvent } from '@mui/material';
import useAplicativos from 'api/aplicativos';
import useCondicionFiscal from 'api/condicionesFiscales';

const UpdateCondicionFiscalModal = ({ onClose, options, actions }: IModal) => {
  const { condicionesFiscales, updateCondicionFiscal } = useCondicionFiscal();
  const { data } = useAplicativos();

  const [formData, setFormData] = useState<CondicionFiscalAplicativo>({
    ...options,
  });

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

  const handleUpdateCondicionFiscal = async () => {
    try {
      await updateCondicionFiscal(formData);
      onClose(true);

      if (actions && actions.onConfirm) {
        actions.onConfirm({ success: true });
      }
    } catch (error: any) {
      const errorMessage =
        error.message || 'Error desconocido al actualizar la Condición Fiscal';

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
      title='Editar Condición Fiscal'
      formData={formData}
      handleCodigoExternoChange={handleCodigoExternoChange}
      handleAplicativoChange={handleAplicativoChange}
      handleCondicionFiscalChange={handleCondicionFiscalChange}
      buttonName='Guardar Cambios'
      handleGuardarCondicionFiscal={handleUpdateCondicionFiscal}
      condicionesFiscales={condicionesFiscales}
      aplicativos={data}
      canSubmit={canSubmit}
      isEdit={true}
    />
  );
};

export default UpdateCondicionFiscalModal;
