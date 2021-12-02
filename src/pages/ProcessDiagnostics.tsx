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
import { Table, TableContainer, TableHead, TableRow, TableCell, TableSortLabel, Checkbox, TableBody } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { Toolbar, Tooltip, IconButton } from '@mui/material';
import { Delete, FilterList } from '@mui/icons-material';

import * as api from '../common/ServerAPIs';
import { stringify } from 'querystring';

export default function ProcessDiagnostics(props: any) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState([] as any[]);

    useEffect(() => {
        loadProcessDefinitions()
    }, [])

    async function loadProcessDefinitions() {
        setData([
            { name: "Process Definition 1", description: "This is the process definition 1" },
            { name: "Process Definition 2", description: "This is the process definition 2" }
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

    const [selectedRows, setSelectedRows] = useState<Array<number>>([]);
    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<keyof Data>('distribution');

    function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    type Order = 'asc' | 'desc';

    function getComparator<Key extends keyof any>(
        order: Order,
        orderBy: Key,
    ): (
            a: { [key in Key]: number | string },
            b: { [key in Key]: number | string },
        ) => number {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    // This method is created for cross-browser compatibility, if you don't
    // need to support IE11, you can use Array.prototype.sort() directly
    function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
        const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    interface Data {
        id: number;
        name: string;
        distribution: number;
    }

    function createData(
        name: string,
        id: number,
        thumbprint: string,
        distribution: number
    ): Data {
        name = name || (id.toString() + " " + thumbprint);
        return {
            id,
            name,
            distribution,
        };
    }

    interface HeadCell {
        disablePadding: boolean;
        id: keyof Data;
        label: string;
        numeric: boolean;
    }

    const headCells: readonly HeadCell[] = [
        {
            id: 'name',
            numeric: false,
            disablePadding: true,
            label: 'Name',
        },
        {
            id: 'distribution',
            numeric: true,
            disablePadding: false,
            label: 'Distribution',
        }
    ]

    const rows = [
        createData('process variant 1', 1, 'abcdefabcdefabcdefabcdefabcdefabcdef', 28),
        createData('process variant 2', 2, 'abcdefabcdefabcdefabcdefabcdefabcdef', 25),
        createData('', 3, 'abcdefabcdefabcdefabcdefabcdefabcdef', 3),
        createData('process variant 4', 4, 'abcdefabcdefabcdefabcdefabcdefabcdef', 2),
        createData('', 5, 'abcdefabcdefabcdefabcdefabcdefabcdef', 1),
        createData('process variant 6', 6, 'abcdefabcdefabcdefabcdefabcdefabcdef', 1),
    ]

    interface EnhancedTableProps {
        numSelected: number;
        onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
        onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
        order: Order;
        orderBy: string;
        rowCount: number;
    }

    function EnhancedTableHead(props: EnhancedTableProps) {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler =
            (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
                onRequestSort(event, property);
            };

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all desserts',
                            }}
                        />
                    </TableCell>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    interface EnhancedTableToolbarProps {
        numSelected: number;
    }

    const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
        const { numSelected } = props;

        return (
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(numSelected > 0 && {
                        bgcolor: '#aaaaaa'
                    }),
                }}
            >
                {numSelected > 0 ? (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Nutrition
                    </Typography>
                )}
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton>
                            <FilterList />
                        </IconButton>
                    </Tooltip>
                )}
            </Toolbar>
        );
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            setSelectedRows(newSelecteds);
        } else {
            setSelectedRows([]);
        }
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
        let filtered = selectedRows.filter(v => v != id);
        if (filtered.length === selectedRows.length) {
            filtered = filtered.concat(id);
        }

        setSelectedRows(filtered);
    };

    const isSelected = (id: number) => selectedRows.indexOf(id) !== -1;

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    let emptyRows = 5;

    return (
        <Stack direction="row" sx={{ height: '100vh' }}>
            <List
                sx={{ width: '100%', maxWidth: listMaxWidth, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        <FormControl variant="standard" sx={{ mx: 0, my: 1, minWidth: 160, width: '100%', display: 'flex' }}>
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
            <Grid container spacing={4} mx={2} direction='column' style={{ height: '100%' }}>
                <Grid item>
                    <Box sx={{ my: 2 }}>
                        <Typography variant="h6">Selected {selected} definition. </Typography>
                        <Typography variant="inherit">This is the description of selected {selected} definition. </Typography>
                    </Box>
                    <Divider orientation="horizontal" variant="fullWidth" flexItem />
                    <Stack direction="row" spacing={2} sx={{ my: 2 }}>
                        <Button variant="outlined" startIcon={<Biotech />} sx={{ display: 'flex' }}>
                            Goto Laboratory
                        </Button>
                        <Button variant="contained" endIcon={<Send />}>
                            Send Report
                        </Button>
                    </Stack>
                </Grid>
                <Grid item sm={6} xs={4}>
                    <Stack direction="row" spacing={2}>
                        <TableContainer sx={{ minWidth: 500 }}>
                            <Table
                                aria-labelledby="tableTitle"
                                size='small'>
                                <EnhancedTableHead
                                    numSelected={selectedRows.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={rows.length}
                                />
                                <TableBody>
                                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
                                    {stableSort(rows, getComparator(order, orderBy))
                                        .map((row, index) => {
                                            const isItemSelected = isSelected(row.id);
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                    hover
                                                    onClick={(event) => handleClick(event, row.id)}
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={row.name}
                                                    selected={isItemSelected}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            color="primary"
                                                            checked={isItemSelected}
                                                            inputProps={{
                                                                'aria-labelledby': labelId,
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="right">{row.distribution}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: 33 * emptyRows,
                                            }}
                                        >
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
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
                    </Stack>
                </Grid>
                <Grid item xs={4} sm>
                </Grid>
            </Grid>
        </Stack>
    );
}