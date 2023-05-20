import React, { Fragment, useState ,useEffect} from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { connect } from "react-redux";
import { NavLink,useHistory } from "react-router-dom";
import { Field, reduxForm, reset } from "redux-form";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ArrowForward from "@material-ui/icons/ArrowForward";

import Icon from "@material-ui/core/Icon";
import Hidden from "@material-ui/core/Hidden";
import brand from "dan-api/dummy/brand";
import logo from "dan-images/logo.png";
import { TextFieldRedux, CheckboxRedux } from "./ReduxFormMUI";
import styles from "./user-jss";
import { ContentDivider } from "../Divider";
// added by me
import {Toaster,toast} from 'react-hot-toast'
import {GoogleLogin} from 'react-google-login' 
// import bcrypt from 'bcrypt'
// import {useDispatch} from 'react-redux'
// import otp from "../../../server/mails/otp";

// 
// >>>>>>> 6d133c5008b14b0fb067ea87aa9aa189c29db3b8
// validation functions
const required = (value) => (value === null ? "Required" : undefined);
const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? true  
    : false;

const passwordsMatch = (pass, cpass) => {
  if (pass !== cpass) {
    return true;
  }
  return false;
};

const passwordValidate = (pass,cpass)=>{
  const validPass = /[`!@#$%^&*()_+\-=[\]{};':",.<>|\\?~]/g;
    let error = null
    if(!(validPass.test(pass)))
    {
      // return toast.error("Password must contain atleast one special character..!!")
      return "special"
    }
    if(pass.length < 8 || cpass.length < 8)
    {
       return "length"
    }
    // return error;
}
// >>>>>>> 6d133c5008b14b0fb067ea87aa9aa189c29db3b8

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) {
  // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

function RegisterForm(props) {
  const [tab, setTab] = useState(0);
  const [username, setUsername] = useState(" ");
  const [email1, setEmail1] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [cpassword, setCpassword] = useState(" ");
  const [otp,setOtp] = useState('')
  const image="test.png";

  // the following useState variable is created to passon the name of collection to the API
  // whichever button is clicked (either advertiser or publisher) it will set name of the collection in which the user will be registered
  const [collection,setCollection]= useState("advertiserinfo")  
  const [data,setData]=useState("")
  const handleChangeTab = (event, value) => {
    setTab(value);
  };

  const history = useHistory();
  // const dispatch = useDispatch();


  const generateOtp = ()=>{
    setOtp(Math.floor(Math.random()*1000000))
  }

  const handleForm = async(e) => {
    e.preventDefault();
    // const error=null
    const passVal = passwordValidate(password,cpassword)
    if(email(email1)){
// >>>>>>> 6d133c5008b14b0fb067ea87aa9aa189c29db3b8
      // console.log("Invalid email")
      return toast.error("Invalid email")
    }
    else if(passwordsMatch(password,cpassword))
    {
// <<<<<<< HEAD
     
// =======
      return toast.error("Passwords doesn't match")
    }
    else if(passVal==="special")
    {
      return toast.error("Password must contain atleast one special character..!!");
    }
    else if(passVal==="length")
    {
      return toast.error("Password must be consist of atleast 8 characters")
    }
    else{
      if(collection==="advertiserinfo")
      {
        let result = await fetch("http://localhost:3000/advertiserExist",{
          method:"post",
          body:JSON.stringify({username,email:email1}),
          headers:{
            'Content-Type':'application/json'
          }
        });
        result = await result.json()
        if(result==="Advertiser already exists..!!")
        {
          return toast.error(result)
        }
      }
      else if(collection==="publiserinfo")
      {
        let result = await fetch("http://localhost:3000/publisherExist",{
          method:"post",
          body:JSON.stringify({username,email:email1}),
          headers:{
            'Content-Type':'application/json'
          }
        });
        result = await result.json()
        if(result==="Publisher already exists..!!")
        {
          return toast.error(result)
        }
      }

    const mail = await fetch('/sendmail',{
      method:"post",
        body:JSON.stringify({email:email1,otp,text:""}),
        headers:{
          'Content-Type':'application/json'
        }
    })
    if(mail){
      // dispatch({type:'email',payload:{email1,otp}})
       const d={
        username,
        password,
        profileImage:image,
        collection,
        email:email1,
        otp:otp
      }
      setData(d);
      // history.push(`/verify?data=${encodeURIComponent(JSON.stringify(data))}`)
      const a = setTimeout(()=>{document.getElementById("link").click();},3000) 
      return toast.success("Mail sent..!!")
    // else
    // {
    //   return toast.error("Error while sending the mail..!!")
    // }
     
    }
    else {
      return toast.error("Error while sending the mail..!!")
    }
  }
    // return error;
  }

  const { classes, handleSubmit, pristine, submitting, deco } = props;
  const setAdvertiser = ()=>{
    setCollection("advertiserinfo")
  }
  const setPublisher = ()=>{
    setCollection("publiserinfo")
  }

  // -----------------------------------------------------------------

  const handleResposeFromGoogle = (response)=>{
    console.log("JWT token = "+response.credential);
  }

  
  useEffect(()=>{
    google.accounts.id.initialize({
      client_id:"551395218781-jp3i52i0mrlctlvfd2jbth753oe08f2q.apps.googleusercontent.com",
      callback: handleResposeFromGoogle
    })
    google.accounts.id.prompt();
  google.accounts.id.renderButton(
    document.getElementById("signGoogle"),
    {theme:"outline" ,size:"large"}
  );

  


  },[])
  const handleSuccess = ()=>{

  }

  const handleFailure = ()=>{

  }  
  // -----------------------------------------------------------------

  return (
    <Fragment>
      <Toaster></Toaster>
      <Hidden mdUp>
        <NavLink to="/" className={classNames(classes.brand, classes.outer)}>
          <img src={logo} alt={brand.name} />
          {brand.name}
        </NavLink>
      </Hidden>
      <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
        <Hidden smDown>
          <div className={classes.topBar}>
            <NavLink to="/" className={classes.brand}>
              <img src={logo} alt={brand.name} />
              {brand.name}
            </NavLink>
            <Button
              size="small"
              className={classes.buttonLink}
              component={LinkBtn}
              to="/login"
            >
              <Icon className={classes.icon}>arrow_forward</Icon>
              Already have account ?
            </Button>
          </div>
        </Hidden>
        <Typography variant="h4" className={classes.title} gutterBottom>
          Register
        </Typography>
        {/* <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
          Lorem ipsum dolor sit amet
        </Typography> */}
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          indicatorColor="secondary"
          textColor="secondary"
          centered
          className={classes.tab}
        >
          
        <Tab onClick={setAdvertiser} id="advertiser" label="Advertiser" />
          <Tab onClick={setPublisher} id="publisher" label="Publisher" />
        </Tabs>
        {(
          <section className={classes.formWrap}>
            <form id="form" onSubmit={handleForm}>
              <div>
                <br></br>
                {/* <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  className={classes.redBtn}
                  type="button"
                  onClick={handleGoogleSignUp}
                >
                  <AllInclusive
                    className={classNames(classes.leftIcon, classes.iconSmall)}
                  />
                  Google
                </Button> */}
      <div id="signGoogle"></div>
      <GoogleLogin 
          clientId="551395218781-jp3i52i0mrlctlvfd2jbth753oe08f2q.apps.googleusercontent.com"
          buttonText="Sign in with Google"
          onSuccess={handleSuccess}
          onFailure={handleFailure}
          cookiePolicy={'single_host_origin'}
      />

                <div>
                  <ContentDivider content="Or sign in with email" />
                </div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="name"
                    component={TextFieldRedux}
                    placeholder="Username"
                    label="Username"
                    id="username"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="email"
                    component={TextFieldRedux}
                    placeholder="Your Email"
                    label="Your Email"
                    required
                    onChange={(e) => setEmail1(e.target.value)}
                    validate={[required]}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="password"
                    component={TextFieldRedux}
                    type="password"
                    label="Your Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    validate={[required]}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="passwordConfirm"
                    component={TextFieldRedux}
                    type="password"
                    label="Re-type Password"
                    required
                    onChange={(e) => setCpassword(e.target.value)}
                    validate={[required]}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Field
                      name="checkbox"
                      component={CheckboxRedux}
                      required
                      className={classes.agree}
                    />
                  }
                  label="Agree with"
                />
                <a href="#" className={classes.link}>
                  Terms &amp; Condition
                </a>
              </div>
              <div style={{display:"none"}}>
                  <NavLink  id="link" to={{pathname:"/verify",state:{data:data}}} />
              </div>
              <div className={classes.btnArea}>
                <Button onClick={generateOtp} variant="contained" color="primary" type="submit">
                  Continue
                  <ArrowForward
                    className={classNames(classes.rightIcon, classes.iconSmall)}
                    disabled={submitting || pristine}
                  />
                </Button>
              </div>
            </form>
          </section>
        )}
      </Paper>
    </Fragment>
  );
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const RegisterFormReduxed = reduxForm({
  form: "registerForm",
  enableReinitialize: true,
})(RegisterForm);

const RegisterFormMapped = connect((state) => ({
  deco: state.ui.decoration,
}))(RegisterFormReduxed);

export default withStyles(styles)(RegisterFormMapped);