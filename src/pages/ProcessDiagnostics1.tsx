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
import { ListItemAvatar } from '@mui/material';

import * as api from '../common/ServerAPIs';
import { DataTable } from '../common/DataTable';
import { ProcessVariantsChart } from '../common/ProcessVariantsChart';

export default function ProcessDiagnostics1(props: any) {
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

    const initialVariants = [
        {
            name: "Variant 1",
            id: 1,
            thumbprint: "aabbddeeff",
            popularity: 28,
            tags: ["longstep"]
        },
        {
            name: "Variant 2",
            id: 2,
            thumbprint: "aabbddeeff",
            popularity: 25,
            tags: ["incompliant"]
        },
        {
            name: "Variant 3",
            id: 3,
            thumbprint: "aabbddeeff",
            popularity: 10,
            tags: ["blocked"]
        },
    ];

    const [variants, setVariants] = useState(initialVariants as any[]);

    interface States {
        [key: number]: boolean
    }

    const [variantsSelected, setVariantsSelected] = useState({} as States);

    const onListClick = (i: number) => {
        let newSelected = {
            ...variantsSelected,
            [i]: !variantsSelected[i],
        };

        console.log(newSelected);
        setVariantsSelected(newSelected);
    }

    const [filter, setFilter] = useState('MostPopular');
    const filterChange = (event: SelectChangeEvent) => {
        setFilter(event.target.value);
    };

    const listMaxWidth: number = 290;

    return (
        <Stack direction="row" sx={{ height: '100%' }}>
            <List
                sx={{ minWidth: listMaxWidth, maxWidth: listMaxWidth, height: '100%', m: 0, p: 0 }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        <FormControl variant="standard" sx={{ minWidth: 160, display: 'flex' }}>
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
            <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'red' }}>
                <Box>
                    <Box>
                        <Typography variant="h6">Selected {selected} definition. </Typography>
                        <Typography variant="inherit">This is the description of selected {selected} definition. </Typography>
                    </Box>
                    <Divider orientation="horizontal" variant="fullWidth" flexItem />
                    <Stack direction="row" spacing={2} sx={{ my: 2 }}>
                        <Button variant="outlined" startIcon={<Biotech />}>
                            Goto Laboratory
                        </Button>
                        <Button variant="contained" endIcon={<Send />}>
                            Send Report
                        </Button>
                    </Stack>
                </Box>
                <Stack sx={{ bgcolor: 'green', flexGrow: 1, p: 1 }} direction="row">
                    <List
                        sx={{ maxWidth: listMaxWidth, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                <FormControl variant="standard" sx={{ m: 0, minWidth: 160, width: '100%', display: 'flex' }}>
                                    <InputLabel id="demo-simple-select-helper-label">Filter</InputLabel>
                                    <Select label="Filter" sx={{ display: 'flex' }} onChange={filterChange} value={filter}>
                                        <MenuItem value="MostPopular">Most Popular</MenuItem>
                                        <MenuItem value="LeastPopular">Least Popular</MenuItem>
                                        <MenuItem value="Incompliant">Incompliant</MenuItem>
                                        <MenuItem value="Tagged">Error Tagged</MenuItem>
                                    </Select>
                                </FormControl>
                            </ListSubheader>
                        }
                    >
                        {
                            variants.map((v, i) => {
                                return (
                                    <ListItemButton key={v.id} onClick={() => onListClick(i)} selected={variantsSelected[i]}>
                                        <ListItemAvatar>
                                            <Storage />
                                        </ListItemAvatar>
                                        <ListItemText primary={v.name} secondary={v.thumbprint}
                                            primaryTypographyProps={{
                                                style: {
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }
                                            }}
                                            secondaryTypographyProps={{
                                                style: {
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis'
                                                }
                                            }} />
                                        {/* <ListItemText primary={v.name} /> */}
                                    </ListItemButton>
                                );
                            })
                        }
                    </List >
                    <Divider orientation="vertical" variant="middle" sx={{ width: 2 }} flexItem />
                    <ProcessVariantsChart />
                </Stack>
            </Box>
        </Stack >
    );
}