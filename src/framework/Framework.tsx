import React, { useState } from 'react';
import './Framework.css';
import NavigationBar from './NavigationBar';
import ProcessDiagnostics from '../pages/ProcessDiagnostics';
import ProcessDiagnostics1 from '../pages/ProcessDiagnostics1';
import { Box, AppBar, Toolbar, Typography, } from '@mui/material';
import RichAppBar from './RichAppBar';

export default function Framework() {
    const [currentPage, setCurrentPage] = useState('');

    function onSelectedChanged(selectedName: string) {
        console.log("selected " + selectedName);
        setCurrentPage(selectedName);
    }

    const pages : { [key:string]: any } = {
        "": <ProcessDiagnostics />,
        "Process Diagnostics": <ProcessDiagnostics />,
    }

    return (
        <div id="Framework">
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', height: '100%' }}>
                <NavigationBar onSelectedChanged={onSelectedChanged} />
                <Box component="main" sx={{ flexGrow: 1 }}>
                    {pages[currentPage]}
                </Box>
            </Box>
        </div>
    );
}