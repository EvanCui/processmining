import React, { useState } from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { JsxElement } from 'typescript';
import { Link } from "react-router-dom";
import { useTheme, Theme } from '@mui/material/styles';
import '../common/CustomTheme';

export interface MultiLevelListDataItem {
    Name: string;
    Path: string;
    Icon: JsxElement;
    SubItems: MultiLevelListDataItem[];
}

export default function MultiLevelList(props: any) {
    const { expanded, maxwidth, menuindentunit, selectedname, setselectedname } = props;
    const menuData: MultiLevelListDataItem[] = props.children;

    const [opened, setOpened] = useState({} as { [property: string]: boolean });

    function menuClick(key: string) {
        setOpened({ ...opened, [key]: !(key in opened) || !opened[key] });
        setselectedname(key);
    }

    const theme = useTheme();
    const totalColors = theme.palette.railIconColorSeries.length;
    let colorIndex = 0;
    const getNextColor = (t: Theme) => t.palette.railIconColorSeries[colorIndex++ % totalColors].main;

    function getList(menuData: MultiLevelListDataItem[], level: number) {
        const indent = expanded ? level * menuindentunit : 0;
        const defaultPadding = 1;
        const [ paddingLeft, paddingRight ] = [ defaultPadding + indent, defaultPadding ];

        const dense = expanded || level > 1;
        const selectedColor = "primary.light";

        const colorStyles = [
            {
                color: "primary.main",
            },
            {
                color: "primary.main",
            },
            {
                color: "primary.dark",
            },
        ];

        const getColorStyle = (l: number) => colorStyles[l] ?? colorStyles[colorStyles.length - 1];
        const colorStyle = getColorStyle(level);

        return (<List
            dense={dense}
            disablePadding
            component="nav"
            aria-labelledby="nested-list-subheader"
            sx={{
                width: '100%',
                maxWidth: maxwidth,
            }}>
                {
                    menuData.map((v) => {
                        const isSelected = selectedname === v.Name;

                        const selectedColorStyle = {
                            ...colorStyle,
                            ...(isSelected ? {
                                color: selectedColor,
                            } : {
                            }),
                        };

                        //const iconColor = getNextColor(theme);
                        const iconColor = isSelected ? selectedColor : colorStyle.color;

                        return (<React.Fragment key={v.Name}>
                            <ListItemButton
                                sx={{
                                    ...selectedColorStyle,
                                    borderRightColor: 'transparent',
                                    borderLeftColor: () => isSelected ? selectedColor : 'transparent',
                                    pl: paddingLeft,
                                    pr: paddingRight,
                                    borderStyle: 'solid',
                                    borderLeftWidth: 2,
                                    borderRightWidth: 2,
                                    borderBottomColor: 'primary.dark',
                                    borderBottomStyle: 'dashed',
                                }}
                                key={v.Name}
                                selected={selectedname === v.Name}
                                onClick={() => menuClick(v.Name)}
                                to={v.Path ?? "/"}
                                component={Link}
                                divider={expanded}>
                                <ListItemIcon sx={{ 
                                    minWidth: 36,
                                    color: iconColor,
                                }}>
                                    {v.Icon}
                                </ListItemIcon>
                                {expanded && <ListItemText primary={v.Name} />}
                                {(expanded && typeof v.SubItems !== 'undefined' && v.SubItems.length > 0)
                                    && (opened[v.Name] ? <ExpandLess /> : <ExpandMore />)}
                            </ListItemButton>
                            {
                                (typeof v.SubItems !== 'undefined' && v.SubItems.length > 0) &&
                                <Collapse in={opened[v.Name]} timeout="auto" unmountOnExit>
                                    {getList(v.SubItems, level + 1)}
                                </Collapse>
                            }
                        </React.Fragment>);
                    })
                }
            </List>);
    }

    return getList(menuData, 0);
}