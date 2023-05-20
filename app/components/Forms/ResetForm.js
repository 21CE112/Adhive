import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { NavLink,useLocation,useHistory} from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.png';
import { TextFieldRedux } from './ReduxFormMUI';
import styles from './user-jss';
import { Toaster, toast } from 'react-hot-toast';

// validation functions
const required = value => (value === null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

function ResetForm(props) {
  // this collection is used for resolving the role if we have to check in the advertiser database or publisher? so this will contain the endpoint of API
 const [collection,setCollection] = useState("")
 const history = useHistory();

//  this data is for tranfering the otp to the otp section and verify it there
 const [data,setData] = useState("")

 let location = useLocation();
  useEffect(()=>{
    setCollection(location.state.role)
  },[])
  const {
    classes,
    handleSubmit,
    pristine,
    submitting,
    deco,
  } = props;
const [email1,setEmail] = useState("");
const style = {textDecoration:"none",backgroundColor:"#2196F3",borderRadius:"20px",color:"White",padding:"10px",fontSize:"1rem"}
const handleResetOtp = async(event)=>{
  event.preventDefault();
  console.log(collection);
    let result = await fetch(`http://localhost:3000/${collection}`,{
      method:"post",
      body:JSON.stringify({email:email1,username:"",password:""}),
      headers:{
        "Content-Type":"application/json"
      }
    });
    result = await result.json();
    console.log(email1);
    if(result==="found")
    {
      const otp = Math.floor(Math.random()*1000000)
      const d = {
        collection,
        otp:otp,
        email:email1
      }
      setData(d);
      // console.log(otp);
      const text = "Please enter the provided OTP on the password reset page to complete the process. If you did not initiate this password reset request, please disregard this email.Please note that the OTP is confidential and should not be shared with anyone. If you have any concerns or need further assistance, please don't hesitate to contact our support team."
      let mail = await fetch("http://localhost:3000/sendmail",{
        method:"post",
        body:JSON.stringify({email:email1,otp:otp,text:text}),
        headers:{
          "Content-Type":"application/json"
        }
      })
      mail = await mail.json()
      if(mail==="sent")
      {        
        document.getElementById("link").click();
      return toast.success("Mail sent..!!");
      }
      else
      {
        return toast.error("Error while sending the mail")
      }
    }
    else
    {
      return toast.error("Your Email is not Registred under our system")
    }


} 

const redirectOtp = ()=>{
  console.log("hello clicked..!!");
}

  return (
    <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
      <Toaster></Toaster>
      <div className={classes.topBar}>
        <NavLink to="/" className={classes.brand}>
          <img src={logo} alt={brand.name} />
          {brand.name}
        </NavLink>
      </div>
      <Typography variant="h4" className={classes.title} gutterBottom>
        Reset Password
      </Typography>
      <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
        Send reset password OTP to Your email
      </Typography>
      <section className={classes.formWrap}>
        <form onSubmit={handleSubmit}>
          <div>
            <FormControl className={classes.formControl}>
              <Field
                name="email"
                component={TextFieldRedux}
                placeholder="Your Email"
                label="Your Email"
                required
                onChange={(e)=>{setEmail(e.target.value)}}
                validate={[required, email]}
                className={classes.field}
              />
            </FormControl>
          </div>
          <div  style={{display:"none"}}>
            <NavLink id="link" onClick={redirectOtp} to={{pathname:"/verify",state:{data:data}}}>here</NavLink>
          </div>
          <div className={classes.btnArea}>
            {/* <Button> */}
            <NavLink style={style} to="/" onClick={handleResetOtp} variant="contained" color="primary" type="submit">
              Send OTP
              <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
            </NavLink>
            {/* </Button> */}
          </div>
        </form>
      </section>
    </Paper>
  );
}

ResetForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const ResetFormReduxed = reduxForm({
  form: 'resetFrm',
  enableReinitialize: true,
})(ResetForm);

const RegisterFormMapped = connect(
  state => ({
    deco: state.ui.decoration
  }),
)(ResetFormReduxed);

export default withStyles(styles)(RegisterFormMapped);
