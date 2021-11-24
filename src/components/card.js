import { CardElement, useElements, useStripe, Elements, CardNumberElement, CardCvcElement, CardExpiryElement, PaymentElement } from '@stripe/react-stripe-js';
import StripeInput from './StripeInput';
import { useState, useEffect } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import axios, { Routes } from '../services/axios'
import { useLocation } from 'react-router-dom';

export default function Card({ setSuccess }) {

    const stripe = useStripe();
    let elements = useElements();

    const location = useLocation();

    console.log(location);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe) {
            return;
        }
        const result = await stripe.confirmPayment({
            elements, redirect: 'if_required'
        });

        if (result.paymentIntent) {
            setSuccess(true);
        }
    }

    return (
        <>
            <form id="payment-form" onSubmit={handleSubmit}>
                <h2 style={{ m: '0 auto' }}>Enter Your Card Details</h2>

                <Grid>
                    <PaymentElement />
                    <Button fullWidth color={'primary'} style={{ marginTop: 50 }} variant="contained" type="submit">Pay</Button>
                </Grid>
            </form>
        </>
    )
};