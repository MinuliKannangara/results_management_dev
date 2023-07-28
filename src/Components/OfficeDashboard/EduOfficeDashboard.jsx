import React, { useEffect, useState, PureComponent } from 'react';
import { Container, Row, Col,FormLabel } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import Cards from '../OtherComponents/Cards';
import LineChart from '../Charts/LineChart';
import { Padding } from '@mui/icons-material';
import { current } from '@reduxjs/toolkit';
import './educationDashboard.css';
import BasicDateCalendar from '../OtherComponents/calender';

const EduOfficeDashboard= () => {
 
  const currentYear = new Date().getFullYear();
  const [OLData, setOLData] = useState([]);
  const [ALData, setALData] = useState([]);
  const [ScholarshipData, setScholarshipData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalSchools, setTotal ] = useState(0);

  
  const getData = async (exam, year) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/NationalExaminationDetails/NationalExaminationResults/${year}/${exam}`
      );
      const responseData = response.data;
      return responseData; // Return the data for the current year
    } catch (error) {
      console.error(`Error fetching data for ${exam} in ${year}:`, error.message);
      return null; // Return null in case of an error
    }
  };

  useEffect(() => {
    axios.get('http://localhost:3001/dashboard')
      .then((response) => {
        setTotal(response.data);
      })
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      let currentYear = new Date().getFullYear();
      const olDataPromises = [];
      const alDataPromises = [];
      const scholarshipDataPromises = [];

      for (let i = 0; i < 5; i++) {
        olDataPromises.push(getData('O_L', currentYear));
        alDataPromises.push(getData('A_L', currentYear));
        scholarshipDataPromises.push(getData('scholarship', currentYear));
        currentYear--;
      }

      const olDataResponses = await Promise.all(olDataPromises);
      const alDataResponses = await Promise.all(alDataPromises);
      const scholarshipDataResponses = await Promise.all(scholarshipDataPromises);

      // Filter out null responses and duplicates
      const filteredOLData = olDataResponses.filter(data => data !== null);
      const filteredALData = alDataResponses.filter(data => data !== null);
      const filteredScholarshipData = scholarshipDataResponses.filter(data => data !== null);

      setOLData(filteredOLData);
      setALData(filteredALData);
      setScholarshipData(filteredScholarshipData);

      setLoading(false);
    };

    fetchData();
  }, []);
  
  console.log(OLData);
  // console.log(ALData);
  // console.log(ScholarshipData);
  
  const calculatePercentage = (data,index) => {
    let totalStudents = 0;
    let totalPassed = 0;
    
      totalStudents = data[index]?.divulapitiya+ data[index]?.minuwangoda+data[index]?.meerigama;
      totalPassed = data[index]?.divulapitiyaPassed+data[index]?.minuwangodaPassed+data[index]?.meerigamaPassed;
      if(totalStudents == 0) return 0;
    return ((totalPassed / totalStudents) * 100).toFixed(2);
  }
  
  const OL_Data = [
    {
      name: `${currentYear-4}`,
      Percentage: calculatePercentage(OLData,4),
    },
    {
      name: `${currentYear-3}`,
      Percentage: calculatePercentage(OLData,3),
    },
    {
      name: `${currentYear-2}`,
      Percentage: calculatePercentage(OLData,2),
    },
    {
      name: `${currentYear-1}`,
      Percentage: calculatePercentage(OLData,1),
    },
    {
      name: `${currentYear}`,
      Percentage: calculatePercentage(OLData,0),
    }
  ];

  const AL_Data = [
    {
      name: `${currentYear-4}`,
      Percentage: calculatePercentage(ALData,4),
    },
    {
      name: `${currentYear-3}`,
      Percentage: calculatePercentage(ALData,3),
    },
    {
      name: `${currentYear-2}`,
      Percentage: calculatePercentage(ALData,2),
    },
    {
      name: `${currentYear-1}`,
      Percentage: calculatePercentage(ALData,1),
    },
    {
      name: `${currentYear}`,
      Percentage: calculatePercentage(ALData,0),
    }
  ];

  const Scholarship_Data = [
    {
      name: `${currentYear-4}`,
      Percentage: calculatePercentage(ScholarshipData,4),
    },
    {
      name: `${currentYear-3}`,
      Percentage: calculatePercentage(ScholarshipData,3),
    },
    {
      name: `${currentYear-2}`,
      Percentage: calculatePercentage(ScholarshipData,2),
    },
    {
      name: `${currentYear-1}`,
      Percentage: calculatePercentage(ScholarshipData,1),
    },
    {
      name: `${currentYear}`,
      Percentage: calculatePercentage(ScholarshipData,0),
    }
  ];



return (
<div style={{ backgroundColor:"white", height:"100%"}}>
<NavBar PageName="Zonal Education Office Dashboard" />

<Container fluid>
    <Row>
        <Col lg={8}  >
        <div className="cardDashboard" style={{ height:"160px", borderRadius:"20px", marginTop:"10px",width:"840px"}}>
        <Cards DisplayText="Total Schools" count={totalSchools.totalSchools}/>
            {/* <Cards DisplayText="Divisions" count='34'/> */}
            <Cards DisplayText="Minuwangoda Schools" count={totalSchools.minuwangodaCount}/>
            <Cards DisplayText="Divulapitiya Schools" count={totalSchools.divulapitiyaCount}/>
            <Cards DisplayText="Meerigama Schools" count={totalSchools.meerigamaCount}/>
        </div>
      

        </Col>
        <Col lg={4} style={{height:"170px"}}>
            <BasicDateCalendar/>
        </Col>
    </Row>

    <Row>
       <p style={{width:"1000px", marginLeft:"4px", fontSize:"25px", color:"black",marginTop:"10px", fontWeight:"500", marginTop:"100px"}}>National Examination Performances</p> 
    </Row>
    <Row>

        <Col lg={4} style={{ height:"350px"}}>
        <h6>OL Results</h6>
        <div className="cardDashboard" style={{height:"280px"}} >
        <LineChart data={OL_Data}/>
        </div>
        </Col>
        
        <Col lg={4} style={{ height:"350px"}}>
        <h6>AL Results</h6>
        <div className="cardDashboard" style={{height:"280px"}}>
        <LineChart data={AL_Data}/>
        </div>
        </Col>

        <Col lg={4} style={{ height:"350px"}}>
        <h6>Scholarship Results</h6>
        <div className="cardDashboard" style={{height:"280px"}}>
        <LineChart data={Scholarship_Data}/>
        </div>
        </Col>


    </Row>
</Container>

</div>
);
};

export default EduOfficeDashboard;