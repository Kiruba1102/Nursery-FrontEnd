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
    cname: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = React.useState({});

  const { cname, password, email, confirmPassword, phone, address } = res;

  const handleInputChange = (e) => {
    setRes({ ...res, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let err = {};
    const phonePattern = /^\d{10}$/;

    if (!cname.trim()) {
      err.cname = "Name is required";
    }
    if (!email.trim()) {
      err.email = "Email is required";
    }
    if (!password.trim()) {
      err.password = "Password is required";
    }
    if (!phone.trim()) {
      err.phone = "Phone number is required";
    } else if (!phonePattern.test(phone.trim())) {
      err.phone = "Invalid phone number";
    }
    if (!address.trim()) {
      err.address = "Address is required";
    }
    return err;
  };

  const submieevent = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      alert("Please fix the errors in the form.");
      return;
    }

    try {
      await AdminService.Addregis(res);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Registered",
        timer: 1500,
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <MDBContainer fluid style={{ width: "35%" }}>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody>
          <form onSubmit={submieevent}>
            <MDBRow>
              <MDBCol md="10" lg="6">
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Sign up
                </p>

                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" style={{ padding: "10px" }} />
                  <MDBInput
                    placeholder="Enter Your Name"
                    id="form1"
                    type="text"
                    style={{ width: "300px" }}
                    className="w-200"
                    required
                    name="cname"
                    value={res.cname}
                    onChange={handleInputChange}
                  />
                  {errors.cname && <p>{errors.cname}</p>}
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" style={{ padding: "10px" }} />
                  <MDBInput
                    placeholder="Enter Your Email"
                    id="form2"
                    type="email"
                    style={{ width: "300px" }}
                    className="w-200"
                    name="email"
                    required
                    value={res.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && <p>{errors.email}</p>}
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" style={{ padding: "10px" }} />
                  <MDBInput
                    placeholder="Enter Your Password"
                    id="form3"
                    type="password"
                    style={{ width: "300px" }}
                    className="w-200"
                    name="password"
                    required
                    value={res.password}
                    onChange={handleInputChange}
                  />
                  {errors.password && <p>{errors.password}</p>}
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="key me-3" size="lg" style={{ padding: "10px" }} />
                  <MDBInput
                    placeholder="Confirm your password"
                    id="form4"
                    type="password"
                    required
                    style={{ width: "300px" }}
                    className="w-200"
                    name="confirmPassword"
                    value={res.confirmPassword}
                    onChange={handleInputChange}
                  />
                  {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="phone me-3" size="lg" style={{ padding: "10px" }} />
                  <MDBInput
                    placeholder="Enter Phone number"
                    id="form4"
                    type="number"
                    style={{ width: "300px" }}
                    className="w-200 custom-textfield"
                    name="phone"
                    required
                    value={res.phone}
                    onChange={handleInputChange}
                  />
                  {errors.phone && <p>{errors.phone}</p>}
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="home me-3" size="lg" style={{ padding: "10px" }} />
                  <MDBInput
                    placeholder="Enter Address"
                    id="form4"
                    type="text"
                    style={{ width: "300px" }}
                    className="w-200"
                    name="address"
                    required
                    value={res.address}
                    onChange={handleInputChange}
                  />
                  {errors.address && <p>{errors.address}</p>}
                </div>

                <button className="btn btn-primary mx-auto" size="md" type="submit">
                  Register
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
