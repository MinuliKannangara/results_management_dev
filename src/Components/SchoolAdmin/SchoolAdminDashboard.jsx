import React, { useEffect, useState } from 'react';
import { Container, Row, Col,FormLabel } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import './SchoolAdDashboard.css';
import { Button } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios';
import Card from 'react-bootstrap/Card';



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