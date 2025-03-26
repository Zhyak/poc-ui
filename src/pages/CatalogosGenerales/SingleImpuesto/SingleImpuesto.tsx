import React, { useContext, useState } from "react";

import { useParams } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography, InputBase } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import {
  ActionButton,
  Filters,
  HeaderContainer,
  Search,
  Title,
} from "components/StyledComponents";
import BaseLayout from "components/BaseLayout";
import {
  ModalContextType,
  ModalContext,
} from "components/Modals/Providers/ModalProvider";
import {
  REGIMEN_IMPOSITIVO_CREATE,
  REGIMEN_IMPOSITIVO_UPDATE,
} from "components/Modals/types";
import EditDeleteButton from "components/Buttons/EditDeleteButton";
import WithDetailsButton from "components/Buttons/hoc/withDetails";

import impuestosData from "data/impuestosData.json";

const emptyFormData: ISingleImpuesto = {
  mnemonico: "",
  provincia: "",
  tipoOpMonetaria: "",
  fechaVigencia: "",
  alicuota: "",
  montoFijo: "",
  tipoDeFormula: "",
  baseDeCalculo: "",
};

interface ISingleImpuesto {
  mnemonico: string;
  provincia: string;
  tipoOpMonetaria: string;
  fechaVigencia: string;
  alicuota: string;
  montoFijo: string;
  tipoDeFormula: string;
  baseDeCalculo: string;
}

const SingleImpuesto = ({ open }: { open: boolean }) => {
  const { openModal } = useContext<ModalContextType>(ModalContext);
  const { impuestoName } = useParams();
  const [impuestos] = useState<ISingleImpuesto[]>(
    impuestosData["ganancias"]
  );
  const [selectedId, setSelectedId] = useState<number>(-1);

  const [formData, setFormData] = useState<ISingleImpuesto>(emptyFormData);

  const columns: GridColDef<ISingleImpuesto>[] = [
    {
      field: "mnemonico",
      headerName: "Mnemónico",
      flex:1,
      sortable: true,
      headerClassName:'MuiDataGrid-columnHeaders'
    },
    {
      field: "provincia",
      headerName: "Provincia",
      flex:1,
      sortable: true,
      headerClassName:'MuiDataGrid-columnHeaders'
    },
    {
      field: "tipoOpMonetaria",
      headerName: "Tipo Op. Monetaria",
      flex:1,
      sortable: true,
      headerClassName:'MuiDataGrid-columnHeaders'
    },
    {
      field: "fechaVigencia",
      headerName: "Fecha Vigencia",
      flex:1,
      sortable: true,
      headerClassName:'MuiDataGrid-columnHeaders'
    },
    {
      field: "alicuota",
      headerName: "Alicuota",
      flex:1,
      sortable: true,
      headerClassName:'MuiDataGrid-columnHeaders',
    },
    {
      field: "montoFijo",
      headerName: "Monto Fijo",
      flex:1,
      sortable: true,
      headerClassName:'MuiDataGrid-columnHeaders',
    },
    {
      field: "tipoDeFormula",
      headerName: "Tipo de Fórmula",
      flex:1,
      sortable: true,
      headerClassName:'MuiDataGrid-columnHeaders',
    },
  ];

  return (
    <BaseLayout open={open}>
      <Box display="flex" flexDirection="column">
        <HeaderContainer>
          <Title>
            {impuestoName![0].toUpperCase() + impuestoName!.slice(1)}
          </Title>
          <ActionButton
            onClick={() => {
              setSelectedId(-1);
              setFormData(emptyFormData);
              openModal(REGIMEN_IMPOSITIVO_CREATE);
            }}
            variant="contained"
          >
            <Typography>+ Agregar Régimen Impositivo</Typography>
          </ActionButton>
        </HeaderContainer>

        <Filters>
          <Search>
            <InputBase
              onChange={() => {}}
              sx={{ flex: 1 }}
              placeholder="Buscar Aplicativo"
            />
            <SearchIcon />
          </Search>
          {formData.mnemonico.length > 0 && (
            <WithDetailsButton>
              <EditDeleteButton
                openModalEdit={() =>
                  openModal(REGIMEN_IMPOSITIVO_UPDATE, formData)
                }
                openModalDelete={() => {}}
              />
            </WithDetailsButton>
          )}
        </Filters>

        <div className="my-6">
          <DataGrid
            columns={columns}
            rows={impuestos}
            getRowId={(row) => row.mnemonico}
            pagination
            autoHeight={false}
            onRowClick={(params: any) => {
              if (selectedId === params.id) {
                setSelectedId(-1);
                setFormData(emptyFormData);
              } else {
                setSelectedId(params.id);
                setFormData(params.row as ISingleImpuesto);
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
      </Box>
    </BaseLayout>
  );
};

export default SingleImpuesto;
