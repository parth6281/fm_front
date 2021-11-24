import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Toolbar from '@mui/material/Toolbar';
import { Link, Navigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CustomizedSnackbars from '../components/notification.js';
import logo from '../public/images/logo.png';
import axios, { Routes } from '../services/axios'
import { useNavigate } from 'react-router-dom'


const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [errors, setError] = useState(null);
  const validateAlphaNumeric = (text) => {
    const regex = new RegExp(/^[a-zA-Z0-9]+$/i)
    if (!regex.test(text)) {
      return false
    }
    return true
  }

  const validateEmail = (email) => {
    const regex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
    if (!regex.test(email)) {
      return false
    }
    return true
  }

  const formValidator = function (firstName, lastName, email, password) {
    setError(null);
    let firstNameError = ''
    let lastNameError = ''
    let emailError = ''
    let passwordError = ''

    if (firstName.trim().length === 0) {
      firstNameError = 'First Name is Required'
    } else if (firstName && !validateAlphaNumeric(firstName.trim())) {
      firstNameError = 'First Name can only contain Alphanumeric characters'
    }

    if (lastName.trim().length === 0) {
      lastNameError = 'Last Name is Required'
    } else if (lastName && !validateAlphaNumeric(lastName.trim())) {
      lastNameError = 'Last Name can only contain Alphanumeric characters'
    }

    if (email.trim().length === 0) {
      emailError = 'Email is Required'
    } else if (email && !validateEmail(email.trim())) {
      emailError = 'Invalid Email'
    }

    if (password.length === 0) {
      passwordError = 'Password is Required'
    } else if (password.length > 0 && password.length < 8) {
      passwordError = 'Password Should be 8 characters or long'
    }

    if (
      firstNameError ||
      lastNameError ||
      emailError ||
      passwordError
    ) {
      let errors = [];

      if (firstNameError != '') {
        errors.push(firstNameError);
      }

      if (lastNameError != '') {
        errors.push(lastNameError);
      }

      if (emailError != '') {
        errors.push(emailError)
      }

      if (passwordError != '') {
        errors.push(passwordError);
      }

      console.log(errors)
      setError(errors);
      return false
    }

    return true
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fname = data.get('firstName')
    const lname = data.get('lastName');
    const email = data.get('email');
    const password = data.get('password');


    const isValid = formValidator(fname, lname, email, password);

    console.log(isValid)

    if (isValid) {
      setError(null);
      const name = fname + ' ' + lname;
      const { url, method } = Routes.api.register()
      const { data } = await axios[method](url, { name, email, password });

      if (data.error) {
        setError([data.error]);
      } else {
        const p = JSON.parse(atob(data.token.split('.')[1]));
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', p.userId);
        console.log(localStorage.getItem('token'));
        navigate('/');
      }
    }
  }


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - 240px)` },
          }}
        >
          <Toolbar>
            <Typography variant="h4" style={{ flexGrow: 1 }}>
              Finance Mantra
            </Typography>


          </Toolbar>
        </AppBar>
        <Toolbar style={{ position: 'fixed', left: 0, top: -10 }}>
          <img src={logo} style={{ maxWidth: '160px', height: '90px' }} />
        </Toolbar>
        <div style={{ marginTop: 100 }}>
          {errors ? <CustomizedSnackbars op={true} errors={errors} severity={'error'} /> : <></>}
        </div>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <AppBar position='fixed' sx={{
          bottom: 0, top: 'inherit', bgcolor: 'black', width: { sm: `calc(100%)` },
        }}
          component='footer'
        >
          <Toolbar variant='dense'>
            <Typography variant="small" noWrap component="div" sx={{ margin: 'auto' }}>
              Copyright @ 2021 | Finance Mantra
            </Typography>
          </Toolbar>
        </AppBar>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider >
  );
}
