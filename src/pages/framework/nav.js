import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/HomeTwoTone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CallIcon from '@mui/icons-material/Call';
import { Link } from 'react-router-dom';
import logo from '../../public/images/logo.png';
import { Outlet } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Contact from '../contact/contact'
import CustomizedBreadcrumbs from '../../components/breadcrumb'
import { About } from '../about/about';
import './nav.css';
import SignUp from '../signup';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const drawerWidth = 240;

function Framework(props) {
    const navigate = useNavigate();
    let payload = {};

    const status = localStorage.getItem('token')
    console.log(status);
    if (!status) {
        navigate('/login');
    } else {
        const p = JSON.parse(atob(status.split('.')[1]));
        console.log(p);
        if (p.exp > (Date.now() / 1000)) {
            payload = p;
        } else {
            payload = {};
            navigate('/login');
        }
    }

    const path = document.location.pathname.split('/').slice(1);

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);



    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    function navigateTo(path) {
        navigate(path);
    }

    function logout() {
        console.log('logout');
        localStorage.removeItem('token');
        payload = {}
        navigate('/login');
    }

    const drawer = (
        <div>
            <Toolbar >
                <img src={logo} style={{ width: '100%', height: '100%' }} />
            </Toolbar>
            <Divider />
            <List>
                <ListItem key={'Home'} component={Link} to={"/dashboard"} sx={{ cursor: 'pointer', color: 'black' }}>
                    <HomeIcon sx={{ mr: '25px' }} />
                    <ListItemText primary={'Home'} />
                </ListItem >
                <ListItem key={'Income'} component={Link} to={"/income"} sx={{ cursor: 'pointer', color: 'black' }}>
                    <AssessmentIcon sx={{ mr: '25px' }} />
                    <ListItemText primary={'Income'} />
                </ListItem>
                {/* <ListItem key={'Expense'} sx={{ cursor: 'pointer', color: 'black' }}>
                    <AssessmentIcon sx={{ mr: '25px' }} />
                    <ListItemText primary={'Expense'} />
                </ListItem> */}
                <ListItem key={'Expense'} component={Link} to={"/expense"} sx={{ cursor: 'pointer', color: 'black' }}>
                    <AssessmentIcon sx={{ mr: '25px' }} />
                    <ListItemText primary={'Expense'} />
                </ListItem>
                <ListItem key={'Reports'} component={Link} to={"/reports"} sx={{ cursor: 'pointer', color: 'black' }}>
                    <AssessmentIcon sx={{ mr: '25px' }} />
                    <ListItemText primary={'Reports'} />
                </ListItem>
                <ListItem key={'Donate'} sx={{ cursor: 'pointer', color: 'black' }} component={Link} to={"/donate"} >
                    <AssessmentIcon sx={{ mr: '25px' }} />
                    <ListItemText primary={'Donate'} />
                </ListItem>
                <ListItem key={'About Us'} component={Link} to={"/about"} sx={{ cursor: 'pointer', color: 'black' }}>
                    <AssessmentIcon sx={{ mr: '25px' }} />
                    <ListItemText primary={'About Us'} />
                </ListItem>
                <ListItem key={'Contact Us'} component={Link} to={"/contact"} sx={{ cursor: 'pointer', color: 'black' }}>
                    <CallIcon sx={{ mr: '25px' }} />
                    <ListItemText primary={'Contact US'} />
                </ListItem>
            </List>

        </div >
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >

                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Finance Mantra
                    </Typography>

                    <AccountCircleIcon />

                    <div className="profile">
                        <p onClick={handleClick}>{payload.name ? payload.name.split(' ')[0] : ''}</p>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={logout}>Logout</MenuItem>
                        </Menu>
                    </div>




                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="navigation items"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="persistent"
                    open
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}

                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="div"
                sx={{ flexGrow: 1, p: 3, height: '950px', overflow: 'auto', width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >

                <Toolbar />
                <CustomizedBreadcrumbs path={path} />
                <Box
                    component="main"
                    sx={{ width: '100%', overflow: 'auto' }}

                >
                    <Outlet />
                </Box>
            </Box>
            <AppBar position='fixed' sx={{
                bottom: 0, top: 'inherit', bgcolor: 'black', width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
            }}
                component='footer'
            >
                <Toolbar variant='dense'>
                    <Typography variant="small" noWrap component="div" sx={{ margin: 'auto' }}>
                        Copyright @ 2021 | Finance Mantra
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box >

    );
}


export default Framework;
