import React, { useState, Dispatch, SetStateAction } from 'react';
import { Drawer, IconButton, Stack } from '@mui/material';
import { DashboardOutlined, ManageSearchTwoTone, PermIdentityTwoTone, NotificationImportantTwoTone, RuleTwoTone } from '@mui/icons-material';
import { StorageOutlined, BiotechTwoTone, AccountTreeTwoTone, BatchPredictionTwoTone, RuleFolderTwoTone, FactCheckTwoTone } from '@mui/icons-material';
import { DeviceHubOutlined, FileCopyTwoTone, CableTwoTone } from '@mui/icons-material';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { Settings } from '@mui/icons-material';
import { SelectChangeEvent } from '@mui/material';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import '../common/CustomTheme';
import MultiLevelList from '../common/MultiLevelList';

export default function NavigationBar(props: any) {
    // main menu data
    const mainMenuData: Array<any> = [
        {
            Name: "Business Intelligence",
            Icon: (<DashboardOutlined />),
            SubItems: [
                {
                    Name: "Process Diagnostics",
                    Path: "/diagnostics",
                    Icon: (<ManageSearchTwoTone />)
                },
                {
                    Name: "Advisor",
                    Path: "/advisor",
                    Icon: (<PermIdentityTwoTone />)
                },
                {
                    Name: "Alerts",
                    Icon: (<NotificationImportantTwoTone />)
                },
                {
                    Name: "Compliance",
                    Icon: (<RuleTwoTone />)
                }
            ]
        },
        {
            Name: "Knowledge Base",
            Icon: (<StorageOutlined />),
            SubItems: [
                {
                    Name: "Laboratory",
                    Icon: (<BiotechTwoTone />),
                },
                {
                    Name: "Process Discovery",
                    Icon: (<AccountTreeTwoTone />)
                },
                {
                    Name: "Advisory",
                    Icon: (<BatchPredictionTwoTone />)
                },
                {
                    Name: "Alerting Rules",
                    Icon: (<RuleFolderTwoTone />)
                },
                {
                    Name: "Compliant Rules",
                    Icon: (<FactCheckTwoTone />)
                }
            ]
        },
        {
            Name: "Data Source",
            Icon: (<DeviceHubOutlined />),
            SubItems: [
                {
                    Name: "Imported Files",
                    Icon: (<FileCopyTwoTone />)
                },
                {
                    Name: "Live Sources",
                    Icon: (<CableTwoTone />)
                },
            ]
        }
    ];

    const subMenuData = [
        {
            Name: "Settings",
            Icon: (<Settings />),
        }
    ];

    // rail states
    const [selectedName, setSelectedName] = useState('');

    interface RailExpansionState {
        railWidth: number;
        overflowX: any;
    }

    const useRailState = (initialExpanded: boolean): [boolean, RailExpansionState, Dispatch<SetStateAction<boolean>>] => {
        const [expanded, setExpanded] = useState(initialExpanded);

        // 44 = 2 + 8 + 24 + 8 + 2
        const RailWidth = [224, 44];
        const OverflowX = ['visible', 'hidden'];

        const key = expanded ? 0 : 1;
        const railState: RailExpansionState = {
            railWidth: RailWidth[key],
            overflowX: OverflowX[key],
        };

        return [expanded, railState, setExpanded];
    }

    const [expanded, railState, setExpanded] = useRailState(false);

    const animationDuration = '0.2s';

    // 2 * 8 = 16
    const subMenuIndent = 2;

    // data source
    const dataSources = [
        {
            Key: "File1",
            Name: "Imported File1",
        },
        {
            Key: "File2",
            Name: "Imported File2",
        },
        {
            Key: "SAP",
            Name: "SAP System",
        },
        {
            Key: "Kingdee",
            Name: "Kingdee System",
        },
        {
            Key: "Yonyou",
            Name: "Yonyou System",
        },
    ];

    const [dataSource, setDataSource] = useState(dataSources[0].Key);
    const dataSourceChange = (event: SelectChangeEvent) => {
        setDataSource(event.target.value);
    };

    return (
        <ThemeProvider theme={(t: Theme) => createTheme({
            ...t,
            palette: {
                ...t.palette,
                background: {
                    paper: t.palette.railBackground.main,
                },
                primary: t.palette.railColor,
                text: {
                    primary: t.palette.railColor.main,
                    secondary: t.palette.railColor.light,
                },
            }
        })}>
            <Drawer variant="permanent" open={!expanded} sx={{
                width: railState.railWidth,
                whiteSpace: 'nowrap',
                transition: animationDuration,
                ".MuiDrawer-paper": {
                    width: railState.railWidth,
                    overflowX: railState.overflowX,
                    transition: animationDuration,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                },
            }}>
                <Stack direction="column" alignItems="flex-end" sx={{ width: '100%', maxWidth: railState.railWidth }}>
                    <IconButton sx={{
                        p: 1,
                        borderLeftWidth: 2,
                        borderRightWidth: 2,
                        borderStyle: 'solid',
                        borderColor: 'transparent',
                        color: 'primary.light'
                    }} onClick={() => setExpanded(!expanded)}>
                        {!expanded ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                    <MultiLevelList selectedname={selectedName} setselectedname={setSelectedName} expanded={expanded} maxwidth={railState.railWidth} menuindentunit={subMenuIndent}>
                        {mainMenuData}
                    </MultiLevelList>
                </Stack>
                <MultiLevelList selectedname={selectedName} setselectedname={setSelectedName} expanded={expanded} maxwidth={railState.railWidth} menuindentunit={subMenuIndent}>
                    {subMenuData}
                </MultiLevelList>
            </Drawer>
        </ThemeProvider>
    );
}