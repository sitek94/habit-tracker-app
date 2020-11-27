import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxBlankIcon,
  IndeterminateCheckBox as IndeterminateCheckBoxIcon,
} from '@material-ui/icons';

// Green theme
const greenTheme = createMuiTheme({
  palette: {
    primary: green,
  },
});

// Red theme
const redTheme = createMuiTheme({
  palette: {
    primary: red,
  },
});

// Completed Checkmark
function CompletedCheckmark(props) {
  return (
    <ThemeProvider theme={greenTheme}>
      <IconButton
        aria-label="Completed checkmark"
        data-testid="checkmark-completed"
        color="primary"
        {...props}
      >
        <CheckBoxIcon />
      </IconButton>
    </ThemeProvider>
  );
}

// Failed Checkmark
function FailedCheckmark(props) {
  return (
    <ThemeProvider theme={redTheme}>
      <IconButton
        aria-label="Failed checkmark"
        data-testid="checkmark-failed"
        color="primary"
        {...props}
      >
        <IndeterminateCheckBoxIcon />
      </IconButton>
    </ThemeProvider>
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
