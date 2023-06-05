import React from 'react';
import './UserRegistration.css';
import background from './background3.jpg';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';




const UserRegistration =() => {

    const initialValues = {name:"", email:"", username:"", password:"", confirmPassword:""}; //state variables
    const [formValues, setFormValues] = useState(initialValues);  //create the use state
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false); 

    //for the dropdown
    const [selectedValue, setSelectedValue] =  useState('') 
    const [inputFields, setInputFields] = useState([]);

    const handleDropdownChange = (e) => {
        setSelectedValue(e.target.value);
        if (e.target.value === '1') {
            setInputFields([...inputFields, { name: 'Class', value: '' }]);
           
        }   
        // if (selectedOption === '1') {
        //     setInputFields([{ name: 'class', value: '' }]);
        //   } else {
        //     setInputFields([]);
        //   }
        
        else if (e.target.value === '2') {
            setInputFields([...inputFields, { name: 'Subject', value: '' }]);
        }
        else if (e.target.value === '3') {
            setInputFields([...inputFields, { name: 'Grade', value: '' }]);
        }
    };

    const handleFieldChange = (e, index) => {
        const updatedFields = [...inputFields];
        updatedFields[index].value = e.target.value;
        setInputFields(updatedFields);
      };

      const renderInputFields = () => {
        return inputFields.map((field, index) => (
          <div key={index}>
            <FloatingLabel controlId={`floatingInput${index}`} label={field.name} className="mb-3">
              <Form.Control
                type="text"
                placeholder={field.name}
                value={field.value}
                onChange={(e) => handleFieldChange(e, index)}
              />
            </FloatingLabel>
          </div>
        ));
      };


  return (
    <Row sm={6} className='divRegistrationBackground' style={{backgroundImage:`url(${background})`, backgroundSize: 'cover',}}>
        <h1 id='h1CreateAccount'>Create New Account</h1>
        <Row sm={6} className='FormBackground'>
            <Col sm={6} >
            <Form className='FormRegistration'>
                <FloatingLabel
                     controlId="floatingInput"
                    label="Name"
                    className="mb-3 abc"
                 >
                <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <br />
                <FloatingLabel
                     controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                 >
                <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <br />
                <FloatingLabel
                     controlId="floatingInput"
                    label="Username"
                    className="mb-3"
                 >
                <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <br />
                <FloatingLabel
                     controlId="floatingInput"
                    label="Password"
                    className="mb-3"
                 >
                <Form.Control type="password" placeholder="name@example.com" />
                </FloatingLabel>
                <br />
                <FloatingLabel
                     controlId="floatingInput"
                    label="Confirm Password"
                    className="mb-3"
                 >
                <Form.Control type="password" placeholder="name@example.com" />
                </FloatingLabel>

                      
                </Form>
            </Col>
            <Col sm={6}>
                 <Form className='FormRegistration2'>
                 <FloatingLabel
                 controlId="floatingSelectGrid"
                 label="Select Your Role"
                 >
                <Form.Select aria-label="Floating label select example" onChange={handleDropdownChange}>
                    <option></option>
                    <option value="1">Class Teacher</option>
                    <option value="2">Subject Teacher</option>
                    <option value="3">Grade Head</option>
                    <option value="4">Sectional Head</option>
                    <option value="5">School Administrator</option>
                    <option value="6">Development Officer</option>
                    <option value="7">Planning Officer</option>
                </Form.Select>
                </FloatingLabel>
                <br />
                {renderInputFields()}
                
                
              <Button variant="primary" type="submit" className="customBtn">
                Submit
              </Button>
                      
                </Form>
            </Col>
        </Row>
    </Row>
    
    
  );
}

export default UserRegistration;