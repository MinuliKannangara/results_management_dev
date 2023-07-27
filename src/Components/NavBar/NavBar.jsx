import * as React from 'react';
import { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import TemporaryDrawer from '../SideBar/SideBar';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars} from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../../helpers/AuthContext';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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

  const {authState, setAuthState} = useContext(AuthContext);

  const userRole =  authState.role; //assign the user role of the user 
  let sideBarItems = []; //array to assign

  if (userRole.includes('School Admin')) {
    sideBarItems.push('School Admin Dashboard', 'Manage School Users', 'Student Performance', 'Prize Holders');
  }
  
  if (userRole.includes('Class Teacher') || userRole.includes('Subject Teacher') || userRole.includes('Grade Head') || userRole.includes('Sectional Head') || userRole.includes('School Admin')) {
    sideBarItems.push('School Dashboard');
  }

  if (userRole.includes('Class Teacher')) {
    sideBarItems.push( 'Manage Student Details', 'Manage Class Results');
  }
  
  if (userRole.includes('Subject Teacher')) {
    sideBarItems.push('Manage Subject Results');
  }
  
  if (userRole.includes('Grade Head') || userRole.includes('Sectional Head')) {
    sideBarItems.push('Student Performance', 'Prize Holders', 'upload National Examination Results');
  }

  if (userRole.includes('Development Officer') || userRole.includes('Planning Officer') || userRole.includes('System Admin')) {
    sideBarItems.push('Zonal Education Office Dashboard');
  }

  if (userRole.includes('System Admin')) {
    sideBarItems.push('Manage Education Office Users');
  }

  if (userRole.includes('Development Officer') || userRole.includes('Planning Officer') ||userRole.includes('System Admin')) {
    sideBarItems.push('O/L Results Analysis','A/L Results Analysis', 'Scholarship Results Analysis', 'Zonal Subject Results Analysis');
  }

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({...authState, status:false});
    navigate('/login'); 
  };

  
  const handleNavigation = (url) => {
    navigate(url);
  };


  
  return (
  
    <Navbar expand="lg" className="bg-body-tertiary" style={{ backgroundColor: '#212529', padding: 0, borderBottom: '1px solid black', height: '60px' }}>
  
      <Row style={{width:"100%"}}>
        {/* <Col lg={3} sm={12} style={{ paddingLeft: '0px', paddingRight: '0px',backgroundColor: 'red' }}>
          <img src={logo} alt="Logo" border="0" style={{ width: '150px', height: 'auto' }} />
        </Col> */}

        <Col lg={1} sm={12} style={{ paddingLeft: '10px', paddingRight: '0px' }}>
          <Button variant="light" style={{ boxSizing: '7', backgroundColor: '#212529', marginTop: '2px',marginLeft:"15px"}} onClick={toggleDrawer('left', true)}>
            <FontAwesomeIcon icon={faBars} style={{color:"white"}} />
          </Button>
        </Col>

        <Col lg={7} sm={12} style={{ paddingLeft: '0px', paddingRight: '0px',paddingTop:"8px"}}>
          <Navbar.Brand id="pagename" style={{color:"white", marginLeft:"0px"}}>{props.PageName}</Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

          {props.showButtons &&(
            <>
             <ButtonGroup aria-label="Basic example">
      <Button variant="secondary" onClick={() => handleNavigation(props.Tab1Link)}>{props.Tab1}</Button>
      <Button variant="secondary" onClick={() => handleNavigation(props.Tab2Link)}>{props.Tab2}</Button>
      <Button variant="secondary" onClick={() => handleNavigation(props.Tab3Link)}>{props.Tab3}</Button>
    </ButtonGroup>
            </>
           
          )}

          
            </Nav>
          </Navbar.Collapse>
        </Col>
        
        <Col lg={4} sm={12} className="d-flex justify-content-end" style={{ paddingLeft: '0px', paddingRight: '0px'}}>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" >
              {authState.status && (
                <>
                  <Button style={{marginLeft:"320px",backgroundColor:"#212529",borderColor:"white", color:"white",width:"120px",height:"40px",marginTop:"3px", fontWeight:"500"}} onClick={logout}>Logout</Button>
                  <h6>{authState.name}</h6>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Col>
      </Row>


    {/* Use the sidebar within the navigation bar and pass the props */}
    <TemporaryDrawer state={state} setState={setState} toggleDrawer={toggleDrawer} items={sideBarItems} />
  </Navbar>

 
    
  );
}

export default NavBar;