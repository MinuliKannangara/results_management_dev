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
import Example from '../Charts/LineChartSubjectPerformance';


const SubjectWisePerformance = () => {
  const CurrentYear = new Date().getFullYear();

  const {authState} = useContext(AuthContext);

  const username = authState.username;


  const [selectedGrade, setSelectedGrade] = useState('7');
  const [selectedyear, setSelectedYear] = useState(CurrentYear);



  //year 1 is the current year, year2= current year-1
  const [countYear1, setCountYear1] = useState(0);
    const [countYear2, setCountYear2] = useState(0);
    const [countYear3, setCountYear3] = useState(0);
    const [countYear4, setCountYear4] = useState(0);
    const [countYear5, setCountYear5] = useState(0);

    const [subjectList, setSubjectList] = useState([]);
    const [selectedSubject, setselectedSubject] = useState('English');


    //for the grade dropdown
    const grades = ['Grade 6','Grade 7','Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'Grade 13'];
  
     // Used replace method to remove the "Grade " prefix from the grade string.
  const extractNumber = (grade) => {
    const number = grade.replace('Grade ', '');
    return number;
  };

  useEffect(() => {
    axios.get("http://localhost:3001/subjectPerformance/subjects")
      .then((response) => {
        setSubjectList(response.data);
      })
      .catch((error) => {
        // Handle the error if the API call fails
        console.error("Error fetching subject list:", error);
      });
  }, []);


  useEffect(() => {
    axios.get(`http://localhost:3001/subjectPerformance/${username}/${selectedGrade}/${selectedSubject}`).then((response) => {
      setCountYear1(response.data.year1);
        setCountYear2(response.data.year2);
        setCountYear3(response.data.year3);
        setCountYear4(response.data.year4);
        setCountYear5(response.data.year5);
    });
  }, [selectedGrade, selectedyear,selectedSubject]);

  const data = [
    {
      name: CurrentYear-4,
      Range_0_19: countYear5.count0To19,
      Range_20_39: countYear5.count20To39,
      Range_40_59: countYear5.count40To59,
      Range_60_79: countYear5.count60To79,
      Range_80_100: countYear5.count80To100,
     
    },
    {
      name: CurrentYear-3,
      Range_0_19: countYear4.count0To19,
      Range_20_39: countYear4.count20To39,
      Range_40_59: countYear4.count40To59,
      Range_60_79: countYear4.count60To79,
      Range_80_100: countYear4.count80To100,
  
    },
    {
      name: CurrentYear-2,
      Range_0_19: countYear3.count0To19,
      Range_20_39: countYear3.count20To39,
      Range_40_59: countYear3.count40To59,
      Range_60_79: countYear3.count60To79,
      Range_80_100: countYear3.count80To100,
  
    },
    {
      name: CurrentYear-1,
      Range_0_19: countYear2.count0To19,
      Range_20_39: countYear2.count20To39,
      Range_40_59: countYear2.count40To59,
      Range_60_79: countYear2.count60To79,
      Range_80_100: countYear2.count80To100,
  
    },
    {
      name: CurrentYear,
      Range_0_19: countYear1.count0To19,
      Range_20_39: countYear1.count20To39,
      Range_40_59: countYear1.count40To59,
      Range_60_79: countYear1.count60To79,
      Range_80_100: countYear1.count80To100,
    
    },
  
  ];
  
  console.log(data);    
   
  const customStyles = `
  body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    padding: 20px;
    font-size: 14px;
  }
  .pdf-container {
    width: 100%; 
    margin: 20px; 
  }
 
`;
const componentPDF = useRef();

const generatePDF = useReactToPrint({
  content: () => componentPDF.current,
  documentTitle: 'Subject Performance Throughout the Previous Five Years',
  pageStyle: customStyles, 
});

return (
<div>
{/* <ButtonAppBar PageName="Prize Holders" /> */}
<NavBar PageName="Subject Performances"
showButtons={false}/>

<div ref={componentPDF}>
<Row>
         <p className='pTopDiv' style={{marginLeft:"430px", fontSize:"25px", marginBottom:"20px", fontWeight:"400"}}>Performance throughout the previous five years</p>
        </Row>


      <Container className="DropdownDiv2" >

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
              Subject
            </FormLabel>
          </Col>
          <Col lg={5} sm={12}>
          <DropdownButton
              className='customDropdownButton'
              variant="outline-success"
              id="dropdown-basic-button"
              title={`${selectedSubject}`}
            >
              {/* Display the subject list items in the dropdown */}
              {subjectList.map((val) => {
                return (
                  <Dropdown.Item
                    className='customDropdown'
                    key={val.subject_id}
                    onClick={() => setselectedSubject(val.subject)}
                  >
                    {val.subject}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
          </Col>
          
        </Row>
      </Container>
 
      <Container style={{height:"500px", width:"700px"}}>
      <Example data={data} />
      </Container>
 
</div>
        

      <Row>

      <button onClick={generatePDF} className="buttonDownload" style={{width:"140px",marginLeft:"1330px",height:"40px"}}>Generate PDF</button> 
      </Row>
</div>
);
};

export default SubjectWisePerformance;