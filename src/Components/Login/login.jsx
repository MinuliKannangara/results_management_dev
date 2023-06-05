import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import image from './bakgroundLogin2.jpg';
import logo from './logoForLogin2.png';
import './Login.css';
import { useState, useEffect } from 'react';

const LoginForm = () => {
  const styles = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const initialValues = {username:"", password:""}; //state variables
  const [formValues, setFormValues] = useState(initialValues);  //create the use state
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);  //flag for the submit

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValues({...formValues,[name]:value});
    console.log(formValues);
  };

  const handleSubmit = (e) =>{
    // to prevent page getting refresh
    e.preventDefault(); 
    // pass the form values when submit the form.
    setFormErrors(validate(formValues)); // set the outputs of the validate function in the formErrors object.
    setIsSubmit(true); // when click the submit button, set flag to true
  };

   // validate function
   useEffect(()=>{
    console.log(formErrors);
     if(Object.keys(formErrors).length === 0 && isSubmit){
        console.log(formValues);
        console.log(formValues);

     }

   },[formErrors])
   const validate = (values) =>{
     const errors = {}; //initial object
     if (!values.username){
        errors.username = "Username is required!";
     }
     if (!values.password){
        errors.password = "Password is required!";
     }
     return errors;



   }
  return (
    
    //   <Container >
        <Row className="MainDiv" style={styles}>
          <Col sm={6} className="DivLeft">
            <div className="col-sm-6 divImage">
                 <img src={logo} alt="react logo"/>
            </div>
        
          </Col>
          <Col sm={6} className="DivRight">
            <h2>LOGIN</h2>
            <p>
              New User? <a href="/UserRegistration"> Create an account</a>{' '}
            </p>
            <Form className="form" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Control 
                type="text" 
                name='username'
                placeholder="Username" 
                value={formValues.username} 
                onChange={handleChange} 
                />
              </Form.Group>
              
              <p id='errorP'>{formErrors.username}</p>
              <Form.Group className="mb-3" controlId="formBasicPassword">
              {/* Add valuse to link with the inputs with the use state */}
                <Form.Control 
                 type="password"
                 name='password'
                 placeholder="Password"
                 value={formValues.password}
                 onChange={handleChange} 
                 /> 
              </Form.Group>
              <p id='errorP'>{formErrors.password}</p>

              <Button variant="primary" type="submit" className="customBtn">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
    //   </Container>

  );
};

export default LoginForm;
