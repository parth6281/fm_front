import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useForm, Controller } from 'react-hook-form';
import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FilledInput from '@mui/material/FilledInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CustomizedSnackbars from '../components/notification';
import axios, { Routes } from '../services/axios'
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const Income = ({ }) => {

    const { incomeId } = useParams();

    const navigate = useNavigate();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = useState(false);

    function openCreateCategory() {
        setErrors(null);
        setOpen(true);
    }

    const [categoryList, setCategoryList] = useState([]);
    const [createCategoryName, setCreateCategoryName] = useState(null);
    const [title, setTitle] = useState(null);
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState(null);
    const [dateOfIncome, setDateOfIncome] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [createCategoryErrors, setCreateCategoryErrors] = useState(null);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        getCategoryList();
    }, []);

    async function getIncomeData(d) {
        try {
            const { url, method } = Routes.api.getIncome(incomeId);
            const { data } = await axios[method](url);
            console.log(`income data: `, data[0]);

            let category = d.find(l => l._id == data[0].categoryId);
            setCategory(data[0].categoryId);
            setTitle(data[0].title);
            setAmount(data[0].amount);
            setDateOfIncome(+new Date(data[0].dateOfIncome))
            setPaymentMethod(data[0].paymentMethod);
        } catch (err) {
        }
    }

    const getCategoryList = async () => {
        const userId = localStorage.getItem("userId")
            ? localStorage.getItem("userId")
            : "";
        try {
            const { url, method } = Routes.api.getAllIncomeCategory(userId);
            const { data } = await axios[method](url);
            if (incomeId) {
                getIncomeData(data.data);
            }
            setCategoryList(data.data);
        } catch (err) {
        }
    };

    const createIncomeCategory = async () => {
        setErrors(null);
        setCreateCategoryErrors(null);
        const userId = localStorage.getItem("userId")
            ? localStorage.getItem("userId")
            : "";
        console.log(createCategoryName);
        if (
            createCategoryName === null ||
            createCategoryName === "" ||
            isCategoryAlreadyExist(createCategoryName)
        ) {
            setCreateCategoryErrors('Category Already Exists');
            return;
        }
        try {
            const { url, method } = Routes.api.createIncomeCategory();
            const { data } = await axios[method](url, {
                name: createCategoryName,
                userId,
            });
            getCategoryList();
        } catch (err) {
            setCreateCategoryErrors('Something went wrong...');
        } finally {
            setOpen(false);
        }
    };

    const isCategoryAlreadyExist = (newCategoryName) => {
        if (categoryList) {
            const index = categoryList.findIndex(
                (category) =>
                    newCategoryName.toLowerCase() === category.name.toLowerCase()
            );
            if (index !== -1) {
                return true;
            }
        }
        return false;
    };

    function handleChange(e) {
        setCategory(e.target.value)
    }

    const handleSubmit = async (e) => {
        setErrors(null);
        e.preventDefault();
        const userId = localStorage.getItem("userId")
            ? localStorage.getItem("userId")
            : "";
        try {
            const { url, method } = Routes.api.saveIncome();
            const { data } = await axios[method](url, {
                title,
                categoryId: category,
                amount,
                dateOfIncome: +new Date(dateOfIncome),
                paymentMethod,
                userId,
            });
            navigate('/income');
        } catch (err) {

        }
    };

    async function editIncome(e) {
        e.preventDefault();
        const userId = localStorage.getItem("userId")
            ? localStorage.getItem("userId")
            : "";
        try {
            const { url, method } = Routes.api.editIncome(incomeId);
            const { data } = await axios[method](url, {
                title,
                categoryId: category,
                amount,
                dateOfIncome: +new Date(dateOfIncome),
                paymentMethod,
                userId,
            });
            navigate('/income');
        } catch (err) {
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            {errors ? <CustomizedSnackbars op={true} errors={[errors]} severity={'success'} /> : <></>}
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >

                <Box component="form" onSubmit={(e) => (incomeId ? editIncome(e) : handleSubmit(e))} sx={{ mt: 3 }}>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-autowidth">Select Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth"
                                id="demo-simple-select-fullWidth"
                                onChange={handleChange}
                                value={category}
                                fullWidth
                                label="Category"
                                required
                            >

                                {categoryList.map((category) => {
                                    return <MenuItem value={category._id}>{category.name}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Button color="primary" fullWidth
                                variant="outlined" onClick={openCreateCategory}> Create category</Button>
                            <Modal
                                keepMounted
                                open={open}
                                onClose={() => { setOpen(false) }}
                                aria-labelledby="keep-mounted-modal-title"
                                aria-describedby="keep-mounted-modal-description"
                            >
                                <Box sx={style}>
                                    {createCategoryErrors ? <CustomizedSnackbars op={true} errors={[createCategoryErrors]} severity={'error'} /> : <></>}
                                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                        <Grid item xs={12} sx={{ mb: 2 }}>
                                            <Typography id="transition-modal-title" variant="h5" component="h1">
                                                Create Category
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sx={{ mb: 2 }}>
                                            <TextField id="outlined-basic" type="text" label="Category Name" variant="outlined" fullWidth value={createCategoryName} required
                                                onChange={(e) => setCreateCategoryName(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button variant="contained" color="primary" fullWidth onClick={createIncomeCategory}>
                                                Submit Category
                                            </Button>
                                        </Grid>
                                    </Box>

                                </Box>
                            </Modal>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="outlined-basic" label="Title" variant="outlined" fullWidth required value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="outlined-basic" type="Number" label="Amount" variant="outlined" fullWidth required value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} fullWidth>
                                <DatePicker
                                    required
                                    fullWidth
                                    label="Date of income"
                                    value={dateOfIncome}
                                    onChange={(e) => setDateOfIncome(e)}
                                    renderInput={(params) => <TextField {...params} />}>

                                </DatePicker>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-autowidth-label">Payment Method</InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    fullWidth
                                    label="Payment Method"
                                    required
                                >
                                    <MenuItem value={'Cash'}>Cash</MenuItem>
                                    <MenuItem value={'Card'}>Card</MenuItem>
                                    <MenuItem value={'Online'}>Online</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>

                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                {incomeId ? 'Edit Income' : 'Submit Income'}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

        </Container >

    );
};

export default Income;