import { Formik } from 'formik';
import { useAuth } from 'hooks/useAuth';
import Link from 'next/link';
import { FC, useState } from 'react';
import Button from 'src/components/UI/Button';
import Input from 'src/components/UI/Input';

interface IResetPasswordForm {
  clientId: string;
  redirectUri: string;
}

const ResetPasswordForm: FC<IResetPasswordForm> = ({ clientId, redirectUri }) => {
  const { loading, resetPassword } = useAuth();
  const [message, setMessage] = useState('');

  return (
    <>
      <Formik
        initialValues={{
          password: '',
          passwordRepeat: '',
        }}
        validate={({ password, passwordRepeat }) => {
          const errors = {} as any;
          if (!password) {
            errors.password = 'Required';
          } else if (passwordRepeat != password) {
            errors.passwordRepeat = 'Passwords do not match';
          }
          return errors;
        }}
        onSubmit={async ({ password }, { setSubmitting, resetForm }) => {
          try {
            setMessage('Success! You can now login with you new password');
            await resetPassword(password);
          } catch (error) {
            setMessage('Something went wrong');
          }

          setSubmitting(false);
          resetForm();
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="password"
              name="password"
              labelName="New password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <Input
              type="password"
              name="passwordRepeat"
              labelName="Repeat password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.passwordRepeat}
            />
            {errors.passwordRepeat && touched.passwordRepeat && errors.passwordRepeat}
            <Button type="submit" disabled={!isValid} showSpinner={loading}>
              Change
            </Button>
            {!loading && message && <h1>{message}</h1>}
            {!loading && message && (
              <Link href={`/auth/login?client_id=${clientId}&redirect_uri=${redirectUri}`}>
                <Button type={'button'}>Login</Button>
              </Link>
            )}
          </form>
        )}
      </Formik>
    </>
  );
};

export default ResetPasswordForm;
