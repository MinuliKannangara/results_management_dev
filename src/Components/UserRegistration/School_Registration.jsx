import React, { useState, useEffect } from 'react';
import './UserRegistration.css';
import background from './background3.jpg';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

const SchoolRegistration = () => {
  const initialValues = {
    school_name: '',
    confirm_school_name: '',
    division: '',
    type: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  //for the alerts
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation here
    // ...

    // Check if school name and confirmed school name match
    if (formValues.school_name === formValues.confirm_school_name) {
      // If they match, update the school name in the formValues state
      setFormValues((prevValues) => ({
        ...prevValues,
        school_name: formValues.school_name,
      }));
      setErrorMessage('');

      // Submit the data
      axios
        .post('http://localhost:3001/schoolDetails', formValues)
        .then((response) => {
          // Reset form values
          setFormValues(initialValues);
          //display success alert
          setShowAlert(true);
        setAlertVariant('success');
        setAlertMessage('School account created successfully!');
        })
        .catch((error) => {
          setShowAlert(true);
          setAlertVariant('danger');
          setAlertMessage('School account creation failed!');
          console.error('Error creating user:', error);
        });
    } else {
      // If school name and confirmed school name do not match, display an error message
      setErrorMessage('School name and confirmed school name do not match');
    }
  };

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:3001/schoolDetails')
  //     .then((response) => {
  //       const schools = response.data.map((school) => ({
  //         value: school.school_ID,
  //         label: school.school_name,
  //       }));
  //       setSchoolOptions(schools);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching schools:', error);
  //     });
  // }, []);

  return (
    <Row sm={6} className='divRegistrationBackground' style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
      <h1 id='h1CreateAccount'>Create School Account</h1>

      <Row sm={6} className='FormBackground'>
        <Form onSubmit={handleSubmit}>
          <Col className='schoolRegistration'>

            {showAlert && (
  <Alert variant={alertVariant} className="mt-3">
    {alertMessage}
  </Alert>)}

            <FloatingLabel controlId='floatingInput' label='School Name' className='mb-3 abc'>
              <Form.Control type='text' placeholder='School Name' name='school_name' value={formValues.school_name} onChange={handleFieldChange} required />
            </FloatingLabel>
            <br />
            <FloatingLabel controlId='floatingInput' label='Confirm School Name' className='mb-3 abc'>
              <Form.Control type='text' placeholder='Confirm School Name' name='confirm_school_name' value={formValues.confirm_school_name} onChange={handleFieldChange} required />
            </FloatingLabel>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <br />
            <FloatingLabel controlId='floatingSelectGrid' label='Division'>
              <Form.Select aria-label='Select Division' name='division' value={formValues.division} onChange={handleFieldChange} required >
                <option disabled value=''>Select Division</option>
                <option value='Minuwangoda'>Minuwangoda</option>
                <option value='Divulapitiya'>Divulapitiya</option>
                <option value='Meerigama'>Meerigama</option>
              </Form.Select>
            </FloatingLabel>
            <br />
            <FloatingLabel controlId='floatingSelectGrid' label='Type of the School'>
              <Form.Select aria-label='Select Type' name='type' value={formValues.type} onChange={handleFieldChange} required >
                <option disabled value=''>Select Type of the School</option>
                <option value='Type 1AB'>Type 1AB</option>
                <option value='Type 1C'>Type 1C</option>
                <option value='Type 2'>Type 2</option>
                <option value='Type 3'>Type 3</option>
              </Form.Select>
            </FloatingLabel>
            <br />
            <Button variant='primary' type='submit' className='customBtn'>
              Submit
            </Button>

            <p className='PnewUser'>
            New User? <a href="/UserRegistration"> Create an account</a>
          </p>
          </Col>
        </Form>
      </Row>
    </Row>
  );
};

export default SchoolRegistration;
