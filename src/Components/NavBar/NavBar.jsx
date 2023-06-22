import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import TemporaryDrawer from '../SideBar/SideBar';


export default function ButtonAppBar(props) {

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  //function to handle the sidebar toggle
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const userRole = 'Subject Teacher'; //assign the user role of the user to this variable
  let sideBarItems = []; //array to assign

  if (userRole === 'Class Teacher') {
    sideBarItems = ['Grade Results Dashboard', 'Manage Student Details', 'Manage Class Results'];
  } else if (userRole === 'Grade Head') {
    sideBarItems = ['Grade Results Dashboard', 'Student performance', 'Prize Holders','Upload National Examination Results'];
  } else if (userRole === 'Sectional Head') {
    sideBarItems = ['Grade Results Dashboard', 'Student Performence'];
  } else if (userRole === 'Subject Teacher') {
    sideBarItems = ['Grade Results Dashboard', 'Manage Subject Results'];
  } else if (userRole === 'School Admin') {
    sideBarItems = ['Grade Results Dashboard', 'Manage School users', ''];
  } else if (userRole === 'System Admin') {
    sideBarItems = ['Manage Roles', 'dfdf', 'sdfsdfs'];
  } else if (userRole === 'Planning Officer') {
    sideBarItems = ['sds', 'dfdf', 'sdfsdfs'];
  } else if (userRole === 'Develomet Officer') {
    sideBarItems = ['sds', 'dfdf', 'sdfsdfs'];
  } 

  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'white' ,borderBottom: '1px solid gray', height:'50px', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="black"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:'black', fontSize: '18px', fontWeight: 'bold'  }}>
            {props.PageName}
          </Typography>

          <Typography variant="subtitle1" sx={{ color: "black"  }}>
          {props.classesName}
         </Typography>
        </Toolbar>
      </AppBar>


      {/* use the sidebar within the navigation bar and pass the props */}
      <TemporaryDrawer state={state} setState={setState} toggleDrawer={toggleDrawer} items={sideBarItems}/>
    </Box>
  );
}