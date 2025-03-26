import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import {
  AppBar as MuiAppBar,
  Toolbar,
  styled,
  IconButton,
  Typography,
  Box,
  Breadcrumbs,
} from "@mui/material";
import { KeyboardArrowRight } from "@mui/icons-material";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const AppHeaderBar = styled(MuiAppBar)(({ theme }) => ({
  boxShadow: "none !important",
  background: "white",
}));

const AppToolBar = styled(Toolbar)(({ theme }) => ({
  background: "white",
  height: 80,
  "& .MuiPaper-root-MuiAccordion-root::before": {
    display: "none",
  },
  "&::before": {
    content: '""',
  },
}));

const RoutesContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: 40,
  marginLeft: open ? 354 : 0,
}));

const IconButtonDrawer = styled(IconButton)(({ theme }) => ({
  marginTop: 40,
}));

const AppBar = ({ open, onOpen }: { open: boolean; onOpen: () => void }) => {
  const location = useLocation();

  const route: string[] = location.pathname
    .split("/")
    .filter((elem) => elem !== "");

  let url = "";

  return (
    <AppHeaderBar position="static">
      <AppToolBar>
        {!open && (
          <IconButtonDrawer onClick={onOpen} sx={{
            backgroundColor:'#F3F3F3',
            marginRight: 2,
            '&:hover': { 
            backgroundColor: '#C9C9C9',
        }}}>
            <ChevronRightIcon />
          </IconButtonDrawer>
        )}
        <RoutesContainer open={open}>
          <Breadcrumbs 
            separator={<KeyboardArrowRight />}
            aria-label="breadcrumbs"
          >
            {route.map((item: string) => {
              url += `/${item}`;
              const itemName = item[0].toUpperCase() + item.slice(1);
              const isCatalogoPath = itemName === "Catalogos";

              return isCatalogoPath ? (
                <Typography key={item} color="neutral">
                  {itemName}
                </Typography>
              ) : (
                <Link key={item} to={url}>
                  {itemName}
                </Link>
              );
            })}
          </Breadcrumbs>
        </RoutesContainer>
      </AppToolBar>
    </AppHeaderBar>
  );
};

export default AppBar;
