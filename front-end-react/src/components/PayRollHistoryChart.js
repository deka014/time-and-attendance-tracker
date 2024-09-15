import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import axios from 'axios'
import authHeader from '../services/authHeader'

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const PayRollHistoryChart = ({ id }) => {
  const [payRollHistory, setPayRollHistory] = useState({
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  })

  const data = {
    labels: Object.keys(payRollHistory),
    datasets: [
      {
        label: 'Net Pay',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: Object.values(payRollHistory),
      },
    ],
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 30000,
        stepSize: 600,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 10,
          padding: 20,
        },
      },
    },
  }

  useEffect(() => {
    async function fetchEmployeePayrollHistory(id) {
      try {
        const response = await axios.get(
          `http://localhost:5001/timerecord/payroll/${id}`, { headers: authHeader() }
        )
        const lastThreeItems = response.data.slice(-3)
        const monthData = lastThreeItems.reduce((acc, item) => {
          const month = new Date(item.payrollDate).getMonth() + 1;
          acc[monthNames[month - 1]] = item.totalAmount;
          return acc;
        }, {});
        setPayRollHistory(monthData)
      } catch (error) {
        console.error('Error fetching Payroll Data data:', error)
      }
    }
    fetchEmployeePayrollHistory(id)
  }, [id])
  
  return <Bar data={data} options={options} />
}

export default PayRollHistoryChart
