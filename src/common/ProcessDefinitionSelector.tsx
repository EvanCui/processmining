import React, { useEffect, useState } from 'react';
import { List, ListSubheader, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { FolderOutlined } from '@mui/icons-material';
import { getKnowledgeBaseList, getProcessDefinitionList } from './ServerAPIs';


export default function ProcessDefinitionSelector(props: any) {
    const { width, selecteddefinition, setselecteddefinition } = props;
    const [knowledgeBaseList, setKnowledgeBaseList] = useState([] as any);
    const [knowledgeBase, setKnowledgeBase] = useState('');

    async function getAndFeedProcessDefinitionList() {
        const result = await getProcessDefinitionList(knowledgeBase, (err: any) => console.log(err));
        setProcessDefinitionList(result);
    }

    const knowledgeBaseChange = async (event: SelectChangeEvent) => {
        setKnowledgeBase(event.target.value);
        getAndFeedProcessDefinitionList();
    };

    useEffect(() => {
        async function getAndFeedKnowledgeList() {
            const result = await getKnowledgeBaseList();
            setKnowledgeBaseList(result);
        }

        getAndFeedKnowledgeList().catch(console.error);
    }, []);

    const [processDefinitionList, setProcessDefinitionList] = useState([] as any);

    return (<List
        sx={{ minWidth: width, maxWidth: width, height: '100%', p: 0 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
            <ListSubheader component="div" id="nested-list-subheader">
                <FormControl variant="standard" sx={{ minWidth: 160, width: '100%', display: 'flex' }}>
                    <InputLabel id="demo-simple-select-helper-label">KnowledgeBase</InputLabel>
                    <Select label="Knowledge Base" sx={{ display: 'flex' }} onChange={knowledgeBaseChange} value={knowledgeBase}>
                        {
                            knowledgeBaseList.map((k: any) => (<MenuItem key={k.Key} value={k.Key}>{k.Name}</MenuItem>))
                        }
                    </Select>
                </FormControl>
            </ListSubheader>
        }
    >
        {
            processDefinitionList.map((v: any) => {
                return (
                    <ListItemButton dense key={v.id} onClick={() => setselecteddefinition(v.id)} selected={v.id === selecteddefinition}>
                        <ListItemIcon>
                            <FolderOutlined />
                        </ListItemIcon>
                        {/*                                 <ListItemText primary={v.name} secondary={v.description} /> */}
                        <ListItemText primary={v.name} />
                    </ListItemButton>
                );
            })
        }
    </List >);
}