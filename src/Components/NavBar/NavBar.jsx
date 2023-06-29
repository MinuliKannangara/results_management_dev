import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import TemporaryDrawer from '../SideBar/SideBar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars} from '@fortawesome/free-solid-svg-icons'

function NavBar(props) {

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

  const userRole = 'Grade Head'; //assign the user role of the user to this variable
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
    sideBarItems = ['O/L Results Analysis', 'dfdf', 'sdfsdfs'];
  } 

  return (
  <Container fluid>
<Navbar expand="lg" className="bg-body-tertiary" style={{backgroundColor:"#F0EBE7"}}>

       
<Container fluid style={{width:'4px',marginRight:'15px'}}>
    <Form >
        <Button variant="light" style={{boxSizing:'7',backgroundColor:"#F0EBE7",marginTop:'0px'}} onClick={toggleDrawer("left", true)}><FontAwesomeIcon icon={faBars} /></Button>
  </Form>
</Container>


<Container fluid style={{marginTop:'5px'}} >


<Navbar.Brand href="#home">{props.PageName}</Navbar.Brand>
{/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
<Navbar.Collapse id="basic-navbar-nav">
  <Nav className="me-auto">
    <Nav.Link href={props.Tab1Link}>{props.Tab1}</Nav.Link>
    <Nav.Link href={props.Tab2Link}> {props.Tab2}</Nav.Link>
    
      
  </Nav>
</Navbar.Collapse>
</Container>


{/* use the sidebar within the navigation bar and pass the props */}
<TemporaryDrawer state={state} setState={setState} toggleDrawer={toggleDrawer} items={sideBarItems}/>
</Navbar>

    </Container>
    
  );
}

export default NavBar;