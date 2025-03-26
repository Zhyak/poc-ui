import React, { useState } from "react";
import useProductos from "../../../api/producto";
import useAplicativos from "../../../api/aplicativos";
import ManageProductoModal from "./ManageProductoModal";
import { ProductoCrear } from "../../../api/types"; // Importa el tipo adecuado

const CrearProductoModal = ({ onClose }: { onClose: (success: boolean) => void }) => {
  const { agregarProducto } = useProductos();
  const { data: aplicativos } = useAplicativos();
  
  const [formData, setFormData] = useState<ProductoCrear>({
    descripcion: "",
    codigoExterno: "",
    idAplicativo: 0,
  });
  const handleGuardarProducto = async () => {
    try {
      await agregarProducto(formData);
      onClose(true);
    } catch (error) {
      console.error("Error al crear el producto:", error);
      onClose(false);
    }
  };

  return (
    <ManageProductoModal
      open={true}
      close={() => onClose(false)}
      title="Agregar Producto"
      formData={formData}
      aplicativos={aplicativos || []}
      handleDescripcionChange={(value) =>
        setFormData((prev) => ({ ...prev, descripcion: value }))
      }
      handleCodigoChange={(value) =>
        setFormData((prev) => ({ ...prev, codigoExterno: value }))
      }
      handleAplicativoChange={(value) =>
        setFormData((prev) => ({ ...prev, idAplicativo: Number(value) }))
      }
      buttonName="Crear"
      handleGuardarProducto={handleGuardarProducto}
      isEdit={false}
    />
  );
};

export default CrearProductoModal;
