import { Formik } from 'formik';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { useAuth } from 'hooks/useAuth';
import { useState } from 'react';

const ServerRegister = () => {
  const { loading, register, error: authError } = useAuth();
  const [registerMessage, setRegisterMessage] = useState('');

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          username: '',
          password: '',
          passwordRepeat: '',
        }}
        validate={({ email, username, password, passwordRepeat }) => {
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
          } else if (!password) {
            errors.password = 'Required';
          } else if (!username) {
            errors.username = 'Required';
          } else if (!passwordRepeat) {
            errors.passwordRepeat = 'Required';
          } else if (password != passwordRepeat) {
            errors.passwordRepeat = 'Passwords do not match';
          }

          return errors;
        }}
        onSubmit={async ({ email, username, password }, { setSubmitting }) => {
          try {
            await register(email, username, password);
            setRegisterMessage('Successfully registered! you can now login!');
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
              type="text"
              name="username"
              labelName="Username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              placeholder="Peter"
            />
            {errors.username && touched.username && errors.username}
            <Input
              type="password"
              name="password"
              labelName="Password"
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
            <h1>{authError}</h1>
            <h1>{registerMessage}</h1>
            <Button type="submit" disabled={!isValid} showSpinner={loading}>
              Register
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ServerRegister;
