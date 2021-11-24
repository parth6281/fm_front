import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Divider, Typography } from '@mui/material';
import './dashboard.css';
import styled from '@mui/styled-engine';
import incomeImg from '../../public/images/income.jpg';
import expenseImg from '../../public/images/expense.jpg';
import DataTable from '../../components/datagrid';
import { useNavigate } from 'react-router-dom';
import axios, { Routes } from '../../services/axios'

const SPaper = styled(Paper)({ backgroundColor: '#f5f5f5' });

export default function Dashboard() {

    const [income, setIncome] = useState(null);
    const [expense, setExpense] = useState(null);
    const [incomeSum, setIncomeSum] = useState(0);
    const [expenseSum, setExpenseSum] = useState(0);
    const navigate = useNavigate();

    const userId = localStorage.getItem("userId")
        ? localStorage.getItem("userId")
        : "";

    if (!userId) {
        navigate('/login');
    }

    useEffect(() => {
        const { url, method } = Routes.api.getAllIncome(userId);
        loadData({ url, method, type: 'income' }).then(income => {
            loadData({ ...Routes.api.getAllExpense(userId), type: 'expense' }).then(expense => {
                setIncome(income);
                setExpense(expense);

            })
        })
    }, [])

    const loadData = async ({ url, method, type }) => {
        try {
            const { data } = await axios[method](url);
            let rws = data.data;


            let sum = 0;
            for (let i = 0; i < rws.length; i++) {
                sum += rws[i].amount;
            }


            if (type == 'income') {
                setIncomeSum(sum);
            } else {
                setExpenseSum(sum);
            }

            return rws.slice(0, 3);
        } catch (err) {

        }
    };


    return (
        <div class="overview">
            <Box className="overview-box-container">
                <SPaper sx={{ height: 200 }} elevation={8}>

                    {/* Load income data */}
                    <Box className="overview-box">
                        <Typography variant='h3'>Income</Typography>
                        <Typography variant='h5'>${incomeSum}</Typography>
                    </Box>
                </SPaper >
                {/* Load expense data */}
                <SPaper sx={{ height: 200, }} elevation={8} className="overview-box-wrapper">
                    <Box className="overview-box">
                        <Typography variant='h3'>Expense</Typography>
                        <Typography variant='h5'>${expenseSum}</Typography>
                    </Box>
                </SPaper >

                {/* load saveings */}
                <SPaper sx={{ height: 200, }} elevation={8} className="overview-box-wrapper">
                    <Box className="overview-box">
                        <Typography variant='h3'>Total Savings</Typography>
                        <Typography variant='h5'>${incomeSum - expenseSum}</Typography>
                    </Box>
                </SPaper >
            </Box >

            {/* load recent incomes from dance table */}

            <div className="recent-container">
                <h2>Recent Incomes</h2>
                <div className="recent">
                    <div>
                        <img src={incomeImg} className="img"></img>
                    </div>
                    <Box className="recent-data">
                        {income ? <DataTable data={income} type={"income"} /> : <>Loading Data...</>}

                    </Box>
                </div>
                {/* load rencent expenses from dance table */}
                <h2>Recent Expenses</h2>
                <div className="recent">
                    <div>
                        <img src={expenseImg} className="img"></img>
                    </div>
                    <div className="recent-data">
                        {expense ? <DataTable data={expense} type={"expense"} /> : <>Loading Data...</>}
                    </div>
                </div>
            </div>
        </div>
    )
}