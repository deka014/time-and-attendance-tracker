import React from 'react'
import { Pie } from 'react-chartjs-2'
import 'chart.js/auto' // import the chart.js library

const ReportPieChart = ({ presentDays, absentDays }) => {
  const data = {
    labels: ['Present Days', 'Absent Days'],
    datasets: [
      {
        data: [presentDays, absentDays],
        backgroundColor: ['#4caf50', '#f44336'],
        borderColor: 'transparent',
      },
    ],
  }

  return (
    <Pie
      data={data}
      height={'300px'}
      options={{
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'left',
          },
        },
      }}
    />
  )
}

export default ReportPieChart
