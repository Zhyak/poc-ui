import React, { useContext, useEffect, useMemo, useState } from "react";

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

import { ProvinciasAplicativos } from "api/types";
import useProvincias from "api/provincias";
import useAplicativos from "api/aplicativos";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import {
  ModalContextType,
  ModalContext,
} from "components/Modals/Providers/ModalProvider";
import {
  PROVINCIAS_CREATE,
  PROVINCIAS_UPDATE,
  PROVINCIAS_DELETE,
} from "components/Modals/types";
import EditDeleteButton from "components/Buttons/EditDeleteButton";

const emptyProvinciasData: ProvinciasAplicativos = {
  idProvinciaInterna: -1,
  idAplicativo: -1,
  codigoExternoProvincia: "",
  nombreProvincia: "",
  mnemonico: "",
  usuario: "",
  estado: "vigente",
};

const Provincias = ({ open }: { open: boolean }) => {
  const { provincias, provinciasAplicativos, isLoadingProvinciasAplicativos } =
    useProvincias();
  const { openModal } = useContext<ModalContextType>(ModalContext);

  const { data } = useAplicativos();

  const [search, setSearch] = useState("");
  const [provinciasAplicativosFiltered, setProvinciasAplicativosFiltered] =
    useState<ProvinciasAplicativos[]>([]);
  const [showVigentes, setShowVigentes] = useState(false);

  const [formData, setFormData] =
    useState<ProvinciasAplicativos>(emptyProvinciasData);
  const [selectedId, setSelectedId] = useState<number>(-1);

  const handleShowVigentesChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (target) setShowVigentes(target.checked);
  };

  const handleSearch = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value);
  };

  const provinciasWithNames = useMemo(() => {
    return provinciasAplicativos.map((provinciaAplicativos) => {
      const nombresProvinciasAplicativos = provincias.find((provincia) => {
        return provincia.id === provinciaAplicativos.idProvinciaInterna;
      })?.nombreProvincia;

      const mnemonico = data.find(
        (aplicativo) =>
          aplicativo.idAplicativo === provinciaAplicativos.idAplicativo
      )?.mnemonico;

      return {
        ...provinciaAplicativos,
        nombreProvincia: nombresProvinciasAplicativos || "",
        mnemonico: mnemonico || "",
      };
    });
  }, [data, provincias, provinciasAplicativos]);

  useEffect(() => {
    const filteredData = provinciasWithNames.filter(
      (aplicativo: ProvinciasAplicativos) => {
        return aplicativo.nombreProvincia
          .toLowerCase()
          .includes(search.toLowerCase());
      }
    );

    setProvinciasAplicativosFiltered(filteredData);
  }, [provinciasWithNames, search]);

  const columns: GridColDef<ProvinciasAplicativos>[] = [
    {
      field: "nombreProvincia",
      headerName: "Nombre Provincia",
      flex:1,
      sortable: true,
      headerClassName:'MuiDataGrid-columnHeaders',
    },
    {
      field: "idAplicativo",
      headerName: "Aplicativo",
      flex:1,
      headerClassName:'MuiDataGrid-columnHeaders',
      sortable: true,
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
      flex:1,
      headerClassName:'MuiDataGrid-columnHeaders',
      sortable: true,
    },
    {
      field: "estado",
      headerName: "Estado",
      flex:1,
      headerClassName:'MuiDataGrid-columnHeaders',
      sortable: true,
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
          <Title>Provincias</Title>
          <ActionButton
            onClick={() => {
              setSelectedId(-1);
              setFormData(emptyProvinciasData);
              openModal(PROVINCIAS_CREATE);
            }}
            variant="contained"
          >
            <Typography>+ Agregar Provincia</Typography>
          </ActionButton>
        </HeaderContainer>

        <Filters>
          <Search>
            <InputBase
              onChange={handleSearch}
              sx={{ flex: 1 }}
              placeholder="Buscar Provincia"
            />
            <SearchIcon />
          </Search>
          {selectedId >= 0 && (
            <EditDeleteButton
              openModalEdit={() => openModal(PROVINCIAS_UPDATE, formData)}
              openModalDelete={() => {
                openModal(
                  PROVINCIAS_DELETE,
                  {
                    idAplicativo: formData.idAplicativo,
                    idProvincia: formData.idProvinciaInterna,
                    nombreProvincia: formData.nombreProvincia,
                    mnemonico: formData.mnemonico,
                  },
                  {
                    onConfirm: () => setSelectedId(-1),
                    onCancel: () => {},
                  }
                );
              }}
            />
          )}
        </Filters>

        <div className="mt-2">
          <div className="my-6">
            <DataGrid
              sx={{
                "& .MuiDataGrid-cell--selectionMode": {
                  backgroundColor: "rgba(255, 7, 0, 0.55)",
                },
              }}
              columns={columns}
              rows={provinciasAplicativosFiltered}
              getRowId={(row) => row.idAplicativo}
              pagination
              autoHeight={false}
              onRowClick={(params: any) => {
                if (selectedId === params.id) {
                  setSelectedId(-1);
                  setFormData(emptyProvinciasData);
                } else {
                  setSelectedId(params.id);
                  setFormData(params.row as ProvinciasAplicativos);
                }
              }}
              loading={isLoadingProvinciasAplicativos}
              initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
              }}
              getRowClassName={(params) => {
                return params.id === selectedId ? "Mui-selected-border" : "";
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
                  ml:1.5,
                  color: "#9747FF",
                  "&.Mui-checked": {
                    color: "#9747FF",
                  },
                }}
                name="showVigentes"
              />
            }
            label="Ver solo Provincias Vigentes"
          />
        </div>
      </Box>
    </BaseLayout>
  );
};

export default Provincias;
