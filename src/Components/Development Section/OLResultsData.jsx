import React, {useState, useEffect,useRef } from 'react';
import { Container, Row, Col,FormLabel } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';
import './OLResults.css';
import { useReactToPrint } from 'react-to-print';	
import '../OtherComponents/DownloadButton.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios, { Axios } from 'axios';
import Table from 'react-bootstrap/Table';

const OLResultsData = () => {
    const CurrentYear = new Date().getFullYear();

  const componentPDF = useRef();

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: 'A/L Results- Division Wise Analysis',
    // onAfterPrint: () => alert('Printed'),
    //pageStyle: customStyles, // Pass the custom styles to the PDF
  });

  const [selectedYear, setSelectedYear] = useState(CurrentYear);
    const [division, setSelectedDivision] = useState('Minuwangoda');
    const [subjects, setSubjects] = useState([]);
    const [existingResults, setResults] = useState([]);
    const [schools, setschools] = useState([]);
    const [OlSubjects, setOlSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState();


    useEffect(() => {
        axios
        .get("http://localhost:3001/subject/subjectLists")
        .then((response) => {
          setOlSubjects(response.data.OLsubjectList);
        })
        .catch((error) => {
          console.error("Error fetching roles:", error);
        });
    }, []);

  useEffect(() => {
    axios.get(`http://localhost:3001/OLResults/ZEO/${selectedYear}/${division}/${selectedSubject}`).then((response) => {

        setResults(response.data.results || []);
        setschools(response.data.schoolList);
      });

     
  }, [division,selectedYear,selectedSubject]);

console.log(schools);
  


return (
<div>

<NavBar
        PageName="O/L Results Analysis"
        Tab1="Division Wise Analysis"
        Tab2="Subject Wise Analysis"
        Tab3="Summary"
        Tab1Link="/O/L Results Analysis"
        Tab2Link="/SubjectWiseAnalysisOL"
        Tab3Link="/OLResultsData"
        showButtons={true}
      />


<div ref={componentPDF}>
<Container fluid>
            <Row><h3 className='topicsP'>O/L Results Summary</h3></Row>
        </Container>

<Container className="DropdownDiv2">
<Row>
<Col lg={1} sm={12}>
            <FormLabel htmlFor="class1" className="labelForm">
              Division
            </FormLabel>
          </Col>
<Col lg={3} sm={12}>
            <DropdownButton className="customDropdownButton" variant="outline-success" id="dropdown-basic-button" title={`${division}`}>
            <Dropdown.Item className="customDropdown" onClick={() => setSelectedDivision("Minuwangoda")}> Minuwangoda </Dropdown.Item>
            <Dropdown.Item className="customDropdown" onClick={() => setSelectedDivision("Divulapitiya")}> Divulapitiya </Dropdown.Item>
            <Dropdown.Item className="customDropdown" onClick={() => setSelectedDivision("Meerigama")}> Meerigama </Dropdown.Item>
            </DropdownButton>
          </Col>

          <Col lg={1} sm={12}>
            <FormLabel htmlFor="class1" className="labelForm">
              Subject
            </FormLabel>
          </Col>
          <Col lg={3} sm={12}>
          <DropdownButton className='customDropdownButton' variant="outline-success" id="dropdown-basic-button" title={OlSubjects.find((subject) => subject.subject_ID === selectedSubject)?.subject || 'Arts'} >
            {OlSubjects.map((subject, index) => (   
                <Dropdown.Item className='customDropdown' key={index} onClick={() => setSelectedSubject(subject.subject_ID)}>{subject.subject}</Dropdown.Item>
            ))} 
    </DropdownButton>
          </Col>
         
         
     
       
          <Col lg={1} sm={12}>
            <FormLabel htmlFor="class1" className="labelForm">
              Year
            </FormLabel>
          </Col>
          <Col lg={3} sm={12}>
          <DropdownButton className='customDropdownButton' variant="outline-success" id="dropdown-basic-button" title={`${selectedYear}`} >
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear)}>{CurrentYear}</Dropdown.Item>
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-1)}>{CurrentYear-1}</Dropdown.Item>
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-2)}>{CurrentYear-2}</Dropdown.Item>
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-3)}>{CurrentYear-3}</Dropdown.Item>
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-4)}>{CurrentYear-4}</Dropdown.Item>
      
    
    </DropdownButton>
          </Col>
</Row>

<Row>
<Table striped bordered hover variant="light">
            <thead>
              <tr>
              <th>#</th>
                <th>School</th>
                <th>A passes</th>
                <th>B passes</th>
                <th>C passes</th>
                <th>S passes</th>
                <th>W passes</th>
                <th>Absent</th> 
                <th> Number Of Sat</th>
                <th>Number Of Pass</th>
              </tr>
            </thead>
            <tbody>
              {schools.map((school, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{school.school_name}</td>
                  <td>
                     {
            existingResults.length > 0 &&
            existingResults.map((results) => {
              if (results.School.school_ID === school.school_ID) {
                return results.A_Passes;
              } else {
                return null;
              }
            })
          }
                  </td>
                  <td
                    
                  >
                     {
                      existingResults.length > 0 &&
                      existingResults.map((results) =>{
                        if(results.School.school_ID === school.school_ID){
                          return results.B_Passes;
                        } else {
                          return null;
                        }
                      })
                    }
                  </td>
                  <td
                    
                  >
                     {
                      existingResults.length > 0 &&
                      existingResults.map((results) =>{
                        if(results.School.school_ID === school.school_ID){
                          return results.C_Passes;
                        } else {
                          return null;
                        }
                      })
                    }
                  </td>
                  <td
                    
                  >
                     {
                      existingResults.length > 0 &&
                      existingResults.map((results) =>{
                        if(results.School.school_ID === school.school_ID){
                          return results.S_Passes;
                        } else {
                          return null;
                        }
                      })
                    }
                  </td>
                  <td
                
                  >
                     {
                      existingResults.length > 0 &&
                      existingResults.map((results) =>{
                        if(results.School.school_ID === school.school_ID){
                          return results.W_Passes;
                        } else {
                          return null;
                        }
                      })
                    }
                  </td>
                  <td
                
                >
                   {
                    existingResults.length > 0 &&
                    existingResults.map((results) =>{
                      if(results.School.school_ID === school.school_ID){
                        return results.absent;
                      } else {
                        return null;
                      }
                    })
                  }
                </td>
                <td
                
                >
                   {
                    existingResults.length > 0 &&
                    existingResults.map((results) =>{
                      if(results.School.school_ID === school.school_ID){
                        return results.NumOfSat;
                      } else {
                        return null;
                      }
                    })
                  }
                </td>
                <td
                
                >
                   {
                    existingResults.length > 0 &&
                    existingResults.map((results) =>{
                      if(results.School.school_ID === school.school_ID){
                        return results.NumOfPass;
                      } else {
                        return null;
                      }
                    })
                  }
                </td>
                
                </tr>
              ))}
            </tbody>
          </Table>
</Row>

</Container>










</div>

<Row>
<button onClick={generatePDF} className="buttonDownload" style={{width:"140px",marginLeft:"1330px",height:"40px"}}>Generate PDF</button> 
</Row>    

</div>
);
};

export default OLResultsData;