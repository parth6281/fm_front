import React from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2'
import { Box } from '@material-ui/core'
import { useState, useEffect } from 'react';
import Dnut from './DoughnutChart';
import moment from "moment";
import jsonQuery from 'json-query';
import axios, { Routes } from '../../services/axios'
import { useNavigate } from 'react-router-dom';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function formatData(data) {
    let formatted = data.map(i => {
        i.month = new Date(i.date).getMonth() + 1;
        return { place: i.month, value: i.amount }
    })

    let d = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    for (let i = 1; i <= 12; i++) {
        let k = formatted.filter(j => j.place == i);
        let sum = 0;
        for (let j = 0; j < k.length; j++) {
            sum += k[j].value;
        }
        d[i - 1] = sum
    }

    return d;
}


export default function LineChart() {

    const [alignment, setAlignment] = React.useState('line');
    const [selection, setSelection] = useState('income');

    const changeSelection = (event, newSelection) => {
        setSelection(newSelection)
        if (newSelection == 'income') {
            setData({
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    data: incomeData,
                    backgroundColor: ['#ffeb3b', '#fecb7a', '#004d26', '#ed2724', '#c51e69', '#00497c', '#00053a', '#8b0b04', '#f16364', '#097d9e', '#99918a', '#4c818e']
                }
                ]
            })

        } else {
            let ex = incomeData.slice();
            setData({
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    data: expenseData,
                    backgroundColor: ['#ffeb3b', '#fecb7a', '#004d26', '#ed2724', '#c51e69', '#00497c', '#00053a', '#8b0b04', '#f16364', '#097d9e', '#99918a', '#4c818e']
                }
                ]
            })
            setIncomeData(ex);
        }

    }

    const handleChange = (event, newAlignment) => {
        if (newAlignment == 'pie') {

            setData({
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    data: incomeData,
                    backgroundColor: ['#ffeb3b', '#fecb7a', '#004d26', '#ed2724', '#c51e69', '#00497c', '#00053a', '#8b0b04', '#f16364', '#097d9e', '#99918a', '#4c818e']
                }
                ]
            })

            setOptions({
                title: {
                    display: true,
                    text: 'Pie Chart'
                },
            })

        } else {
            setData({
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Incomes',
                        data: incomeData.slice(),
                        borderColor: ['rgba(255, 206, 86, 0.2)'],
                        backgroundColor: ['rgba(255, 206, 86, 0.2)'],
                        pointBackgroundColor: ['rgba(255, 206, 86, 0.2)'],
                        pointBorderColor: ['rgba(255, 206, 86, 0.2)']
                    },
                    {
                        label: 'Expenses',
                        data: expenseData.slice(),
                        borderColor: ['rgba(54, 162, 235, 0.2)'],
                        backgroundColor: ['rgba(54, 162, 235, 0.2)'],
                        pointBackgroundColor: ['rgba(54, 162, 235, 0.2)'],
                        pointBorderColor: ['rgba(54, 162, 235, 0.2)']

                    }
                ]
            })
            setOptions({
                title: {
                    display: true,
                    text: 'Line Chart'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                            max: Math.max(...incomeData, ...expenseData),
                            stepSize: Math.max(...incomeData, ...expenseData) / 10
                        }
                    }
                    ]
                }
            })
        }
        setAlignment(newAlignment);

    };

    const navigate = useNavigate();

    const [income, setIncome] = useState(null);
    const [expense, setExpense] = useState(null);
    const [incomeData, setIncomeData] = useState(null);
    const [expenseData, setExpenseData] = useState(null);
    const [data, setData] = useState(null);
    const [options, setOptions] = useState(null)

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
                let incomeData = formatData(income.map(i => { i.date = i.dateOfIncome; return i }));
                let expenseData = formatData(expense.map(i => { i.date = i.dateOfExpense; return i }));
                setIncomeData(incomeData);
                setExpenseData(expenseData);

                setData({
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
                    datasets: [
                        {
                            label: 'Incomes',
                            data: incomeData,
                            borderColor: ['rgba(255, 206, 86, 0.2)'],
                            backgroundColor: ['rgba(255, 206, 86, 0.2)'],
                            pointBackgroundColor: ['rgba(255, 206, 86, 0.2)'],
                            pointBorderColor: ['rgba(255, 206, 86, 0.2)']
                        },
                        {
                            label: 'Expenses',
                            data: expenseData,
                            borderColor: ['rgba(54, 162, 235, 0.2)'],
                            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
                            pointBackgroundColor: ['rgba(54, 162, 235, 0.2)'],
                            pointBorderColor: ['rgba(54, 162, 235, 0.2)']

                        }
                    ]
                })

                setOptions({
                    title: {
                        display: true,
                        text: 'Line Chart'
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                min: 0,
                                max: Math.max(...incomeData, ...expenseData),
                                stepSize: Math.max(...incomeData, ...expenseData) / 10
                            }
                        }
                        ]
                    }
                })
            })
        })
    }, [])

    const loadData = async ({ url, method, type }) => {
        try {
            const { data } = await axios[method](url);
            let rws = data.data;

            return rws;
        } catch (err) {

        }
    };


    return (
        <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
            {data && options ? <>
                {alignment == 'line' ? <Line data={data} options={options} /> : <Doughnut data={data} options={options} />}
            </> : null
            }
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <ToggleButtonGroup
                    sx={{ mt: 15 }}
                    color="primary"
                    value={alignment}
                    exclusive

                    onChange={handleChange}
                >
                    <ToggleButton value="line">Line Chart</ToggleButton>
                    <ToggleButton value="pie">Pie Chart</ToggleButton>
                </ToggleButtonGroup>
                {alignment == 'pie' ? <ToggleButtonGroup
                    sx={{ mt: 15 }}
                    color="primary"
                    value={selection}
                    exclusive
                    onChange={changeSelection}
                >
                    <ToggleButton value="income">Incomes</ToggleButton>
                    <ToggleButton value="expense">Expenses</ToggleButton>
                </ToggleButtonGroup> : null}
            </Box>
        </Box>
    )
}