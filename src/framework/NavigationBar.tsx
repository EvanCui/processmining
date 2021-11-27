import React, { useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import { Drawer, IconButton, Divider } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { Dashboard, ManageSearchTwoTone, PermIdentityTwoTone, NotificationImportantTwoTone, RuleTwoTone } from '@mui/icons-material';
import { Storage, AccountTreeTwoTone, BatchPredictionTwoTone, RuleFolderTwoTone, FactCheckTwoTone } from '@mui/icons-material';
import { Biotech } from '@mui/icons-material';
import { DeviceHub, FileCopyTwoTone, CableTwoTone } from '@mui/icons-material';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

export default function NavigationBar(props: any) {
  const menuData: Array<any> = [
    {
      Name: "Business Intelligence",
      Icon: (<Dashboard />),
      SubItems: [
        {
          Name: "Process Diagnostics",
          Icon: (<ManageSearchTwoTone />)
        },
        {
          Name: "Advisor",
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
      Icon: (<Storage />),
      SubItems: [
        {
          Name: "Laboratory",
          Icon: (<Biotech />),
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
      Icon: (<DeviceHub />),
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

  const [opened, setOpened] = useState(menuData.map(v => false));
  const [selected, setSelected] = useState(0);

  function groupClick(groupId: number) {
    let newOpened = opened.slice();
    newOpened[groupId] = !newOpened[groupId];
    setOpened(newOpened);
  }

  function menuItemClick(selectionIndex: number) {
    setSelected(selectionIndex);
    props.onSelectedChanged(selectionIndex);
  }

  let selectionIndex: number = 0;
  const subMenuColor: string = '#777777'
  const mainMenuBackground: string = '#eeeeee'

  const [compacted, setCompacted] = useState(false);
  const subMenuIndent = compacted ? 2 : 4;
  const menuWidth = compacted ? 55 : 280;

  const handleDrawerClick = () => {
    setCompacted(!compacted);
    console.log(compacted);
  };

  return (
    <Drawer variant="permanent" open={compacted} sx={{
      width: menuWidth,
      whiteSpace: 'nowrap',
      ".MuiDrawer-paper": {
        width: menuWidth,
        overflowX: compacted ? 'hidden' : 'visible',
      }
    }}>
      <Divider />
      <List
        sx={{ width: '100%', maxWidth: menuWidth, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 1 }}>
            <IconButton onClick={handleDrawerClick}>
              {compacted ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </ListSubheader>
        }
      >
        {
          menuData.map((v, i) => (
            <React.Fragment>
              <ListItemButton onClick={() => groupClick(i)} sx={{ bgcolor: mainMenuBackground }}>
                <ListItemIcon>
                  {v.Icon}
                </ListItemIcon>
                {!compacted && <ListItemText primary={v.Name} />}
                {!compacted && (opened[i] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
              <Collapse in={opened[i]} timeout="auto" unmountOnExit>
                <List
                  sx={{ color: subMenuColor }}
                  component="div"
                  disablePadding>
                  {
                    v.SubItems.map((s: any) => {
                      const currentIndex = selectionIndex++;
                      return (
                        <ListItemButton sx={{ pl: subMenuIndent, color: subMenuColor, height: 40 }} selected={selected === currentIndex} onClick={() => menuItemClick(currentIndex)} divider={!compacted}>
                          <ListItemIcon sx={{ color: subMenuColor }}>
                            {s.Icon}
                          </ListItemIcon>
                          {!compacted && <ListItemText primary={s.Name} />}
                        </ListItemButton>
                      )
                    })
                  }
                </List>
              </Collapse>
            </React.Fragment>
          ))
        }
      </List >
    </Drawer>
  );
}