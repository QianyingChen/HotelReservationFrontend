import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Card, CardContent, Grid, Snackbar, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserMutation } from '../../api/userApi';

type SignUpFormData = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
};

const SignUpForm = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>();
  const [createUser, { isError }] = useCreateUserMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await createUser({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        password: data.password,
        email: data.email,
        phoneNumber: data.phoneNumber,
      });

      if ('data' in response) {
        setSnackbarMessage('User signed up successfully!');
        setOpenSnackbar(true);
        navigate('/user'); // Redirect to the user page
      } else {
        throw new Error('Failed to sign up.');
      }
    } catch (error: any) {
      if (error.response?.data?.message === 'Username is already taken') {
        setSnackbarMessage('User name already taken');
      } else {
        setSnackbarMessage('Failed to sign up. Please try again later.');
      }
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '88vh' }}>
      <Card style={{ width: '300px' }}>
        <CardContent>
          <h1 style={{ textAlign: 'center' }}>Sign Up</h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={2}>
             <Grid item xs={12}>
                <TextField
                  {...register('firstName', {
                    required: 'First name is required',
                  })}
                  variant="outlined"
                  fullWidth
                  label="First Name"
                  autoFocus
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  {...register('lastName', {
                    required: 'Last name is required',
                  })}
                  variant="outlined"
                  fullWidth
                  label="Last Name"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('username', {
                    required: 'Username is required',
                  })}
                  variant="outlined"
                  fullWidth
                  label="Username"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  variant="outlined"
                  fullWidth
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('email', {
                    required: 'Email is required',
                  })}
                  variant="outlined"
                  fullWidth
                  label="Email"
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('phoneNumber', {
                    required: 'Phone number is required',
                  })}
                  variant="outlined"
                  fullWidth
                  label="Phone Number"
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message} 
                />
              </Grid>
            </Grid>
            <Grid item xs={12} >
              <Button variant="contained" type="submit" fullWidth>
                Submit
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
              <Link to="/signin">Already have an account? Sign in</Link>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </div>
  );
};

export default SignUpForm;
