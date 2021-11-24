import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CustomizedSnackbars from '../components/notification.js';
import axios, { Routes } from '../services/axios'
import { useNavigate } from 'react-router-dom'
import logo from '../public/images/logo.png';

const theme = createTheme();

export default function Login() {

    const navigate = useNavigate();
    const [errors, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        let d = new FormData(event.currentTarget);

        const email = d.get('email');
        const password = d.get('password');

        const { url, method } = Routes.api.login()
        try {
            const { data } = await axios[method](url, { email, password });
            if (data.message) {
                setError([data.message]);
            } else {
                const p = JSON.parse(atob(data.token.split('.')[1]));
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', p.userId);
                console.log(localStorage.getItem('token'));
                navigate('/');

            }
        } catch (err) {
            console.log(err);
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
                        Log In
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
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
                            Log In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/signup">
                                    Don't have an account? Register
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/* <Copyright sx={{ mt: 5 }} /> */}
            </Container>
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
        </ThemeProvider >
    );
}
