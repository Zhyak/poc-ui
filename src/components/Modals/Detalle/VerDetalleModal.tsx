import React from "react";

import { Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  AplicativosModalContent,
  AplicativosModalHeader,
  AplicativosModalTitle,
  AplicativosModalCloseButton,
} from "components/StyledComponents";

const VerDetalleModal = ({
  onClose,
  options,
}: {
  onClose: () => void;
  options?: any;
}) => {
  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <AplicativosModalContent>
        <AplicativosModalHeader>
          <AplicativosModalTitle>Ver en detalle</AplicativosModalTitle>

          <AplicativosModalCloseButton onClick={onClose}>
            <CloseIcon />
          </AplicativosModalCloseButton>
        </AplicativosModalHeader>

        <p className="my-4 text-3xl font-bold text-violet-0">IG_CABA_5</p>

        <p className="font-bold">
          Fecha de vigencia:
          <span className="bg-light-green-background ml-2 p-1 font-normal">
            01/01/2024
          </span>
        </p>

        <p className="font-bold my-4">
          Provincia:
          <span className="ml-2 font-normal">Ciudad de Buenos Aires</span>
        </p>

        <p className="font-bold pb-4 border-b border-divisor-color">
          Tipo de operación monetaria:
          <span className="ml-2 font-normal">Instrumentada</span>
        </p>

        <p className="text-xl text-violet-0 my-4">Régimen proporcional</p>

        <p className="font-bold pb-4 border-b border-divisor-color">
          Alicuotas:
          <span className="ml-2 font-normal">35%</span>
        </p>

        <p className="text-xl text-violet-0 my-4">Montos</p>

        <p className="font-bold pb-4 border-b border-divisor-color">
          Alicuotas:
          <span className="ml-2 font-normal">35%</span>
        </p>

        <p className="text-xl text-violet-0 my-4">Tipo de Fórmula</p>

        <p className="font-bold pb-4">
          Descripción:
          <span className="ml-2 font-normal">Básica</span>
        </p>
        <p className="font-bold pb-4 border-b border-divisor-color">
          Fórmula:
          <span className="ml-2 font-normal">Alícuota * Base</span>
        </p>

        <p className="text-xl text-violet-0 my-4 ">Base de Cálculo</p>

        <p className="font-bold pb-4">
          Descripción:
          <span className="ml-2 font-normal">Monto Transacción</span>
        </p>
      </AplicativosModalContent>
    </Modal>
  );
};

export default VerDetalleModal;
