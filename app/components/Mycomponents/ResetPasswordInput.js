import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Field, reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { NavLink,useHistory ,useLocation} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";

import ArrowForward from "@material-ui/icons/ArrowForward";
import Paper from "@material-ui/core/Paper";

import { TextFieldRedux, CheckboxRedux } from "../Forms/ReduxFormMUI";
import styles from "../Forms/user-jss";
// added by me
import { Toaster, toast } from "react-hot-toast";


// ------------------
// validation functions

// const LinkBtn = React.forwardRef(function LinkBtn(props, ref) {
//   // eslint-disable-line
//   return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
// });
function LoginForm(props) {
    const history = useHistory();
  const { classes, handleSubmit, pristine, submitting, deco } = props;
  const location = useLocation();
  const data = location.state.data;
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

const required = (value) => (value === null ? "Required" : undefined);
  const [password,setPassword] = useState("")
  const [repassword,setRePassword] = useState("")

  const passwordsMatch = (password, repassword) => {
    if (password !== repassword) {
      return true;
    }
    return false;
  };
  
  const passwordValidate = (password,repassword)=>{
    const validPass = /[`!@#$%^&*()_+\-=[\]{};':",.<>|\\?~]/g;
      let error = null
      if(!(validPass.test(password)))
      {
        // return toast.error("Password must contain atleast one special character..!!")
        return "special"
      }
      if(password.length < 8 || repassword.length < 8)
      {
         return "length"
      }
      // return error;
  }

  const handleReset = async(e)=>{
    e.preventDefault();
    console.log(password,repassword);
    const passVal = passwordValidate(password,repassword)
    if(passwordsMatch(password,repassword))
    {
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
    else
    {
        let result = await fetch("http://localhost:3000/resetPass",{
            method:"put",
            body:JSON.stringify({collection:data.collection,email:data.email,password:password}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        result = await result.json(); 
        if(result==="Password Changed Successfully..!!")
        {
            const a = setTimeout(()=>{history.push("/login")},5000)
            return toast.success(result)  
        }
        else
        {
            return toast.error(result)
        }

    }
  }
  
  return (
    <Fragment>
      <Toaster></Toaster>
      
      <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
        <Typography variant="h4" className={classes.title} gutterBottom>
          RESET PASSWORD
        </Typography>
       
        <section className={classes.formWrap}>
          <form onSubmit={handleReset}>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="password"
                  component={TextFieldRedux}
                  type={showPassword ? "text" : "password"}
                  label="New Password"
                  onChange={(e)=>setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  required
                  validate={required}
                  className={classes.field}
                />
              </FormControl>
            </div>

            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="repassword"
                  component={TextFieldRedux}
                  type={showPassword ? "text" : "password"}
                  label="Re-Type Password"
                  onChange={(e)=>setRePassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  required
                  validate={required}
                  className={classes.field}
                />
              </FormControl>
            </div>
              <div className={classes.optArea}>
              <Button
                size="small"
                // component={LinkBtn}
                // to="/reset-password"
                // onClick={}
                className={classes.buttonLink}
              >
              </Button>
            </div>
            <div className={classes.btnArea}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
              >
                Reset Password
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
