import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import Table from "react-bootstrap/Table";
import PinnedSubheaderList from "../OtherComponents/StickyList";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./registerOfficeUser.css";
import Cards from "../OtherComponents/Cards";

const ManageEducationOfficeUsers = () => {
  //to get the selected role IDs of the checkboxes
  const [roleID, setRoleID] = useState([]);
  const initialValues = {
    name: "",
    email: "",
    mobileNumber: "",
    username: "",
    password: "",
    confirmPassword: "",
    role_ID: roleID,
  };

  //to send the form enterd values to the database
  const [formValues, setFormValues] = useState(initialValues);

  //to get the data from the database
  const [userDetails, setUserDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [roleList, setRoleList] = useState([]);
  const [grd6_9subjects, setGrd6_9subjects] = useState([]);
  const [olSubjects, setOlSubjects] = useState([]);
  const [alSubjects, setAlSubjects] = useState([]);


  

  let navigate = useNavigate();

  const formData = {
    ...formValues,
    role_ID: roleID, // Use the roleID state to send the checked role IDs
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };



  useEffect(() => {
    axios
      .get("http://localhost:3001/UserRegistration/roleList")
      .then((response) => {
        const roleList = response.data.roleListForOffice;
        if (Array.isArray(roleList)) {
          const roles = roleList.map((role) => ({
            value: role.role_ID,
            label: role.role_name,
          }));
          setRoleList(roles);
          console.log(roles);
        } else {
          console.error("Role list is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
      });

    axios
      .get("http://localhost:3001/EducationOfficeUsers")
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
      });

      axios
      .get("http://localhost:3001/subject/subjectLists")
      .then((response) => {
        const grd6_9subjectList = response.data.grd6_9subjectList;
        const olsubjectList = response.data.OLsubjectList;
        const alsubjectList = response.data.ALsubjectList;

        const grd6_9SubjectsArray = grd6_9subjectList.map((subject) => subject.subject);
        const olSubjectsArray = olsubjectList.map((subject) => subject.subject);
        const alSubjectsArray = alsubjectList.map((subject) => subject.subject);

        setGrd6_9subjects(grd6_9SubjectsArray);
        setOlSubjects(olSubjectsArray);
        setAlSubjects(alSubjectsArray);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
      });
  }, []);

   // fetch user details after adding a new user
   const fetchUserDetails = () => {
    axios
      .get("http://localhost:3001/EducationOfficeUsers")
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios
      .post("http://localhost:3001/UserRegistration", formData)
      .then((response) => {
        // Reset form values
        setFormValues(initialValues);
        setRoleID([]);
        fetchUserDetails();
        
        console.log("User registered successfully");
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };


  //for the check Boxes
  const handleChange = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setRoleID((prevRoles) => [...prevRoles, value]);
    } else {
      setRoleID((prevRoles) => prevRoles.filter((id) => id !== value));
    }
  };

  //for the modal
  const handleAddUser = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const AllUsersCount = userDetails.length;

  return (
    <div>
      <NavBar PageName="Manage Education Office Users" showButtons={false} />

      <Container fluid>
        <Row>
          <Col lg={3} md={3}>
            <Cards DisplayText="Total Users" count={AllUsersCount} />
          </Col>

          <Col lg={9} md={9}>
            <Container fluid>
              <Row>
                <Col lg={8} md={8} sm={12}>
                  <p className="subTopicsP">User Details</p>
                </Col>
                <Col lg={4} md={4} sm={12}>
                  <Button
                    variant="outline-primary"
                    style={{
                      fontSize: "15px",
                      marginLeft: "225px",
                      marginRight: "2px",
                      marginTop: "20px",
                    }}
                    onClick={handleAddUser}
                  >
                    Add user <FontAwesomeIcon icon={faUserPlus} />
                  </Button>
                </Col>
              </Row>
              <Row>
                <Table striped bordered hover variant="light">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile Number</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userDetails &&
                      userDetails.map((user, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.mobile_number}</td>
                          <td>
                            {user.roles.length > 0 && user.roles[0].role_name}
                          </td>
                          <td>
                            <Button
                              variant="outline-primary"
                              style={{
                                fontSize: "15px",
                                marginLeft: "2px",
                                marginRight: "2px",
                              }}
                              onClick={() => {
                                navigate(`/Edit Users/${user.username}`);
                              }}
                            >
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Registeration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form" onSubmit={handleSubmit}>
            <label>
              <input
                required=""
                placeholder=""
                type="text"
                className="input"
                name="name"
                value={formValues.name}
                onChange={handleFieldChange}
              />
              <span>Name</span>
            </label>
            <label>
              <input
                required=""
                placeholder=""
                type="text"
                className="input"
                name="email"
                value={formValues.email}
                onChange={handleFieldChange}
              />
              <span>Email</span>
            </label>

            <label>
              <input
                required=""
                placeholder=""
                type="text"
                className="input"
                name="mobileNumber"
                value={formValues.mobileNumber}
                onChange={handleFieldChange}
              />
              <span>Mobile Number</span>
            </label>
            <label>
              <input
                required=""
                placeholder=""
                type="password"
                className="input"
                name="username"
                value={formValues.username}
                onChange={handleFieldChange}
              />
              <span>Username</span>
            </label>

            <label>
              <input
                required=""
                placeholder=""
                type="password"
                className="input"
                name="password"
                value={formValues.password}
                onChange={handleFieldChange}
              />
              <span>Password</span>
            </label>
            <label>
              <input
                required=""
                placeholder=""
                type="password"
                className="input"
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={handleFieldChange}
              />
              <span>Confirm password</span>
            </label>
            <div>
              <p style={{ fontSize: "17px", marginLeft: "0px" }}>
                Select Your Roles
              </p>
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
            <button className="submit">Submit</button>
          </form>
        </Modal.Body>
      </Modal>

      

      <Container fluid>
        <Row>
          <Col lg={4} md={4}>
           <PinnedSubheaderList CategoryName="Grade 6-9 Subjects" listData={grd6_9subjects}/>
          </Col>

          <Col lg={4} md={4}>
          <PinnedSubheaderList CategoryName="O/L Subjects" listData={olSubjects}/>
          </Col>

          <Col lg={4} md={4}>
          <PinnedSubheaderList CategoryName="A/L Subjects" listData={alSubjects}/>
          </Col>
      </Row>
          
           
      </Container>
    </div>
  );
};

export default ManageEducationOfficeUsers;
