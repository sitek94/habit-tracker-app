import PropTypes from 'prop-types';

import { Box } from '@material-ui/core';

const AbsoluteCenter = ({ fullWidth, ...rest }) => {
  return (
    <Box
      position="absolute"
      width={fullWidth}
      top="50%"
      left="50%"
      style={{
        transform: "translate(-50%, -50%)"
      }}
      textAlign="center"
      {...rest}
    />
  );
};

AbsoluteCenter.propTypes = {
  fullWidth: PropTypes.bool
}

export default AbsoluteCenter;
