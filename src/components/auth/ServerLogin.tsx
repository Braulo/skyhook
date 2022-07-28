import { Formik } from 'formik';
import Input from '../UI/Input';
import Button from '../UI/Button';
import Link from 'next/link';
import { useAuth } from 'hooks/useAuth';

const ServerLogin = () => {
  const { login, error: authError, loading } = useAuth();

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validate={({ email, password }) => {
          const errors = {} as any;
          if (!email) {
            errors.email = 'Required';
          } else if (!password) {
            errors.password = 'Required';
          }
          return errors;
        }}
        onSubmit={async ({ email, password }, { setSubmitting }) => {
          try {
            await login(email, password);
          } catch (error) {}

          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="text"
              name="email"
              labelName="E-Mail"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="peter@hello..."
            />
            {errors.email && touched.email && errors.email}
            <Input
              type="password"
              name="password"
              labelName="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <h1>{authError}</h1>
            <div className="self-start mt-4">
              <Link href={'/auth/password/request'} className="self-start mt-4">
                Forgot password?
              </Link>
            </div>
            <Button type="submit" disabled={!isValid} showSpinner={loading}>
              Login
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ServerLogin;
