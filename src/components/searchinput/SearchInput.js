import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Paper, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: '10px',
    alignItems: 'center',
    padding: 1,
    display: 'flex',
    flexBasis: 350
  },
  icon: {
    marginRight: 1,
  },
  input: {
    flexGrow: 1,
    lineHeight: '16px',
    letterSpacing: '-0.05px'
  }
}));

const SearchInput = props => {
  const { className, onChange, style, ...rest } = props;

  const classes = useStyles();

  return (
    <Paper elevation={0} 
      {...rest}
      className={clsx(classes.root, className)}
      style={style}
    >
      <SearchIcon className={classes.icon} />
      <Input
        {...rest}
        className={classes.input}
        disableUnderline
        onChange={onChange}
      />
    </Paper>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object
};

export default SearchInput;
