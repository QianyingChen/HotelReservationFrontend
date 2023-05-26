import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Card, CardContent, Grid, Snackbar, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSignInUserMutation } from '../../api/userApi';
import { Link } from 'react-router-dom';

type SignInFormData = {
  username: string;
  password: string;
};

const SignInForm = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>();
 // const [signInUser, { isError }] = useSignInUserMutation();
  const [signInUser] = useSignInUserMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await signInUser({
        username: data.username,
        password: data.password,
      });

      if ('data' in response) {
        setSnackbarMessage('User signed in successfully!');
        setOpenSnackbar(true);
        navigate('/users'); // Redirect to the user page
      } else {
        throw new Error('Failed to sign in.');
      }
    } catch (error: any) {
      setSnackbarMessage('Invalid username or password.');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: '300px' }}>
        <CardContent>
          <h1 style={{ textAlign: 'center' }}>Sign In</h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...register("username", {
                    required: "Username is required",
                  })}
                  variant="outlined"
                  margin="normal"
                  id="username"
                  label="Username"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("password", {
                    required: "Password is required",
                  })}
                  variant="outlined"
                  margin="normal"
                  id="password"
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" type="submit" fullWidth>
                  Sign In
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '16px' }}>
            <Link to="/users/signup">Don't have an account? Sign up</Link>
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

export default SignInForm;

