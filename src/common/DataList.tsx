import React, { useState } from 'react';
import { List, ListSubheader, ListItemButton, ListItemAvatar, ListItemText } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Storage } from '@mui/icons-material';

export default function DataList(props: any) {
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

    const onListClick = (i: number) => {
        let newSelected = {
            ...variantsSelected,
            [i]: !variantsSelected[i],
        };

        console.log(newSelected);
        setVariantsSelected(newSelected);
    }

    const [variantsSelected, setVariantsSelected] = useState({} as States);

    interface States {
        [key: number]: boolean
    }

    const listMaxWidth: number = 290;

    const [filter, setFilter] = useState('MostPopular');
    const filterChange = (event: SelectChangeEvent) => {
        setFilter(event.target.value);
    };

    return (
        <List
            dense
            sx={{ maxWidth: listMaxWidth, bgcolor: 'background.paper', p: 0 }}
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
                            <ListItemText primary={v.name}
                                secondary={v.thumbprint}
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
    );
}