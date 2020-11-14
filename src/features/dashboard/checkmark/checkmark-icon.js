import PropTypes from 'prop-types';

import { green, yellow } from '@material-ui/core/colors';
import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxBlankIcon,
  IndeterminateCheckBox as CheckboxFailedIcon,
} from '@material-ui/icons';

import { COMPLETED, SKIPPED, FAILED, EMPTY } from 'data/constants';

function CheckmarkIcon({ value }) {
  switch (value) {
    case COMPLETED:
      return <CheckBoxIcon style={{ color: green[500] }} data-testid="checkmark-completed" />;

    case SKIPPED:
      return <CheckBoxIcon style={{ color: yellow[700] }} data-testid="checkmark-skipped" />;

    case FAILED:
      return <CheckboxFailedIcon color="secondary" data-testid="checkmark-failed" />;

    case EMPTY:
    default:
      return <CheckBoxBlankIcon data-testid="checkmark-empty" />;
  }
}

CheckmarkIcon.propTypes = {
  value: PropTypes.number,
};

export default CheckmarkIcon;
