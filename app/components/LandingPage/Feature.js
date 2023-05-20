import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Title from './Title';
import styles from './landingStyle-jss';

let counter = 0;
function createFeatureData(icon, title, desc) {
  counter += 1;
  return {
    id: counter,
    icon,
    title,
    desc
  };
}

function Feature(props) {
  const { classes, slideMode } = props;
  const featureList = [
    createFeatureData('ion-ios-infinite-outline', 'Detailed Reporting', 'We offer detailed reporting that provides users with insights into key performance metrics'),
    createFeatureData('ion-ios-flower-outline', 'Customization', 'Another important feature of an advertising analytics website is the ability to customize the data and reporting to fit the users specific needs'),
    createFeatureData('ion-ios-ionic-outline', 'Real-time Monitoring', 'Real-time Monitoring,We provide real-time monitoring,This allows users to track the performance of their campaigns in real-time')
  ];

  return (
    <div className={classNames(classes.feature, slideMode ? classes.mono : classes.color)}>
      <div className={!slideMode ? classes.container : ''}>
        <Title title="Main Feature" align="center" monocolor={slideMode && true} />
        <Grid container className={classes.root} spacing={5}>
          {featureList.map(item => (
            <Grid key={item.id.toString()} item xs={12} md={4}>
              <Typography component="h4" variant="h6">
                <span className={classes.icon}>
                  <i className={item.icon} />
                </span>
                {item.title}
              </Typography>
              <Typography className={slideMode ? classes.colorWhite : ''}>
                {item.desc}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

Feature.propTypes = {
  classes: PropTypes.object.isRequired,
  slideMode: PropTypes.bool
};

Feature.defaultProps = {
  slideMode: false
};

export default withStyles(styles)(Feature);
