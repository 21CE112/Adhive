import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  demo: {
    height: 'auto',
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`,
  },
  field: {
    margin: `${theme.spacing(3)}px 5px`,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

function SimpleSelectbox(props) {
  const { classes } = props;
  const [dataState, setDataState] = useState({
    age: '',
    name: 'hai'
  });

  const handleChange = event => {
    setDataState({
      ...dataState,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-simple">Age</InputLabel>
        <Select
          value={dataState.age}
          onChange={handleChange}
          inputProps={{
            name: 'age',
            id: 'age-simple',
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-helper">Age</InputLabel>
        <Select
          value={dataState.age}
          onChange={handleChange}
          input={<Input name="age" id="age-helper" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>Some important helper text</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl}>
        <Select
          value={dataState.age}
          onChange={handleChange}
          displayEmpty
          name="age"
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>Without label</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl} disabled>
        <InputLabel htmlFor="name-disabled">Name</InputLabel>
        <Select
          value={dataState.name}
          onChange={handleChange}
          input={<Input name="name" id="name-disabled" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="hai">Hai</MenuItem>
          <MenuItem value="olivier">Olivier</MenuItem>
          <MenuItem value="kevin">Kevin</MenuItem>
        </Select>
        <FormHelperText>Disabled</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl} error>
        <InputLabel htmlFor="name-error">Name</InputLabel>
        <Select
          value={dataState.name}
          onChange={handleChange}
          name="name"
          renderValue={value => `⚠️  - ${value}`}
          input={<Input id="name-error" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="hai">Hai</MenuItem>
          <MenuItem value="olivier">Olivier</MenuItem>
          <MenuItem value="kevin">Kevin</MenuItem>
        </Select>
        <FormHelperText>Error</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="name-input">Name</InputLabel>
        <Input id="name-input" />
        <FormHelperText>Alignment with an input</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="name-readonly">Name</InputLabel>
        <Select
          value={dataState.name}
          onChange={handleChange}
          input={<Input name="name" id="name-readonly" readOnly />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="hai">Hai</MenuItem>
          <MenuItem value="olivier">Olivier</MenuItem>
          <MenuItem value="kevin">Kevin</MenuItem>
        </Select>
        <FormHelperText>Read only</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-simple2">Age</InputLabel>
        <Select
          value={dataState.age}
          onChange={handleChange}
          input={<Input name="age" id="age-simple2" />}
          autoWidth
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>Auto width</FormHelperText>
      </FormControl>
    </form>
  );
}

SimpleSelectbox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelectbox);
