import React from 'react';
import './Framework.css';
import NavigationBar from './NavigationBar';
import ProcessDiagnostics from '../pages/ProcessDiagnostics';
import useCustomTheme from '../common/CustomTheme';
import { Box, Stack, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';

export default function Framework() {
    const pages = [{
        path: "/diagnostics",
        page: <ProcessDiagnostics />
    }, {
        path: "*",
        page: <Typography variant="h2">Page not found.</Typography>,

    }];

    const theme = useCustomTheme({ railMode: 'dark' });

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <div id="Framework">
                    <Stack direction="row" alignItems="stretch" sx={{ height: '100%' }}>
                        <NavigationBar />
                        <Box component="main" sx={{ flexGrow: 1 }}>
                            <Routes>
                                {
                                    pages.map((p) => (<Route key={p.path} path={p.path} element={p.page} />))
                                }
                            </Routes>
                        </Box>
                    </Stack>
                </div>
            </ThemeProvider>
        </BrowserRouter>
    );
}