import { Box, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, Button } from "@mui/material";
import { CardElement, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios, { Routes } from '../../services/axios'
import Card from '../../components/card';
import { useState, useEffect } from 'react';
import CustomizedSnackbars from "../../components/notification";

export default function Donate() {

    const [amount, setAmount] = useState(10);
    const [stripePromise, setStripePromise] = useState(null)
    const [opts, setOptions] = useState(null);
    const [success, setSuccess] = useState(false);
    const [disable, setDisable] = useState(false);


    useEffect(() => {
        const retrievePublishableKey = async () => {
            console.log(234);
            let { url, method } = Routes.api.getPublishableKey();
            let { data } = await axios[method](url);
            console.log(data);
            const stripe = loadStripe(data.key);
            setStripePromise(stripe)
        }
        retrievePublishableKey()
    }, []);

    async function donate() {
        setDisable(true);
        let { url, method } = Routes.api.createPaymentIntent();
        let { data } = await axios[method](url, { amount });
        setOptions(data)
    }

    function setSuccess1() {
        setSuccess(true)
        setDisable(false)
    }

    return (
        <Box sx={{ maxWidth: '500px', margin: '0 auto' }}>
            {success ? <CustomizedSnackbars errors={['Payment Succeed! Thank You.']} severity={'success'} /> : null}
            <h1>Donate</h1>
            <h2>By giving a little, you will help out a lot.</h2>

            <FormControl fullWidth sx={{ mt: 5 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    value={amount}
                    disabled={disable}
                    onChange={(e) => { setAmount(e.target.value) }}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label="Amount"
                />
            </FormControl>
            <Button
                fullWidth
                variant="contained"
                style={{ marginTop: 50 }}
                onClick={donate}
            >Make a Donation</Button>
            <div style={{ marginTop: 50 }}></div>
            {stripePromise && opts ?
                <Elements stripe={stripePromise} options={opts}>
                    <Card setSuccess={setSuccess1} />
                </Elements> : null
            }
        </Box >
    )
}