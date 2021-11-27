import React, { useState } from 'react';
import Container from '@mui/material/Container';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { Dashboard, ManageSearchTwoTone, PermIdentityTwoTone, NotificationImportantTwoTone, RuleTwoTone } from '@mui/icons-material';
import { Storage, AccountTreeTwoTone, BatchPredictionTwoTone, RuleFolderTwoTone, FactCheckTwoTone } from '@mui/icons-material';
import { DeviceHub, FileCopyTwoTone, SettingsEthernet } from '@mui/icons-material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

export default function ProcessDiagnostics(props: any) {
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
          Icon: (<SettingsEthernet />)
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

  return (
    <Container>
      <List
        sx={{ width: '100%', maxWidth: 280, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Process Mining
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
                <ListItemText primary={v.Name} />
                {opened[i] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={opened[i]} timeout="auto" unmountOnExit>
                <List
                  sx={{ color: '#777777' }}
                  component="div"
                  disablePadding>
                  {
                    v.SubItems.map((s: any) => {
                      const currentIndex = selectionIndex++;
                      return (
                        <ListItemButton sx={{ pl: 4, color: subMenuColor, height: 40 }} selected={selected === currentIndex} onClick={() => menuItemClick(currentIndex)}>
                          <ListItemIcon sx={{ color: subMenuColor }}>
                            {s.Icon}
                          </ListItemIcon>
                          <ListItemText primary={s.Name} />
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
    </Container>
  );
}