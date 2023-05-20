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
// import styles from './widget-jss';
import styles from '../Widget/widget-jss'
import PapperBlock from '../PapperBlock/PapperBlock';
import { useHistory } from 'react-router-dom';
import { NavLink ,useLocation} from 'react-router-dom';

function AdDisplay(props) {
  const { classes } = props;
  const location = useLocation();
  const data = JSON.parse(location.state.data)
  const ad = data?data.map((d)=>{
    let i=0;
    console.log(d.area.length)
    return(<Grid key={d._id} container spacing={4}>
        <Grid item md={5} sm={12} xs={12}>
        <PapperBlock whiteBg noMargin title={location.state.companyName} icon="ion-ios-cloud-outline" desc="">
          <div className={classes.secondaryWrap} >
            <div className={classes.centerItem}>
              <label style={{color:"#1565C0"}}>Ad orientation : {d.adOrientation}</label>
              <label style={{color:"#1565C0"}}>Ad Type : {d.adType}</label>
              <label style={{color:"#1565C0"}}>Ad Duration : {d.adDuration}</label>
              <label style={{color:"#1565C0"}}>Start Date : {d.startDate}</label>
              <label style={{color:"#1565C0"}}>End Date : {d.endDate}</label>
              <label style={{color:"#1565C0"}}>Timeslot : {d.timeSlot}</label>
              <label style={{color:"#1565C0"}}>Country : {d.country}</label>
              <label style={{color:"#1565C0"}}>State : {d.state}</label>
              <label style={{color:"#1565C0"}}>City : {d.city}</label>
<label style={{color:"#1565C0"}}>Area : {d.area.map((item)=>{i++;return(i==d.area.length?item:item+" , ")})}</label>
            </div>
          </div>
          <Divider className={classes.divider} />
          <Grid container justifyContent="center">
            <NavLink to="/app">
            <Button color="secondary" variant="contained" className={classes.button}>
              Go Back
            </Button>
            </NavLink>
          </Grid>
        </PapperBlock>
      </Grid>
      
     </Grid>)
  }):<></>
  return (
    <>
    {ad}
    </>
  );
}

AdDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdDisplay);
