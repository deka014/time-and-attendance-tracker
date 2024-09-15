import React, { useEffect, useState } from 'react'
import axios from 'axios'
import authHeader from '../services/authHeader'

const HrPage = () => {
  const [employeesList, setEmployeesList] = useState([])

  useEffect(() => {
    async function fetchEmployeesList() {
      try {
        const response = await axios.get(`http://localhost:5001/employees`, {
          headers: authHeader(),
        })
        setEmployeesList(response.data)
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
          setEmployeesList(HR_DATA)
          console.error('Error fetching employee data:', error)
        }
      }
    }
    fetchEmployeesList()
  }, [])

  const HR_DATA = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-1234',
      jobTitle: 'Project Manager',
      department: 'Engineering',
      salary: 80000,
      shift: 'Day',
      details: 'http://localhost:3000/employee-reports/1',
    },
    {
      id: 2,
      name: 'Mary Moe',
      email: 'mary@example.com',
      phone: '555-5678',
      jobTitle: 'Project Manager',
      department: 'Management',
      salary: 90000,
      shift: 'Evening',
      details: 'http://localhost:3000/employee-reports/1',
    },
    {
      id: 3,
      name: 'July Dooley',
      email: 'july@example.com',
      phone: '555-9012',
      jobTitle: 'QA Engineer',
      department: 'Quality Assurance',
      salary: 70000,
      shift: 'Night',
      details: 'http://localhost:3000/employee-reports/1',
    },
  ]

  return (
    <div class='hr-page'>
      <h2 className='my-4'>HR Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            {/* <th>Phone</th> */}
            <th>Job Title</th>
            <th>Department</th>
            <th>Shift</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {employeesList.map((employee) => (
            <tr>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              {/* <td>{employee.phone}</td> */}
              <td>{employee.jobTitle}</td>
              <td>{employee.department}</td>
              <td>
                {employee.timeShift
                  ? employee.timeShift.id === 1
                    ? 'Morning'
                    : 'Night'
                  : 'Not Assigned'}
              </td>
              <td>
                <a href={'/employee-reports/' + employee.id}>
                  <button>Select</button>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='container my-4'>
        <a
          name=''
          id=''
          class='btn btn-primary btn-lg'
          href='/employee/add'
          role='button'
        >
          Add New Employee
        </a>
      </div>
    </div>
  )
}

export default HrPage
