import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { getWorkingDays } from '../util/getWorkingDays'
import ReportPieChart from './ReportPieChart'
import authHeader from '../services/authHeader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Employee() {
  const { id } = useParams()
  const [employee, setEmployee] = useState(null)
  const [employeeReport, setEmployeeReport] = useState(null)
  const [fromDate, setFromDate] = useState('2024-01-01')
  const [toDate, setToDate] = useState('2024-01-29')
  const [totalWorkingDays, setTotalWorkingDays] = useState(21)
  

  // useEffect(() => {
  //   async function fetchEmployeeDetails(id) {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5001/employees/${id}`
  //       , { headers: authHeader() })
  //       setEmployee(response.data)
  //       // console.log(response.data)
  //     } catch (error) {
  //       console.error('Error fetching employee data:', error)
  //     }
  //   }

  //   async function fetchEmployeeReport(id) {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5001/timerecord/report/${id}?from=${fromDate}&to=${toDate}`
  //       , { headers: authHeader() })
  //       setEmployeeReport(response.data)
  //       console.log(response.data, 'Report Data')
  //     } catch (error) {
  //       console.error('Error fetching employee report data:', error)
  //       setEmployeeReport(null)
  //     }
  //   }

  //   fetchEmployeeDetails(id)
  //   fetchEmployeeReport(id)
  //   setTotalWorkingDays(getWorkingDays(fromDate, toDate))
  // }, [id, fromDate, toDate])


  useEffect(() => {
    async function fetchEmployeeDetails(id) {
      try {
        const response = await axios.get(
          `http://localhost:5001/employees/${id}`
        , { headers: authHeader() })
        setEmployee(response.data)
        // console.log(response.data)
      } catch (error) {
        if (error.response && error.response.status === 403) {
          // Handle 403 Unauthorized error
          window.location.href = '/'
        } else if (error.response && error.response.status === 401) {
          // Handle 401 Unauthorized error
          alert('Not Authenticated ')
          window.location.href = '/login'
        } else {
          console.error('Error fetching employee data:', error)
        }
      }
    }

    async function fetchEmployeeReport(id) {
      try {
        const response = await axios.get(
          `http://localhost:5001/timerecord/report/${id}?from=${fromDate}&to=${toDate}`
        , { headers: authHeader() })
        setEmployeeReport(response.data)
        console.log(response.data, 'Report Data')
      } catch (error) {
        if (error.response && error.response.status === 403) {
          // Handle 403 Unauthorized error
          window.location.href = '/'
        } else if (error.response && error.response.status === 401) {
          // Handle 401 Unauthorized error
          alert('Not Authenticated ')
          window.location.href = '/login'
        } else {
          console.error('Error fetching employee report data:', error)
          setEmployeeReport(null)
        }
      }
    }

    fetchEmployeeDetails(id)
    fetchEmployeeReport(id)
    setTotalWorkingDays(getWorkingDays(fromDate, toDate))
  }, [id, fromDate, toDate])

  
  const handleFromDateChange = (event) => {
    setFromDate(event.target.value)
  }

  const handleToDateChange = (event) => {
    setToDate(event.target.value)
  }

  const handleOnDelete = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.delete(`http://localhost:5001/employees/${id}`,{
        headers: authHeader(),
      });
      console.log(response.data)
      window.location.href = `/hr-reports`
    } catch (error) {
      console.error("Error deleting post:", error); 
      toast.error('Not Authorized: ' + error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  if (employee === null) {
    return <div>Loading</div>
  }

  return (
    //use bootstrap to create a card with the above details
    <div>
      <div class='row g-0 overflow-hidden'>
        <div class='col-md-6'>
          <div class='lc-block my-5'>
            <h4>
              Employee Details for <span className='mark'>{employee.name}</span>
            </h4>
          </div>
          <div class='lc-block1'>
            <table class='table table-striped' align='center'>
              <tbody>
                <tr>
                  <th>Employee Id</th>
                  <td>{employee.id}</td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>{employee.name}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{employee.email}</td>
                </tr>
                <tr>
                  <th>Phone Number</th>
                  <td>{employee.phone}</td>
                </tr>
                <tr>
                  <th>Job Title</th>
                  <td>{employee.jobTitle}</td>
                </tr>
                <tr>
                  <th>Department</th>
                  <td>{employee.department}</td>
                </tr>

                <tr>
                  <th>Shift Start Time</th>
                  {/* <td>{ employee.timeShift && employee.timeShift.shiftIn}</td> */}
                  <td>
                    {employee.timeShift
                      ? employee.timeShift.shiftIn
                      : 'Not Assigned'}
                  </td>
                </tr>
                <tr>
                  <th>Shift End Time</th>
                  <td>
                    {employee.timeShift
                      ? employee.timeShift.shiftOut
                      : 'Not Assigned'}
                  </td>
                </tr>
                {/* <tr>
                  <th>Work Location</th>
                  <td>Hyderabad</td>
                </tr>
                <tr>
                  <th>Office</th>
                  <td>One West - IND</td>
                </tr>*/}
                <tr> 
                  <th>Check Payroll</th>
                  <td><a name="" id="" class="btn btn-info" href={`/employee-payroll/${id}`} role="button">Click Here</a></td>
                </tr>
                <tr>
                  <th>Edit</th>
                  <td><a name="" id="" class="btn btn-warning" href={`/employee/${id}/edit`} role="button">Click Here</a></td>
                </tr>
                <tr>
                  <th>Delete</th>
                  <td>
                  <input name="" id="" class="btn btn-danger" onClick={handleOnDelete} type="button" value="Click Here"/>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class='col-md-6 row row-cols-1'>
          <div class='col lc-block'>
            <div className='my-5'>
              <h4>Employee Attendance</h4>
            </div>

            <div className='row'>
              <div class='col-6'>
                <div class='input-group mb-3'>
                  <span class='input-group-text'>From</span>
                  <input
                    type='date'
                    className='form-control'
                    id='fromDate'
                    value={fromDate}
                    onChange={handleFromDateChange}
                  />
                </div>
              </div>
              <div class='col-6'>
                <div class='input-group mb-3'>
                  <span class='input-group-text'>To</span>
                  <input
                    type='date'
                    className='form-control'
                    id='toDate'
                    value={toDate}
                    onChange={handleToDateChange}
                  />
                </div>
              </div>
            </div>

            {/*  accordion */}
            <div class='accordion' id='accordionExample'>
              <div class='accordion-item'>
                <h2 class='accordion-header' id='headingOne'>
                  <button
                    class='accordion-button'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#collapseOne'
                    aria-expanded='true'
                    aria-controls='collapseOne'
                  >
                    Duration - Report for Total {totalWorkingDays} Bussiness
                    Days
                  </button>
                </h2>
                <div
                  id='collapseOne'
                  class='accordion-collapse collapse show'
                  aria-labelledby='headingOne'
                  data-bs-parent='#accordionExample'
                >
                  {/* <div class='accordion-body'>
                    This is the first item's accordion body.
                  </div> */}

                  {employeeReport ? (
                    <div>
                      <div className='p-3'>
                        Total Present = {employeeReport.totalPresents}
                      </div>
                      <div className='p-3'>
                        Late Arrivals = {employeeReport.lateArrivals}
                      </div>
                      <div className='p-3'>
                        Total Overtime Hours={employeeReport.totalOvertimeHours}
                      </div>
                      <div className='p-3'>
                        Total Absent ={' '}
                        {totalWorkingDays - employeeReport.totalPresents}
                      </div>
                      <div className='p-3'>
                        Total Working Days = {totalWorkingDays}
                      </div>
                    </div>
                  ) : (
                    <div className='container p-4'>
                      <p class='lead'>
                        No Time Report found for {employee.name} for the above
                        duration
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* accordion 1end  */}
            <div class='accordion accordion-flush' id='accordionFlushExample'>
              <div class='accordion-item'>
                <h2 class='accordion-header' id='flush-headingOne'>
                  <button
                    class='accordion-button'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#flush-collapseOne'
                    aria-expanded='true'
                    aria-controls='flush-collapseOne'
                  >
                    Present v/s Absent Pie
                  </button>
                </h2>
                <div
                  id='flush-collapseOne'
                  class='accordion-collapse collapse show'
                  aria-labelledby='flush-headingOne'
                  data-bs-parent='#accordionFlushExample'
                >
                  <div class='accordion-body'>
                    {employeeReport ? (
                      <ReportPieChart
                        presentDays={employeeReport.totalPresents}
                        absentDays={
                          totalWorkingDays - employeeReport.totalPresents
                        }
                      />
                    ) : (
                      <div className='container p-4'>
                        <p class='lead'>No Graph found for {employee.name}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div class='col lc-block my-5'>
            <h4>Employee Payroll {id}</h4>
          </div> */}
        </div>
      </div>
    </div>
  )
}
