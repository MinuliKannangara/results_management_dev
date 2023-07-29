import React, { useEffect, useState, PureComponent } from 'react';
import { Container, Row, Col,FormLabel } from 'react-bootstrap';
// import './SchoolDashboard.css';
import NavBar from '../NavBar/NavBar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const ZonalSubjctResults= () => {

  // static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';
  const CurrentYear = new Date().getFullYear();
  // const username = "dine";
  const grades = ['Grade 6','Grade 7','Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'Grade 13'];
      // Used replace method to remove the "Grade " prefix from the grade string.
      const extractNumber = (grade) => {
        const number = grade.replace('Grade ', '');
        return number;
      };
    
    
  //to send the details to the database
  const [selectedGrade, setSelectedGrade] = useState('6');
  const [selectedyear, setSelectedYear] = useState(CurrentYear);
  const [selectedTerm, setSelectedTerm] = useState('1st Term');
  const [selectedDivision, setSelectedDivision] = useState('Minuwangoda')
  const [selectedSubject, setselectedSubject] = useState('English')

  //to get the details from the database
 const [subjectList, setSubjectList] = useState([]);
 const [studentCounts, setStudentCounts] = useState([]);

  
  useEffect(() => {
    axios.get(`http://localhost:3001/ZonalSubjectResults/${selectedGrade}/${selectedyear}/${selectedTerm}/${selectedDivision}/${selectedSubject}`)
      .then((response) => {
        setSubjectList(response.data.subjectList);
        setStudentCounts(response.data.studentCounts);     
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedGrade, selectedyear, selectedTerm, selectedDivision,selectedSubject]);
  
return (
<div>
<NavBar PageName="Zonal Subject Results Analysis"
showButtons={false}/>


<Container fluid className="divAllDropdown" style={{marginTop:"50px"}}>

<Row >
  <Col lg={1} sm={12} >
    <FormLabel htmlFor="class1" className="labelForm PdropdownTopics">
     Grade
    </FormLabel>
  </Col>

  <Col lg={2} sm={12} >
  <DropdownButton className='customDropdownButton' variant="outline-success" id="dropdown-basic-button" title={'Grade'+`${selectedGrade}`} >

    {grades.map((grade,index) =>(
      <Dropdown.Item className='customDropdown' key={index}  onClick={() => setSelectedGrade(extractNumber(grade))}>{`${grade}`}</Dropdown.Item>
    ))}
  
  </DropdownButton>
  </Col>
  <Col lg={1} sm={12} >
    <FormLabel htmlFor="class1" className="labelForm PdropdownTopics">
      Year
    </FormLabel>
  </Col>
  <Col lg={2} sm={12} >
  <DropdownButton className='customDropdownButton' variant="outline-success" id="dropdown-basic-button" title={`${selectedyear}`} style={{color:"#000000",width:"300px"}} >
<Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear)}>{CurrentYear}</Dropdown.Item>
<Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-1)}>{CurrentYear-1}</Dropdown.Item>
<Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-2)}>{CurrentYear-2}</Dropdown.Item>
<Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-3)}>{CurrentYear-3}</Dropdown.Item>
<Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-4)}>{CurrentYear-4}</Dropdown.Item>
</DropdownButton>
  </Col>

  <Col lg={1} sm={12} >
            <FormLabel htmlFor="class1" className="labelForm PdropdownTopics">
              Term
            </FormLabel>
          </Col>
          <Col lg={2} sm={12}>
            <DropdownButton className="customDropdownButton" variant="outline-success" id="dropdown-basic-button" title={`${selectedTerm}`}>
            <Dropdown.Item className="customDropdown" onClick={() => setSelectedTerm("1st Term")}> 1st Term </Dropdown.Item>
            <Dropdown.Item className="customDropdown" onClick={() => setSelectedTerm("2nd Term")}> 2nd Term </Dropdown.Item>
            <Dropdown.Item className="customDropdown" onClick={() => setSelectedTerm("3rd Term")}> 3rd Term </Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col lg={1} sm={12}>
            <FormLabel htmlFor="class1" className="labelForm PdropdownTopics">
              Division
            </FormLabel>
          </Col>
          <Col lg={2} sm={12}>
            <DropdownButton className="customDropdownButton" variant="outline-success" id="dropdown-basic-button" title={`${selectedDivision}`}>
            <Dropdown.Item className="customDropdown" onClick={() => setSelectedDivision("Minuwangoda")}>Minuwangoda</Dropdown.Item>
            <Dropdown.Item className="customDropdown" onClick={() => setSelectedDivision("Divulapitiya")}>Divulapitiya</Dropdown.Item>
            <Dropdown.Item className="customDropdown" onClick={() => setSelectedDivision("Meerigama")}>Meerigama</Dropdown.Item>
            </DropdownButton>
          </Col>

          <Col lg={1} sm={12}>
    <FormLabel htmlFor="class1" className="labelForm PdropdownTopics">
     Subject
    </FormLabel>
  </Col>

  <Col lg={2} sm={12}>
  <DropdownButton className='customDropdownButton' variant="outline-success" id="dropdown-basic-button" title={selectedSubject} >

    {subjectList.map((subjects,index) =>(
      <Dropdown.Item className='customDropdown' key={index}  onClick={() => setselectedSubject(subjects.subject)}>{subjects.subject}</Dropdown.Item>
      
    ))}
  
  </DropdownButton>
  </Col>
 

  
</Row>
</Container>

<Container fluid>
        <Row>
          <Table striped bordered hover size="sm" style={{ width: '100%' }}>
          <thead>
                            <tr>
                              <th>School</th>
                              <th>0-19</th>
                              <th>20-39</th>
                              <th>40-59</th>
                              <th>60-79</th>
                              <th>80-100</th>
                              <th>ab</th>
                             
                            </tr>
                           
                          </thead>
                          <tbody>
              {Object.entries(studentCounts).map(([school, counts], index) => (
                <tr key={index}>
                  <td>{school}</td>
                  <td>{counts.count0To19}</td>
                  <td>{counts.count20To39}</td>
                  <td>{counts.count40To59}</td>
                  <td>{counts.count60To79}</td>
                  <td>{counts.count80To100}</td>
                  <td>{counts.absentCount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Container>
 


</div>
);
};

export default ZonalSubjctResults;