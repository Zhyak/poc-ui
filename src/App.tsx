import React, { FC, useState } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import { routes, sections } from './config/routes';

import { ModalProvider } from 'components/Modals/Providers/ModalProvider';
import AppDrawer from './components/AppDrawer';
import AppBar from './components/AppBar';

import Providers from './Providers';
import Aplicativos from './pages/CatalogosGenerales/Aplicativos';
import Reglas from './pages/ReglasImpuestos/Reglas';
import Provincias from 'pages/CatalogosGenerales/Provincias';
import CondicionesFiscales from 'pages/CatalogosGenerales/CondicionesFiscales';
import TiposDePersona from 'pages/CatalogosGenerales/TiposDePersona';
import Impuestos from './pages/CatalogosGenerales/Impuestos';
import SingleImpuesto from 'pages/CatalogosGenerales/SingleImpuesto';
import ProductoTransaccion from 'pages/CatalogosGenerales/ProductoTransaccion';

const theme = createTheme({
  typography: {
    fontFamily: 'Nunito Sans',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Nunito Sans';
        }
      `,
    },
  },
});

const App: FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <Providers>
      <ModalProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar open={open} onOpen={() => setOpen(true)} />
          <AppDrawer open={open} onClose={() => setOpen(false)} />
          <Routes>
            <Route path={routes.home} element={<Outlet />}>
              <Route
                index
                element={
                  <Navigate
                    to={routes.catalogos + sections.catalogos.aplicativos}
                  />
                }
              />
              <Route
                path={routes.catalogos + sections.catalogos.aplicativos}
                element={<Aplicativos open={open} />}
              />
              <Route path={routes.reglas} element={<Reglas open={open} />} />
            </Route>
            <Route
              path={routes.catalogos + sections.catalogos.provincias}
              element={<Provincias open={open} />}
            />
            <Route
              path={routes.catalogos + sections.catalogos.condicionesFiscales}
              element={<CondicionesFiscales open={open} />}
            />
            <Route
              path={routes.catalogos + sections.catalogos.tiposDePersonas}
              element={<TiposDePersona open={open} />}
            />
            <Route
              path={routes.catalogos + sections.catalogos.impuestos}
              element={<Outlet />}
            >
              <Route path='' element={<Impuestos open={open} />} />
              <Route
                path=':impuestoName'
                element={<SingleImpuesto open={open} />}
              />
            </Route>
            <Route
              path={routes.catalogos + sections.catalogos.productoTransacciones}
              element={<ProductoTransaccion open={open} />}
            />
          </Routes>
        </ThemeProvider>
      </ModalProvider>
    </Providers>
  );
};

export default App;
