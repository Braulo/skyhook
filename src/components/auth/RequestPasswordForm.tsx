import { Formik } from 'formik';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { useAuth } from 'hooks/useAuth';
import { useState } from 'react';

const RequestPasswordForm = () => {
  const { forgotPassword, loading, error } = useAuth();

  const [message, setMessage] = useState('');

  return (
    <>
      <Formik
        initialValues={{
          email: '',
        }}
        validate={({ email }) => {
          const errors = {} as any;
          if (!email) {
            errors.email = 'Required';
          } else if (
            !email
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              )
          ) {
            errors.email = 'Not a valid E-Mail';
          }
          return errors;
        }}
        onSubmit={async ({ email }, { setSubmitting, resetForm }) => {
          try {
            await forgotPassword(email);
            setMessage('Reset password email was send!');
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
              type="text"
              name="email"
              labelName="E-Mail"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="peter@hello..."
            />
            {errors.email && touched.email && errors.email}
            <Button type="submit" disabled={!isValid} showSpinner={loading}>
              Send
            </Button>
            {!loading && message && <h1>{message}</h1>}
          </form>
        )}
      </Formik>
    </>
  );
};

export default RequestPasswordForm;
