import React, { useContext } from 'react';
import { ModalContext } from './Providers/ModalProvider';

// Aquí importas todos tus componentes de modal
import CreateAplicativoModal from './Aplicativo/CreateAplicativoModal';
import DeleteAplicativoModal from './Aplicativo/DeleteAplicativoModal';
import UpdateAplicativoModal from './Aplicativo/UpdateAplicativoModal';

import CreateProvinciaModal from './Provincia/CreateProvinciaModal';
import UpdateProvinciaModal from './Provincia/UpdateProvinciaModal';
import DeleteProvinciaModal from './Provincia/DeleteProvinciaModal';

import CreateCondicionFiscalModal from './CondicionesFiscales/CreateCondicionFiscalModal';
import UpdateCondicionFiscalModal from './CondicionesFiscales/UpdateCondicionFiscalModal';
import DeleteCondicionFiscalModal from './CondicionesFiscales/DeleteCondicionFiscalModal';

import CreateTipoDePersonaModal from './TipoDePersona/CrearTipoDePersonaModal';
import UpdateTipoDePersonaModal from './TipoDePersona/UpdateTipoDePersonaModal';
import DeleteTipoDePersonaModal from './TipoDePersona/DeleteTipoDePersonaModal';

import CreateRegimenImpositivoModal from './Impuestos/CreateRegimenImpositivoModal';

import addEditSuccess from './Custom/AddEditSuccess';
import VerDetalleModal from './Detalle/VerDetalleModal';

import EditarProductoModal from './Producto/UpdateProductoModal';
import CrearProductoModal from './Producto/CrearProductoModal';
import DeleteProductoModal from './Producto/DeleteProductoModal';

import CrearTransaccionModal from './Transaccion/CrearTransaccionModal';
import EditarTransaccionModal from './Transaccion/EditarTransaccionModal';
import DeleteTransaccionModal from './Transaccion/DeleteTransaccionModal';

import {
  APLICATIVOS_CREATE,
  APLICATIVOS_UPDATE,
  APLICATIVOS_DELETE,
  PROVINCIAS_CREATE,
  PROVINCIAS_UPDATE,
  PROVINCIAS_DELETE,
  PRODUCTOS_CREATE,
  PRODUCTOS_UPDATE,
  PRODUCTOS_DELETE,
  TRANSACCION_CREATE,
  TRANSACCION_UPDATE,
  TRANSACCION_DELETE,
  CONDICIONES_FISCALES_CREATE,
  CONDICIONES_FISCALES_UPDATE,
  CONDICIONES_FISCALES_DELETE,
  TIPOS_DE_PERSONA_CREATE,
  TIPOS_DE_PERSONA_DELETE,
  TIPOS_DE_PERSONA_UPDATE,
  REGIMEN_IMPOSITIVO_CREATE,
  ADD_EDIT_SUCCESS,
  VER_DETALLE,
  IMPUESTOS_CREATE,
} from './types';
import CrearImpuestoModal from './Impuestos/CreateImpuestoModal';

const Modals = () => {
  const { openedModals, closeModal, closeAllModals } = useContext(ModalContext);
  const typeToModal: Record<string, any> = {
    [APLICATIVOS_CREATE]: CreateAplicativoModal,
    [APLICATIVOS_UPDATE]: UpdateAplicativoModal,
    [APLICATIVOS_DELETE]: DeleteAplicativoModal,

    [PROVINCIAS_CREATE]: CreateProvinciaModal,
    [PROVINCIAS_UPDATE]: UpdateProvinciaModal,
    [PROVINCIAS_DELETE]: DeleteProvinciaModal,

    [PRODUCTOS_CREATE]: CrearProductoModal,
    [PRODUCTOS_UPDATE]: EditarProductoModal,
    [PRODUCTOS_DELETE]: DeleteProductoModal,

    [TRANSACCION_CREATE]: CrearTransaccionModal,
    [TRANSACCION_UPDATE]: EditarTransaccionModal,
    [TRANSACCION_DELETE]: DeleteTransaccionModal,

    [IMPUESTOS_CREATE]: CrearImpuestoModal,

    [CONDICIONES_FISCALES_CREATE]: CreateCondicionFiscalModal,
    [CONDICIONES_FISCALES_UPDATE]: UpdateCondicionFiscalModal,
    [CONDICIONES_FISCALES_DELETE]: DeleteCondicionFiscalModal,

    [TIPOS_DE_PERSONA_CREATE]: CreateTipoDePersonaModal,
    [TIPOS_DE_PERSONA_DELETE]: DeleteTipoDePersonaModal,
    [TIPOS_DE_PERSONA_UPDATE]: UpdateTipoDePersonaModal,

    [REGIMEN_IMPOSITIVO_CREATE]: CreateRegimenImpositivoModal,

    [ADD_EDIT_SUCCESS]: addEditSuccess,
    [VER_DETALLE]: VerDetalleModal,
  };

  if (openedModals.length === 0) {
    return null;
  }

  return (
    <>
      {openedModals.map((modalType, index) => {
        const ModalComponent = typeToModal[modalType.type] ?? null;
        if (!ModalComponent) return null;

        return (
          <ModalComponent
            key={index}
            onClose={closeModal}
            closeAllModals={closeAllModals}
            options={modalType.options}
            actions={modalType.actions}
          />
        );
      })}
    </>
  );
};

export default Modals;
