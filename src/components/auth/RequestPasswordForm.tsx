import { useState } from 'react';
import { Formik } from 'formik';
import Input from '../UI/Input';
import Button from '../UI/Button';

const RequestPasswordForm = () => {
  const [loading, setLoading] = useState(false);
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
          }
          return errors;
        }}
        onSubmit={async ({ email }, { setSubmitting, resetForm }) => {
          setLoading(true);
          console.log('submit', email);

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
          </form>
        )}
      </Formik>
    </>
  );
};

export default RequestPasswordForm;
