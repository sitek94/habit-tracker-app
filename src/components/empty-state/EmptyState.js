import PropTypes from 'prop-types';

import { Box, Typography } from '@material-ui/core';

import AbsoluteCenter from 'components/absolute-center';

const EmptyState = ({
  type = 'page',
  size = 'medium',
  padding = 2,
  image,
  title,
  description,
  button,
}) => {
  let imageWidth, imageHeight, variant;

  switch (size) {
    case 'small':
      imageWidth = 40;
      imageHeight = 40;
      variant = 'h6';
      break;

    case 'medium':
      imageWidth = 60;
      imageHeight = 60;
      variant = 'h5';
      break;

    case 'large':
      imageWidth = 100;
      imageHeight = 100;
      variant = 'h4';
      break;

    default:
      imageWidth = 60;
      imageHeight = 60;
      variant = 'h5';
      break;
  }

  if (type === 'page') {
    return (
      <AbsoluteCenter>
        {image && (
          <Box
            clone
            mb={title || description ? 2 : 0}
            width={`${imageWidth}%`}
            height={`${imageHeight}%`}
          >
            {image}
          </Box>
        )}

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
      </AbsoluteCenter>
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

  image: PropTypes.element,
  title: PropTypes.string,
  description: PropTypes.string,
  button: PropTypes.element,
};

export default EmptyState;
