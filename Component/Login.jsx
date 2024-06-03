import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminService from "../Services/AdminService";
import Swal from "sweetalert2";

export default function Login() {
  const [res, setRes] = useState({
    cname: "",
    cid: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setRes({...res, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!res.email || !res.password) {
      alert("Please enter email and password.");
      return;
    }
    if (!validateEmail(res.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    AdminService.GetUser(res.cname)
      .then((response) => {
          let userFound = false;
          for (let i = 0; i < response.data.length; i++) {
            const user = response.data[i];
            if (user.email === res.email && user.password === res.password) {
              userFound = true;
              console.log("User found:", user);
              console.log(user.cid);
              sessionStorage.setItem("cid", user.cid);
              sessionStorage.setItem("email", user.email);
              sessionStorage.setItem("cname", user.cname);
              Swal.fire({
                position: "top",
                icon: "success",
                title: "Successfully Logged in",
                
                timer: 1500,
              });
              setTimeout(()=>{
                window.location.href = "/home";
              },1000)
             
              break;
            } else{
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Enter valid details",
                showConfirmButton: false,
                timer: 1500
              });
            
          }
         
          }
        //   if (!userFound) {
        //     alert("No user found with the provided email and password.");
        //   }
        })
      // .catch(() => alert("Server error"));
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  

  return (
    <div
      style={{
        backgroundColor: "#fff",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <section
        
      >
        
        <div
          className="container py-5 h-100"
          style={{
            // maxWidth: "800px", 
            // margin: "20px 20px",
            // padding: "30px",
            // borderRadius: "10px",
            // boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        ><h1>
        <center style={{padding:"10px",marginLeft:"23%"}}> Login page</center>
        
      </h1>
          <div
            // className="row d-flex align-items-center justify-content-center h-100"
            style={{ borderRadius: "200px",width:"110%" }}
          >
            <div
              className="col-md-17  offset-lg-1 border border-6 p-6 mb-5" 
              style={{
                padding: "40px", 
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <form onSubmit={handleSubmit} id="border">
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form1Example13">
                     User Email
                  </label>

                  <input
                    type="email"
                    placeholder=" Enter valid email"
                    className="form-control form-control-lg"
                    name="email"
                    style={{width:"105%"}}
                    value={res.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form1Example23">
                    Password
                  </label>

                  <input
                    type="password"
                    placeholder=" Enter password"
                    required
                    className="form-control form-control-lg"
                    name="password"
                    style={{width:"105%"}}
                    value={res.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="d-flex justify-content-around align-items-center mb-4">
                 

                  <p className="message">
                    <b>Not registered?</b>{" "}
                    <Link to="/regs">
                      <a>Create an account</a>
                    </Link>
                  </p>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-md mx-auto fs-4 btn-block m-1"
                  style={{
                    backgroundColor: "#34C759",
                    borderColor: "#34C759",
                    color: "#fff",
                  }}
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
          </div>
      </section>
    </div>
  );
}