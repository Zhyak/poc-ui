import React from "react";

import { Button, Modal } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";

import { AplicativosModalContent } from "components/StyledComponents";

import { ReactComponent as Check } from "icons/check-circle.svg";

const addEditSuccess = ({
  closeAllModals,
  options,
}: {
  open: boolean;
  closeAllModals: () => void;
  options?: any;
}) => {
  const { message, subMessage } = options;
  return (
    <Modal open>
      <AplicativosModalContent>
        <div className="text-center">
          <SvgIcon
            component={Check}
            sx={{ height: 56, width: 56 }}
            viewBox="0 0 56 56"
          ></SvgIcon>
          <h2 className="text-green-success text-3xl font-extrabold my-4">
            {message}
          </h2>

          {subMessage ? <p className="mb-4">{subMessage}</p> : ""}

          <Button
            type="button"
            size="large"
            className="mr-2"
            style={{ borderColor: "#9747ff" }}
            onClick={closeAllModals}
            variant="outlined"
          >
            <p style={{ color: "#9747ff" }}>Continuar</p>
          </Button>
        </div>
      </AplicativosModalContent>
    </Modal>
  );
};

export default addEditSuccess;
