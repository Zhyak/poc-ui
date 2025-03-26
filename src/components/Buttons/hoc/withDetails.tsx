import React, { ReactNode, useContext } from "react";

import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  ModalContext,
  ModalContextType,
} from "components/Modals/Providers/ModalProvider";
import { VER_DETALLE } from "components/Modals/types";

interface IWithDetailsButton {
  children?: ReactNode;
}

const WithDetailsButton = ({ children }: IWithDetailsButton) => {
  const { openModal } = useContext<ModalContextType>(ModalContext);
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        type="button"
        size="large"
        className="h-11"
        style={{
          borderColor: "#9747ff",
          textTransform: "none",
          marginRight: 24,
        }}
        variant="outlined"
        onClick={() => openModal(VER_DETALLE)}
      >
        <VisibilityIcon className="text-violet-0 mr-1" />
        <p style={{ color: "#9747ff"}}>Ver Detalle</p>
      </Button>
      {children ? children : ""}
    </div>
  );
};

export default WithDetailsButton;
