import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';


const EditSchoolUser = () => {
  let { userName } = useParams();

  const {authState} = useContext(AuthContext);
  const adminRole = authState.role; //change the role based on the registration information
  const navigate = useNavigate();

  

  const classes = ["6-A", "6-B", "6-C", "6-D", "6-E", "6-F", "6-G", "6-H", "6-I", "7-A", "7-B", "7-C", "7-D", "7-E", "7-F", "7-G", "7-H", "7-I", "8-A", "8-B", "8-C", "8-D", "8-E", "8-F", "8-G", "8-H", "8-I", "9-A", "9-B", "9-C", "9-D", "9-E", "9-F", "9-G", "9-H", "9-I", "10-A", "10-B", "10-C", "10-D",
   "10-E", "10-F", "10-G", "10-H", "10-I", "11-A", "11-B", "11-C", "11-D", "11-E", "11-F", "11-G", "11-H", "11-I", "12-A", "12-B", "12-C", "12-D", "12-E", "12-F", "12-G", "12-H", "12-I", "13-A", "13-B", "13-C", "13-D", "13-E", "13-F", "13-G", "13-H", "13-I"]

   const showClassDropDown = (role) => {
    if(adminRole.includes('School Admin')){
      return (
        <div>
<Form.Group as={Col} controlId="formGridState">
              <Form.Label>Class Name</Form.Label>
              <Form.Select onChange={(e) => setClassName(e.target.value)}>
                {classes.map((className) => (
                  <option>{className}</option>
                ))}
              </Form.Select>
            </Form.Group>
        </div>
      );
    } 
  };


  //to set the data comming with the GET request
  const [userDetails, setUserDetails] = useState({});
  //const [classes, setClasses] = useState([]);
  const [roleforSchoolAdmin, setRoleForSchoolAdmin] = useState([]);
  const [roleforSystemAdmin, setRoleForSystemAdmin] = useState([]);
  

  //to set the form details
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [className, setClassName] = useState('');
  const [roleID, setRoleID] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');

  // To get the user ID of the user to send with the PUT request
  const userID = userDetails.user_ID;

  const updateUserDetails = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      mobile_number: mobileNumber,
      class_name: className,
      role_ID: roleID,
    };

    axios
      .put(`http://localhost:3001/schoolUsers/${userID}`, data)
      .then((response) => {
        setShowAlert(true);
        setAlertVariant('success');
      setAlertMessage('User Details updated successfully!');
        console.log(response.data);
      })
      .catch((error) => {
        setShowAlert(true);
        setAlertVariant('danger');
      setAlertMessage('Mobile number or email already exists');
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/schoolUsers/${userName}`)
      .then((response) => {
        setUserDetails(response.data.udpatedUser);
       // setClasses(response.data.classList);
        setRoleForSchoolAdmin(response.data.RolesForSchoolAdmin);
        setRoleForSystemAdmin(response.data.RolesForSystemAdmin);
        setName(response.data.udpatedUser.name);
        setEmail(response.data.udpatedUser.email);
        setMobileNumber(response.data.udpatedUser.mobile_number);
        setClassName(response.data.udpatedUser.class_name);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userName]);

  //for the check Boxes
  const handleChange = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setRoleID((prevRoles) => [...prevRoles, value]);
    } else {
      setRoleID((prevRoles) => prevRoles.filter((id) => id !== value));
    }
  };

  const onClickBack = () => {
    if (adminRole.includes('School Admin')) {
      navigate('/Manage School Users');
    } else if (adminRole.includes('System Admin')) {
      navigate('/Manage Education Office Users');
    }
  };
  const showCheckBox = (role) => {
    if (role.includes("School Admin")) {
      return (
        <div>
          {roleforSchoolAdmin.map((role, index) => (
            <div key={index}>
              <Form.Check
                type="checkbox"
                id={`default-checkbox-${role.role_ID}`}
                label={role.role_name}
                value={role.role_ID}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
      );
    } else if (role.includes("System Admin")) {
      return (
        <div>
          {roleforSystemAdmin.map((role, index) => (
            <div key={index}>
              <Form.Check
                type="checkbox"
                id={`default-checkbox-${role.role_ID}`}
                label={role.role_name}
                value={role.role_ID}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
      );
    }
  };

 

  return (
    <div>
        <Container style={{marginTop:"50px"}}>
            <h1>Edit User Details</h1>
        </Container>
      <Container>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            {/* <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Class Name</Form.Label>
              <Form.Select onChange={(e) => setClassName(e.target.value)}>
                {classes.map((className) => (
                  <option>{className}</option>
                ))}
              </Form.Select>
            </Form.Group> */}
            {showClassDropDown(adminRole)}
          </Row>
          <Row className="mb-3">
            <div>{showCheckBox(adminRole)}</div>
          </Row>
          <Button variant="primary" onClick={updateUserDetails}>
            Update
          </Button> <span> </span>
          <Button variant="primary" onClick={onClickBack}>
            Back
          </Button>
          {showAlert && (
  <Alert variant={alertVariant} className="mt-3">
    {alertMessage}
  </Alert>
)}
        </Form>
      </Container>
    </div>
  );
};

export default EditSchoolUser;
