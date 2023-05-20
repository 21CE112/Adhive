import React from 'react';
import './Booking.css';
import logo from "../../../public/images/logo/logo.png";
import { useHistory } from 'react-router-dom';
const Booking = () => {
  const history = useHistory();
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("redirected to booking1");
        history.push("/app/components/Forms/Booking1")
    }
    const handleclick = (event)=>{
        event.preventDefault();
            console.log("redirect to landingpage");
          history.push("/app")
          };
          
    return (
    <div className="con1">
      <div className="content">
        <div className="container">
          {/* <div className="headerfeild"> */}
          <img src={logo} style={{width: 30 }}/>
         <button class="no" onClick={handleclick}><header>AdHive</header></button> 
          {/* </div> */}
          <h1 className="head">Advertise Registration</h1>
          <form action="#">
            <div className="form first">
              <div className="details personal">
                <span className="title">Company Details</span>
                <div className="fields">
                  <div className="input-field-type1">
                    <label>Company Name</label>
                    <input type="text" placeholder="Enter Company Name" required />
                  </div>
                  <div className="input-field-type1">
                    <label>Company Owner Name</label>
                    <input type="text" placeholder="Enter owner name" required />
                  </div>
                  <div className="input-field-type1">
                    <label>Company Email</label>
                    <input type="text" placeholder="Enter Company email" required />
                  </div>
                  <div className="input-field-type1">
                    <label>Company Contact Number</label>
                    <input type="text" placeholder="Enter contact number" required />
                  </div>
                  <div className="input-field-type1">
                    <label>Company Address</label>
                    <input type="text" placeholder="Enter Company Address" required />
                  </div>
                </div>
              </div>
              <div className="details ID">
                {/* <span className="title">Company Address Details</span>
                <div className="fields"> */}
                  {/* <div className="input-field-type2">
                    <label>Country</label>
                    <input type="text" placeholder="Enter Country" required />
                  </div>
                  <div className="input-field-type2">
                    <label>State</label>
                    <input type="text" placeholder="Enter State" required />
                  </div>
                  <div className="input-field-type2">
                    <label>City</label>
                    <input type="text" placeholder="Enter City" required />
                  </div>
                  <div className="input-field-type2">
                    <label>Area</label>
                    <input type="text" placeholder="Enter Area" required />
                  </div> */}
                {/* </div> */}
                  <button className="nextBtn" type="submit" onClick={handleSubmit}>
                  <span className="btnText" >Next</span>
                  <i className="uil uil-navigator"></i>
                </button>
              </div>
            </div>
          
          </form>
        </div>
      </div>
    </div>
    
  );
};

export default Booking;