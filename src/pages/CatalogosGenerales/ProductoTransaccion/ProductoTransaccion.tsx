import React, { useState, useContext, useMemo } from 'react';
import { Box, Typography, InputBase, Tabs, Tab } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import BaseLayout from 'components/BaseLayout';
import { ActionButton, Search, Title } from 'components/StyledComponents';
import EditDeleteButton from 'components/Buttons/EditDeleteButton';
import Toast from 'components/shared/toast';
import {
  ModalContext,
  ModalContextType,
} from 'components/Modals/Providers/ModalProvider';
import {
  PRODUCTOS_CREATE,
  PRODUCTOS_UPDATE,
  PRODUCTOS_DELETE,
  TRANSACCION_CREATE,
  TRANSACCION_UPDATE,
  TRANSACCION_DELETE,
} from 'components/Modals/types';
import useProductos from 'api/producto';
import useTransacciones from 'api/transaccion';
import { Producto, Transaccion } from 'api/types';

const ProductoTransaccion = ({ open }: { open: boolean }) => {
  // 0 => pestaña "Productos", 1 => pestaña "Transacciones"
  const [currentTab, setCurrentTab] = useState<number>(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <BaseLayout open={open}>
      <Title>Producto - Transacción</Title>

      {/* Tabs */}
      <Tabs value={currentTab} onChange={handleChangeTab} sx={{ mb: 2 }}>
        <Tab label='Productos' />
        <Tab label='Transacciones' />
      </Tabs>

      {/* Render condicional según pestaña */}
      {currentTab === 0 && <ProductosTabContent />}
      {currentTab === 1 && <TransaccionesTabContent />}
    </BaseLayout>
  );
};

export default ProductoTransaccion;

/* ----------------------------------------------------------
   PESTAÑA DE PRODUCTOS
---------------------------------------------------------- */
function ProductosTabContent() {
  const { openModal } = useContext<ModalContextType>(ModalContext);
  const { productos, isLoadingProductos, error } = useProductos();

  // Simulamos un array de impuestos de ejemplo:
  const [impuestosOptions] = useState<{ id: number; nombre: string }[]>([
    { id: 1, nombre: 'IVA' },
    { id: 2, nombre: 'Ganancias' },
    { id: 3, nombre: 'Sellos' },
  ]);

  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [formData, setFormData] = useState<Producto>({
    id: 0,
    descripcion: '',
    codigoExterno: '',
    idAplicativo: 0,
  });

  const [search, setSearch] = useState('');
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState<
    'success' | 'warning' | 'error'
  >('success');

  const handleToastClose = () => setToastOpen(false);

  const showToast = (
    message: string,
    severity: 'success' | 'warning' | 'error'
  ) => {
    setToastMessage(message);
    setToastSeverity(severity);
    setToastOpen(true);
  };

  const handleSearch = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value);
  };

  const handleCreateProducto = () => {
    openModal(
      PRODUCTOS_CREATE,
      {},
      {
        onConfirm: () => showToast('Producto creado correctamente', 'success'),
        onCancel: () => {},
      }
    );
  };

  const handleEditProducto = () => {
    if (selectedId === null) {
      showToast('Selecciona un producto para editar.', 'warning');
      return;
    }
    openModal(PRODUCTOS_UPDATE, formData, {
      onConfirm: () => {
        showToast('Producto actualizado correctamente', 'success');
        setSelectedId(null);
      },
      onCancel: () => {},
    });
  };

  const handleDeleteProducto = () => {
    if (selectedId === null) {
      showToast('Selecciona un producto para eliminar.', 'warning');
      return;
    }
    openModal(PRODUCTOS_DELETE, formData, {
      onConfirm: () => {
        showToast('Producto eliminado correctamente', 'warning');
        setSelectedId(null);
      },
      onCancel: () => {},
    });
  };

  /* --------------------------------
     Botón "Crear Transacción"
     Solo se muestra si hay un producto seleccionado
  -------------------------------- */
  const handleCreateTransaccion = () => {
    if (!selectedId) {
      showToast('Selecciona un producto para crear la transacción.', 'warning');
      return;
    }
    openModal(
      TRANSACCION_CREATE,
      {
        producto: formData,
        impuestosOptions,
      },
      {
        onConfirm: () =>
          showToast('Transacción creada correctamente', 'success'),
        onCancel: () => {},
      }
    );
  };

  const productosFiltrados = useMemo(() => {
    if (!productos) return [];
    if (!search) return productos;
    return productos.filter((p) =>
      p.descripcion?.toLowerCase().includes(search.toLowerCase())
    );
  }, [productos, search]);

  const productosConId = useMemo(() => {
    return productosFiltrados.map((prod, index) => ({
      ...prod,
      id: prod.id || index,
    }));
  }, [productosFiltrados]);

  const columns = [
    { field: 'descripcion', headerName: 'Descripción', flex: 1 },
    { field: 'codigoExterno', headerName: 'Código Externo', flex: 1 },
  ];

  const showEditDeleteButtons = selectedId !== null;

  return (
    <Box display='flex' flexDirection='column'>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mb={2}
      >
        <Search sx={{ flex: 1, maxWidth: 400 }}>
          <InputBase
            onChange={handleSearch}
            sx={{ flex: 1 }}
            placeholder='Buscar Producto'
          />
          <SearchIcon />
        </Search>

        <Box display='flex' gap={2} alignItems='center'>
          <ActionButton onClick={handleCreateProducto}>
            <Typography>+ Crear Producto</Typography>
          </ActionButton>

          {selectedId && (
            <ActionButton onClick={handleCreateTransaccion}>
              <Typography>+ Crear Transacción</Typography>
            </ActionButton>
          )}

          {showEditDeleteButtons && (
            <EditDeleteButton
              openModalEdit={handleEditProducto}
              openModalDelete={handleDeleteProducto}
            />
          )}
        </Box>
      </Box>

      <Box mb={2}>
        <DataGrid
          columns={columns}
          rows={productosConId || []}
          getRowId={(row) => row.id}
          pagination
          autoHeight
          onRowClick={(params) => {
            const id = params.id as number | string;
            if (selectedId === id) {
              setSelectedId(null);
              setFormData({
                id: 0,
                descripcion: '',
                codigoExterno: '',
                idAplicativo: 0,
              });
            } else {
              setSelectedId(id);
              setFormData(params.row);
            }
          }}
          getRowClassName={(params) =>
            params.id === selectedId ? 'Mui-selected-border' : ''
          }
          loading={isLoadingProductos}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          hideFooterSelectedRowCount
          sx={{
            backgroundColor: '#F7F7F7',
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #E0E0E0',
            },
          }}
        />
      </Box>
      {error && (
        <Typography color='error'>
          Ocurrió un error cargando productos: {error.message}
        </Typography>
      )}

      <Toast
        open={toastOpen}
        message={toastMessage}
        severity={toastSeverity}
        onClose={handleToastClose}
      />
    </Box>
  );
}

/* ----------------------------------------------------------
   PESTAÑA DE TRANSACCIONES
---------------------------------------------------------- */
function TransaccionesTabContent() {
  const { openModal } = useContext<ModalContextType>(ModalContext);
  const { transacciones, isLoadingTransacciones, error } = useTransacciones();
  const { productos } = useProductos();

  const [selectedTxId, setSelectedTxId] = useState<number | null>(null);
  const [selectedTxData, setSelectedTxData] = useState<Transaccion | null>(
    null
  );

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState<
    'success' | 'warning' | 'error'
  >('success');

  const handleToastClose = () => setToastOpen(false);
  const showToast = (
    message: string,
    severity: 'success' | 'warning' | 'error'
  ) => {
    setToastMessage(message);
    setToastSeverity(severity);
    setToastOpen(true);
  };

  const handleEditTransaccion = () => {
    if (!selectedTxData) {
      showToast('Selecciona una transacción para editar.', 'warning');
      return;
    }
    const productoAsociado: Producto | undefined = productos.find(
      (p) => p.id === selectedTxData.idProducto
    );
    openModal(
      TRANSACCION_UPDATE,
      {
        transaccion: selectedTxData,
        producto: productoAsociado,
      },
      {
        onConfirm: () => {
          showToast('Transacción editada correctamente', 'success');
          setSelectedTxId(null);
          setSelectedTxData(null);
        },
        onCancel: () => {},
      }
    );
  };

  const handleDeleteTransaccion = () => {
    if (!selectedTxData) {
      showToast('Selecciona una transacción para eliminar.', 'warning');
      return;
    }
    openModal(
      TRANSACCION_DELETE,
      {
        transaccion: selectedTxData,
      },
      {
        onConfirm: () => {
          showToast('Transacción eliminada correctamente', 'warning');
          setSelectedTxId(null);
          setSelectedTxData(null);
        },
        onCancel: () => {},
      }
    );
  };
  const columns = [
    {
      field: 'descripcion',
      headerName: 'Descripción',
      flex: 1,
    },
    {
      field: 'codigoExterno',
      headerName: 'Código de Producto',
      flex: 1,
    },
    {
      field: 'tipoOpMonetaria',
      headerName: 'Tipo Operación',
      flex: 1,
    },
    {
      field: 'impuestos',
      headerName: 'Impuestos',
      flex: 1,
      renderCell: (params: any) => {
        const value = params.value;
        if (!value || !Array.isArray(value)) return '';
        return value.map((imp: any) => imp.mnemonico).join(', ');
      },
    },
  ];

  return (
    <Box display='flex' flexDirection='column'>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mb={2}
      >
        <Search sx={{ flex: 1, maxWidth: 400 }}>
          <InputBase placeholder='Buscar Transacción' sx={{ flex: 1 }} />
          <SearchIcon />
        </Search>
        {selectedTxId && (
          <EditDeleteButton
            openModalEdit={handleEditTransaccion}
            openModalDelete={handleDeleteTransaccion}
          />
        )}
      </Box>

      {/* DataGrid de Transacciones */}
      <Box mb={2}>
        <DataGrid
          rows={transacciones || []}
          columns={columns}
          getRowId={(row) => row.id}
          loading={isLoadingTransacciones}
          autoHeight
          hideFooterSelectedRowCount
          onRowClick={(params) => {
            const rowData = params.row as Transaccion;
            if (selectedTxId === rowData.id) {
              // Deseleccionar si se hace click de nuevo
              setSelectedTxId(null);
              setSelectedTxData(null);
            } else {
              setSelectedTxId(rowData.id);
              setSelectedTxData(rowData);
            }
          }}
          getRowClassName={(params) =>
            params.id === selectedTxId ? 'Mui-selected-border' : ''
          }
          sx={{
            backgroundColor: '#F7F7F7',
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #E0E0E0',
            },
          }}
        />
      </Box>

      {error && (
        <Typography color='error'>
          Ocurrió un error al cargar transacciones: {error.message}
        </Typography>
      )}

      <Toast
        open={toastOpen}
        message={toastMessage}
        severity={toastSeverity}
        onClose={handleToastClose}
      />
    </Box>
  );
}
