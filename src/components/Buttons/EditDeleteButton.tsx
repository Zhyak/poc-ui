import React from "react";

import { Button } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const EditDeleteButton = ({
  openModalEdit,
  openModalDelete,
}: {
  openModalEdit: () => void;
  openModalDelete: () => void;
}) => {
  return (
    <div>
      <Button
        type="button"
        size="large"
        className="w-[106px] h-11"
        style={{
          borderColor: "#9747ff",
          textTransform: "none",
          marginRight: 12,
        }}
        onClick={openModalEdit}
        variant="outlined"
      >
        <EditIcon className="text-violet-0 mr-1" />
        <p style={{ color: "#9747ff" }}>Editar</p>
      </Button>

      <Button
        type="button"
        size="large"
        onClick={openModalDelete}
        className="w-[106px] h-11"
        style={{
          textTransform: "none",
          borderColor: "#C60000",
          marginLeft: 12,
        }}
        variant="outlined"
      >
        <DeleteIcon className="text-red-danger mr-1" />
        <p className="text-red-danger">Eliminar</p>
      </Button>
    </div>
  );
};

export default EditDeleteButton;
