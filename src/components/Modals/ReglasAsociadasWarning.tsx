import React from "react";

import { Button, Modal } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";

import { AplicativosModalContent } from "components/StyledComponents";

import { ReactComponent as ExclamationCircle } from "icons/exclamation-circle.svg";

const CondicionFiscalSuccess = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal open={open}>
      <AplicativosModalContent>
        <div className="text-center">
          <SvgIcon
            component={ExclamationCircle}
            sx={{ height: 56, width: 56 }}
            viewBox="0 0 56 56"
          ></SvgIcon>
          <h2 className="text-orange-warning text-3xl font-extrabold my-4">
            Reglas Asociadas
          </h2>
          <p className="mb-4">
            La condición fiscal [nombre_condición] - [código_condición] se
            utiliza en las siguientes reglas:"
          </p>

          <table className="my-6 mx-auto border ">
            <tr className="border">
              <th className="border">ID</th>
              <th className="border">Nombre Regla</th>
            </tr>
            <tr>
              <td className="border px-4">233</td>
              <td className="border px-4">Crédito Fiscal</td>
            </tr>
            <tr>
              <td className="border px-4">4568</td>
              <td className="border px-4">Deducción de impuestos</td>
            </tr>
          </table>

          <b>
            No se podrá eliminar la condición fiscal mientras esté en uso en
            alguna regla.
          </b>
        </div>
        <div className="flex justify-between mt-4">
          <Button
            type="button"
            size="large"
            className="mr-2"
            style={{ borderColor: "#9747ff" }}
            onClick={onClose}
          >
            <p style={{ color: "#9747ff" }}>Cerrar</p>
          </Button>
          <Button
            type="button"
            size="large"
            className="mr-2"
            style={{ backgroundColor: "#9747ff" }}
            onClick={onClose}
          >
            <p style={{ color: "#fff" }}>Ir a Reglas</p>
          </Button>
        </div>
      </AplicativosModalContent>
    </Modal>
  );
};

export default CondicionFiscalSuccess;
