import React, { useEffect, useState } from 'react';
import { Container, Row, Col,FormLabel } from 'react-bootstrap';
import './SchoolAdDashboard.css';
import { Button } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';




const SchoolAdminDashboard = () => {
  const CurrentYear = new Date().getFullYear();

  
return (
<div>
<NavBar PageName="School Profile"
showButtons={false}/>

<Container fluid className='ContainerTiles'>


</Container>
</div>
);
};

export default SchoolAdminDashboard;