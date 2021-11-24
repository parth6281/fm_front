export default {
    register: () => {
        return {
            url: "/register",
            method: "post",
        }
    },
    login: () => {
        return {
            url: '/login',
            method: 'post'
        }
    },
    about: () => {
        return {
            url: '/about',
            method: 'get'
        }
    },
    getAllIncomeCategory: (userId) => {
        return {
            url: `/income/incomeCategory/${userId}`,
            method: "get",
        };
    },
    createIncomeCategory: () => {
        return {
            url: `income/incomeCategory`,
            method: "post",
        };
    },
    saveIncome: () => {
        return {
            url: `/income`,
            method: "post",
        };
    },
    getAllIncome: (userId) => {
        return {
            url: `/income/${userId}`,
            method: "get",
        };
    },
    getIncome: (id) => {
        return {
            url: `/income/income/${id}`,
            method: 'get'
        }
    },
    deleteIncome: (incomeId) => {
        return {
            url: `/income/${incomeId}`,
            method: "delete",
        };
    },
    deleteIncome: (incomeId) => {
        return {
            url: `/income/${incomeId}`,
            method: "delete",
        };
    },
    editIncome: (incomeId) => {
        return {
            url: `/income/${incomeId}`,
            method: "put",
        };
    },
    getAllExpenseCategory: (userId) => {
        return {
            url: `/expense/expenseCategory/${userId}`,
            method: "get",
        };
    },
    createExpenseCategory: () => {
        return {
            url: `expense/expenseCategory`,
            method: "post",
        };
    },
    saveExpense: () => {
        return {
            url: `/expense`,
            method: "post",
        };
    },
    getAllExpense: (userId) => {
        return {
            url: `/expense/${userId}`,
            method: "get",
        };
    },
    getExpense: (id) => {
        return {
            url: `/expense/expense/${id}`,
            method: 'get'
        }
    },
    deleteExpense: (expenseId) => {
        return {
            url: `/expense/${expenseId}`,
            method: "delete",
        };
    },
    deleteExpense: (expenseId) => {
        return {
            url: `/expense/${expenseId}`,
            method: "delete",
        };
    },
    editExpense: (expenseId) => {
        return {
            url: `/expense/${expenseId}`,
            method: "put",
        };
    },
    getProfile: (userId) => {
        return {
            url: `/profile/${userId}`,
            method: 'get'
        }
    },
    sendEmail: () => {
        return {
            url: '/contact/',
            method: 'post'
        }

    },
    getPublishableKey: () => {
        return {
            url: '/stripe/publishableKey',
            method: 'get'
        }
    },
    createPaymentIntent: () => {
        return {
            url: '/stripe/create-payment-intent',
            method: 'post'
        }
    }
}