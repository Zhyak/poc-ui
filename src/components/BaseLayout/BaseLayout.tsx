import React  from "react";
import styled from "@emotion/styled";
import { Theme, useTheme } from "@mui/material";


const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }: { theme: Theme, open: boolean }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: 0,
    ...(open && {
      marginLeft: '354px',
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
    })
  })
);
  
const BaseLayout = ({ open, children }: {
  open: boolean;
  children: React.ReactNode;
}) => {
  const theme = useTheme();
  return (
    <Main theme={theme} open={open}>
      {children}
    </Main>
  );
}

export default BaseLayout
  