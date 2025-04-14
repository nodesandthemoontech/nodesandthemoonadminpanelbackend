import * as yup from 'yup';

export const createUserSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Please Enter valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const loginUserSchema = yup.object({
  email: yup
    .string()
    .email('Please Enter valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const logoutUserSchema = yup.object({
  email: yup
    .string()
    .email('Please Enter valid email')
    .required('Email is required'),
  refreshToken: yup.string().required('Refresh token is required'),
});
