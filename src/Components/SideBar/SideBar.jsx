import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import logoforLogin2 from '../Login/logoForLogin2.png';

// Import your logo here
// Example: import Logo from './path/to/your/logo.svg';

export default function TemporaryDrawer({ state, toggleDrawer, items }) {
  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
        backgroundColor: 'black', // Change the background color to black
        paddingTop: '60px',
        height: '100%',
        color: 'white', // Add gap between titles
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

  <img src={logoforLogin2} alt="Logo" style={{ width: '100%', marginBottom: '56px' }} /> 

      <List>
        {items.map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            sx={{
              '&:hover': {
                color: 'silver', // Change the hover color to silver
              },
            }}
          >
            <ListItemButton href={`/${text}`}>
              {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
