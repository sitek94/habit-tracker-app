import * as React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import authProviders from 'data/auth-providers';

const useStyles = makeStyles(theme => ({
  // list
  list: {
    // Target all but last buttons in the list
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(1),
    },
  },

  // Button
  root: {
    color: props => props.color,
    justifyContent: 'flex-start',
  },
  icon: {
    padding: theme.spacing(0, 2),
  },
}));

const AuthProviderButton = ({ color, ...rest }) => {
  const classes = useStyles({ color });

  return (
    <Button
      classes={{
        root: classes.root,
        startIcon: classes.icon,
      }}
      {...rest}
    />
  );
};

function AuthProviderList({ text, disabled, onAuthProviderClick }) {
  const classes = useStyles();

  return (
    <div className={classes.list}>
      {authProviders.map(({ id, name, color, icon, scopes }) => (
        <AuthProviderButton
          key={id}
          color={color}
          onClick={() => onAuthProviderClick({ id, scopes })}
          disabled={disabled}
          startIcon={icon}
          variant="outlined"
          fullWidth
        >
          {text} {name}
        </AuthProviderButton>
      ))}
    </div>
  );
}

AuthProviderList.defaultProps = {
  disabled: false,
};

AuthProviderList.propTypes = {
  // Properties
  text: PropTypes.string,
  disabled: PropTypes.bool,

  // Events
  onAuthProviderClick: PropTypes.func.isRequired,
};

export { AuthProviderList };
