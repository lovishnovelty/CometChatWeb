import React from 'react';
import { useForm } from 'react-hook-form';

export const LoginPage = () => {
  const { handleSubmit, register, errors }: any = useForm();

  const onSubmit = (data: any) => {
    console.log(data);

    // authenticate user's credentials and log them in using CometChat's SDK
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Email or username"
          name="email"
          ref={register({ required: true })}
        />
        {errors.email && <p>This field is required</p>}

        <input
          type="password"
          placeholder="Password"
          name="password"
          ref={register({ required: true })}
        />
        {errors.password && <p>This field is required</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};
