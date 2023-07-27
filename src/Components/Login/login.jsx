import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import image from './bakgroundLogin2.jpg';
import logo from './logoForLogin2.png';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';


const LoginForm = () => {

  // const [athState, setAuth] = useState({
  //   username: "",
  //   id: 0,
  //   schoolID: 0,
  //   status: false,
  //   role:[],
  // });
  const styles = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const initialValues = { username: '', password: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const {setAuthState} = useContext(AuthContext);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    axios
      .post('http://localhost:3001/UserRegistration/login', formValues)
      .then((response) => {
          if(response.data.error) {
            alert(response.data.error);
          } else{
            localStorage.setItem('accessToken', response.data.token);
            setAuthState({username:response.data.username, id:response.data.id, schoolID:response.data.schoolId, status:true, role:response.data.roles, name:response.data.name});
           

            const roles = response.data.roles;
        if (roles.includes('School Admin')) {
          navigate('/School Dashboard'); 
        } else if (roles.includes('Subject Teacher')) {
          navigate('/School Dashboard');
        } else if (roles.includes('Class Teacher')) {
          navigate('/School Dashboard'); 
        } else if (roles.includes('Grade Head')) {
          navigate('/School Dashboard');
        } else if (roles.includes('Sectional Head')) {
          navigate('/School Dashboard');
        } else if (roles.includes('Development Officer')) {
          navigate('/Zonal Education Office Dashboard');
        }else if (roles.includes('Planning Officer')) {
          navigate('/Zonal Education Office Dashboard');
        } else if (roles.includes('System Admin')) {
          navigate('/Zonal Education Office Dashboard');
        }
        else {
          // If none of the roles match, you can handle it as needed.
          // For example, redirect to a default dashboard or show an error message.
          alert('Unknown role! Please contact the administrator.');
        }
            
          }
      
      })
      .catch((error) => {
        console.error('Error occurred during login', error);
      });
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Username is required!';
    }
    if (!values.password) {
      errors.password = 'Password is required!';
    }
    return errors;
  };

  return (
  
      <Row className="MainDiv" style={styles}>
        <Col sm={6} className="DivLeft">
          <div className="col-sm-6 divImage">
            <img src={logo} alt="react logo" />
          </div>
        </Col>
        <Col sm={6} className="DivRight">
          <h2>LOGIN</h2>
          <p style={{fontSize:"15px"}}>
            New User? <a href="/UserRegistration"> Create an account</a>{' '}
          </p>
          <Form className="formLogin" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
                value={formValues.username}
                onChange={handleChange}
              />
            </Form.Group>
            <p id="errorP">{formErrors.username}</p>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
              />
            </Form.Group>
            <p id="errorP">{formErrors.password}</p>
            <Button variant="primary" type="submit" className="customBtn">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
  
  );
};

export default LoginForm;
