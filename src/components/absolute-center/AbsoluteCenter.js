import { Box } from '@material-ui/core';

const AbsoluteCenter = props => {
  return (
    <Box
      position="absolute"
      width="100%"
      top="50%"
      left="50%"
      style={{
        transform: "translate(-50%, -50%)"
      }}
      textAlign="center"
      {...props}
    />
  );
};

export default AbsoluteCenter;
