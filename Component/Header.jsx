import React, { useEffect, useState } from "react";


import * as Scroll from 'react-scroll';
import Swal from "sweetalert2";


let Link = Scroll.Link;



export const Header = () => {
  

  const [islogin, setislogin] = useState(sessionStorage.getItem("token"));
  
  const handleAlert =()=>{
    Swal.fire({
      title: "User?",
      text: " You Need to login?",
      icon: "question"
    });
    // window.location.href=("/login");
  }

    


  return (
    <header className="header" data-header="">
      <div className="nav-wrapper">
        <div className="container">
          <h1 className="h1">
            <a href="/" className="logo">
              Plant<span className="span p-1">Zo</span>
            </a>
          </h1>
          <button
            className="nav-open-btn"
            aria-label="Open Menu"
            data-nav-open-btn=""
          >
            <ion-icon name="menu-outline" />
          </button>
          <nav className="navbar" data-navbar="">
            <button
              className="nav-close-btn"
              aria-label="Close Menu"
              data-nav-close-btn=""
            >
              <ion-icon name="close-outline" />
            </button>
            <ul className="navbar-list">
              <li>
                <a href="/" className="navbar-link">
                  Home
                </a>
              </li>
              <li>
                <Link
                  activeClass="active"
                  className="navbar-link"
                  smooth="linear"
                  spy
                  to="contact"
                  offset={-30}
                >
                  About
                </Link>
              </li>
              <li>
              
                <button style={{color:"black"}} 
                 activeClass="active"
                 className="navbar-link"
                 smooth="linear"
                onClick={() => handleAlert()}>Shop</button>
              </li>
              <li>
              <a href="/login" className="navbar-link" >
                  Login
                </a>
              </li>
              
              <li>
                <Link
                  activeClass="active"
                  className="navbar-link"
                  smooth="linear"
                  spy
                  to="contact"
                  offset={-30}
                >
                  Products
                </Link>
              </li>
             
              <li>
                <Link
                  activeClass="active"
                  className="navbar-link"
                  smooth="linear"
                  spy
                  to="contact"
                  offset={-30}
                >
                  Contact
                </Link>
              </li>
              <li>
              <a href="/adlogin" className="navbar-link">
                 AdminLogin
                </a>
              </li>
            </ul>
          </nav>
          <div className="header-action">
            <div className="search-wrapper" data-search-wrapper="">
              <button
                className="header-action-btn"
                aria-label="Toggle search"
                data-search-btn=""
              >
                <ion-icon name="search-outline" className="search-icon" />
                {/* <ion-icon name="close-outline" className="close-icon" /> */}
              </button>
              <div className="input-wrapper">
                <input
                  type="search"
                  name="search"
                  placeholder="Search here"
                  className="search-input"
                />
                <button className="search-submit" aria-label="Submit search">
                  <ion-icon name="search-outline" />
                </button>
              </div>
            </div>
           
         
          </div>
        </div>
      </div>
    </header>
  );
};
