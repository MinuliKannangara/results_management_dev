import React, {useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';
import { Dropdown } from 'react-bootstrap';
import './OLResults.css';
import axios, { Axios } from 'axios';

const OLResults = () => {

const[listOfStudentsSat, setListOfStudentsSat] = useState([]);

axios.get('http://localhost:3001/NationalExaminationDetails//NationalExaminationResults').then((responese)=>{
  setListOfStudentsSat(responese.data);
  console.log(responese.data);
})
.catch((error)=>{
  console.log(error);
});
   

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
                  <Col md={4} sm={6} className='divColumns'>

                  <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Division</th>
          <th>Number of Sat</th>
          <th>Number of passed</th>
          <th>Passed percentage</th>
        </tr>
      </thead>
      <tbody>
        {listOfStudentsSat.map((value)=>{
          return <tr>
          <td>{}</td>
          </tr>
        })}
       
       
      </tbody>
    </Table>


                  </Col>
                  <Col md={4} sm={6} className='divColumns'>
                        
                  </Col>
                  <Col md={4} sm={6} className='divColumns'>
                        
                  </Col>
            </Row>
      </Container>

</div>
);
};

export default OLResults;