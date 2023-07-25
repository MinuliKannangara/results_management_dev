import {useState,useEffect, useContext} from 'react';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Container, Row, Col,FormLabel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';


const ManageSchoolUsers = () =>{

    const {authState} = useContext(AuthContext);
    const UserName = authState.username;
    const [userDetails, setUserDetails] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        axios
          .get(`http://localhost:3001/schoolUsers/${UserName}`)
          .then((response) => {
            setUserDetails(response.data.users);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

    return(
        <div>
            <NavBar PageName="Manage School Users" 
            showButtons={false}/>

            <Container fluid>
            <Row><p className='subTopicsP'></p></Row>
            <Row>
            <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Class Name</th>
                <th>Role</th>
                
              </tr>
            </thead>
            <tbody>
           
              {userDetails.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile_number}</td>
                  <td>{user.class_name}</td>
                  <td>{user.roles.length > 0 && user.roles[0].role_name}</td>
                  <td>  <Button
                    variant="outline-primary"
                    style={{ fontSize: "15px", marginLeft: "2px", marginRight: "2px" }}
                    onClick={() =>{ navigate(`/Edit Users/${user.username}`)}}
                    >
                    <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
              <Button variant="outline-primary" style={{ fontSize: "15px", marginLeft: "2px", marginRight:"2px" }}
              >
              <FontAwesomeIcon  icon={faTrash} />
              </Button>
              
              </td>
                </tr>
              ))}
          
      
            </tbody>
          </Table>
            </Row>

            </Container>
        </div>
    );

};

export default ManageSchoolUsers;