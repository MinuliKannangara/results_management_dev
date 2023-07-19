import React, { useState, useEffect } from 'react';
import './UserRegistration.css';
import background from './background3.jpg';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const UserRegistration = () => {

  //to get the selected role IDs of the checkboxes
  const [roleID, setRoleID] = useState([]);

  const initialValues = {
    name: '',
    email: '',
    mobileNumber: '',
    username: '',
    password: '',
    confirmPassword: '',
    schoolID:'',
    classes: '',
    role_ID: roleID,
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const[schoolOptions, setSchoolOptions] = useState([]);
  const [roleList, setRoleList] = useState([]);

  const formData = {
    ...formValues,
    role_ID: roleID, // Use the roleID state to send the checked role IDs
  };

  const classes = ["6-A", "6-B", "6-C", "6-D", "6-E", "6-F", "6-G", "6-H", "6-I", "7-A", "7-B", "7-C", "7-D", "7-E", "7-F", "7-G", "7-H", "7-I", "8-A", "8-B", "8-C", "8-D", "8-E", "8-F", "8-G", "8-H", "8-I", "9-A", "9-B", "9-C", "9-D", "9-E", "9-F", "9-G", "9-H", "9-I", "10-A", "10-B", "10-C", "10-D",
   "10-E", "10-F", "10-G", "10-H", "10-I", "11-A", "11-B", "11-C", "11-D", "11-E", "11-F", "11-G", "11-H", "11-I", "12-A", "12-B", "12-C", "12-D", "12-E", "12-F", "12-G", "12-H", "12-I", "13-A", "13-B", "13-C", "13-D", "13-E", "13-F", "13-G", "13-H", "13-I"]

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation here
    // ...

    // If form is valid, submit the data
    axios
      .post('http://localhost:3001/UserRegistration', formData)
      .then((response) => {
        // Reset form values
        setFormValues(initialValues);
        setRoleID([])
        // Display success message or perform other actions
        console.log('User registered successfully');
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  };

  useEffect(() => {
    axios
      .get('http://localhost:3001/schoolDetails')
      .then((response) => {
        const schools = response.data.map((school) => ({
          value: school.school_ID,
          label: school.school_name,
        }));
        setSchoolOptions(schools);
        // setSchool(schools[0].value);
      })
      .catch((error) => {
        console.error('Error fetching schools:', error);
      });
  
  axios
    .get('http://localhost:3001/UserRegistration/roleList')
    .then((response) => {
      const roleList = response.data.roleListForSchool;
      if (Array.isArray(roleList)) {
        const roles = roleList.map((role) => ({
          value: role.role_ID,
          label: role.role_name,
        }));
        setRoleList(roles);
        console.log(roles);
      } else {
        console.error('Role list is not an array');
      }
    })
    .catch((error) => {
      console.error('Error fetching roles:', error);
    });
  }, []);
  
   //for the check Boxes
   const handleChange = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setRoleID((prevRoles) => [...prevRoles, value]);
    } else {
      setRoleID((prevRoles) => prevRoles.filter((id) => id !== value));
    }
  };

  return (
    <Row sm={6} className='divRegistrationBackground' style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
      <h1 id='h1CreateAccount'>Create New Account</h1>

      <Row sm={6} className='FormBackground'>

        <Form onSubmit={handleSubmit}>
          <Col sm={6} className='FormRegistration'>
            <FloatingLabel controlId='floatingInput' label='Name' className='mb-3 abc'>
              <Form.Control type='text' placeholder='Enter your name' name='name' value={formValues.name} onChange={handleFieldChange} required />
            </FloatingLabel>
            
            <FloatingLabel controlId='floatingInput' label='Mobile Number' className='mb-3'>
              <Form.Control type='text' placeholder='Enter your email' name='mobileNumber' value={formValues.mobileNumber} onChange={handleFieldChange} required />
            </FloatingLabel>
            <FloatingLabel controlId='floatingInput' label='Email address' className='mb-3'>
              <Form.Control type='email' placeholder='Enter your email' name='email' value={formValues.email} onChange={handleFieldChange} required />
            </FloatingLabel>
            <FloatingLabel controlId='floatingInput' label='Username' className='mb-3'>
              <Form.Control type='text' placeholder='Enter your username' name='username' value={formValues.username} onChange={handleFieldChange} required />
            </FloatingLabel>
          
            <FloatingLabel controlId='floatingInput' label='Password' className='mb-3'>
              <Form.Control type='password' placeholder='Enter your password' name='password' value={formValues.password} onChange={handleFieldChange} required />
            </FloatingLabel>
        
            <FloatingLabel controlId='floatingInput' label='Confirm Password' className='mb-3'>
              <Form.Control type='password' placeholder='Confirm your password' name='confirmPassword' value={formValues.confirmPassword} onChange={handleFieldChange} required />
            </FloatingLabel>
          </Col>

          <Col sm={6} className='FormRegistration2'>

            <div>
              <p style={{fontSize:"17px", marginLeft:"0px"}}>Select Your Roles</p>
            {roleList.map((role, index) => (
  <div key={index}>
    <Form.Check
      type="checkbox"
      id={`checkbox-${role.value}`} 
      label={role.label} 
      value={role.value}
      onChange={handleChange}
 
    />
  </div>
))}
            </div>
            <br />
            {/* Render additional input fields based on the selected role */}

              <FloatingLabel controlId='floatingInput' label='Class' className='mb-3'>
                <Form.Select aria-label='Select your class' name='classes' value={formValues.classes} onChange={handleFieldChange}>
                  <option value=''>Select Class</option>
                  {classes.map((classValue, index) => (
                    <option key={index} value={classValue}>{classValue}</option>
                  ))}
                </Form.Select>
              </FloatingLabel>
         
              <FloatingLabel
                 controlId="floatingSelectGrid"
                 label="Select Your School"
                 >
                <Form.Select
                aria-label="Floating label select example"
                name="schoolID"
                value={formValues.schoolID}
                onChange={handleFieldChange}
              >
                <option disabled value="">Select School</option>
                {schoolOptions.map((school) => (
                  <option key={school.value} value={school.value}>
                    {school.label}
                  </option>
                ))}
                </Form.Select>
                </FloatingLabel>
            
            <Button variant='primary' type='submit' className='customBtn'>
              Submit
            </Button>

            <p className='PnewUser' style={{marginLeft:'18%'}}>
            Alreadey have an account? <a href="/login">Login here</a>
          </p>
          </Col>
        </Form>
      </Row>
    </Row>
  );
};

export default UserRegistration;
