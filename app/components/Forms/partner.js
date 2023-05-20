import React from 'react';
import './partner.css';
import logo from "../../../public/images/logo/logo.png";
import { useHistory } from 'react-router-dom';
const Partner = () => {
  const history = useHistory();
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("redirected to booking1");
        history.push("/booking1")
    }
    const handleclick = (event)=>{
        event.preventDefault();
            console.log("redirect to landingpage");
          history.push("/")
          };
          
    return (
    <div className="con1">
      <div className="content">
        <div className="container">
          {/* <div className="headerfeild"> */}
          <img src={logo} style={{width: 30 }}/>
         <button class="no" onClick={handleclick}><header>AdHive</header></button> 
          {/* </div> */}
          <h1 className="head">Publisher Registration</h1>
          <form action="#">
            <div className="form first">
              <div className="details personal">
                <span className="title">Partner Details</span>
                <div className="fields">
                  <div className="input-field-type1">
                    <label>Partner Name</label>
                    <input type="text" placeholder="Enter Partner Name" required />
                  </div>
                  <div className="input-field-type1">
                    <label>Partner Owner Name</label>
                    <input type="text" placeholder="Enter owner name" required />
                  </div>
                  <div className="input-field-type1">
                    <label>Partner Email</label>
                    <input type="text" placeholder="Enter Partner email" required />
                  </div>
                  <div className="input-field-type1">
                    <label>Partner Contact Number</label>
                    <input type="text" placeholder="Enter contact number" required />
                  </div>
                  <div className="input-field-type1">
                    <label>Partner Address</label>
                    <input type="text" placeholder="Enter Partner Address" required />
                  </div>
                </div>
              </div>
              <div className="details ID">
                <span className="title">Partner Address Details</span>
                <div className="fields">
                   <div className="input-field-type2">
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
                  </div> 
                 </div>
                  <button className="nextBtn" type="submit" onClick={handleclick}>
                  <span className="btnText" >Submit</span>
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

export default Partner;