import React, { useContext, useEffect, useState } from 'react';

import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import {
  Box,
  Typography,
  InputBase,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import Chip from '@mui/material/Chip';

import SearchIcon from '@mui/icons-material/Search';

import useAplicativos from 'api/aplicativos';
import BaseLayout from 'components/BaseLayout';
import { Aplicativo } from 'api/types';
import {
  ActionButton,
  Filters,
  HeaderContainer,
  Search,
  Title,
} from 'components/StyledComponents';
import {
  ModalContextType,
  ModalContext,
} from 'components/Modals/Providers/ModalProvider';
import {
  APLICATIVOS_CREATE,
  APLICATIVOS_UPDATE,
  APLICATIVOS_DELETE,
} from 'components/Modals/types';
import EditDeleteButton from 'components/Buttons/EditDeleteButton';
import Toast from '../../../components/shared/toast';

const emptyFormData: Aplicativo = {
  id: '',
  idAplicativo: -1,
  mnemonico: '',
  descripcion: '',
  usuario: 'new@gmail.com',
  estado: 'Vigente',
};

interface DataType {
  idAplicativo: number;
  mnemonico: string;
  descripcion: string;
  estado: string;
}

const Aplicativos = ({ open }: { open: boolean }) => {
  const { data, isLoading } = useAplicativos();
  const { openModal } = useContext<ModalContextType>(ModalContext);
  const [aplicativos, setAplicativos] = useState<Aplicativo[]>(data);
  const [selectedId, setSelectedId] = useState<number>(-1);
  const [search, setSearch] = useState('');
  const [showVigentes, setShowVigentes] = useState(false);
  const [formData, setFormData] = useState<Aplicativo>(emptyFormData);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState<
    'success' | 'error' | 'warning' | 'info'
  >('success');

  const handleShowVigentesChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (target) setShowVigentes(target.checked);
  };

  const handleSearch = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value);
  };

  const showToast = (
    message: string,
    severity: 'success' | 'error' | 'warning' | 'info'
  ) => {
    setToastMessage(message);
    setToastSeverity(severity);
    setToastOpen(true);
  };

  const handleToastClose = () => {
    setToastOpen(false);
  };

  useEffect(() => {
    const filteredData = data?.filter((aplicativo: Aplicativo) => {
      const isVigente = aplicativo.estado === 'Vigente';

      return (
        (aplicativo.mnemonico.toLowerCase().includes(search.toLowerCase()) ||
          aplicativo.descripcion
            .toLowerCase()
            .includes(search.toLowerCase())) &&
        (showVigentes ? isVigente : true)
      );
    });

    setAplicativos(filteredData);
  }, [data, search, showVigentes]);

  const columns: GridColDef<DataType>[] = [
    {
      field: 'mnemonico',
      headerName: 'Mnemónico',
      flex: 1,
      sortable: true,
      headerClassName: 'MuiDataGrid-columnHeaders',
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      flex: 1,
      sortable: true,
      headerClassName: 'MuiDataGrid-columnHeaders',
    },
    {
      field: 'estado',
      headerName: 'Estado',
      flex: 1,
      sortable: true,
      headerClassName: 'MuiDataGrid-columnHeaders',
      renderCell: (params: GridRenderCellParams<any, string>) => {
        return (
          <Chip
            className='rounded-full py-1 px-2.5 text-sm'
            sx={{
              backgroundColor: '#E0F3DB',
              color: '#298B10',
            }}
            label={params.value}
          />
        );
      },
    },
  ];

  return (
    <BaseLayout open={open}>
      <Box display='flex' flexDirection='column'>
        <HeaderContainer>
          <Title>Aplicativos</Title>
          <ActionButton
            onClick={() => {
              setSelectedId(-1);
              setFormData(emptyFormData);
              openModal(
                APLICATIVOS_CREATE,
                {},
                {
                  onConfirm: () => {
                    showToast(
                      'El Aplicativo fue creado correctamente',
                      'success'
                    );
                  },
                  onCancel: () => {},
                }
              );
            }}
            variant='contained'
          >
            <Typography>+ Agregar Aplicativo</Typography>
          </ActionButton>
        </HeaderContainer>

        <Filters>
          <Search>
            <InputBase
              onChange={handleSearch}
              sx={{ flex: 1 }}
              placeholder='Buscar Aplicativo'
            />
            <SearchIcon />
          </Search>
          {selectedId >= 0 && (
            <EditDeleteButton
              openModalEdit={() => {
                openModal(APLICATIVOS_UPDATE, formData, {
                  onConfirm: () => {
                    showToast(
                      'El Aplicativo fue editado correctamente',
                      'success'
                    );
                    setSelectedId(-1);
                  },
                  onCancel: () => {},
                });
              }}
              openModalDelete={() =>
                openModal(
                  APLICATIVOS_DELETE,
                  {
                    idAplicativo: formData.idAplicativo,
                    mnemonico: formData.mnemonico,
                  },
                  {
                    onConfirm: ({
                      success,
                      message,
                    }: {
                      success: boolean;
                      message?: string;
                    }) => {
                      if (success) {
                        showToast(
                          'El Aplicativo fue eliminado correctamente',
                          'success'
                        );
                      } else {
                        showToast(
                          message || 'Error al eliminar el Aplicativo',
                          'error'
                        );
                      }
                      setSelectedId(-1);
                    },
                    onCancel: () => {
                      setSelectedId(-1);
                    },
                  }
                )
              }
            />
          )}
        </Filters>

        <div className='my-6'>
          <DataGrid
            columns={columns}
            rows={aplicativos}
            getRowId={(row) => row.idAplicativo}
            pagination
            autoHeight={false}
            onRowClick={(params: any) => {
              if (selectedId === params.id) {
                setSelectedId(-1);
                setFormData(emptyFormData);
              } else {
                setSelectedId(params.id);
                setFormData(params.row as Aplicativo);
              }
            }}
            getRowClassName={(params) => {
              return params.id === selectedId ? 'Mui-selected-border' : '';
            }}
            loading={isLoading}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            hideFooterSelectedRowCount
          />
        </div>
        <FormControlLabel
          control={
            <Checkbox
              checked={showVigentes}
              onChange={handleShowVigentesChange}
              sx={{
                height: 24,
                width: 24,
                mr: 0.5,
                ml: 1.5,
                color: '#9747FF',
                '&.Mui-checked': {
                  color: '#9747FF',
                },
              }}
              name='showVigentes'
            />
          }
          label='Ver solo Aplicativos Vigentes'
        />
      </Box>
      <Toast
        open={toastOpen}
        message={toastMessage}
        severity={toastSeverity}
        onClose={handleToastClose}
      />
    </BaseLayout>
  );
};

export default Aplicativos;
