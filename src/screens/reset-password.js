import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@material-ui/core';
import {
  Form,
  FormBody,
  FormButton,
  FormErrorText,
  FormHeader,
  FormLink,
  FormPrimaryText,
  FormSecondaryText,
} from 'components/form';
import { useAuth } from 'context/auth-context';
import { useSnackbar } from 'context/snackbar-context';
import { resetPasswordSchema } from 'data/constraints';
import { useForm } from 'react-hook-form';
import { useAsync } from 'utils/hooks';

function ResetPasswordScreen() {
  const { resetPassword } = useAuth();
  const { openSnackbar } = useSnackbar();
  const { isLoading, isError: isAuthError, error: authError, run } = useAsync();

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = ({ email }) => {
    run(
      resetPassword({ email }).then(() => {
        openSnackbar('success', `Sent password reset email to ${email}`);
      })
    );
    reset();
  };

  const errorMessages = Object.values(errors);
  const isError = isAuthError || errorMessages.length !== 0;
  const errorMessage = authError?.message || errorMessages[0]?.message;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>
        <FormPrimaryText>Reset password</FormPrimaryText>
        <FormErrorText>{isError ? errorMessage : ' '}</FormErrorText>
      </FormHeader>

      <FormBody>
        <TextField
          inputRef={register}
          name="email"
          autoComplete="email"
          label="Email address"
          placeholder="john@doe.com"
          error={!!errors?.email}
          disabled={isLoading}
          variant="outlined"
          fullWidth
        />
        <FormButton type="submit" disabled={isLoading}>
          Reset
        </FormButton>

        <FormSecondaryText>
          Already have an account? <FormLink to="/signin">Sign in</FormLink>
        </FormSecondaryText>
      </FormBody>
    </Form>
  );
}

export { ResetPasswordScreen };
