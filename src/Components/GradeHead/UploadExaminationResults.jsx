import React, { useEffect, useState } from 'react';
 import { Container, Row, Col,FormLabel } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import './GreadHead.css';
import { Button } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';
 import Dropdown from 'react-bootstrap/Dropdown';
 import DropdownButton from 'react-bootstrap/DropdownButton';


function UploadExaminationResults() {

  const [selectedExam, setSelectedExam] = useState('Grade 5 Scholarship');
  return (
    <div>
     {/* <ButtonAppBar PageName="Prize Holders" /> */}
     <NavBar PageName="Upload National Examination Results"/>
    
    
           <Container className="DropdownDiv2">
    
             <Row>
               <Col lg={1} sm={12}>
                 <FormLabel htmlFor="class1" className="labelForm">
                  Examination
                 </FormLabel>
               </Col>
               <DropdownButton className='customDropdownButton' id="dropdown-basic-button" title={`${selectedExam}`} >
         <Dropdown.Item className='customDropdown'  onClick={() => setSelectedExam("Grade 5 Scholarship")}>Grade 5 Scholarship</Dropdown.Item>
          <Dropdown.Item className='customDropdown'  onClick={() => setSelectedExam("O/L Examination")}>O/L Examination</Dropdown.Item>
           <Dropdown.Item className='customDropdown'  onClick={() => setSelectedExam("A/l Examination")}>A/l Examination</Dropdown.Item>
         </DropdownButton> 
    
               <Col lg={5} sm={12}>
             
               </Col>
               <Col lg={1} sm={12}>
               
               </Col>
          <Col lg={5} sm={12}>
           
               </Col>
             
         
              
             </Row>
           </Container>
    
     <Container fluid className='div_aca_yr divAddStudentTable'>
             <Row className='TableRoWUp'>
    
          <Col md={2} sm={6}>
                 {/* <p className='pAddStudent'>Total Subjects</p> */}
               </Col>
          
    
             </Row>
            <Row className='TableRoWDown'>
            
              <Table striped bordered hover variant="light">
         <thead>
             <tr>
               <th>#</th>
               <th>Index Number</th>
               <th>Name</th>
               <th>Subject </th>
             <th>Class</th>
           
          
             </tr>
           </thead>
           <tbody>
       {/* {Object.entries(prizeHolders).map(([subject, details], index) => {
         const studentDetail = studentDetails.find((detail) => detail.student_ID === parseInt(details.studentId));
         return (
           <tr key={index}>
            <td>{index + 1}</td>
            <td>{studentDetail ? studentDetail.index_number : ''}</td>
            <td>{studentDetail ? studentDetail.Student_name : ''}</td>
             <td>{subject}</td>
             <td>{studentDetail ? studentDetail.class_name : ''}</td>
           </tr>
         );
       })} */}
     </tbody>
    
         </Table>
               
            </Row>
         </Container>
    </div>
  )
}

export default UploadExaminationResults
