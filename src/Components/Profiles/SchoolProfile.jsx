import React, { useEffect, useState } from 'react';
import { Container, Row, Col,FormLabel } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import './Profiles.css';
import { Button } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios';
import Card from 'react-bootstrap/Card';



const SchoolProfile = () => {
  const CurrentYear = new Date().getFullYear();

  
return (
<div>
<NavBar PageName="School Profile"/>

<Container fluid className='profileCard'>
<Card className='customCard'>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text style={{color:"black"}}>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      
      </Card.Body>
    </Card>


</Container>
</div>
);
};

export default SchoolProfile;