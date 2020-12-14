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
  FormListContainer,
  FormPrimaryText,
  FormSecondaryText,
} from 'components/form';
import { useAuth } from 'context/auth-context';
import { signInSchema } from 'data/constraints';
import { useTranslation, translations } from 'translations';
import { useForm } from 'react-hook-form';
import { useAsync } from 'utils/hooks';
import { SignInAsGuestButton } from 'components/sign-in-as-guest-button';

function SignInScreen() {
  const t = useTranslation(translations);

  const { signIn, signInWithAuthProvider, signInAsGuest } = useAuth();
  const { isLoading, isError: isAuthError, error: authError, run } = useAsync();

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(signInSchema),
    reValidateMode: 'onSubmit',
  });

  // Form submit
  const onSubmit = ({ email, password }) => {
    run(signIn({ email, password }));
    reset();
  };

  // Auth provider click
  const handleAuthProviderClick = (event, provider) => {
    // Prevents the form from submitting and triggering the form errors
    event.preventDefault();

    run(signInWithAuthProvider(provider));
  };

  // Sign in as Guest click
  const handleSignInAsGuestClick = () => {
    run(signInAsGuest());
  };

  const errorMessages = Object.values(errors);
  const isError = isAuthError || errorMessages.length !== 0;
  const errorMessage = authError?.message || errorMessages[0]?.message;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>
        <FormPrimaryText>{t('signIn')}</FormPrimaryText>
        <FormSecondaryText>
          {t('noAccountQuestion')}{' '}
          <FormLink to="/signup">{t('signUp')}</FormLink>
        </FormSecondaryText>
        <FormErrorText>{isError ? errorMessage : ' '}</FormErrorText>
      </FormHeader>

      <FormBody>
        <FormListContainer>
          <AuthProviderList
            text={t('signInWith')}
            onAuthProviderClick={handleAuthProviderClick}
            disabled={isLoading}
          />

          <SignInAsGuestButton
            label={t('signInAsGuest')}
            disabled={isLoading}
            onClick={handleSignInAsGuestClick}
          />
        </FormListContainer>

        <FormDivider />

        <TextField
          inputRef={register}
          name="email"
          autoComplete="email"
          label={t('email')}
          placeholder={t('emailPlaceholder')}
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
          label={t('password')}
          placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
          error={!!errors?.password}
          disabled={isLoading}
          variant="outlined"
          fullWidth
        />

        <FormButton type="submit" pending={isLoading}>
          {t('signIn')}
        </FormButton>

        <FormSecondaryText>
          <FormLink to="/reset-password">{t('forgotPassword')}</FormLink>
        </FormSecondaryText>
      </FormBody>
    </Form>
  );
}

export { SignInScreen };
