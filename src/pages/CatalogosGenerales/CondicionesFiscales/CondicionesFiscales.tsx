import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  InputBase,
  FormControlLabel,
  Checkbox,
  Chip,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
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
  ModalContext,
  ModalContextType,
} from "components/Modals/Providers/ModalProvider";
import EditDeleteButton from "components/Buttons/EditDeleteButton";

import { CondicionFiscalAplicativo } from "api/types";
import useAplicativos from "api/aplicativos";
import useCondicionFiscal from "api/condicionesFiscales";

import {
  CONDICIONES_FISCALES_CREATE,
  CONDICIONES_FISCALES_UPDATE,
  CONDICIONES_FISCALES_DELETE,
} from "components/Modals/types";
import Toast from "components/shared/toast";

const emptyCondicionFiscalAplicativo: CondicionFiscalAplicativo = {
  id: -1,
  idAplicativo: -1,
  usuarioCreacion: "",
  usuarioModificacion: "",
  codigoExternoProvincia: "",
  estado: "vigente",
  descripcionCondicionFiscal: "",
  idCondicionesFiscales: -1,
};

const CondicionesFiscales = ({ open }: { open: boolean }) => {
  const { data } = useAplicativos();
  const { condicionesFiscales, condicionesFiscalesAplicativos } =
    useCondicionFiscal();
  const { openModal } = useContext<ModalContextType>(ModalContext);

  const [search, setSearch] = useState("");
  const [condicionesFiscalesFiltered, setCondicionesFiscalesFiltered] =
    useState<CondicionFiscalAplicativo[]>([]);
  const [showVigentes, setShowVigentes] = useState(false);
  const [formData, setFormData] = useState<CondicionFiscalAplicativo>(
    emptyCondicionFiscalAplicativo
  );
  const [selectedId, setSelectedId] = useState<number>(-1);

  // Estado para manejar el Toast
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState<"success" | "error" | "warning">("success");

  const handleShowVigentesChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (target) setShowVigentes(target.checked);
  };

  const handleSearch = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value);
  };

  const handleToastClose = () => {
    setToastOpen(false);
  };

  const showToast = (message: string, severity: "success" | "error" | "warning") => {
    setToastMessage(message);
    setToastSeverity(severity);
    setToastOpen(true);
  };

  const condicionesFiscalesWithDescripcion = useMemo(() => {
    return condicionesFiscalesAplicativos.map(
      (condicionFiscalAplicativo: CondicionFiscalAplicativo) => {
        const descripcionCondicionFiscal = condicionesFiscales.find(
          (condicionFiscal) => {
            return (
              parseInt(condicionFiscal.id) ===
              condicionFiscalAplicativo.idCondicionesFiscales
            );
          }
        )?.descripcion;

        return {
          ...condicionFiscalAplicativo,
          descripcionCondicionFiscal: descripcionCondicionFiscal || "",
        };
      }
    );
  }, [condicionesFiscales, condicionesFiscalesAplicativos]);

  useEffect(() => {
    const filteredData = condicionesFiscalesWithDescripcion.filter(
      (condicionFiscal: CondicionFiscalAplicativo) => {
        return condicionFiscal.descripcionCondicionFiscal
          .toLowerCase()
          .includes(search.toLowerCase());
      }
    );

    setCondicionesFiscalesFiltered(filteredData);
  }, [condicionesFiscalesWithDescripcion, search]);

  const columns: GridColDef<CondicionFiscalAplicativo>[] = [
    {
      field: "descripcionCondicionFiscal",
      headerName: "Condición Fiscal",
      flex: 1,
      sortable: true,
      headerClassName: "MuiDataGrid-columnHeaders",
    },
    {
      field: "idAplicativo",
      headerName: "Aplicativo",
      flex: 1,
      sortable: true,
      headerClassName: "MuiDataGrid-columnHeaders",
      renderCell: (params) => {
        const currentAplicativo = data.find(
          (aplicativo) => aplicativo.idAplicativo === params.row.idAplicativo
        );

        if (currentAplicativo) {
          return currentAplicativo.mnemonico;
        }
      },
    },
    {
      field: "codigoExternoProvincia",
      headerName: "Codigo Externo",
      flex: 1,
      sortable: true,
      headerClassName: "MuiDataGrid-columnHeaders",
    },
    {
      field: "estado",
      headerName: "Estado",
      flex: 1,
      sortable: true,
      headerClassName: "MuiDataGrid-columnHeaders",
      renderCell: (params: GridRenderCellParams<any, string>) => {
        return (
          <Chip
            className="rounded-full py-1 px-2.5 text-sm"
            sx={{
              backgroundColor: "#E0F3DB",
              color: "#298B10",
            }}
            label="Vigente"
          />
        );
      },
    },
  ];

  return (
    <BaseLayout open={open}>
      <Box display="flex" flexDirection="column">
        <HeaderContainer>
          <Title>Condiciones Fiscales</Title>
          <ActionButton
            onClick={() => {
              setFormData(emptyCondicionFiscalAplicativo);
              openModal(CONDICIONES_FISCALES_CREATE, {}, {
                onConfirm: ({ success, message }: { success: boolean; message?: string }) => {
                  if (success) {
                    showToast("Condición Fiscal creada correctamente", "success");
                  } else {
                    showToast(message || "Error al crear la Condición Fiscal", "error");
                  }
                },
                onCancel: () => {},
              });
            }}
            variant="contained"
          >
            <Typography>+ Agregar Condición Fiscal</Typography>
          </ActionButton>
        </HeaderContainer>
  
        <Filters>
          <Search>
            <InputBase
              onChange={handleSearch}
              sx={{ flex: 1 }}
              placeholder="Buscar Condición Fiscal"
            />
            <SearchIcon />
          </Search>
          {formData.idAplicativo >= 0 && (
            <EditDeleteButton
              openModalEdit={() =>
                openModal(CONDICIONES_FISCALES_UPDATE, formData, {
                  onConfirm: ({ success, message }: { success: boolean; message?: string }) => {
                    if (success) {
                      showToast("Condición Fiscal actualizada correctamente", "success");
                    } else {
                      showToast(message || "Error al actualizar la Condición Fiscal", "error");
                    }
                  },
                  onCancel: () => {},
                })
              }
              openModalDelete={() =>
                openModal(CONDICIONES_FISCALES_DELETE, formData, {
                  onConfirm: ({ success, message }: { success: boolean; message?: string }) => {
                    if (success) {
                      showToast("Condición Fiscal eliminada correctamente", "success");
                    } else {
                      showToast(message || "Error al eliminar la Condición Fiscal", "error");
                    }
                  },
                  onCancel: () => {},
                })
              }
            />
          )}
        </Filters>
  
        <div className="mt-2">
          <div className="my-6">
            <DataGrid
              columns={columns}
              rows={condicionesFiscalesFiltered}
              getRowId={(row) => row.idAplicativo}
              pagination
              autoHeight={false}
              onRowClick={(params: any) => {
                if (selectedId === params.id) {
                  setSelectedId(-1);
                  setFormData(emptyCondicionFiscalAplicativo);
                } else {
                  setSelectedId(params.id);
                  setFormData(params.row as CondicionFiscalAplicativo);
                }
              }}
              getRowClassName={(params) => {
                return params.id === selectedId ? "Mui-selected-border" : "";
              }}
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
                  color: "#9747FF",
                  "&.Mui-checked": {
                    color: "#9747FF",
                  },
                }}
                name="showVigentes"
              />
            }
            label="Ver solo Condiciones Fiscales vigentes"
          />
        </div>
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

export default CondicionesFiscales;
