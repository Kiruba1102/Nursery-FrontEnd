import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import AdminService from "../Services/AdminService";
import Swal from "sweetalert2";

function Registers() {
  const [res, setRes] = React.useState({
    adminName: "",
    password: "",
    email: "",
  });
  const { adminName, password, email } = res;
  const handleInputChange = (e) => {
    setRes({...res, [e.target.name]: e.target.value });
  };
  const submieevent = async (e) => {
    e.preventDefault();
    if (!adminName ||!password ) {
      alert("Please Fill All Field");
    } else if (
      (adminName === "Admin") &&
      (password === "admin@123") 
    ) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Successfully Logged By Admin",
        
        timer: 1500,
      });
      setTimeout(()=>{
        window.location.href = "/adashboard";
      },1000)
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <MDBContainer fluid  style={{  width: "34%" ,marginTop:"9%"}}>
      <MDBCard className="text-black m-5 mt-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody>
          <form onSubmit={submieevent}>
            <MDBRow>
              <MDBCol
                md="10"
                lg="6"
                
              >
                <p className="text-center h1 fw-bold mb-5 mx-auto  mt-4">
                  Admin Login
                </p>

                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" style={{ padding: "10px" }} />
                  <MDBInput
                    placeholder="Enter Admin Name"
                    id="form1"
                    type="text"
                    style={{width:"300px"}}
                    required
                    className="w-200"
                    name="adminName"
                    value={res.adminName}
                    onChange={handleInputChange}
                  />
                </div>

                

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" style={{ padding: "10px" }} />
                  <MDBInput
                    placeholder="Enter Your Password"
                    id="form3"
                    type="password"
                    required
                    className="w-200"
                    style={{width:"300px"}}
                    name="password"
                    value={res.password}
                    onChange={handleInputChange}
                  />
                </div>

                <button className="btn btn-primary mx-auto " size="md" type="submit">
                  Login
                </button>
              </MDBCol>
            </MDBRow>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Registers;