import React, { useState } from "react";
import { Modal, Typography } from "@mui/material";
import {
  AplicativosModalContent,
  AplicativosModalTitle,
  AplicativosModalFooter,
  DeleteButton,
  CancelButton,
} from "components/StyledComponents";
import useProductos from "../../../api/producto";
import { Producto } from "../../../api/types";

interface DeleteProductoModalProps {
  onClose: (success: boolean) => void;
  options: Producto;
}

const DeleteProductoModal: React.FC<DeleteProductoModalProps> = ({
  onClose,
  options,
}) => {
  const { deleteProducto } = useProductos();
  const [loading, setLoading] = useState(false);

  const handleDeleteProducto = async () => {
    setLoading(true);
    try {
      await deleteProducto({ id: options.id });
      onClose(true);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      onClose(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={true}
      onClose={() => onClose(false)}
      aria-labelledby="delete-product-modal-title"
      aria-describedby="delete-product-modal-description"
    >
      <AplicativosModalContent>
        <AplicativosModalTitle>
          {`¿Desea eliminar el producto "${options.descripcion}"?`}
        </AplicativosModalTitle>
        <Typography sx={{ color: "red", marginTop: 2 }}>
          Esta acción no se puede deshacer.
        </Typography>
        <AplicativosModalFooter>
          <DeleteButton onClick={handleDeleteProducto} disabled={loading}>
            {loading ? "Eliminando..." : "Eliminar"}
          </DeleteButton>
          <CancelButton onClick={() => onClose(false)}>Cancelar</CancelButton>
        </AplicativosModalFooter>
      </AplicativosModalContent>
    </Modal>
  );
};

export default DeleteProductoModal;
