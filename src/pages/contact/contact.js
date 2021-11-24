import React from 'react';
import { Grid, TextField, Button, Card, CardContent, Typography, Box } from '@material-ui/core';
import axios, { Routes } from '../../services/axios'
import { useState, useEffect } from 'react';
import CustomizedSnackbars from '../../components/notification.js';

function Contact() {

  const [profile, setProfile] = useState({});
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const [errors, setError] = useState(null);

  useEffect(() => {
    loadProfileData();
  }, []);

  const validateAlphaNumeric = (text) => {
    const regex = new RegExp(/^[a-zA-Z0-9\s]+$/i)
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

  const validatePhone = (phone) => {
    const regex = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
    if (!regex.test(phone)) {
      return false
    }
    return true

  }

  const formValidator = function (name, email, phone, message) {
    setError(null);
    let nameError = ''
    let phoneError = ''
    let emailError = ''
    let messageError = ''

    if (name.trim().length === 0) {
      nameError = 'Name is Required'
    } else if (name && !validateAlphaNumeric(name.trim())) {
      nameError = 'Name can only contain Alphanumeric characters'
    }

    if (email.trim().length === 0) {
      emailError = 'Email is Required'
    } else if (email && !validateEmail(email.trim())) {
      emailError = 'Invalid Email'
    }

    if (phone.trim().length === 0) {
      phoneError = 'Phone is Required'
    } else if (phone && !validatePhone(phone.trim())) {
      phoneError = 'Invalid Phone Number'
    }

    if (message.trim().length === 0) {
      messageError = 'Message is Required'
    }

    if (
      nameError ||
      emailError ||
      phoneError ||
      messageError
    ) {
      let errors = [];

      if (nameError != '') {
        errors.push(nameError);
      }

      if (emailError != '') {
        errors.push(emailError);
      }

      if (phoneError != '') {
        errors.push(phoneError)
      }

      if (messageError != '') {
        errors.push(messageError);
      }

      console.log(errors)
      setError(errors);
      return false
    }

    return true
  }

  async function loadProfileData() {
    const userId = localStorage.getItem("userId")
      ? localStorage.getItem("userId")
      : "";
    const { url, method } = Routes.api.getProfile(userId);
    const { data } = await axios[method](url);

    console.log(data)

    setName(name);
    setEmail(email);
    setProfile(data);
  }

  async function onSubmit() {
    const isValid = formValidator(name, email, phone, message);

    if (isValid) {
      const { url, method } = Routes.api.sendEmail();
      const { data } = await axios[method](url, { name, email, message, phone, _id: profile._id });

      setSuccess(true);
    }
  }

  return (
    <Grid>

      {/* <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
        <CardContent> */}
      <Box sx={{ maxWidth: '500px', margin: '0 auto' }}>
        <Typography gutterBottom variant="h3" align='center'>
          Contact Us
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
          Fill up the form and our team will get back to you within 24 hours.
        </Typography>
        <div style={{ padding: 10 }}>
          {errors ? <CustomizedSnackbars op={true} errors={errors} severity={'error'} /> : <></>}
          {success ? <CustomizedSnackbars op={true} errors={["We'll contact you Soon! Thank you."]} severity={'success'} /> : <></>}
        </div>
        <form>
          <Grid container spacing={1}>
            <Grid xs={12} item>
              <TextField placeholder="Enter name" label="Name" variant="outlined" fullWidth required value={name} onChange={(e) => setName(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField type="email" placeholder="Enter email" label="Email" variant="outlined" fullWidth required value={email} onChange={(e) => setEmail(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField type="number" placeholder="Enter phone number" label="Phone" variant="outlined" fullWidth required value={phone} onChange={(e) => { setPhone(e.target.value) }} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Message" multiline rows={4} placeholder="Type your message here" variant="outlined" fullWidth required value={message} onChange={(e) => { setMessage(e.target.value) }} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={onSubmit} fullWidth>Submit</Button>
            </Grid>

          </Grid>
        </form>
      </Box>
      {/* </CardContent>
      </Card> */}
    </Grid>
  );
}

export default Contact;