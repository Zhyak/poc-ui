import React, { useState } from "react";
import ManageTransaccionModal from "./ManageTransaccionModal";

// Tipos
import { Transaccion, Producto, Impuesto } from "api/types";
import useTransacciones from "api/transaccion";

// Props que inyecta el ModalProvider en "options"
interface EditarTransaccionModalProps {
  onClose: (success: boolean) => void;
  options: {
    transaccion: Transaccion;
    producto?: Producto; 
    // impuestosOptions?: { id: number; nombre: string }[];
  };
  actions?: any;
}

const tipoOperacionOptions = ["Operación Instrumentada", "Operación Simple"];

const EditarTransaccionModal: React.FC<EditarTransaccionModalProps> = ({
  onClose,
  options,
}) => {
  const { actualizarTransaccion } = useTransacciones();

  const { transaccion, producto } = options;


  const aplicativoStr = producto ? String(producto.idAplicativo || "") : "";
  const codigoProdStr = producto ? producto.codigoExterno || "" : "";
  const descProdStr = producto ? producto.descripcion || "" : "";

  const impuestosIniciales = Array.isArray(transaccion.impuestos)
  ? (transaccion.impuestos as Impuesto[]).map((imp) => imp.id)
    : [];

  // Estado local
  const [formData, setFormData] = useState({
    aplicativo: aplicativoStr,
    codigoProductoAsociado: codigoProdStr,
    descripcionProducto: descProdStr,

    descripcion: transaccion.descripcion,
    codigoExterno: transaccion.codigoExterno,
    tipoOpMonetaria: transaccion.tipoOpMonetaria,
    impuestos: impuestosIniciales,
  });
  const handleDescripcionChange = (value: string) =>
    setFormData((prev) => ({ ...prev, descripcion: value }));
  const handleCodigoChange = (value: string) =>
    setFormData((prev) => ({ ...prev, codigoExterno: value }));
  const handleTipoOpChange = (value: string) =>
    setFormData((prev) => ({ ...prev, tipoOpMonetaria: value }));

  const handleImpuestosChange = (newValues: number[]) => {
    setFormData((prev) => ({ ...prev, impuestos: newValues }));
  };

  const canSubmit = !!(
    formData.descripcion.trim() &&
    formData.codigoExterno.trim() &&
    formData.tipoOpMonetaria
  );

  const handleGuardarTransaccion = async () => {
    try {
      await actualizarTransaccion({
        id: transaccion.id,
        idProducto: producto?.id || 0,
        descripcion: formData.descripcion,
        codigoExterno: formData.codigoExterno,
        tipoOpMonetaria: formData.tipoOpMonetaria,
        impuestosIds: formData.impuestos,
      });
      onClose(true);
    } catch (err) {
      console.error("Error al actualizar la transacción:", err);
      onClose(false);
    }
  };

  return (
    <ManageTransaccionModal
      open
      close={() => onClose(false)}
      title="Editar Transacción"
      formData={formData}
      tipoOperacionOptions={tipoOperacionOptions}
      handleDescripcionChange={handleDescripcionChange}
      handleCodigoChange={handleCodigoChange}
      handleTipoOpChange={handleTipoOpChange}
      handleImpuestosChange={handleImpuestosChange}
      buttonName="Guardar Cambios"
      handleGuardarTransaccion={handleGuardarTransaccion}
      canSubmit={canSubmit}
    />
  );
};

export default EditarTransaccionModal;
