import PropTypes from 'prop-types';

import { CircularProgress } from '@material-ui/core';

import AbsoluteCenter from 'components/absolute-center';

const Loader = ({ size = 100 }) => {
  return (
    <AbsoluteCenter>
      <CircularProgress size={size} />
    </AbsoluteCenter>
  );
};

Loader.propTypes = {
  size: PropTypes.number,
}

export default Loader;
