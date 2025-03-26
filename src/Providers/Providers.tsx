import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import React, { ReactNode, FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import swrConfig from '../config/swrConfig';
import theme from '../theme/theme';

interface ProvidersProps {
    children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => (
    <EmotionThemeProvider theme={theme}>
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <SWRConfig value={swrConfig}>
                <BrowserRouter>{children}</BrowserRouter>
            </SWRConfig>
        </MuiThemeProvider>
    </EmotionThemeProvider>
);

export default Providers;
