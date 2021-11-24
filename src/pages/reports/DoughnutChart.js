import React from 'react';
import { Doughnut } from 'react-chartjs-2'

export default function Dnut() {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Sales for 2020 (M)',
                data: [3, 2, 2, 1, 5],
                borderColor: ['rgba(255, 206, 86, 0.2)'],
                backgroundColor: ['rgba(255, 206, 86, 0.2)'],
                pointBackgroundColor: ['rgba(255, 206, 86, 0.2)'],
                pointBorderColor: ['rgba(255, 206, 86, 0.2)']


            },
            {
                label: 'Sales for 2020 (M)',
                data: [5, 3, 7, 4, 6],
                borderColor: ['rgba(54, 162, 235, 0.2)'],
                backgroundColor: ['rgba(54, 162, 235, 0.2)'],
                pointBackgroundColor: ['rgba(54, 162, 235, 0.2)'],
                pointBorderColor: ['rgba(54, 162, 235, 0.2)']

            }
        ]
    }

    const options = {
        title: {
            display: true,
            text: 'Line Chart'
        },
    }

    return (
        <>

        </>
    )
}