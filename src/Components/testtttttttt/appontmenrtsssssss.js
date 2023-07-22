import React, { useEffect, useState } from 'react';
import CollapsibleExample from '../../../Components/navibar/Navibar';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

function Appointments() {
  const [authState, setAuthState] = useState({
    role: '',
    username: '',
    status: false,
  });

  const [customerID, setCustomerID] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/usrpw/auth', {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          const userID = response.data.id;
          setAuthState({
            role: response.data.role,
            username: response.data.username,
            id: userID,
            status: true,
          });

          axios
            .get('http://localhost:3001/customers', {
              params: {
                userID: userID,
              },
            })
            .then((customerResponse) => {
              const customerData = customerResponse.data;
              const relevantCustomer = customerData.find((customer) => customer.userID === userID);
              if (relevantCustomer) {
                const customerID = relevantCustomer.CustomerID;
                setCustomerID(customerID);

                // Fetch the appointments for the relevant customer
                axios
                  .get(`http://localhost:3001/appt/gtapptCustomer/${customerID}`)
                  .then((appointmentsResponse) => {
                    setAppointments(appointmentsResponse.data);
                  })
                  .catch((error) => {
                    console.log('Error retrieving appointments:', error);
                  });
              } else {
                console.log('Customer not found for userID:', userID);
              }
            })
            .catch((error) => {
              console.log('Error retrieving customer details:', error);
            });
        }
      });
  }, []);

  console.log(customerID);

  return (
    <div>
      <CollapsibleExample propsForHome="Home" propsForServices="Services" propsForEvents="Events" />

      <div>
        <Table bordered hover variant="dark">
          <thead>
            <tr>
              <th>Appointment Context</th>
              <th>Date</th>
              <th>Time</th>
              <th>Service Provider</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.appointmentcontext}</td>
                <td>{appointment.appointmentdate}</td>
                <td>{appointment.appointmenttime}</td>
                <td>{appointment.ServiceproviderID}</td>
                <td>
                <Button
                    style={{
                      backgroundColor:
                        appointment.status === 'accepted'
                          ? 'blue'
                          : appointment.status === 'suggest'
                          ? 'orange'
                          : appointment.status === 'reject'
                          ? 'red'
                          : 'green',
                      borderColor: 'transparent',
                      width: '70%',
                    }}
                  >
                    {appointment.status === 'accepted'
                      ? 'Accepted'
                      : appointment.status === 'suggest'
                      ? 'Suggest'
                      : appointment.status === 'reject'
                      ? 'Reject'
                      : 'Pending'}
                  </Button>{' '}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Appointments;