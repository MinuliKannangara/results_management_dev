
import ButtonAppBar from '../NavBar/NavBar';
import './ManageStudentDetails.css';
import { Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

import axios, { Axios } from 'axios';


const ManageStudentDetails = () => {

   

return (
<div>
<ButtonAppBar PageName="Manage Class Results" />

<Container fluid className='div_aca_yr '>
        <Row>
         <p className='p_rslt_sheet'>Results Sheet</p>
        </Row>
      </Container>

<Container fluid className='div_aca_yr divAddStudentTable'>
        <Row className='TableRoWUp'>

          <Col md={3} sm={6}>
            <p className='pAddStudent'>Total Subjects</p>
          </Col>
          <Col md={9} sm={6}>
            <form action="">
              <input type="text"
               />
            </form>
            
          </Col>

        </Row>
        <Row className='TableRoWDown'>
        
            <Table striped bordered hover variant="light">
      <thead>
        <tr>
          <th>#</th>
          <th>Index Number</th>
          <th>Name</th>
      
        </tr>
      </thead>
      <tbody>

      <td>vd</td>
                <td>vd</td>
                <td>vd</td>
        {/* {
          listOfStudents.map((index, student) =>{
            return <tr >
               
              <td>{index.index_number}</td>
              <td>{index.index_number}</td>
              <td>{index.student_name}</td>
            </tr>
          })
        } */}
   
       
      </tbody>
    </Table>
           
        </Row>
      </Container>

</div>
);
};

export default ManageStudentDetails;