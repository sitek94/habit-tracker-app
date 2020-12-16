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
  return (
    <Box
      component={Paper}
      sx={{
        flex: { xs: 1, sm: 0 },
        width: { xs: '100%', sm: 'auto' },
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: { xs: 'center' },
        boxShadow: { xs: 0, sm: 5 },
        borderRadius: { xs: 0, sm: 1 },
        px: { sm: 14 },
        py: { xs: 6 },
      }}
    >
      <Box component="form" sx={{ maxWidth: 320 }} {...props}>
        {children}
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
        mb: 2,
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
  return (
    <Box
      sx={{
        '& > *:not(:last-child)': {
          mb: 2,
        },
      }}
    >
      {children}
    </Box>
  );
}

/**
 * Applies margin bottom to its children except for the last one
 */
function FormListContainer({ children }) {
  return (
    <Box
      sx={{
        '& > *:not(:last-child)': {
          mb: 1,
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
          fontWeight: 'medium',
        }}
      >
        {children}
      </Box>
    </Typography>
  );
}

/**
 * Combined Material-ui Link and RouterLink.
 */
function FormLink(props) {
  const { palette } = useTheme();

  const isDarkMode = palette.mode === 'dark';

  return (
    <Link
      component={RouterLink}
      color={isDarkMode ? 'textPrimary' : 'primary'}
      {...props}
    />
  );
}

/**
 * Uses `MuiLoadingButton`
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
          color: 'text.secondary',
          px: 1,
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
  return (
    <Box
      sx={{
        textAlign: 'center',
        typography: 'subtitle2',
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
  FormListContainer,
  FormPrimaryText,
  FormSecondaryText,
  FormErrorText,
  FormButton,
  FormDivider,
  FormLink,
};
