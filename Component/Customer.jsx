import React, { useEffect, useState } from "react";
import axios from "axios";
import { Backdrop, Box, Fade, Modal, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "0.25em",
  bgcolor: "background.paper",
  border: "2px solid gray",
  boxShadow: 24,
  p: 4,
};

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

 
  const [cname, setCname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/customers/add",
        {
          cname,
          email,
          address,
          phone,
        }
      );
      console.log(response.data);
      alert("Customer added Successfully");
      window.location.reload();
      setModalIsOpen(false); // Close the modal after successful submission
      fetchCustomers(); // Fetch customers again to update the table
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/customers/get");
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleModal = () => {
    setModalIsOpen(true);
  };

  const handleFindClose = () => {
    setModalIsOpen(false);
  };

//   const handleDelete = async (customerId) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/customers/delete/${customerId}`);
//       alert("Customer deleted Successfully");
//       fetchCustomers(); // Fetch customers again to update the table
//     } catch (error) {
//       console.error(error);
//     }
//   };

  return (
    <div className="container">
      <br />
      {/* Insert New Customer to the database */}
      <Modal
        open={modalIsOpen}
        onClose={handleFindClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalIsOpen}>
          <Box sx={{ ...style, width: "90%", maxWidth: "500px" }} className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title" id="transition-modal-title">Add Customer</h5>
                <button type="button" className="btn-close" onClick={handleFindClose}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <TextField
                    autoFocus
                    type="text"
                    margin="normal"
                    required
                    fullWidth
                    label="Customer Name"
                    value={cname}
                    onChange={(event) => setCname(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <TextField
                    autoFocus
                    type="email"
                    margin="normal"
                    required
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <TextField
                    autoFocus
                    margin="normal"
                    required
                    fullWidth
                    label="Address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <TextField
                    autoFocus
                    type="tel"
                    margin="normal"
                    required
                    fullWidth
                    label="Phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleFindClose}>Close</button>
                <button type="submit" className="btn btn-primary">Add Customer</button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>

      <div>
        {/* <button onClick={handleModal} className="btn btn-succcess">Add Customer</button> */}
        <br />
        <br />
        <table className="table table-bordered table table-hover ">
          <thead  className="thead-dark">
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              {/* <th>Delete</th> */}
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.cid}>
                <td>{customer.cid}</td>
                <td>{customer.cname}</td>
                <td>{customer.email}</td>
                <td>{customer.address}</td>
                <td>{customer.phone}</td>
                {/* <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(customer.cid)}>Delete</button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customer;
