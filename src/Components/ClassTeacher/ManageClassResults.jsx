import React, { useEffect, useState } from 'react';
import './ManageStudentDetails.css';
import { Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Formik, Form } from "formik";
import { Button } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';
import DropdownButtonForAll from '../OtherComponents/Dropdown';
import axios from 'axios';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';


const ManageClassResults = () => {

  

  // write the code to get the user name of the user
  // const username = localStorage.getItem('username');
  const enteredUsername = "laksika"; 
  const CurrentYear = new Date().getFullYear();

  
const [classname, setClassName] = useState({});
const [subjectsForTable, setSubjectsForTable] = useState([]);
const [nameList, setNameList] = useState([]);
const [resultOfStudents, setResultOfStudents] = useState([]);
const [selectedYear, setSelectedYear] = useState(CurrentYear);
const [selectedTerm, setSelectedTerm] = useState();

   useEffect(()=> {
    axios.get(`http://localhost:3001/classDetails/classOfUser/${enteredUsername}/${selectedYear}/${selectedTerm}`).then((response) => {
      setClassName(response.data);
      setSubjectsForTable(response.data.subjectNames);
      setNameList(response.data. studentsNames);
      setResultOfStudents(response.data.resultsOfEachStudent)
      console.log(response.data);})
  

    .catch((error) => {console.log(error)});
   },[enteredUsername,selectedYear, selectedTerm]);


return (
<div>
  
{/* <ButtonAppBar PageName="Manage Class Results" /> */}
<NavBar PageName="Manage Class Results" />



<Container fluid className='topDiv '>
        
         <p className='pTopDiv'>Results Sheet - {classname?.className}</p>
         
      
      </Container>

<Container fluid className='div_aca_yr divAddStudentTable'>

      
        <Row className='TableRoWUp'>

          <Col md={3} sm={6} lg={2}>
          <form action="">
             <label className='pAddStudent'>Total Students :</label>
              <input type="text" 
              style={{width:'10%', alignItems:'left', border:'none', 
              backgroundColor:'transparent', color:'#000000', fontSize:'20px', fontWeight:'bold'}}
              value={nameList.length} readOnly 
               />
            </form>
            
          </Col>

          <Col md={4} sm={6} lg={2}>
          <form action="">
             <label className='pAddStudent'>Total Subjects :</label>
              <input type="text" 
              style={{width:'10%', alignItems:'left', border:'none', 
              backgroundColor:'transparent', color:'#000000', fontSize:'20px', fontWeight:'bold'}}
              value={subjectsForTable.length} readOnly 
               />
            </form>
            
          </Col>

          <Col md={3} sm={6} lg={3}>
          <DropdownButton className='customDropdownButton' id="dropdown-basic-button" title={`${selectedYear}`}>
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear)}>{CurrentYear}</Dropdown.Item>
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-1)}>{CurrentYear-1}</Dropdown.Item>
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-2)}>{CurrentYear-2}</Dropdown.Item>
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-3)}>{CurrentYear-3}</Dropdown.Item>
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-4)}>{CurrentYear-4}</Dropdown.Item>
      
    
    </DropdownButton>
            
           </Col>
           <Col md={3} sm={6} lg={3}>
           <DropdownButton className='customDropdownButton' id="dropdown-basic-button" title={`${selectedTerm}`}>
    <Dropdown.Item className='customDropdown' onClick={() => setSelectedTerm("1st Term")}>1st Term</Dropdown.Item>
    <Dropdown.Item className='customDropdown' onClick={() => setSelectedTerm("2nd Term")}>2nd Term</Dropdown.Item>
    <Dropdown.Item className='customDropdown' onClick={() => setSelectedTerm("3rd Term")}>3rd Term</Dropdown.Item>
  </DropdownButton>
            
           </Col>
          <Col md={4} sm={6} lg={2}>
           <p className='pAddStudent'> add a search bar</p>
            
          </Col>
         

        </Row>
        <Row className='TableRoWDown'>
        
        <Table striped bordered hover variant="light">
  <thead>
    <tr>
      <th>#</th>
      <th>Index Number</th>
      <th>Name</th>
      {subjectsForTable.map((subject, index) => (
        <th key={index}>{subject}</th>
      ))}
      <th>Total</th>
      <th>Average</th>
      <th>Rank</th>
    </tr>
  </thead>
  <tbody>
    {nameList.map((name, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{name.index_number}</td>
        <td>{name.student_name}</td>
        {subjectsForTable.map((subject, subjectIndex) => (
          <td key={subjectIndex}>
            {resultOfStudents[name.index_number] &&
              resultOfStudents[name.index_number][subject] &&
              resultOfStudents[name.index_number][subject].join(", ")}
          </td>
        ))}
         
         <td>
        {Object.values(resultOfStudents[name.index_number] || {}).reduce(
          (total, marks) =>
            total + (Array.isArray(marks) ? marks.reduce((sum, mark) => sum + mark, 0) : 0),
          0
        )}
      </td>

      <td>
        
      </td>
        <td>Rank Value</td>
      </tr>
    ))}
  </tbody>
</Table>

   
           
        </Row>
      </Container>

</div>
);
};

export default ManageClassResults;