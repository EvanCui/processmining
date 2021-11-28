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
import { Storage } from '@mui/icons-material';
import { ListItemAvatar } from '@mui/material';

import * as api from '../common/ServerAPIs';

export default function ProcessDiagnostics(props: any) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState([] as any[]);

    useEffect(() => {
        loadProcessDefinitions()
    }, [])

    async function loadProcessDefinitions() {
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

    const [dataSource, setDataSource] = useState('File1');

    const dataSourceChange = (event: SelectChangeEvent) => {
        setDataSource(event.target.value);
    };

    let selectionIndex: number = 0;
    const listMaxWidth: number = 290;

    return (
        <Stack direction="row" sx={{ height: '100vh' }}>
            <List
                sx={{ width: '100%', maxWidth: listMaxWidth, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        <FormControl variant="standard" sx={{ mx: 0, my: 1, minWidth: 160, width: '100%', display: 'flex' }}>
                            <InputLabel id="demo-simple-select-helper-label">Data Source</InputLabel>
                            <Select label="Data Source" sx={{ display: 'flex' }} onChange={dataSourceChange} value={dataSource}>
                                <MenuItem value="File1">Imported File 1</MenuItem>
                                <MenuItem value="File2">Imported File 2</MenuItem>
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
                            <ListItemButton onClick={() => menuItemClick(i)} selected={selected === i}>
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
            <Grid container spacing={4} mx={2}>
                <Grid item sm={12} xs={4}>
                    <h1>Selected {selected} definition. </h1>
                </Grid>
                <Grid item sm={6} xs={4}>
                    <Typography paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                        enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                        imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                        Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                        Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                        adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                        nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                        leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                        feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                        consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                        sapien faucibus et molestie ac.
                    </Typography>
                </Grid>
                <Grid item sm={6} xs={4}>
                    <Typography paragraph>
                        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                        eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                        neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                        tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                        sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                        tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                        gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                        et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                        tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                        eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                        posuere sollicitudin aliquam ultrices sagittis orci a.
                    </Typography>
                </Grid>
            </Grid>
        </Stack>
    );
}