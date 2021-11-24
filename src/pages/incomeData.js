import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import moment from "moment";
import axios, { Routes } from '../services/axios'
import { useNavigate } from 'react-router-dom';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function IncomeData() {

    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedIncome, setSelectedIncome] = useState(null);

    function handleClose() {
        setOpen(false);
    };

    async function confirmDelete(id) {
        const userId = localStorage.getItem("userId")
            ? localStorage.getItem("userId")
            : "";
        try {
            const { url, method } = Routes.api.deleteIncome(selectedIncome);
            const { data } = await axios[method](url);
            loadIncomeData();
        } catch (err) {
        }
        setOpen(false);
    }

    function deleteIncome(id) {
        setOpen(true);
        setSelectedIncome(id);
    }

    useEffect(() => {
        loadIncomeData();
    }, [])

    function handleEdit(e) {
        navigate(`/newIncome/${e}`);
    }


    function createData(id, title, category, categoryId, amount, dateOfExp, paymentMethod, actions) {
        let i =
            { id, title, category, categoryId, amount, dateOfExp, paymentMethod, actions };
        return i;
    }


    const loadIncomeData = async () => {
        const userId = localStorage.getItem("userId")
            ? localStorage.getItem("userId")
            : "";
        try {
            const { url, method } = Routes.api.getAllIncome(userId);
            const { data } = await axios[method](url);
            let rws = data.data;
            rws = rws.map(row => {
                return createData(row._id, row.title, row.categoryName, row.categoryId, row.amount, moment(row.dateOfIncome).format('YYYY-MM-DD'), row.paymentMethod,
                )
            });
            console.log(rws);
            setRows(rws);
        } catch (err) {

        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: { md: '100%', lg: '80%' }, m: 'auto' }}>
                <TableContainer component={Paper}>
                    <Table sx={{}} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow >
                                <TableCell style={{ fontWeight: 'bold' }}>Title</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }} align="right">Category</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }} align="right">Amount</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }} align="right">Date Of Income</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }} align="right">Payment Method</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }} align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.title}
                                    </TableCell>
                                    <TableCell align="right">{row.category}</TableCell>
                                    <TableCell align="right">{row.amount}</TableCell>
                                    <TableCell align="right">{row.dateOfExp}</TableCell>
                                    <TableCell align="right">{row.paymentMethod}</TableCell>
                                    <TableCell align="right">
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                            <Button
                                                variant='outlined'
                                                onClick={() => handleEdit(row.id)}
                                                buttonTitle={"Edit"}
                                            >Edit</Button>
                                            <Button
                                                variant='outlined'
                                                onClick={() => deleteIncome(row.id)}
                                                buttonTitle={"Delete"}
                                            >Delete</Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer >
            </Box >
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete Income"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Delete the selected Income ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={confirmDelete}>Yes</Button>
                    <Button onClick={handleClose} autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
            <SpeedDial
                ariaLabel="SpeedDial uncontrolled open example"
                sx={{ position: 'absolute', bottom: 90, right: 45 }}
                icon={<SpeedDialIcon />}
                onClick={() => { navigate('/newIncome') }}
                open={false}
            ></SpeedDial>
        </Box >
    );
}