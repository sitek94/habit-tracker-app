import PropTypes from 'prop-types';
import { green } from '@material-ui/core/colors';
import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxBlankIcon,
  IndeterminateCheckBox as CheckboxFailedIcon,
} from '@material-ui/icons';

import { COMPLETED, FAILED, EMPTY } from 'data/constants';

function CheckmarkIcon({ value, ...props }) {
  switch (value) {
    case COMPLETED:
      return (
        <CheckBoxIcon
          style={{ color: green[500] }}
          data-testid="checkmark-completed"
          {...props}
        />
      );

    case FAILED:
      return (
        <CheckboxFailedIcon
          color="secondary"
          data-testid="checkmark-failed"
          {...props}
        />
      );

    case EMPTY:
    default:
      return <CheckBoxBlankIcon data-testid="checkmark-empty" {...props} />;
  }
}

CheckmarkIcon.propTypes = {
  value: PropTypes.number,
};

export { CheckmarkIcon };
