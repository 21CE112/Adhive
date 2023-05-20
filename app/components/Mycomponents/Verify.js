import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Field, reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { NavLink,useHistory ,useLocation} from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";

import ArrowForward from "@material-ui/icons/ArrowForward";
import Paper from "@material-ui/core/Paper";

import { TextFieldRedux, CheckboxRedux } from "../Forms/ReduxFormMUI";
import styles from "../Forms/user-jss";
// added by me
import { Toaster, toast } from "react-hot-toast";
import { setTimeout } from "core-js";

// ------------------
// validation functions

// const LinkBtn = React.forwardRef(function LinkBtn(props, ref) {
//   // eslint-disable-line
//   return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
// });
function LoginForm(props) {
  const { classes, handleSubmit, pristine, submitting, deco } = props;
  // here otp is used as useState hook because when we click on send again otp link the otp needs to be changed
  const [otp,setOtp] = useState("")
  const [info,setInfo] = useState("")

  const location = useLocation(); //for accessing data passed to this component through NavLinks
  const history = useHistory(); // to redirect a page when we dont want to pass any props.will create a history stack in our browser
  const data = location.state.data;
  const [sentOtp,setSentOtp] = useState(data.otp);
  let count=0;
  const handleOtp = async(e)=>{ 
    e.preventDefault()
    if(JSON.parse(otp)===sentOtp){
    console.log("hello..!!");
    if(data.username){
    let result = await fetch("http://localhost:3000/signUpClient",{
        method:"post",
        body:JSON.stringify({data}),
        headers:{
          'Content-Type':'application/json'
        }
// >>>>>>> 6d133c5008b14b0fb067ea87aa9aa189c29db3b8
      });
      result = await result.json();
       if(result==="account already exists..!!")
      {
        return toast.error(result)
      }
      
      else if(result!=="error has been occured"){
        console.log("User has been logged in successfully..!!");
        return toast.success("Registration Successfull..!!");
      }
      else
      {
        console.log("Error..!!");
      }
    }
    else
    {
      const d = {
        collection:data.collection,
        email:data.email,
      };
      setInfo(d);
      const a = setTimeout(()=>{document.getElementById("link").click()},3000);
      return toast.success("Valid OTP");
    } 
  }
    else
    {
      console.log("otp not valid..!!");
      return toast.error("otp is not valid..!!")
    }
   
  }

  const displayMessage = ()=>{
      const a = setTimeout(()=>{document.getElementById('send').innerHTML="Didn't Receive a Mail? Send Again"},15000)
  }

  const handleClick = async()=>{
    count++;
    if(count>=5)
    {
      return toast.error("If you are unable to recieve mails, please go back and check your email address again..!!")
    }
    else{
    const generate_otp = Math.floor(Math.random()*1000000)
    setSentOtp(generate_otp);
    let result = await fetch("http://localhost:3000/sendmail",{
      method:"post",
      body:JSON.stringify({email:data.email,otp:generate_otp,text:""}),
      headers:{
        'Content-Type':'application/json'
      }
    })
    result = await result.json();
    if(result==="sent")
    {
      return toast.success("Mail sent..!!")
    }
    else
    {
      return toast.error("Error while sending the mail..!!")
    }
  }
    // console.log(otp);
  }
  return (
    <Fragment>
      <Toaster></Toaster>
      
      <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
        <Typography variant="h4" className={classes.title} gutterBottom>
          OTP VERIFICATION
        </Typography>
       
        <section className={classes.formWrap}>
          <form onSubmit={handleOtp}>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="OTP"
                  component={TextFieldRedux}
                  placeholder="Please Enter Your OTP Here..."
                  label="Your OTP"
                  type="number"
                  onChange={(e)=>{setOtp(e.target.value)}}
                  className={classes.field}
                />
              </FormControl>
            </div>
            
              <div className={classes.optArea}>
              <Button
                size="small"
                // component={LinkBtn}
                // to="/reset-password"
                onClick={handleClick}
                className={classes.buttonLink}
              >
                <div id="send"></div>
                {displayMessage()}
              </Button>
            </div>
            <div style={{display:"none"}}>
              <NavLink id="link" to={{pathname:"/resetPass",state:{data:info}}} />
            </div>
            <div className={classes.btnArea}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
              >
                Verify
                <ArrowForward
                  className={classNames(classes.rightIcon, classes.iconSmall)}
                  disabled={submitting || pristine}
                />
              </Button>
            </div>
          </form>
        </section>
      </Paper>
    </Fragment>
  );
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const LoginFormReduxed = reduxForm({
  form: "loginForm",
  enableReinitialize: true,
})(LoginForm);

const FormInit = connect((state) => ({
  force: state,
  initialValues: state.login.usersLogin,
  deco: state.ui.decoration,
}))(LoginFormReduxed);

export default withStyles(styles)(FormInit);
