import React from 'react';
import './UserRegistration.css';
import background from './background3.jpg';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import axios, { Axios } from 'axios';




const UserRegistration =() => {

    const initialValues = {name:"", email:"", username:"", password:"", confirmPassword:""}; //state variables
    const [formValues, setFormValues] = useState(initialValues);  //create the use state
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false); 

    //for the role dropdown
    const [selectedValue,setSelectedRole] =  useState('') 
    const [inputFields, setInputFields] = useState([]);

    //for the school dropdown
    const[selectedSchool, setSelectedSchool] = useState(null);
    const[schoolOptions, setSchoolOptions] = useState([]);

    //fetch schools from the database
    useEffect(() => {
      axios.get('http://localhost:3001/schoolDetails').then(response =>{
        const schools = response.data.map(school =>({
          value: school.school_ID,
          label: school.school_name
        }));
        setSchoolOptions(schools);
        setSchool(schools[0].value);
        
      })
      .catch(error =>{
        console.error('Error fetching schools:', error);
      });
    }, []);

    //handle selected item in the school dropdown
    const handleSchoolChange = (selectedOption) => {
      const selectedSchoolValue = selectedOption ? selectedOption.value : null;
      setSelectedSchool(selectedSchoolValue);
      //setSchool(selectedSchoolValue);
    };

    //handle selected item in the role dropdown
    const handleDropdownChange = (e) => {
       setSelectedRole(e.target.value);
        if (e.target.value === '1') {
            setInputFields([...inputFields, { name: 'Class', value: '' }]);
           
        }   
        
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


      //handle Submit

      const[name, setName] = useState('');
      const[email, setEmail] = useState('');
      const[mobile_number, setMobileNumber] = useState('');
      const[username,setUsername] = useState('');
      const[password, setPassword] = useState('');
      const[SchoolID, setSchool] = useState('');
      const submitRegistration = (e) =>{
        //e.preventDefault();
        const data = {
          name: name,
          email:email,
          mobile_number:mobile_number,
          username:username,
          password:password,
          school_ID:SchoolID,
        };
console.log(data);
        axios.post('http://localhost:3001/UserRegistration', data).then(response =>{

        //if success, reset the state variable values to empty
          setName("");
          setEmail("");
          setMobileNumber("");
          setUsername("");
          setPassword("");
          setSchool("");

        })
        .catch((error) => {
          console.log('Error creating user:', error);
        });

      };

  return (
    <Row sm={6} className='divRegistrationBackground' style={{backgroundImage:`url(${background})`, backgroundSize: 'cover',}}>
        <h1 id='h1CreateAccount'>Create New Account</h1>
        <Row sm={6} className='FormBackground'>
            
            <Form onSubmit={submitRegistration}>
            <Col sm={6} className='FormRegistration' >
            
            <FloatingLabel
                     controlId="floatingInput"
                    label="Name"
                    className="mb-3 abc"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                 >
                <Form.Control type="text" placeholder="name@example.com" />
                </FloatingLabel>
                <br />
                <FloatingLabel
                     controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                 >
                <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingInput"
                    label="Mobile Number"
                    className="mb-3 abc"
                    value={mobile_number}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                 >
                <Form.Control type="text" placeholder="name@example.com" />
                </FloatingLabel>
                <br />
                <FloatingLabel
                     controlId="floatingInput"
                    label="Username"
                    className="mb-3"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                 >
                <Form.Control type="text" placeholder="name@example.com" />
                </FloatingLabel>
                <br />
                <FloatingLabel
                     controlId="floatingInput"
                    label="Password"
                    className="mb-3"
                    value={password}
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
            
            </Col>  

          
            
            <Col sm={6} className='FormRegistration2'>
            <FloatingLabel
                 controlId="floatingSelectGrid"
                 label="Select Your Role"
                 >
                <Form.Select aria-label="Floating label select example" onChange={handleDropdownChange}>
                    
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

               

                {/* select school */}
                <FloatingLabel
                 controlId="floatingSelectGrid"
                 label="Select Your School"
                 >
                <Form.Select
                aria-label="Floating label select example"
                onChange={handleSchoolChange}
                value={selectedSchool}
              >
                <option value="">Select School</option>
                {schoolOptions.map((school) => (
                  <option key={school.value} value={school.value}>
                    {school.label}
                  </option>
                ))}
                </Form.Select>
                </FloatingLabel>
    
              <Button variant="primary" type="submit" className="customBtn">
                Submit
              </Button>
     
            </Col>     
            </Form>
           
           
        </Row>
    </Row>
    
    
  );
}

export default UserRegistration;





                
               