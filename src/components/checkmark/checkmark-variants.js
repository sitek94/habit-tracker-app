import { IconButton } from '@material-ui/core';
import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxBlankIcon,
  IndeterminateCheckBox as IndeterminateCheckBoxIcon,
} from '@material-ui/icons';

// Completed Checkmark
function CompletedCheckmark(props) {
  return (
    <IconButton
      aria-label="Completed checkmark"
      data-testid="checkmark-completed"
      color="primary"
      {...props}
    >
      <CheckBoxIcon />
    </IconButton>
  );
}

// Failed Checkmark
function FailedCheckmark(props) {
  return (
    <IconButton
      aria-label="Failed checkmark"
      data-testid="checkmark-failed"
      color="secondary"
      {...props}
    >
      <IndeterminateCheckBoxIcon />
    </IconButton>
  );
}

// Empty Checkmark
function EmptyCheckmark(props) {
  return (
    <IconButton
      aria-label="Empty checkmark"
      data-testid="checkmark-failed"
      {...props}
    >
      <CheckBoxBlankIcon />
    </IconButton>
  );
}

export { CompletedCheckmark, FailedCheckmark, EmptyCheckmark };
