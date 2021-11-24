import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from "moment";
import { useNavigate, Link } from 'react-router-dom';


const DataTableFooter = function ({ url }) {
    return (
        <div style={{ textAlign: 'center', margin: 10 }}>
            <Link to={url}>View More</Link>
        </div>
    )
}


export default function DataTable({ data, type }) {


    return (
        <div style={{}}>
            <TableContainer component={Paper}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Payment</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                                key={row.title}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                                <TableCell align="right">{moment(type == 'income' ? row.dateOfIncome : row.dateOfExpense).format('YYYY-MM-DD')}</TableCell>
                                <TableCell align="right">{row.paymentMethod}</TableCell>
                                <TableCell align="right">{row.type}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <DataTableFooter url={type == 'income' ? '/income' : '/expense'}></DataTableFooter>
        </div>
    );
}
