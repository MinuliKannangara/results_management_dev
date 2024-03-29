import React, { useEffect, useState, PureComponent ,useContext,useRef} from 'react';
import { Container, Row, Col,FormLabel } from 'react-bootstrap';
import './SchoolDashboard.css';
import NavBar from '../NavBar/NavBar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios';
import PieChartForSchool from '../Charts/PieChartForSchools';
import SchoolDashboardTable from '../Charts/TableSchoolDashboard';
import { AuthContext } from '../../helpers/AuthContext';
import Cards from '../OtherComponents/Cards';
import { useReactToPrint } from 'react-to-print';			
import '../OtherComponents/DownloadButton.css';




const SchoolDashboard= () => {
  

  // static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';
  const CurrentYear = new Date().getFullYear();

  const {authState} = useContext(AuthContext);
  const username = authState.username;
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

  //to get the details from the database
  const [AllStudentsCount, setAllStudentsCount] = useState(0);
  const [AllClassesCount, setAllClassesCount] = useState(0);
  const [ClassCountOfSelectedGrade, setClassCountOfSelectedGrade] = useState(0);
  const [TotalStudentsOfGrade, setTotalStudentsOfGrade] = useState(0);
  const [subjectCounts, setsubjectCounts] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [SchoolDetails, setSchoolDetails] = useState({
    school_name: '',
    type: '',
    division: ''
  });
  

  const setData = (subjectName) => {
    const subjectData = subjectCounts[subjectName];
  
    if (!subjectData) {
      return []; // Return an empty array
    }
  
    const data = [
      { name: '0-19', value: subjectData.count0To19 || 0 },
      { name: '20-39', value: subjectData.count20To39 || 0 },
      { name: '40-59', value: subjectData.count40To59 || 0 },
      { name: '60-79', value: subjectData.count60To79 || 0 },
      { name: '80-100', value: subjectData.count80To100 || 0 },
      { name: 'absent', value: subjectData.absentCount || 0 },
    ];
    
    const filteredData = data.filter((entry) => entry.value > 0);

    return filteredData;
  };
  


  useEffect(() => {
    axios.get(`http://localhost:3001/SchoolDashboardDetails/${username}/${selectedGrade}/${selectedyear}/${selectedTerm}`)
      .then((response) => {
        setAllStudentsCount(response.data.AllStudentsCount);
        setAllClassesCount(response.data.AllClassesCount);
        setClassCountOfSelectedGrade(response.data.ClassCountOfSelectedGrade);
        setTotalStudentsOfGrade(response.data.TotalStudentsOfGrade);
       setsubjectCounts(response.data.subjectCounts);
       setSubjectList(response.data.subjectList);
       setSchoolDetails(response.data.SchoolDetails);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedGrade, selectedyear, selectedTerm]);


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
<NavBar PageName="School Dashboard"
showButtons={false} 
/>

<Container fluid>
    <Row>
      <Col lg={6} md={6} sm={12} className='schoolDetailsDiv'>

      <span style={{fontSize:"22px", marginLeft:"100px", fontWeight:"600"}}>{SchoolDetails.school_name}</span>
      <br />
        <strong style={{fontSize:"18px", fontWeight:"500", marginLeft:"100px", alignItems:"center"}}>Type: {SchoolDetails.type}</strong>
       <br />

        <strong style={{fontSize:"18px", fontWeight:"500", marginLeft:"100px"}}>Division: {SchoolDetails.division}</strong>

        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '-15px' }}>
            <Cards DisplayText="Total Students" count={AllStudentsCount} />
            <Cards DisplayText="Total Classes" count={AllClassesCount} />
          </div>
       
      </Col>
      <Col lg={6} md={6} sm={12} className='schoolDetailsDiv' style={{padding:"2px"}}>
      
          {/* Second set of cards */}
          
          <Row style={{marginTop:"50px", marginLeft:"2px"}}>
           
           <Col lg={1} sm={12}>
             <FormLabel htmlFor="class1" className="labelForm">
               Grade
             </FormLabel>
           </Col>

           <Col lg={3} sm={12}>
             <DropdownButton id="grade-dropdown" title={'Grade ' + `${selectedGrade}`} >
               {grades.map((grade, index) => (
                 <Dropdown.Item className='customDropdown' key={index} onClick={() => setSelectedGrade(extractNumber(grade))}>{`${grade}`}</Dropdown.Item>
               ))}
             </DropdownButton>
           </Col>
           
           <Col lg={1} sm={12}>
             <FormLabel htmlFor="class1" className="labelForm">
               Year
             </FormLabel>
           </Col>
           <Col lg={3} sm={12}>
             <DropdownButton className='customDropdownButton' id="year-dropdown" title={`${selectedyear}`} >
               <Dropdown.Item className='customDropdown' onClick={() => setSelectedYear(CurrentYear)}>{CurrentYear}</Dropdown.Item>
               <Dropdown.Item className='customDropdown' onClick={() => setSelectedYear(CurrentYear - 1)}>{CurrentYear - 1}</Dropdown.Item>
               <Dropdown.Item className='customDropdown' onClick={() => setSelectedYear(CurrentYear - 2)}>{CurrentYear - 2}</Dropdown.Item>
               <Dropdown.Item className='customDropdown' onClick={() => setSelectedYear(CurrentYear - 3)}>{CurrentYear - 3}</Dropdown.Item>
               <Dropdown.Item className='customDropdown' onClick={() => setSelectedYear(CurrentYear - 4)}>{CurrentYear - 4}</Dropdown.Item>
             </DropdownButton>
           </Col>

           <Col lg={1} sm={12}>
             <FormLabel htmlFor="class1" className="labelForm">
               Term
             </FormLabel>
           </Col>
           <Col lg={3} sm={12}>
             <DropdownButton className="customDropdownButton" id="term-dropdown" title={`${selectedTerm}`} >
               <Dropdown.Item className="customDropdown" onClick={() => setSelectedTerm("1st Term")}> 1st Term </Dropdown.Item>
               <Dropdown.Item className="customDropdown" onClick={() => setSelectedTerm("2nd Term")}> 2nd Term </Dropdown.Item>
               <Dropdown.Item className="customDropdown" onClick={() => setSelectedTerm("3rd Term")}> 3rd Term </Dropdown.Item>
             </DropdownButton>
           </Col>
         </Row>
      
         <div style={{ display: 'flex', justifyContent: 'space-around', marginTop:"0px"}}>
            <Cards DisplayText="Total Students" count={TotalStudentsOfGrade} />
            <Cards DisplayText="Total Classes" count={ClassCountOfSelectedGrade} />
          </div>

      </Col>
    </Row>
</Container>

<br/>

<Row>

      <button onClick={generatePDF} className="buttonDownload" style={{width:"140px",marginLeft:"1330px",height:"40px"}}>Generate PDF</button> 
      </Row>
<Container fluid ref={componentPDF}>
    <Row className='justify-content-center'>

    <Row style={{  height: "50px", width:"1550px", marginTop:"10px", position:"relative"}}>
    {/* <p className='PcardsTitle'>Subject Wise Analysis</p> */}
    <h3 className="tableTopicH3">Subject Wise Analysis</h3>
    
        
    </Row>

    {subjectList.map((subject, index) => (
      <Row key={index} style={{ height: "400px", width: "1550px", marginTop: "10px" }}>
        <h4 className='tableTopicH3'>{subject.subject}</h4>
        <Col lg={6} md={4} sm={12} style={{backgroundColor: "rgb(242, 242, 242)", display: "flex", justifyContent: "center", alignItems: "center"}}>
          
        <SchoolDashboardTable
                  count0To19={subjectCounts[subject.subject]?.count0To19}
                  count20To39={subjectCounts[subject.subject]?.count20To39}
                  count40To59={subjectCounts[subject.subject]?.count40To59}
                  count60To79={subjectCounts[subject.subject]?.count60To79}
                  count80To100={subjectCounts[subject.subject]?.count80To100}
                  absentCount={subjectCounts[subject.subject]?.absentCount}
                />
        </Col>

        <Col lg={6} md={4} sm={12} style={{ backgroundColor: " rgb(235, 235, 235)", display: "flex", height: "auto", justifyContent: "center", alignItems: "center",}}>
        <PieChartForSchool data={setData(subject.subject)} />

        </Col>
        
      </Row>
    ))}
    


    </Row>

</Container> 

</div>
);
};

export default SchoolDashboard;