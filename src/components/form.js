import { LoadingButton } from '@material-ui/lab';
import { Link as RouterLink } from 'react-router-dom';
import {
  Divider,
  Typography,
  FormHelperText,
  Box,
  Paper,
  Link,
  useTheme,
} from '@material-ui/core';
import { useTranslation } from 'translations';

/**
 * Main form wrapper component
 */
function Form({ children, ...props }) {
  const theme = useTheme();

  return (
    <Box
      component={Paper}
      sx={{
        maxWidth: 550,
        height: { xs: '100%', sm: 'auto' },
        width: { xs: '100%', sm: 'auto' },
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: 5,
      }}
    >
      <Box
        sx={{
          maxWidth: 320,
          margin: { sm: theme.spacing(6, 14) },
          paddingTop: { xs: theme.spacing(3), sm: 0 },
        }}
      >
        <form {...props}>{children}</form>
      </Box>
    </Box>
  );
}

/**
 * Form header
 */
function FormHeader({ children }) {
  return (
    <Box
      sx={{
        marginBottom: 2,
      }}
    >
      {children}
    </Box>
  );
}

/**
 * Form body
 */
function FormBody({ children }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        '& > *:not(:last-child)': {
          marginBottom: theme.spacing(2),
        },
      }}
    >
      {children}
    </Box>
  );
}

/**
 * Form primary text
 */
function FormPrimaryText({ children }) {
  return (
    <Typography component="h1" variant="h5" align="center" gutterBottom>
      {children}
    </Typography>
  );
}

/**
 * Form secondary text
 */
function FormSecondaryText({ children, ...props }) {
  return (
    <Typography color="textSecondary" component="div" align="center" {...props}>
      <Box
        sx={{
          fontWeight: 'fontWeightMedium',
        }}
      >
        {children}
      </Box>
    </Typography>
  );
}

/**
 * Form link
 *
 * Combined Material-ui Link and RouterLink.
 */
function FormLink(props) {
  const { palette } = useTheme();

  const isDarkMode = palette.mode === 'dark';

  return <Link component={RouterLink} color={isDarkMode ? 'textPrimary' : 'primary'} {...props} />;
}

/**
 * Form button
 */
function FormButton(props) {
  return <LoadingButton fullWidth variant="contained" {...props} />;
}

/**
 * Form divider
 *
 * Uses two horizontal dividers and "or" in between.
 */
function FormDivider() {
  const theme = useTheme();
  const t = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box sx={{ flex: 1 }} clone>
        <Divider />
      </Box>
      <Box
        component="span"
        sx={{
          color: theme.palette.text.secondary,
          padding: theme.spacing(0, 1),
          textTransform: 'uppercase',
        }}
      >
        {t('or')}
      </Box>
      <Box sx={{ flex: 1 }} clone>
        <Divider />
      </Box>
    </Box>
  );
}

/**
 * Form error text
 */
function FormErrorText({ children }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        textAlign: 'center',
        ...theme.typography.subtitle2,
      }}
    >
      <FormHelperText error>{children}</FormHelperText>
    </Box>
  );
}

export {
  Form,
  FormBody,
  FormHeader,
  FormPrimaryText,
  FormSecondaryText,
  FormErrorText,
  FormButton,
  FormDivider,
  FormLink,
};
