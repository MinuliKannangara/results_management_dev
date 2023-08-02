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

const ScholarshipResultsData = () => {
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
    const [existingResults, setResults] = useState([]);
    const [schools, setschools] = useState([]);



 

  useEffect(() => {
    axios.get(`http://localhost:3001/ScholarshipResults/zeoScholarship/${division}/${selectedYear}`).then((response) => {  
        setResults(response.data.results || []);
        setschools(response.data.schoolList);
      });

     
  }, [division,selectedYear]);

console.log(schools);
  


return (
<div>

<NavBar
        PageName="Scholarship Data"
        Tab1="Division Wise Analysis"
        Tab2="Summary"
        Tab1Link="/Scholarship Results Analysis"
        Tab2Link="/ScholarshipData"
        showButtons={true}
      />



<div ref={componentPDF}>
<Container fluid>
            <Row><h3 className='topicsP'>Scholarship Results Summary</h3></Row>
        </Container>

<Container className="DropdownDiv2">
<Row>
<Col lg={1} sm={12}>
            <FormLabel htmlFor="class1" className="labelForm">
              Division
            </FormLabel>
          </Col>
<Col lg={5} sm={12}>
            <DropdownButton className="customDropdownButton" variant="outline-success" id="dropdown-basic-button" title={`${division}`}>
            <Dropdown.Item className="customDropdown" onClick={() => setSelectedDivision("Minuwangoda")}> Minuwangoda </Dropdown.Item>
            <Dropdown.Item className="customDropdown" onClick={() => setSelectedDivision("Divulapitiya")}> Divulapitiya </Dropdown.Item>
            <Dropdown.Item className="customDropdown" onClick={() => setSelectedDivision("Meerigama")}> Meerigama </Dropdown.Item>
            </DropdownButton>
          </Col>

         
     
       
          <Col lg={1} sm={12}>
            <FormLabel htmlFor="class1" className="labelForm">
              Year
            </FormLabel>
          </Col>
          <Col lg={5} sm={12}>
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
                <th>0-5</th>
                <th>6-24</th>
                <th>25-49</th>
                <th>50-69</th>
                <th>70-99</th>
                <th>100-124</th>
                <th>125-150</th>
                <th>151-175</th>
                <th>176-200</th>
                <th>Maximum Mark</th>
                <th>Minimum Mark</th>
                <th>Absent</th>
                <th>Number Of Sat</th>
              </tr>
            </thead>
            <tbody>
                {schools.map((school,index) =>(
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{school.school_name}</td>
                <td >
                {
            existingResults.length > 0 &&
            existingResults.map((results) => {
              if (results.School.school_ID === school.school_ID) {
                return results.Count0_5;
              } else {
                return null;
              }
            })
          }
                </td>
                <td >
                {
            existingResults.length > 0 &&
            existingResults.map((results) => {
              if (results.School.school_ID === school.school_ID) {
                return results.Count6_24;
              } else {
                return null;
              }
            })
          }
                </td>
                <td >
                {
            existingResults.length > 0 &&
            existingResults.map((results) => {
              if (results.School.school_ID === school.school_ID) {
                return results.Count25_49;
              } else {
                return null;
              }
            })
          }
                </td>
                <td >
                {
            existingResults.length > 0 &&
            existingResults.map((results) => {
              if (results.School.school_ID === school.school_ID) {
                return results.Count50_69;
              } else {
                return null;
              }
            })
          }
                </td>
                <td >
                {
            existingResults.length > 0 &&
            existingResults.map((results) => {
              if (results.School.school_ID === school.school_ID) {
                return results.Count70_99;
              } else {
                return null;
              }
            })
          }
                </td>
                <td >
                {
            existingResults.length > 0 &&
            existingResults.map((results) => {
              if (results.School.school_ID === school.school_ID) {
                return results.Count100_124;
              } else {
                return null;
              }
            })
          }
                </td>
                <td >
                {
            existingResults.length > 0 &&
            existingResults.map((results) => {
              if (results.School.school_ID === school.school_ID) {
                return results.Count125_150;
              } else {
                return null;
              }
            })
          }
                </td>
                
                <td >
                {
            existingResults.length > 0 &&
            existingResults.map((results) => {
              if (results.School.school_ID === school.school_ID) {
                return results.Count151_175;
              } else {
                return null;
              }
            })
          }
                </td>

                <td >
                {
            existingResults.length > 0 &&
            existingResults.map((results) => {
              if (results.School.school_ID === school.school_ID) {
                return results.Count176_200;
              } else {
                return null;
              }
            })
          }
                </td>
            
                <td >
                {
            existingResults.length > 0 &&
            existingResults.map((results) => {
              if (results.School.school_ID === school.school_ID) {
                return results.MaximumMark;
              } else {
                return null;
              }
            })
          }
                </td>
                <td >
                {
            existingResults.length > 0 &&
            existingResults.map((results) => {
              if (results.School.school_ID === school.school_ID) {
                return results.MinimumMark;
              } else {
                return null;
              }
            })
          }
                </td>
                <td >
                {
            existingResults.length > 0 &&
            existingResults.map((results) => {
              if (results.School.school_ID === school.school_ID) {
                return results.Absent;
              } else {
                return null;
              }
            })
          }
                </td>
                <td >
                {
            existingResults.length > 0 &&
            existingResults.map((results) => {
              if (results.School.school_ID === school.school_ID) {
                return results.NumOfSat;
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

export default ScholarshipResultsData;