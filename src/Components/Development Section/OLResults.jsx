import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';
import { Dropdown } from 'react-bootstrap';
import './OLResults.css';
import axios, { Axios } from 'axios';
import DivisionWiseTable from '../Charts/DivWiseTable';

const OLResults = () => {


  const [meerigamaCount, setMeerigamaCount] = useState(0);
  const [minuwangodaCount, setMinuwangodaCount] = useState(0);
  const [divulapitiyaCount, setDivulapitiyaCount] = useState(0);
  const [meerigamaPassed, setMeerigamaPassed] = useState(0);
  const[divulapitiyaPassed, setDivulapitiyaPassed] = useState(0);
  const[minuwangodaPassed, setMinuwangodaPassed] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3001/NationalExaminationDetails/NationalExaminationResults')
      .then((res) => res.json())
      .then((data) => {
        setMeerigamaCount(data.meerigama);
        setMinuwangodaCount(data.minuwangoda);
        setDivulapitiyaCount(data.divulapitiya);
        setMeerigamaPassed(data.meerigamaPassed);
        setDivulapitiyaPassed(data.divulapitiyaPassed);
        setMinuwangodaPassed(data.minuwangodaPassed);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  


return (
<div>

<NavBar
PageName="O/L Results Analysis" 
Tab1="Division Wise Analysis" 
Tab2="Subject Wise Analysis" 
Tab1Link="http://localhost:3000/Manage Student Details"
Tab2Link="http://localhost:3000/Manage Student Details"
/>


{/* 
<Container fluid className='divAllDropdown ' style={{backgroundColor:'white'}}>
        <Row>
          <Col md={3} sm={6}>
            <p className='pLables'>Academic Year</p>
          </Col>
          <Col md={3} sm={6}>
            <Dropdown style={{backgroundColor:"#D2551F"}}>
              <Dropdown.Toggle variant="success" id="dropdown-basic" className='customDropdown'>
                Select the Year
              </Dropdown.Toggle>

              <Dropdown.Menu className='customDropdown customDropdownItem' >
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        
        </Row>
      


</Container > */}
      <Container fluid>
            <Row><h3 className='topicsP'>Division Wise Analysis</h3></Row>
      </Container>

      <Container fluid>
            <Row>
                  <Col md={8} sm={6} className='divColumns'>
                    <DivisionWiseTable 
                    minuwangoda={minuwangodaCount} 
                    meerigama={meerigamaCount} 
                    divulapitiya = {divulapitiyaCount} 
                    meerigamaPassCount={meerigamaPassed}
                    minuangodaPassCount={minuwangodaPassed}
                    divulapitiyaPassCount={divulapitiyaPassed}
                    />

                  </Col>
                  <Col md={8} sm={6} className='divColumns'>
                    
              
                  </Col>
                 
            </Row>
      </Container>

</div>
);
};

export default OLResults;