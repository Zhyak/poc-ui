import React from "react";
import { NavLink } from "react-router-dom";
import {
  Drawer,
  styled,
  IconButton,
  Divider,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { routes, sections } from "config/routes";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "24px 0 24px 36px",
  width:'340px',
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontSize: "32px",
  fontWeight: 200,
}));

const SectionAccordionHeader = styled(AccordionSummary)(({ theme }) => ({
  paddingLeft: "36px",
}));

const SectionAccordionHeaderText = styled(Typography)(({ theme }) => ({
  marginLeft: "12px",
  fontSize: "20px",
  fontWeight: 700,
}));

const SectionAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: "none",
  border: "none",
  padding: "24px 0",
  "&::before": {
    display: "none",
  },
  "&.Mui-disabled": {
    backgroundColor: "white",
  },
}));

const SectionAccordionContent = styled(AccordionDetails)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

const SectionAccordionButton = styled(Button)(({ theme }) => ({
  justifyContent: "flex-start",
  textTransform: "none",
  fontSize: "18px",
  marginLeft: 12,
  paddingLeft: 12,
})) as typeof Button;

const AppDrawer = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const handleDrawerClose = () => {
    onClose();
  };

  return (
    <Drawer
      sx={{
        width: 354,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 354,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <HeaderTitle>MÓDULO IMPUESTOS</HeaderTitle>
        <IconButton onClick={handleDrawerClose} sx={{
          backgroundColor:'#F3F3F3','&:hover': { 
          backgroundColor: '#C9C9C9',
      }}}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <SectionAccordion>
        <SectionAccordionHeader
          expandIcon={<ExpandMoreIcon />}
          aria-controls="catalogos-sections-list"
          id="catalogos-sections-list"
        >
          <ViewModuleIcon />
          <SectionAccordionHeaderText>
            Catálogos Generales
          </SectionAccordionHeaderText>
        </SectionAccordionHeader>
        <SectionAccordionContent>
          <SectionAccordionButton
            component={NavLink}
            to={routes.catalogos + sections.catalogos.aplicativos}
            color="inherit"
            sx={{
              '&:focus': {
                backgroundColor: '#E2DCFE',
              },
            }}
          >
            Aplicativos
          </SectionAccordionButton>
          <SectionAccordionButton
            component={NavLink}
            to={routes.catalogos + sections.catalogos.provincias}
            color="inherit"
            sx={{
              '&:focus': {
                backgroundColor: '#E2DCFE',
              },
            }}
          >
            Provincias
          </SectionAccordionButton>
          <SectionAccordionButton
            component={NavLink}
            to={routes.catalogos + sections.catalogos.condicionesFiscales}
            color="inherit"
            sx={{
              '&:focus': {
                backgroundColor: '#E2DCFE',
              },
            }}
          >
            Condiciones Fiscales
          </SectionAccordionButton>
          <SectionAccordionButton
            component={NavLink}
            to={routes.catalogos + sections.catalogos.tiposDePersonas}
            color="inherit"
            sx={{
              '&:focus': {
                backgroundColor: '#E2DCFE',
              },
            }}
          >
            Tipos de Personas
          </SectionAccordionButton>
          <SectionAccordionButton
            sx={{
              '&:focus': {
                backgroundColor: '#E2DCFE',
              },
            }}
            component={NavLink}
            to={routes.catalogos + sections.catalogos.impuestos}
            color="inherit"
            
          >
            Impuestos
          </SectionAccordionButton>
          <SectionAccordionButton
            component={NavLink}
            to={routes.catalogos + sections.catalogos.productoTransacciones}
            color="inherit"
            sx={{
              '&:focus': {
                backgroundColor: '#E2DCFE',
              },
            }}
          >
            Producto | Transacción
          </SectionAccordionButton>
        </SectionAccordionContent>
      </SectionAccordion>
      <SectionAccordion>
        <SectionAccordionHeader
          expandIcon={<ExpandMoreIcon />}
          aria-controls="reglas-sections-list"
          id="reglas-sections-list"
        >
          <FormatListNumberedIcon />
          <SectionAccordionHeaderText>
            Reglas Impuestos
          </SectionAccordionHeaderText>
        </SectionAccordionHeader>
        <SectionAccordionContent></SectionAccordionContent>
      </SectionAccordion>
    </Drawer>
  );
};

export default AppDrawer;
