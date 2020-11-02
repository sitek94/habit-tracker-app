import React from 'react';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import { Box, ButtonGroup, Button } from '@material-ui/core';

import authProviders from 'data/auth-providers';

const useStyles = makeStyles({
  root: {
    color: props => props.color,
  },
});

const AuthProviderButton = ({ color, ...rest }) => {
  const classes = useStyles({ color });

  return <Button classes={{ root: classes.root }} {...rest} />;
};

const AuthProviderList = ({
  // Properties
  gutterBottom,
  performingAction,

  // Events
  onAuthProviderClick,
}) => {
  return (
    <Box mb={gutterBottom ? 3 : 0}>
      <ButtonGroup
        disabled={performingAction}
        fullWidth
        orientation="vertical"
        variant="outlined"
      >
        {authProviders.map(({ id, name, color, icon }) => (
          <AuthProviderButton
            color={color}
            key={id}
            startIcon={icon}
            onClick={onAuthProviderClick}
          >
            {name}
          </AuthProviderButton>
        ))}
      </ButtonGroup>
    </Box>
  );
};

AuthProviderList.defaultProps = {
  gutterBottom: false,
  performingAction: false,
};

AuthProviderList.propTypes = {
  // Properties
  gutterBottom: PropTypes.bool,
  performingAction: PropTypes.bool,

  // Events
  onAuthProviderClick: PropTypes.func.isRequired,
};

export default AuthProviderList;
