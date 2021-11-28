import React, { useState } from 'react';
import './Framework.css';
import NavigationBar from './NavigationBar';
import ProcessDiagnostics from '../pages/ProcessDiagnostics';
import { Box, AppBar, Toolbar, Typography, } from '@mui/material';
import RichAppBar from './RichAppBar';

export default function Framework() {
    const [currentPage, setCurrentPage] = useState(0);

    function onSelectedChanged(selectedIndex: number) {
        console.log("selected " + selectedIndex);
        setCurrentPage(selectedIndex);
    }

    const pages = [
        <ProcessDiagnostics />,
        <ProcessDiagnostics />,
        <ProcessDiagnostics />,
        <ProcessDiagnostics />,
        <ProcessDiagnostics />,
    ]

    return (
        <div id="Framework">
            <Box sx={{ display: 'flex' }}>
                <NavigationBar onSelectedChanged={onSelectedChanged} />
                <Box component="main" sx={{ flexGrow: 1 }}>
                    {pages[currentPage]}
                </Box>
            </Box>
        </div>
    );
}