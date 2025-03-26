import React, { useState } from "react";
import ManageTransaccionModal from "./ManageTransaccionModal";
import { Producto, TransaccionCrear } from "api/types";
import useTransacciones from "api/transaccion";

interface CrearTransaccionModalProps {
  onClose: (success: boolean) => void;
  options: {
    producto?: Producto;
    impuestosOptions?: { id: number; nombre: string }[];
  };
}

const tipoOperacionOptions = ["Operación Instrumentada", "Operación Simple"];

const CrearTransaccionModal: React.FC<CrearTransaccionModalProps> = ({
  onClose,
  options,
}) => {
  const { agregarTransaccion } = useTransacciones();

  const { producto, impuestosOptions = [] } = options || {};

  const [formData, setFormData] = useState({
    aplicativo: String(producto?.idAplicativo || ""),
    codigoProductoAsociado: producto?.codigoExterno || "",
    descripcionProducto: producto?.descripcion || "",

    descripcion: "",
    codigoExterno: "",
    tipoOpMonetaria: "",
    impuestos: [] as number[],
  });

  // Handlers
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
      const body: TransaccionCrear = {
        idProducto: producto?.id || 0,
        descripcion: formData.descripcion,
        codigoExterno: formData.codigoExterno,
        tipoOpMonetaria: formData.tipoOpMonetaria,
        impuestosIds: formData.impuestos,
      };
      await agregarTransaccion(body);
      onClose(true);
    } catch (error) {
      console.error("Error al crear la transacción:", error);
      onClose(false);
    }
  };

  return (
    <ManageTransaccionModal
      open
      close={() => onClose(false)}
      title="Crear Transacción"
      formData={formData}
      tipoOperacionOptions={tipoOperacionOptions}
      impuestosOptions={impuestosOptions}
      handleDescripcionChange={handleDescripcionChange}
      handleCodigoChange={handleCodigoChange}
      handleTipoOpChange={handleTipoOpChange}
      handleImpuestosChange={handleImpuestosChange}
      buttonName="Crear"
      handleGuardarTransaccion={handleGuardarTransaccion}
      canSubmit={canSubmit}
    />
  );
};

export default CrearTransaccionModal;