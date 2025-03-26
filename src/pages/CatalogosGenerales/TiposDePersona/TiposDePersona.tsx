import React, { useContext, useEffect, useMemo, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  InputBase,
  FormControlLabel,
  Checkbox,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import BaseLayout from "components/BaseLayout";
import {
  ActionButton,
  Filters,
  HeaderContainer,
  Search,
  Title,
} from "components/StyledComponents";
import {
  ModalContextType,
  ModalContext,
} from "components/Modals/Providers/ModalProvider";
import {
  TIPOS_DE_PERSONA_CREATE,
  TIPOS_DE_PERSONA_UPDATE,
  TIPOS_DE_PERSONA_DELETE,
} from "components/Modals/types";
import EditDeleteButton from "components/Buttons/EditDeleteButton";

import { TipoDePersona } from "api/types";
import useTiposDePersona from "api/tiposDePersona";
import useAplicativos from "api/aplicativos";
import Toast from "components/shared/toast";

const emptyTipoDePersona: TipoDePersona = {
  id: -1,
  tipoPersona: "",
  idAplicativo: -1,
  codigoExternoProvincia: "",
  fechaCreacion: "",
  fechaActualizacion: "",
  estado: "",
  usuarioCreacion: "",
  usuarioModificacion: "",
};

const TiposDePersona = ({ open }: { open: boolean }) => {
  const { tiposDePersona, isLoadingTiposDePersona } = useTiposDePersona();
  const { data: aplicativos } = useAplicativos();
  const { openModal } = useContext<ModalContextType>(ModalContext);

  const [search, setSearch] = useState("");
  const [filteredTiposDePersona, setFilteredTiposDePersona] = useState<
    TipoDePersona[]
  >([]);
  const [showVigentes, setShowVigentes] = useState(false);
  const [formData, setFormData] = useState<TipoDePersona>(emptyTipoDePersona);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState<"success" | "error" | "warning">("success");

  const handleToastClose = () => {
    setToastOpen(false);
  };

  const showToast = (message: string, severity: "success" | "error" | "warning") => {
    setToastMessage(message);
    setToastSeverity(severity);
    setToastOpen(true);
  };

  const tiposDePersonaWithAplicativos = useMemo(() => {
    return tiposDePersona.map((tipo) => {
      const aplicativo = aplicativos?.find(
        (app) => app.idAplicativo === tipo.idAplicativo
      );

      return {
        ...tipo,
        aplicativoMnemonico: aplicativo?.mnemonico || "N/A",
      };
    });
  }, [tiposDePersona, aplicativos]);

  useEffect(() => {
    const filteredData = tiposDePersonaWithAplicativos.filter((tipo) => {
      const isVigente = tipo.estado === "Vigente";

      return (
        (tipo.tipoPersona.toLowerCase().includes(search.toLowerCase()) ||
          tipo.codigoExternoProvincia
            .toLowerCase()
            .includes(search.toLowerCase())) &&
        (showVigentes ? isVigente : true)
      );
    });

    setFilteredTiposDePersona(filteredData);
  }, [tiposDePersonaWithAplicativos, search, showVigentes]);

  const handleSearch = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value);
  };

  const handleShowVigentesChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setShowVigentes(target.checked);
  };

  const columns: GridColDef[] = [
    {
      field: "tipoPersona",
      headerName: "Tipo de Persona",
      flex: 1,
      sortable: true,
      headerClassName: 'MuiDataGrid-columnHeaders',
    },
    {
      field: "aplicativoMnemonico",
      headerName: "Aplicativo",
      flex: 1,
      sortable: true,
      headerClassName: 'MuiDataGrid-columnHeaders',
    },
    {
      field: "codigoExternoProvincia",
      headerName: "Código Externo",
      flex: 1,
      sortable: true,
      headerClassName: 'MuiDataGrid-columnHeaders',
    },
    {
      field: "estado",
      headerName: "Estado",
      flex: 1,
      sortable: true,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Chip
          label={params.value || "N/A"}
          sx={{
            backgroundColor: params.value === "Vigente" ? "#E0F3DB" : "#FCE8E8",
            color: params.value === "Vigente" ? "#298B10" : "#C62828",
          }}
        />
      ),
      headerClassName: 'MuiDataGrid-columnHeaders',
    },
  ];

  return (
    <BaseLayout open={open}>
      <Box display="flex" flexDirection="column">
        <HeaderContainer>
          <Title>Tipo de Personas</Title>
          <ActionButton
            onClick={() => {
              setSelectedId(-1);
              setFormData(emptyTipoDePersona);
              openModal(TIPOS_DE_PERSONA_CREATE, {}, {
                onConfirm: () => showToast("Tipo de Persona creado correctamente", "success"),
                onCancel: () => {},
              });
            }}
            variant="contained"
          >
            <Typography>+ Agregar Tipo de Persona</Typography>
          </ActionButton>
        </HeaderContainer>

        <Filters>
          <Search>
            <InputBase
              onChange={handleSearch}
              sx={{ flex: 1 }}
              placeholder="Buscar Tipo de Persona"
            />
            <SearchIcon />
          </Search>
          {selectedId !== null && (
            <EditDeleteButton
              openModalEdit={() =>
                openModal(TIPOS_DE_PERSONA_UPDATE, formData, {
                  onConfirm: () => {
                    showToast("Tipo de Persona actualizado correctamente", "success");
                    setSelectedId(null);
                  },
                  onCancel: () => {},
                })
              }
              openModalDelete={() =>
                openModal(TIPOS_DE_PERSONA_DELETE, formData, {
                  onConfirm: () => {
                    showToast("Tipo de Persona eliminado correctamente", "warning");
                    setSelectedId(null);
                  },
                  onCancel: () => {},
                })
              }
            />
          )}
        </Filters>

        <div className="my-6">
        <DataGrid
        columns={columns}
        rows={filteredTiposDePersona}
        getRowId={(row) =>
          row.id ||
          `${row.tipoPersona}-${row.codigoExternoProvincia}` ||
          Math.random()
        }
        pagination
        autoHeight
        onRowClick={(params: any) => {
          if (selectedId === params.id) {
            setSelectedId(null);
            setFormData(emptyTipoDePersona);
          } else {
            setSelectedId(params.id);
            setFormData(params.row as TipoDePersona);
          }
        }}
        getRowClassName={(params) =>
          params.id === selectedId ? "Mui-selected-border" : ""
        }
        loading={isLoadingTiposDePersona}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        hideFooterSelectedRowCount
        sx={{
          backgroundColor: "#F7F7F7", // Aquí estableces el color de fondo
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #E0E0E0', // Opcional: Agregar un borde a las celdas
          },
        }}
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
                color: "#9747FF",
                "&.Mui-checked": {
                  color: "#9747FF",
                },
              }}
              name="showVigentes"
            />
          }
          label="Ver solo Tipos de Persona Vigentes"
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

export default TiposDePersona;
