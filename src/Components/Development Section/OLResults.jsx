import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';
import { Dropdown } from 'react-bootstrap';
import './OLResults.css';
import axios, { Axios } from 'axios';
import DivisionWiseTable from '../Charts/DivWiseTable';
import DropdownButtonForAll from '../OtherComponents/Dropdown';
import SubjectWiseTable from '../Charts/SubjectWiseTable';
import SubjectWiseAnalysisOL from './SubjectWiseOL';

const OLResults = () => {
  const currentYear = new Date().getFullYear();

  const [meerigamaCountYear1, setMeerigamaCountYear1] = useState(0);
  const [meerigamaCountYear2, setMeerigamaCountYear2] = useState(0);
  const [meerigamaCountYear3, setMeerigamaCountYear3] = useState(0);
  const [meerigamaCountYear4, setMeerigamaCountYear4] = useState(0);
  const [meerigamaCountYear5, setMeerigamaCountYear5] = useState(0);

  const [minuwangodaCountYear1, setMinuwangodaCountYear1] = useState(0);
  const [minuwangodaCountYear2, setMinuwangodaCountYear2] = useState(0);
  const [minuwangodaCountYear3, setMinuwangodaCountYear3] = useState(0);
  const [minuwangodaCountYear4, setMinuwangodaCountYear4] = useState(0);
  const [minuwangodaCountYear5, setMinuwangodaCountYear5] = useState(0);

 

  const [divulapitiyaCountYear1, setDivulapitiyaCountYear1] = useState(0);
  const [divulapitiyaCountYear2, setDivulapitiyaCountYear2] = useState(0);
  const [divulapitiyaCountYear3, setDivulapitiyaCountYear3] = useState(0);
  const [divulapitiyaCountYear4, setDivulapitiyaCountYear4] = useState(0);
  const [divulapitiyaCountYear5, setDivulapitiyaCountYear5] = useState(0);
 
  const [meerigamaPassedYear1, setMeerigamaPassedYear1] = useState(0);
  const [meerigamaPassedYear2, setMeerigamaPassedYear2] = useState(0);
  const [meerigamaPassedYear3, setMeerigamaPassedYear3] = useState(0);
  const [meerigamaPassedYear4, setMeerigamaPassedYear4] = useState(0);
  const [meerigamaPassedYear5, setMeerigamaPassedYear5] = useState(0);

  const[divulapitiyaPassedYear1, setDivulapitiyaPassedYear1] = useState(0);
  const[divulapitiyaPassedYear2, setDivulapitiyaPassedYear2] = useState(0);
  const[divulapitiyaPassedYear3, setDivulapitiyaPassedYear3] = useState(0);
  const[divulapitiyaPassedYear4, setDivulapitiyaPassedYear4] = useState(0);
  const[divulapitiyaPassedYear5, setDivulapitiyaPassedYear5] = useState(0);

  const[minuwangodaPassedYear1, setMinuwangodaPassedYear1] = useState(0);
  const[minuwangodaPassedYear2, setMinuwangodaPassedYear2] = useState(0);
  const[minuwangodaPassedYear3, setMinuwangodaPassedYear3] = useState(0);
  const[minuwangodaPassedYear4, setMinuwangodaPassedYear4] = useState(0);
  const[minuwangodaPassedYear5, setMinuwangodaPassedYear5] = useState(0);

  
useEffect(() => {
  fetchDataForYear(currentYear, setMeerigamaCountYear1,  setDivulapitiyaCountYear1, setMinuwangodaCountYear1,setMeerigamaPassedYear1, setDivulapitiyaPassedYear1, setMinuwangodaPassedYear1 );
  fetchDataForYear(currentYear-1, setMeerigamaCountYear2,  setDivulapitiyaCountYear2, setMinuwangodaCountYear2,setMeerigamaPassedYear2, setDivulapitiyaPassedYear2, setMinuwangodaPassedYear2 );
  fetchDataForYear(currentYear-2, setMeerigamaCountYear3,  setDivulapitiyaCountYear3, setMinuwangodaCountYear3,setMeerigamaPassedYear3, setDivulapitiyaPassedYear3, setMinuwangodaPassedYear3 );
  fetchDataForYear(currentYear-3, setMeerigamaCountYear4,  setDivulapitiyaCountYear4, setMinuwangodaCountYear4,setMeerigamaPassedYear4, setDivulapitiyaPassedYear4, setMinuwangodaPassedYear4 );
  fetchDataForYear(currentYear-4, setMeerigamaCountYear5,  setDivulapitiyaCountYear5, setMinuwangodaCountYear5,setMeerigamaPassedYear5, setDivulapitiyaPassedYear5, setMinuwangodaPassedYear5 );
 
}, []);
  

  const fetchDataForYear = (year, setDataMeerigama, setDataDivulapitiya, setDataMinuangoda, setDataMeerigamaPass, setDataDivulapitiyaPass, setDataMinuwangodaPass) => {
    fetch(`http://localhost:3001/NationalExaminationDetails/NationalExaminationResults/${year}`)
      .then((res) => res.json())
      .then((data) => {
        setDataMeerigama(data.meerigama);
        setDataDivulapitiya(data.divulapitiya);
        setDataMinuangoda(data.minuwangoda);
        setDataMeerigamaPass(data.meerigamaPassed);
        setDataDivulapitiyaPass(data.divulapitiyaPassed);
        setDataMinuwangodaPass(data.minuwangodaPassed);
        
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


return (
<div>

<NavBar
PageName="O/L Results Analysis" 
Tab1="Division Wise Analysis" 
Tab2="Subject Wise Analysis" 
Tab1Link="http://localhost:3000/Manage Student Details"
Tab2Link="http://localhost:3000/Manage Student Details"
/>



{/* <Container fluid className='divAllDropdown ' style={{backgroundColor:'white'}}>
        <Row>
          <Col md={3} sm={6}>
            <p className='pLables'>Academic Year</p>
          </Col>
          <Col md={3} sm={6}>
            <DropdownButtonForAll 
            year1={currentYear}
            year2={currentYear-1}
            year3={currentYear-2}
            year4={currentYear-3}
            year5={currentYear-4}
            year6={currentYear-5}
            />
            
          </Col>
        
        </Row>
      


</Container > */}
      <Container fluid>
            <Row><h3 className='topicsP'>Division Wise Analysis</h3></Row>
      </Container>

      <Container fluid>
            <Row>
                  <Col lg={6} md={8} sm={6} className='divColumns'>
                    <h3 className='tableTopicH3'>{currentYear}</h3>
                    <DivisionWiseTable 
                    minuwangoda={minuwangodaCountYear1} 
                    meerigama={meerigamaCountYear1} 
                    divulapitiya = {divulapitiyaCountYear1} 
                    meerigamaPassCount={meerigamaPassedYear1}
                    minuangodaPassCount={minuwangodaPassedYear1}
                    divulapitiyaPassCount={divulapitiyaPassedYear1}
                    />

                  </Col>
                  <Col lg={6} md={8} sm={6} className='divColumns'>

              
              
                  </Col>
                 
            </Row>

            <Row>
                  <Col lg={6} md={8} sm={6} className='divColumns'>
                    <h3 className='tableTopicH3'>{currentYear-1}</h3>
                    <DivisionWiseTable 
                    minuwangoda={minuwangodaCountYear2} 
                    meerigama={meerigamaCountYear2} 
                    divulapitiya = {divulapitiyaCountYear2} 
                    meerigamaPassCount={meerigamaPassedYear2}
                    minuangodaPassCount={minuwangodaPassedYear2}
                    divulapitiyaPassCount={divulapitiyaPassedYear2}
                    />

                  </Col>
                  <Col lg={6} md={8} sm={6} className='divColumns'>

              
              
                  </Col>
                 
            </Row>

            <Row>
                  <Col lg={6} md={8} sm={6} className='divColumns'>
                    <h3 className='tableTopicH3'>{currentYear-2}</h3>
                    <DivisionWiseTable 
                    minuwangoda={minuwangodaCountYear3} 
                    meerigama={meerigamaCountYear3} 
                    divulapitiya = {divulapitiyaCountYear3} 
                    meerigamaPassCount={meerigamaPassedYear3}
                    minuangodaPassCount={minuwangodaPassedYear3}
                    divulapitiyaPassCount={divulapitiyaPassedYear3}
                    />

                  </Col>
                  <Col lg={6} md={8} sm={6} className='divColumns'>

              
              
                  </Col>
                 
            </Row>

            <Row>
                  <Col lg={6} md={8} sm={6} className='divColumns'>
                    <h3 className='tableTopicH3'>{currentYear-4}</h3>
                    <DivisionWiseTable 
                    minuwangoda={minuwangodaCountYear4} 
                    meerigama={meerigamaCountYear4} 
                    divulapitiya = {divulapitiyaCountYear4} 
                    meerigamaPassCount={meerigamaPassedYear4}
                    minuangodaPassCount={minuwangodaPassedYear4}
                    divulapitiyaPassCount={divulapitiyaPassedYear4}
                    />

                  </Col>
                  <Col lg={6} md={8} sm={6} className='divColumns'>

              
              
                  </Col>
                 
            </Row>

            <Row>
                  <Col lg={6} md={8} sm={6} className='divColumns'>
                    <h3 className='tableTopicH3'>{currentYear-5}</h3>
                    <DivisionWiseTable 
                    minuwangoda={minuwangodaCountYear5} 
                    meerigama={meerigamaCountYear5} 
                    divulapitiya = {divulapitiyaCountYear5} 
                    meerigamaPassCount={meerigamaPassedYear5}
                    minuangodaPassCount={minuwangodaPassedYear5}
                    divulapitiyaPassCount={divulapitiyaPassedYear5}
                    />

                  </Col>
                  <Col lg={6} md={8} sm={6} className='divColumns'>

              
              
                  </Col>
                 
            </Row>
      </Container>

      <Container fluid>
        <SubjectWiseAnalysisOL/>
      </Container>



    

</div>
);
};

export default OLResults;