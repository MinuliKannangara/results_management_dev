import React, { useEffect, useState, useContext,useRef} from 'react';
import './ManageStudentDetails.css';
import { Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import { AuthContext } from '../../helpers/AuthContext';
import { useReactToPrint } from 'react-to-print';			
import '../OtherComponents/DownloadButton.css';
import { useParams } from 'react-router-dom';


const GenrateReportCards = () => {

  const {authState} = useContext(AuthContext);


  const enteredUsername = authState.username; 
  const classesName = authState.className;
  const CurrentYear = new Date().getFullYear();


  let { indexNumber, student_name } = useParams(); 
  let decodedStudentName = decodeURIComponent(student_name);

  console.log(student_name);

const [subjectList, setSubjectList] = useState([]);
const [term1Results, setTerm1Results] = useState([]);
const [term2Results, setTerm2Results] = useState([]);
const [term3Results, setTerm3Results] = useState([]);
const [schoolName, setSchoolName] = useState('');


   useEffect(()=> {
    axios.get(`http://localhost:3001/reportCard/${indexNumber}/${enteredUsername}/${CurrentYear}`).then((response) => {
        setSubjectList(response.data.subjectNames);
        setTerm1Results(response.data.resultsOfEachStudentTerm1);
        setTerm2Results(response.data.resultsOfEachStudentTerm2);
        setTerm3Results(response.data.resultsOfEachStudentTerm3);
        setSchoolName(response.data.schoolName);

     
      console.log(response.data);
    })
  


    .catch((error) => {console.log(error)});
   },[enteredUsername,CurrentYear, indexNumber]);



const calculateTotalMarks = (results) => {
    return Object.values(results).reduce((total, mark) => total + (mark || 0), 0);
  };

  const calculateAverageMarks = (results) => {
    const marksArray = Object.values(results).filter((mark) => typeof mark === 'number');
    const totalMarks = marksArray.reduce((total, mark) => total + mark, 0);
    const averageMarks = marksArray.length > 0 ? totalMarks / marksArray.length : 0;
    return Number(averageMarks.toFixed(2)); // Round to two decimal points and convert back to a number
  };
  
    
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
  documentTitle: 'Report Card',
  pageStyle: customStyles, 
});

return (
<div>
  

<NavBar PageName="Report Cards" 
showButtons={false} />


<Container style={{margin:"50px 5px 5px 160px", width:"1200px"}}  ref={componentPDF}>

    <Row style={{height:"100px", backgroundColor:"#14213d", alignItems:"center"}}>
  
    <h4 style={{ fontSize: "30px", fontWeight: "bold", color: "white" , paddingLeft:"450px" }}>Report Card</h4>

            <h3 style={{fontSize: "24px", fontWeight: "400", color: "white", paddingLeft:"310px" }}>{schoolName}</h3>
    </Row>

    <Row style={{height:"200px", alignItems:"center"}}>
        <div style={{marginLeft:"-118px"}}>
        <p style={{color: "#14213d", fontSize:"18px", marginTop:"0px"}}> Student Name: {decodedStudentName} </p>
        <p style={{color: "#14213d", fontSize:"18px", marginTop:"0px"}}>Index Number: {indexNumber} </p>
        <p style={{color: "#14213d", fontSize:"18px",marginTop:"0px"}}>Class Name : {classesName}</p>
        </div>
  
        
    
    </Row>


        <Row className='TableRoWDown'>
        
        <Table >
  <thead>
    <tr>
      <th>Subject</th>
      <th>1st Term</th>
      <th>2nd Term</th>
      <th>3rd Term</th>

    </tr>
  </thead>
  <tbody>
    {subjectList
      .map((subject, index) => (
      <tr key={subject}>
        <td>{subject}</td>
        <td>{term1Results[subject]}</td>
        <td>{term2Results[subject]}</td>
        <td>{term3Results[subject]}</td>
      </tr>
    ))}
    <tr>
                <td><strong>Total Marks</strong></td>
                <td>{calculateTotalMarks(term1Results)}</td>
                <td>{calculateTotalMarks(term2Results)}</td>
                <td>{calculateTotalMarks(term3Results)}</td>
              </tr>
              <tr>
                <td><strong>Average Marks</strong></td>
                <td>{calculateAverageMarks(term1Results)}</td>
                <td>{calculateAverageMarks(term2Results)}</td>
                <td>{calculateAverageMarks(term3Results)}</td>
              </tr>
  </tbody>
</Table>

   
           
        </Row>
        <Row style={{height:"1px", backgroundColor:"#14213d", alignItems:"center", marginBottom:"5px"}}>
    </Row>
      </Container>
      <Row>

<button onClick={generatePDF} className="buttonDownload" style={{width:"140px",marginLeft:"1330px",height:"40px"}}>Generate PDF</button> 
</Row>

</div>
);
};

export default GenrateReportCards;