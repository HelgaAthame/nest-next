"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Close, Menu } from '@mui/icons-material';
import { menuItems } from '@/consts/menuItems';
import { useRouter } from 'next/navigation';

export const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <div className="min-h-12 w-full flex justify-end items-center px-2"><button onClick={toggleDrawer(false)} className="round">
        <Close/></button></div>
      
      <List>
        {menuItems.map(({text,href}, index) => (
          <ListItem key={href} disablePadding onClick={() => {
            router.push(href)
          }}>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>      
    </Box>
  );

  return (
    <div className="min-h-12 w-full flex justify-start backdrop-blur shadow items-center px-2 bg-white/50">
      <button onClick={toggleDrawer(true)}
      className="round" ><Menu/></button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}