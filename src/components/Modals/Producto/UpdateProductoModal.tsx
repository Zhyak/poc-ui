import React, { useState } from "react";
import useProductos from "../../../api/producto"; // Hook para interactuar con productos
import useAplicativos from "../../../api/aplicativos";
import ManageProductoModal from "./ManageProductoModal";
import { Producto } from "../../../api/types";

interface EditarProductoModalProps {
  onClose: (success: boolean) => void;
  options: Producto;
}

const EditarProductoModal: React.FC<EditarProductoModalProps> = ({
  onClose,
  options,
}) => {
  const { updateProducto } = useProductos();
  const { data: aplicativos = [] } = useAplicativos();
  const [formData, setFormData] = useState<Producto>({ ...options });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGuardarProducto = async () => {
    setLoading(true);
    setError(null);

    if (!formData.descripcion.trim() || !formData.codigoExterno.trim()) {
      setError("Los campos Descripción y Código son obligatorios.");
      setLoading(false);
      return;
    }

    try {
      await updateProducto(formData);
      onClose(true);
    } catch (err) {
      console.error("Error al actualizar el producto:", err);
      setError("Ocurrió un error al actualizar el producto. Inténtalo nuevamente.");
      onClose(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ManageProductoModal
      open={true}
      close={() => onClose(false)}
      title="Editar Producto"
      formData={formData}
      aplicativos={aplicativos}
      handleDescripcionChange={(value) =>
        setFormData((prev) => ({ ...prev, descripcion: value }))
      }
      handleCodigoChange={(value) =>
        setFormData((prev) => ({ ...prev, codigoExterno: value }))
      }
      handleAplicativoChange={(value) =>
        setFormData((prev) => ({ ...prev, idAplicativo: Number(value) }))
      }
      buttonName={loading ? "Guardando..." : "Guardar Cambios"}
      handleGuardarProducto={handleGuardarProducto}
      isEdit={true}
    >
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </ManageProductoModal>
  );
};

export default EditarProductoModal;
