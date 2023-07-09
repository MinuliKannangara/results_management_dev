import React, { useState, useEffect } from 'react';
import ButtonAppBar from '../NavBar/NavBarwrong';
import { Container, Row, Col,FormLabel } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import NavBar from '../NavBar/NavBar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


import axios, { Axios } from 'axios';


const StudentPerformance = () => {

  const CurrentYear = new Date().getFullYear();
  const school = 'ascsdh';

  //for the grade dropdown
  const grades = ['Grade 6','Grade 7','Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'Grade 13'];
  //to extract oly the number from the selected grade, before setting it to the setSelectedGrade usestate.
 // Used replace method to remove the "Grade " prefix from the grade string.
  const extractNumber = (grade) => {
    const number = grade.replace('Grade ', '');
    return number;
  };

  //for the get method
  const [HighperformanceData, setHighperformanceData] = useState([]);
  const [LowPerformanceData, setLowPerformanceData] = useState([]);

  //for the dropdowns
  const [selectedYear, setSelectedYear] = useState(CurrentYear);
  const [selectedTerm, setSelectedTerm] = useState('1st Term');
  const [selectedGrade, setSelectedGrade] = useState('7');

  useEffect(() =>{
    axios.get(`http://localhost:3001/calculatedResults/${selectedYear}/${selectedTerm}/${school}/${selectedGrade}`).then((response)=>{
      setHighperformanceData(response.data.highPerformers);
      LowPerformanceData(response.data.lowPerformers);
    })

    .catch((error) =>{console.log(error)});
  },[selectedGrade, selectedTerm, selectedYear])
   

return (
<div>
{/* <ButtonAppBar PageName="Student Performance" /> */}

<NavBar PageName="Student Performance"/>

<Container fluid className='div_aca_yr '>
        <Row>
         <p className='subTopicsP'>Student Performance</p>
        </Row>
      </Container>

      
      <Container className="DropdownDiv2">

        <Row>
          <Col lg={1} sm={12}>
            <FormLabel htmlFor="class1" className="labelForm">
             Grade
            </FormLabel>
          </Col>

          <Col lg={5} sm={12}>
          <DropdownButton className='customDropdownButton' id="dropdown-basic-button" title={'Grade '+`${selectedGrade}`} >

            {grades.map((grade,index) =>(
              <Dropdown.Item className='customDropdown' key={index}  onClick={() => setSelectedGrade(extractNumber(grade))}>{`${grade}`}</Dropdown.Item>
              
            ))}
          
          </DropdownButton>

            
          </Col>
         
     
        </Row>

        <Row>
          <Col lg={1} sm={12}>
            <FormLabel htmlFor="class1" className="labelForm">
              Year
            </FormLabel>
          </Col>
          <Col lg={5} sm={12}>
          <DropdownButton className='customDropdownButton' id="dropdown-basic-button" title={`${selectedYear}`} >
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear)}>{CurrentYear}</Dropdown.Item>
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-1)}>{CurrentYear-1}</Dropdown.Item>
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-2)}>{CurrentYear-2}</Dropdown.Item>
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-3)}>{CurrentYear-3}</Dropdown.Item>
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-4)}>{CurrentYear-4}</Dropdown.Item>
      
    
    </DropdownButton>
          </Col>
          <Col lg={1} sm={12}>
            <FormLabel htmlFor="class1" className="labelForm">
              Term
            </FormLabel>
          </Col>
          <Col lg={5} sm={12}>
            <DropdownButton className="customDropdownButton" id="dropdown-basic-button" title={`${selectedTerm}`}>
            <Dropdown.Item className="customDropdown" onClick={() => setSelectedTerm("1st Term")}> 1st Term </Dropdown.Item>
            <Dropdown.Item className="customDropdown" onClick={() => setSelectedTerm("2nd Term")}> 2nd Term </Dropdown.Item>
            <Dropdown.Item className="customDropdown" onClick={() => setSelectedTerm("3rd Term")}> 3rd Term </Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col lg={2} sm={12}>
            
          </Col>
        </Row>
      </Container>

<Container fluid className='div_aca_yr divAddStudentTable'>

<Container fluid>
            <Row><p className='subTopicsP'>High Performing Students</p></Row>
            <Row>
            <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>#</th>
                <th>Index Number</th>
                <th>Name</th>
                <th>Class Name</th>
                <th>Total</th>
                <th>Average</th>
                
              </tr>
            </thead>
            <tbody>
           {HighperformanceData.map((index, PerformanceData) =>(
            <tr key={PerformanceData}>
              <td>{PerformanceData+1}</td>
              <td>{index.indexNumber}</td>
              <td>{index.name}</td>
              <td>{index.className}</td>
              <td>{index.total}</td>
              <td>{index.average}</td>
            </tr>
           ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
      
            </tbody>
          </Table>
            </Row>
</Container>

<Container fluid>
            <Row><p className='subTopicsP'>Low Performing Students</p></Row>
            <Row>
            <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>#</th>
                <th>Index Number</th>
                <th>Name</th>
                <th>Class Name</th>
                <th>Total</th>
                <th>Average</th>
                
              </tr>
            </thead>
            <tbody>
           {LowPerformanceData.map((index, PerformanceData) =>(
            <tr key={PerformanceData}>
              <td>{PerformanceData+1}</td>
              <td>{index.indexNumberLow }</td>
              <td>{index.nameLow}</td>
              <td>{index.classNameLow}</td>
              <td>{index.totalLow}</td>
              <td>{index.averageLow}</td>
            </tr>
           ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
      
            </tbody>
          </Table>
            </Row>
</Container>
      
      
   

               
      
      </Container>

</div>
);
};

export default StudentPerformance;