import React, { useEffect, useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Button } from '@mui/material';
import { Storage, Biotech, Send, FolderOutlined, NavigateNext } from '@mui/icons-material';
import { ListItemAvatar, Avatar, Chip, Paper, Breadcrumbs } from '@mui/material';
import { Tabs, Tab } from '@mui/material';

import * as api from '../common/ServerAPIs';
import { DataTable } from '../common/DataTable';
import { ProcessVariantsChart } from '../common/ProcessVariantsChart';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { styled } from '@mui/material/styles';
import ProcessDefinitionSelector from '../common/ProcessDefinitionSelector';
import { maxWidth } from '@mui/system';

export default function ProcessDiagnostics(props: any) {
    const listMaxWidth: number = 250;
    const [selectedProcessDefinitionId, setSelectedProcessDefinitionId] = useState();

    const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(0.5),
    }));

    function TabPanel(props: any) {
        const { children, value, index, ...other } = props;

        return (
            <Box
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                sx={{ flexGrow: 1, py: 1 }}
                {...other}
            >
                {value === index && children}
            </Box>
        );
    }

    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <Stack direction="row" sx={{ height: '100%' }}>
            <ProcessDefinitionSelector width={listMaxWidth} selecteddefinition={selectedProcessDefinitionId} setselecteddefinition={setSelectedProcessDefinitionId} />
            <Divider orientation="vertical" flexItem />
            {/* <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', p: 0}}> */}
            <Stack direction="column" alignItems="stretch" justifyContent="flex-start"
                spacing={1} p={1} sx={{ flexGrow: 1, bgcolor: 'grey.100' }}>
                {/*                 <Grid container sx={{ flexGrow: 1, p: 0, m: 0}}>
                    <Grid item sm={4}> */}
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Breadcrumbs
                        separator={<NavigateNext fontSize="small" />}
                        aria-label="breadcrumb"
                    >
                        <Typography key={1} color="text.primary">
                            Imported File 1
                        </Typography>
                        <Typography key={2} color="text.primary">
                            Hpc Job Analysis
                        </Typography>
                        <Typography key={3} color="text.primary">
                            Process Definition 1
                        </Typography>
                    </Breadcrumbs>
                    <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={1}>
                <Paper elevation={0}
                    component="ul"
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexWrap: 'wrap',
                        listStyle: 'none',
                        p: 0.5,
                        m: 0,
                    }}>
                    <ListItem>
                        <Chip variant="filled" color="warning" label="too long" size="small" onClick={(c) => { }} />
                    </ListItem>
                    <ListItem>
                        <Chip variant="filled" color="error" label="blocked" size="small" onClick={(c) => { }} />
                    </ListItem>
                    <ListItem>
                        <Chip variant="filled" color="success" label="compliant" size="small" onClick={(c) => { }} />
                    </ListItem>
                </Paper>
                        <Button variant="text" size="small" startIcon={<Biotech />}>
                            Laboratory
                        </Button>
                        <Divider variant="middle" orientation="vertical" flexItem />
                        <Button variant="text" size="small" endIcon={<Send />}>
                            Send Report
                        </Button>
                    </Stack>
                </Stack>
                <Paper elevation={1} sx={{ flexGrow: 1, p: 1, display: 'flex' }}>
                    <Stack direction="column" sx={{ flexGrow: 1 }}>
                        <Tabs value={selectedTab} onChange={(e, v) => { setSelectedTab(v) }} aria-label="basic tabs example">
                            <Tab label="Diagnostics" />
                            <Tab label="Statistics" />
                            <Tab label="Advisor" />
                            <Tab label="Compliance" />
                        </Tabs>
                        <TabPanel index={1} value={selectedTab} />
                        <TabPanel index={2} value={selectedTab} />
                        <TabPanel index={0} value={selectedTab}>
                            <Stack direction='row-reverse' sx={{ height: '100%' }} divider={<Divider orientation="vertical" />}>
                                <DataTable />
                                <ProcessVariantsChart />
                            </Stack>
                        </TabPanel>
                    </Stack>
                </Paper>
            </Stack>
        </Stack >
    );
}