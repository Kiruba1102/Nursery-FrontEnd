import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import TopProductsSection from "./TopProductsSection";



const LandingPage = () => {
  return (
    <div className="container-fluid">
      <Header />
      <div className="row">
        <br/>
        <br/>
        <div className="col-md-6  d-flex align-item-center flex-column" sty>
          <p className="hero-subtitle">25% off all products.</p>
          <h2 className="h1 hero-title">
            Qualityful <span className="span">organic</span>
            plants&amp; <span className="span">seeds.</span>
          </h2>
          <p className="hero-text">
            It has survived not only five centuries also there leaped.
          </p>
          <center>
          <a href="/login" className="btn btn-primary" id="btn1">
            <span className="span">Shop Now</span>
            <ion-icon name="chevron-forward" aria-hidden="true" />
          </a>
          </center>
        </div>
        <div className="col-md-6 ">
          <img style={{borderRadius:"10px"}} src="./images/aa1.jpg"  width={603}
              height={634}
              loading="lazy"
              alt="plantz"
              className="w-100"  />
        </div>
      </div>
      <br></br>
      <TopProductsSection/>
      <Footer />
    </div>
  );
};

export default LandingPage;
