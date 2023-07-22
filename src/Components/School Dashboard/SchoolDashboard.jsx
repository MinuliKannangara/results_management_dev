import React, { useEffect, useState, PureComponent ,useContext} from 'react';
import { Container, Row, Col,FormLabel } from 'react-bootstrap';
import './SchoolDashboard.css';
import NavBar from '../NavBar/NavBar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios';
import DashboardCards from '../OtherComponents/dashboardCards';
import { faUserGroup,faLandmark } from '@fortawesome/free-solid-svg-icons'
// import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';
import PieChartForSchool from '../Charts/PieChartForSchools';
import SchoolDashboardTable from '../Charts/TableSchoolDashboard';
import { AuthContext } from '../../helpers/AuthContext';




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
      return []; // Return an empty array or handle the error condition appropriately
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
  
return (
<div>
<NavBar PageName="School Dashboard"/>

 <Container fluid className='topContainer'>
    <Row className='justify-content-center'>
    <Row style={{height:"40px"}}>
    <p className='PcardsTitle'>School Details</p>
    </Row>

    <Row style={{ height: "160px", width:"1050px", marginTop:"10px"}}>
    <Col lg={7} md={4} sm={12} style={{  display: "flex" }}>
  <div className="container" style={{ marginRight: "2px" }}>
    <div className="box">
      <span className="title">{SchoolDetails.school_name}</span>
      <div>
        <strong>Type: {SchoolDetails.type}</strong>
        <strong>Division: {SchoolDetails.division}</strong>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", position: "absolute", right: "30px" }}>
    <div style={{ marginBottom: "10px" }}>
      <DashboardCards studentCount={AllStudentsCount} DisplayText="Total Students" borderColor="3px solid #0E2954" IconName={faUserGroup} />
    </div>
    <div>
      <DashboardCards studentCount={AllClassesCount} DisplayText="Total Classes" borderColor="3px solid #1F6E8C" IconName={faLandmark} />
    </div>
  </div>
    </div>

  </div>

 
</Col>


        <Col lg={4} md={4} sm={12} style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  


</Col>

        
    </Row>

    </Row>

</Container>

<br/>

<Container fluid className="divAllDropdown" style={{marginTop:"50px"}}>

<Row>
<Col lg={3} sm={12}>
    <FormLabel htmlFor="class1" className="labelForm">
    <p className='PcardsTitle'>Grade Details: Grade {selectedGrade}</p>
    </FormLabel>
  </Col>
  <Col lg={1} sm={12}>
    <FormLabel htmlFor="class1" className="labelForm">
     Grade
    </FormLabel>
  </Col>

  <Col lg={2} sm={12}>
  <DropdownButton className='customDropdownButton' id="dropdown-basic-button" title={'Grade '+`${selectedGrade}`} >

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
  <Col lg={2} sm={12}>
  <DropdownButton className='customDropdownButton' id="dropdown-basic-button" title={`${selectedyear}`} >
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
          <Col lg={2} sm={12}>
            <DropdownButton className="customDropdownButton" id="dropdown-basic-button" title={`${selectedTerm}`}>
            <Dropdown.Item className="customDropdown" onClick={() => setSelectedTerm("1st Term")}> 1st Term </Dropdown.Item>
            <Dropdown.Item className="customDropdown" onClick={() => setSelectedTerm("2nd Term")}> 2nd Term </Dropdown.Item>
            <Dropdown.Item className="customDropdown" onClick={() => setSelectedTerm("3rd Term")}> 3rd Term </Dropdown.Item>
            </DropdownButton>
          </Col>
 

  
</Row>
</Container>
 

<Container fluid>
    <Row className='justify-content-center'>
    

    <Row style={{ height: "120px", width:"1550px", marginTop:"10px"}}>
        <Col lg={4} md={4} sm={12} style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
    
        <DashboardCards studentCount={TotalStudentsOfGrade} DisplayText="Total Students" borderColor="3px solid #0E2954" IconName={faUserGroup}/>
        </Col>
        <Col lg={4} md={4} sm={12} style={{display: "flex", justifyContent: "center", alignItems: "center"}} >
        <DashboardCards studentCount={ClassCountOfSelectedGrade} DisplayText="Total Classes" borderColor="3px solid #1F6E8C" IconName={faLandmark}/>
        </Col>
        <Col lg={4} md={4} sm={12} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        {/* <DashboardCards studentCount="1240" DisplayText="Total Subjects" borderColor="3px solid #2E8A99" IconName={faBookBookmark}/> */}
         </Col>
    </Row>

    </Row>

    </Container>

<Container fluid>
    <Row className='justify-content-center'>
    <Row style={{  height: "20px", width:"1550px", marginTop:"10px", position:"relative"}}>
    <p className='PcardsTitle'>Subject Wise Analysis</p>
        
    </Row>

    {subjectList.map((subject, index) => (
      <Row key={index} style={{ height: "400px", width: "1550px", marginTop: "10px" }}>
        <h3 className='tableTopicH3'>{subject.subject}</h3>
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