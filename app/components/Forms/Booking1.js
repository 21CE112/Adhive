import React, { useState } from 'react';
import logo from "../../../public/images/logo/logo.png";
import { useHistory } from 'react-router-dom';
import './Booking1.css';
import Select  from 'react-select';
const Booking1 = () => {
  const history = useHistory();
  const [adType, setAdType] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [state, setState] = useState('');
    const [city, setCity] = useState('');
  const [area, setAreas] = useState('');
  const [selectedTimeSlots, setSelectedTimeSlots] = useState('');
  const handleAdTypeChange = (event) => {
    setAdType(event.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setState(selectedState);
    setCity(''); // Reset the city when the state changes
};
const handleSubmit = (event) => {
  event.preventDefault();
  console.log("redirected to booking1");
  history.push("/")
}

const handleCityChange = (e) => {
  const selectedCity = e.target.value;
  setCity(selectedCity);
  setArea(''); // Reset the area when the city changes
  setAreas(getAreasByCity(selectedCity));
};

  
  const handleAreaChange = (e) => {
    setArea(e.target.value);
  };

  const handleclick = (event)=>{
    event.preventDefault();
    console.log("redirect to landingpage");
    history.push("/app")
  };
  const handleback = (event)=>{
    event.preventDefault();
    console.log("redirect to booking");
    history.push("/app/components/Forms/Booking")
  };
  // const City1 =[ "Area1","Area2","Area3"];
  const states = [
    { name: 'Gujarat', cities: ['Ahmedabad', 'Surat', 'Gandhinagar'] },
    { name: 'Mharashtra', cities: ['Mumbai', 'Pune', 'Nagpur'] },
    { name: 'Uttar Pradesh', cities: ['Lucknow', 'Pryagraj', 'Kanpur'] },
];

const getCitiesByState = (selectedState) => {
  const foundState = states.find((state) => state.name === selectedState);
  return foundState ? foundState.cities : [];
};

const getAreasByCity = (selectedCity) => {
  // Placeholder implementation, replace with your own data retrieval logic
  // For demonstration purposes, return some example areas based on the selected city
  if (selectedCity === 'Ahmedabad') {
    return ['Area 1', 'Area 2', 'Area 3'];
  } else if (selectedCity === 'Surat') {
    return ['Area 4', 'Area 5', 'Area 6'];
  } else if (selectedCity === 'Gandhinagar') {
    return ['Area 7', 'Area 8', 'Area 9'];
  } else if (selectedCity === 'Mumbai') {
    return ['Area 4', 'Area 5', 'Area 6'];
  } else if (selectedCity === 'Pune') {
    return ['Area 7', 'Area 8', 'Area 9'];
  } else if (selectedCity === 'Nagpur') {
    return ['Area 4', 'Area 5', 'Area 6'];
  } else if (selectedCity === 'Lucknow') {
    return ['Area 7', 'Area 8', 'Area 9'];
  } else if (selectedCity === 'Pryagraj') {
    return ['Area 4', 'Area 5', 'Area 6'];
  } else if (selectedCity === 'Kanpur') {
    return ['Area 7', 'Area 8', 'Area 9'];
  } else {
    return [];
  }
};

const timeSlots = [
  { value: '9:00 AM - 9:30 AM', label: '9:00 AM - 9:30 AM' },
  { value: '9:30 AM - 10:00 AM', label: '9:30 AM - 10:00 AM' },
  { value: '10:00 AM - 10:30 AM', label: '10:00 AM - 10:30 AM' },
  // Add more time slot options here
];

const handleTimeSlotChange = (selectedOptions) => {
  setSelectedTimeSlots(selectedOptions);
};


  return (
    <div className="con1">
    <div className="content">
      <div className="container">
       <div class="headerfeild">
        <div>
        <img src={logo} style={{width: 30 }}/>
       <button class="no" onClick={handleclick}><header>AdHive</header></button> 
       </div>
       <div>
       <button class="no" onClick={handleback}><header>Back</header></button> 
       </div>
       </div>
          <h1 className="head">Registration</h1>
          <form action="#">
            <div className="form first">
              <div className="details personal">
                <span className="title">Ad Details</span>
                <div className="fields">
                  <div className="input-field-type2">
                    <label>Ad Orientation</label>
                    <select id="orientation-type">
                      <option value="">Select Ad Orientation</option>
                      <option value="">Verticle</option>
                      <option value="">horizontal</option>
                    </select>
                  </div>

                  <div className="input-field-type2">
                    <label htmlFor="ad-type">Ad Type:</label>
                    <select id="ad-type" onChange={handleAdTypeChange}>
                      <option value="">Select Ad Type</option>
                      <option value="photo">Photo</option>
                      <option value="video">Video</option>
                    </select>
                  </div>

                  {adType === 'photo' && (
                    <div className="input-field">
                      <label className="upar" htmlFor="photo">
                        Add Photo:
                      </label>
                      <input type="file" id="photo" name="photo" accept="image/png, image/jpeg" required />
                    </div>
                  )}

                  {adType === 'video' && (
                    <div className="input-field">
                      <label className="upar" htmlFor="video">
                        Add Video:
                      </label>
                      <input type="file" id="video" name="video" accept="video/*,video/mkv" required />
                    </div>
                  )}

                  <div className="input-field-type2">
                    <label>Ad Categories</label>
                    <select id="category-type" onChange="">
                      <option value="">Select Ad Category</option>
                      <option value="photo">Electronics</option>
                      <option value="video">Food and Beverages</option>
                      {/* Add more options here */}
                    </select>
                  </div>

                  <div className="input-field-type2">
                    <label htmlFor="duration">Ad Duration:</label>
                    <input type="number" id="duration" name="duration" min="1" required />
                  </div>

                  <div className="input-field-type2">
                    <label htmlFor="start-date">Start Date:</label>
                    <input type="date" id="start-date" name="start-date" required />
                  </div>

                  <div className="input-field-type2">
                    <label htmlFor="end-date">End Date:</label>
                    <input type="date" id="end-date" name="end-date" required />
                  </div>

                  <div className="input-field-type1">
      <label htmlFor="time-slots">Time Slots:</label>
      <Select
        id="time-slots"
        isMulti
        options={timeSlots}
        onChange={handleTimeSlotChange}
        value={selectedTimeSlots}
      />
      {/* <p>Selected Time Slots: {selectedTimeSlots.length > 0 ? selectedTimeSlots.map((option) => option.label).join(', ') : 'None'}</p> */}
    </div>
                </div>
              </div>

              <div className="details personal">
                <span className="title">Show Ad In</span>
                <div className="fields">
                  <div className="input-field-type2">
                    <label>Country:</label>
                    <select id="country" onChange={handleCountryChange}>
                      <option value="">Select Country</option>
                      <option value="country1">India</option>
                     
                      {/* Add more countries here */}
                    </select>
                  </div>

                  <div className="input-field-type2">
                  <label htmlFor="state">State:</label>
                            <select id="state" value={state} onChange={handleStateChange}>
                                <option value="">Select</option>
                                {states.map((state) => (
                                    <option value={state.name} key={state.name}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                  </div>

                  <div className="input-field-type2">
                  <label htmlFor="city">City:</label>
                            <select id="city" value={city} onChange={handleCityChange} disabled={!state}>
                                <option value="">Select</option>
                                {getCitiesByState(state).map((city) => (
                                    <option value={city} key={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                  </div>

                  <div className="input-field-type2">
                  <label htmlFor="area">Area:</label>
              <select id="area" value={area} onChange={handleAreaChange} disabled={!city}>
                <option value="">Select</option>
                {getAreasByCity(city).map((area) => (
                  <option value={area} key={area}>
                    {area}
                  </option>
                ))}
              </select>
                  </div>
                </div>
              </div>
              <button className="nextBtn" type="submit" onClick={handleSubmit}>
                  <span className="btnText" >Submit</span>
                  <i className="uil uil-navigator"></i>
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
                  
};
             

export default Booking1;