import * as React from 'react';
import PropTypes from 'prop-types';
import { CHECKMARK_VALUES, COMPLETED, EMPTY, FAILED } from 'data/constants';
import {
  CompletedCheckmark,
  FailedCheckmark,
  EmptyCheckmark,
} from './checkmark-variants';

function Checkmark(props) {
  const { value } = props;

  switch (value) {
    case COMPLETED:
      return <CompletedCheckmark {...props} />;

    case FAILED:
      return <FailedCheckmark {...props} />;

    case EMPTY:
    default:
      return <EmptyCheckmark {...props} />;
  }
}

Checkmark.propTypes = {
  value: PropTypes.oneOf(CHECKMARK_VALUES).isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export { Checkmark };
