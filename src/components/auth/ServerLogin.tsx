import { useState } from 'react';
import { Formik } from 'formik';
import Input from '../UI/Input';
import Button from '../UI/Button';
import Link from 'next/link';

const ServerLogin = () => {
  const [loading, setLoading] = useState(false);
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
        onSubmit={async ({ email, password }, { setSubmitting, resetForm }) => {
          setLoading(true);
          console.log('submit', email, password);

          setSubmitting(false);
          resetForm();
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
