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
import { Storage, Biotech, Send } from '@mui/icons-material';
import { ListItemAvatar, Avatar, Chip, Paper } from '@mui/material';
import { Tabs, Tab } from '@mui/material';

import * as api from '../common/ServerAPIs';
import { DataTable } from '../common/DataTable';
import { ProcessVariantsChart } from '../common/ProcessVariantsChart';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { styled } from '@mui/material/styles';

export default function ProcessDiagnostics(props: any) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState([] as any[]);

    useEffect(() => {
        loadProcessDefinitions()
    }, [])

    async function loadProcessDefinitions() {
        setData([
            { id: 1, name: "Process Definition 1", description: "This is the process definition 1" },
            { id: 2, name: "Process Definition 2", description: "This is the process definition 2" }
        ]);
        return;
        var processDefinitionsUri = api.processDefinitions();
        console.log("fetching " + processDefinitionsUri);
        let response = await fetch(processDefinitionsUri);
        console.log("loaded " + response);
        if (response.ok) {
            let jsonData = await response.json();
            // setData(JSON.parse(jsonData));
            setData([
                { name: "Process Definition 1", description: "This is the process definition 1" },
                { name: "Process Definition 2", description: "This is the process definition 2" }
            ]);
        }
        else {
            setError(await response.text());
        }

        setLoading(false);
    }

    const [selected, setSelected] = useState(0);

    function menuItemClick(selectionIndex: number) {
        setSelected(selectionIndex);
    }

    const [knowledgeBase, setKnowledgeBase] = useState('Hpc');

    const knowledgeBaseChange = (event: SelectChangeEvent) => {
        setKnowledgeBase(event.target.value);
    };

    const listMaxWidth: number = 290;
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
            <List
                sx={{ minWidth: listMaxWidth, maxWidth: listMaxWidth, height: '100%', p: 0 }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        <FormControl variant="standard" sx={{ minWidth: 160, width: '100%', display: 'flex' }}>
                            <InputLabel id="demo-simple-select-helper-label">KnowledgeBase</InputLabel>
                            <Select label="Knowledge Base" sx={{ display: 'flex' }} onChange={knowledgeBaseChange} value={knowledgeBase}>
                                <MenuItem value="Hpc">Hpc Pack Job Analysis</MenuItem>
                                <MenuItem value="Financial">Finanicial Processes</MenuItem>
                                <MenuItem value="Procurement">Procurement Process</MenuItem>
                                <MenuItem value="Production">Production Process</MenuItem>
                                <MenuItem value="Logistics">Logistics Process</MenuItem>
                                <MenuItem value="SAP">SAP System</MenuItem>
                                <MenuItem value="Kingdee">Kingdee System</MenuItem>
                                <MenuItem value="Yonyou">Yonyou System</MenuItem>
                            </Select>
                        </FormControl>
                    </ListSubheader>
                }
            >
                {
                    data.map((v, i) => {
                        return (
                            <ListItemButton key={v.id} onClick={() => menuItemClick(i)} selected={selected === i}>
                                <ListItemAvatar>
                                    <Storage />
                                </ListItemAvatar>
                                <ListItemText primary={v.name} secondary={v.description} />
                                {/* <ListItemText primary={v.name} /> */}
                            </ListItemButton>
                        );
                    })
                }
            </List >
            <Divider orientation="vertical" flexItem />
            {/* <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', p: 0}}> */}
            <Stack direction="column" alignItems="stretch" justifyContent="flex-start"
                spacing={1} p={1} sx={{ flexGrow: 1, bgcolor: 'grey.100' }}>
                <Stack direction="row" alignItems="flex-end" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={1} p={1}>
                        <Avatar sx={{ color: 'primary.main' }}>{selected}</Avatar>
                        <Box sx={{ color: 'primary.main' }}>
                            <Typography variant="h6">Selected {selected} definition. </Typography>
                            <Typography variant="body2">This is the description of selected {selected} definition. </Typography>
                        </Box>
                    </Stack>
                    <Stack direction="row" alignItems="flex-end" justifyContent="flex-start" spacing={1}>
                        <Button variant="text" size="small" startIcon={<Biotech />}>
                            Laboratory
                        </Button>
                        <Divider variant="middle" orientation="vertical" flexItem />
                        <Button variant="text" size="small" endIcon={<Send />}>
                            Send Report
                        </Button>
                    </Stack>
                </Stack>
                {/*                 <Grid container sx={{ flexGrow: 1, p: 0, m: 0}}>
                    <Grid item sm={4}> */}
                <Paper elevation={1}
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
                            <Stack direction='row' sx={{ height: '100%' }} divider={<Divider orientation="vertical" />}>
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