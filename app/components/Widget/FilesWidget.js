import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import imgData from 'dan-api/images/imgData';
import styles from './widget-jss';
import PapperBlock from '../PapperBlock/PapperBlock';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function FilesWidget(props) {
  const { classes } = props;
  // const [data,setData] = useState("")
  const history = useHistory();
  const handleClick = ()=>{
    console.log("hello ",props.companyName);
  }
  // setData(props.ad)
  return (
    <Grid container spacing={4}>
        <Grid item md={5} sm={6} xs={12}>
        <PapperBlock whiteBg noMargin title={props.companyName} icon="ion-ios-cloud-outline" desc="">
          <div className={classes.secondaryWrap} >
            <div className={classes.centerItem}>
              <label style={{color:"#1565C0"}}>Company :{props.companyName}</label>
              <label style={{color:"#1565C0"}}>Company Owner Name : {props.companyOwnerName}</label>
              <label style={{color:"#1565C0"}}>Company Email : {props.companyEmail}</label>
        <label style={{color:"#1565C0"}}>Company Contact Number : {props.companyContactNumber}</label>
              <label style={{color:"#1565C0"}}>Company Address : {props.companyAddress}</label>
              <label style={{color:"#1565C0"}}>Total Ads : {props.companyAddress}</label>
            </div>
          </div>
          <Divider className={classes.divider} />
          <Grid container justifyContent="center">
            <NavLink to={{pathname:"/app/layouts/addisplay",state:{data:JSON.stringify(props.ad),companyName:props.companyName}}}>
            <Button onClick={handleClick} color="secondary" variant="contained" className={classes.button}>
              View Ads
            </Button>
            </NavLink>
          </Grid>
        </PapperBlock>
      </Grid>
      
     </Grid>

  );
}

FilesWidget.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilesWidget);
