import PropTypes from 'prop-types';

import { Box, Typography } from '@material-ui/core';

const EmptyState = ({
  type = 'page',
  size = 'medium',
  padding = 2,
  title,
  description,
  button,
}) => {
  let variant;

  switch (size) {
    case 'small':
      variant = 'h6';
      break;

    case 'medium':
      variant = 'h5';
      break;

    case 'large':
      variant = 'h4';
      break;

    default:
      variant = 'h5';
      break;
  }

  if (type === 'page') {
    return (
      <Box
        style={{ transform: 'translate(-50%, -50%)' }}
        position="absolute"
        top="50%"
        left="50%"
        textAlign="center"
      >
        {title && (
          <Box mb={!description && button ? 2 : 0}>
            <Typography variant={variant}>{title}</Typography>
          </Box>
        )}

        {description && (
          <Box mb={button && 2}>
            <Typography variant="body1">{description}</Typography>
          </Box>
        )}

        {button && button}
      </Box>
    );
  }

  if (type === 'card') {
    return (
      <Box padding={padding} textAlign="center">
        {title && (
          <Box mb={!description && button ? 2 : 0}>
            <Typography variant={variant}>{title}</Typography>
          </Box>
        )}

        {description && (
          <Box mb={button && 2}>
            <Typography variant="body1">{description}</Typography>
          </Box>
        )}

        {button && button}
      </Box>
    );
  }
};

EmptyState.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  padding: PropTypes.number,

  title: PropTypes.string,
  description: PropTypes.string,
  button: PropTypes.element,
};

export default EmptyState;
