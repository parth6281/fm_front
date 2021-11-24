import Framework from './pages/framework/nav';
import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Switch } from "react-router-dom";
import { Outlet, Route, Router, Routes } from 'react-router-dom';
import SignUp from './pages/signup';
import Dashboard from './pages/dashboard/dashboard';
import Login from './pages/login'
import About from './pages/about/about';
import Contact from './pages/contact/contact';
import Income from './pages/income';
import IncomeData from './pages/incomeData';
import Expense from './pages/expense';
import ExpenseData from './pages/expenseData';
import Donate from './pages/donation/donate';
import Card from './components/card';
import LineChart from './pages/reports/LineChart';

function App() {
  return (
    <BrowserRouter>
      {
        <Routes>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Framework />}>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/reports" element={<LineChart />}></Route>
            <Route path="/income" element={<IncomeData />}></Route>
            <Route path="/newIncome" element={<Income />}></Route>
            <Route path="/newIncome/:incomeId" element={<Income />}></Route>
            <Route path="/expense" element={<ExpenseData />}></Route>
            <Route path="/newExpense/:expenseId" element={<Expense />}></Route>
            <Route path="/newExpense" element={<Expense />}></Route>
            <Route path="/donate" element={<Donate />}></Route>
          </Route>
        </Routes>
      }

    </BrowserRouter >
  )
}

export default App;
