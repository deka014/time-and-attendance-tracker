import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import PayRollHistoryChart from './PayRollHistoryChart'
import PayRollDoghnutChart from './PayRollDoghnutChart'
import axios from 'axios'
import { useEffect } from 'react'
import authHeader from '../services/authHeader'
import authService from '../services/authService'

export default function Payroll() {
  const { id } = useParams()
  const [monthInput, setMonthInput] = useState('2024-01')
  const [currentMonth, setCurrentMonth] = useState('January')
  const [currentYear, setCurrentYear] = useState('2024')
  const [payRollData, setPayRollData] = useState(null)
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

  const [payRollHistory, setPayRollHistory] = useState({
    January: 38000,
    December: 40000,
    November: 40000,
  })

  const handleMonthChange = (event) => {
    const value = event.target.value
    setMonthInput(value)
    setCurrentMonth(monthNames[parseInt(value.slice(5, 7)) - 1])
    setCurrentYear(value.slice(0, 4))
  }

  useEffect(() => {
    async function fetchEmployeePayrollByMonth(id, month) {
      try {
        console.log(
          `http://localhost:5001/timerecord/payroll/${id}/${month}/${currentYear}`
        )
        const response = await axios.get(
          `http://localhost:5001/timerecord/payroll/${id}/${month}/${currentYear}`,
          { headers: authHeader() }
        )
        setPayRollData(response.data)
        console.log(response.data)
      } catch (error) {
        if (error.response && error.response.status === 403) {
          // Handle 403 Unauthorized error
          window.location.href = '/'
        }
        // You can display a message to the user or redirect them to the login page
        else if (error.response && error.response.status === 401) {
          // alert('Not Authenticated ')
          window.location.href = '/login'
        } else {
          console.error('Error fetching Payroll Data data:', error)
          setPayRollData(null)
        }
      }
    }
    fetchEmployeePayrollByMonth(id, currentMonth)
  }, [id, currentMonth, currentYear])

  //   if (payRollData == null) {
  //     return <p class='lead'>Loading - Please wait .....</p>
  //   }

  return (
    <div>
      <div className='row'>
        <div className='col-12'>
          <h4>
            Pay By Period for <span className='mark'>{id}</span>
          </h4>
          <div className='m-4'>
            <PayRollHistoryChart id={id} />
          </div>
        </div>
        <div className='col-12 mt-3'>
          <div className='col-12 row '>
            <div className='col-md-12 col-lg-6'>
              <p class='lead'>
                {currentMonth} {currentYear} Pay Roll Details for Employee :{' '}
                {id}
              </p>
            </div>
            <div className='col-md-12 col-lg-6'>
              <input
                type='Month'
                className='form-control'
                id='fromDate'
                value={monthInput}
                onChange={handleMonthChange}
              />
            </div>
          </div>

          <hr></hr>
          {payRollData ? (
            <div class='row col-12'>
              <div className='col-sm-12 col-md-6 d-flex justify-content-center'>
                <div class='lc-block1 mt-3 w-75'>
                  <table class='table table-borderless' align='center'>
                    <tbody>
                      <tr>
                        <th>Net Pay</th>
                        <td>&#8377; {payRollData.totalAmount}</td>
                      </tr>
                      <tr>
                        <th>Regular Pay</th>
                        <td>&#8377; {payRollData.regularPay}</td>
                      </tr>
                      <tr>
                        <th>Overtime Pay</th>
                        <td>&#8377; {payRollData.overtimePay}</td>
                      </tr>
                      <tr>
                        <th>Overtime Hours</th>
                        <td>{payRollData.overtimeHours} hr/s</td>
                      </tr>
                      <tr>
                        <th>Total Present</th>
                        <td>{payRollData.presentDays} Days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className='col-sm-12 col-md-6 pb-5'>
                <PayRollDoghnutChart
                  regularPay={payRollData.regularPay}
                  overtimePay={payRollData.overtimePay}
                />
              </div>
            </div>
          ) : (
            <div className='container p-4'>
              <p class='lead'>
                No Payroll found for employee {id} for the above Month
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
