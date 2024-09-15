import React from "react";
import { Doughnut } from "react-chartjs-2";




const PayRollDoghnutChart = ({ regularPay, overtimePay }) => {

  
    const data = {
        labels: ["Regular Pay", "Overtime Pay"],
        datasets: [
          {
            label: "Payroll",
            data: [regularPay, overtimePay],
            backgroundColor: ["rgba(255, 223, 0, 0.2)", "rgba(54, 162, 235, 0.2)"],
            borderColor: ["rgba(255, 223, 0, 1)", "rgba(54, 162, 235, 1)"],
            borderWidth: 1,
          },
        ],
      };

  return (
    <Doughnut
      data={data}
      height={'300px'}
      options={{
        maintainAspectRatio: false,
        cutout: "60%",
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              // boxWidth: 10,
              padding: 30,
            },
          },
        },
      }}
    />
  )
}

export default PayRollDoghnutChart
