import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@material-ui/core';
import { AuthProviderList } from 'components/auth-providers-list';
import {
  Form,
  FormBody,
  FormButton,
  FormDivider,
  FormErrorText,
  FormHeader,
  FormLink,
  FormPrimaryText,
  FormSecondaryText,
} from 'components/form';
import { useAuth } from 'context/auth-context';
import { signInSchema } from 'data/constraints';
import { useForm } from 'react-hook-form';
import { useAsync } from 'utils/hooks';

function SignInScreen() {
  const { signIn, signInWithAuthProvider } = useAuth();
  const { isLoading, isError: isAuthError, error: authError, run } = useAsync();

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(signInSchema),
    reValidateMode: 'onSubmit',
  });

  const onSubmit = ({ email, password }) => {
    run(signIn({ email, password }));
    reset();
  };

  const handleAuthProviderClick = (event, provider) => {
    // Prevents the form from submitting and triggering the form errors
    event.preventDefault();

    run(signInWithAuthProvider(provider));
  }

  const errorMessages = Object.values(errors);
  const isError = isAuthError || errorMessages.length !== 0;
  const errorMessage = authError?.message || errorMessages[0]?.message;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>
        <FormPrimaryText>Sign in</FormPrimaryText>
        <FormSecondaryText>
          Don't have an account? <FormLink to="/signup">Sign up</FormLink>
        </FormSecondaryText>
        <FormErrorText>{isError ? errorMessage : ' '}</FormErrorText>
      </FormHeader>

      <FormBody>
        <AuthProviderList
          text="Sign in with"
          onAuthProviderClick={handleAuthProviderClick}
          disabled={isLoading}
        />

        <FormDivider />

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

        <TextField
          inputRef={register}
          name="password"
          type="password"
          autoComplete="current-password"
          label="Password"
          placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
          error={!!errors?.password}
          disabled={isLoading}
          variant="outlined"
          fullWidth
        />

        <FormButton type="submit" pending={isLoading}>
          Sign in
        </FormButton>

        <FormSecondaryText>
          Forgot password? <FormLink to="/reset-password">Reset here</FormLink>
        </FormSecondaryText>
      </FormBody>
    </Form>
  );
}

export { SignInScreen };
