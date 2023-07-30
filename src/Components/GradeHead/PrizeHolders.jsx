import React, { useEffect, useState, useContext,useRef } from 'react';
import { Container, Row, Col,FormLabel } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import './GreadHead.css';
import { Button } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios';
import { AuthContext } from '../../helpers/AuthContext';
import { useReactToPrint } from 'react-to-print';			
import '../OtherComponents/DownloadButton.css';


const PrizeHolders = () => {
  const CurrentYear = new Date().getFullYear();

  const {authState} = useContext(AuthContext);

  const username = authState.username;

  const [prizeHolders, setPrizeHolders] = useState([]);
  const [studentDetails, setStudentDetails] = useState([]);

  const [selectedGrade, setSelectedGrade] = useState('7');
  const [selectedyear, setSelectedYear] = useState(CurrentYear);

    //for the grade dropdown
    const grades = ['Grade 6','Grade 7','Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'Grade 13'];
  
     // Used replace method to remove the "Grade " prefix from the grade string.
  const extractNumber = (grade) => {
    const number = grade.replace('Grade ', '');
    return number;
  };


  useEffect(() => {
    axios.get(`http://localhost:3001/prizeHolders/${selectedGrade}/${selectedyear}/${username}`).then((response) => {
      setPrizeHolders(response.data.maxMarks);
      setStudentDetails(response.data.prizeHoldersList);
    });
  }, [selectedGrade, selectedyear]);

   
  const customStyles = `
  body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    padding: 20px;
    font-size: 14px;
  }
  .pdf-container {
    width: 100%; /* Set the width to 100% of the PDF page */
    margin: 20px; /* Add your desired margins here */
  }
  /* Add any other custom styles for the PDF here */
`;
const componentPDF = useRef();

const generatePDF = useReactToPrint({
  content: () => componentPDF.current,
  documentTitle: 'A/L Results- Division Wise Analysis',
  pageStyle: customStyles, 
});

return (
<div>
{/* <ButtonAppBar PageName="Prize Holders" /> */}
<NavBar PageName="Prize Holders"
showButtons={false}/>

<Container fluid className='topDiv' ref={componentPDF}>
        <Row>
         <p className='pTopDiv'>Prize Holders List</p>
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
          <DropdownButton className='customDropdownButton' variant="outline-success" id="dropdown-basic-button" title={'Grade '+`${selectedGrade}`} >

            {grades.map((grade,index) =>(
              <Dropdown.Item className='customDropdown' key={index}  onClick={() => setSelectedGrade(extractNumber(grade))}>{`${grade}`}</Dropdown.Item>
              
            ))}
          
          </DropdownButton>
          </Col>
          <Col lg={1} sm={12}>
            <FormLabel htmlFor="class1" className="labelForm">
              Year
            </FormLabel>
          </Col>
          <Col lg={5} sm={12}>
          <DropdownButton className='customDropdownButton' variant="outline-success" id="dropdown-basic-button" title={`${selectedyear}`} >
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear)}>{CurrentYear}</Dropdown.Item>
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-1)}>{CurrentYear-1}</Dropdown.Item>
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-2)}>{CurrentYear-2}</Dropdown.Item>
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-3)}>{CurrentYear-3}</Dropdown.Item>
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-4)}>{CurrentYear-4}</Dropdown.Item>
      
    
    </DropdownButton>
          </Col>
          
        </Row>
      </Container>

<Container fluid className='div_aca_yr divAddStudentTable'>
        <Row className='TableRoWUp'>

          <Col md={2} sm={6}>
            {/* <p className='pAddStudent'>Total Subjects</p> */}
          </Col>
          <Col md={2} sm={6}>
          {/* <form action="">
              <input type="text"
                
                 value={prizeHolders.subjectList.length}
              style={{width:'10%', alignItems:'left', border:'none', borderBottom:'0px', backgroundColor:'transparent', color:'#000000', fontSize:'10px', fontWeight:'bold'}}
               />
            </form>
             */}
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
  {Object.entries(prizeHolders).map(([subject, details], index) => {
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
  })}
</tbody>








    </Table>
           
        </Row>
      </Container>
      <Row>

      <button onClick={generatePDF} className="buttonDownload" style={{width:"140px",marginLeft:"1330px",height:"40px"}}>Generate PDF</button> 
      </Row>
</div>
);
};

export default PrizeHolders;