import * as React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import { CheckmarkIcon } from './checkmark-icon';
import { getCheckmarkLabel, getNextCheckmarkValue } from './helpers';
import { CHECKMARK_VALUES } from 'data/constants';

function Checkmark({ value, onClick, disabled }) {
  const nextLabel = getCheckmarkLabel(getNextCheckmarkValue(value));

  return (
    <IconButton
      data-testid="checkmark"
      aria-label={`Mark as ${nextLabel}?`}
      onClick={onClick}
      disabled={disabled}
    >
      <CheckmarkIcon fontSize="large" value={value} />
    </IconButton>
  );
}

Checkmark.propTypes = {
  value: PropTypes.oneOf(CHECKMARK_VALUES).isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export { Checkmark };
