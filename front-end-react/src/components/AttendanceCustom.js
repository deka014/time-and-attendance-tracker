import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import authHeader from '../services/authHeader'
import authService from '../services/authService'

export default function AttendanceCustom() {
  const [employeeId, setEmployeeId] = useState('')
  const [clockTime, setClockTime] = useState('')
  const [attendanceDate, setAttendanceDate] = useState('')
  const [user, setUser] = useState(authService.getCurrentUser())

  useEffect(() => {
    if (!user || !user.id) {
      window.location.href = '/login'
    } else {
      setEmployeeId(user.id)
    }
  }, [])

  const handleOnChange = (e) => {
    const { name, value } = e.target
    if (name === 'employeeId') {
      setEmployeeId(value)
    } else if (name === 'time') {
      setClockTime(value + ':00')
    } else if (name === 'date') {
      setAttendanceDate(value)
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    axios
      .post(
        'http://localhost:5001/timerecord',
        {
          employeeId,
          clockTime,
          attendanceDate,
        },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        console.log(response.data)
        toast.success(
          response.data.clockOut
            ? 'Bye Bye - Clocked Out Successfully'
            : 'Hello, Clocked In Successfully ',
          {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
          }
        )
      })
      .catch((error) => {
        console.log(error)
        toast.error('Error saving attendance: ' + error.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        })
      })
  }

  return (
    <>
      <div class='lc-block my-5'>
        <h4>
          Add a new <span className='mark'>Attendance</span>
        </h4>
      </div>

      <div class='text-start d-flex justify-content-center mt-5'>
        <div class='w-50'>
          <form class='d-grid gap-4'>
            <div class='form-group row'>
              <label for='e_id' class='col-sm-3 col-form-label'>
                Employee ID
              </label>
              <div class='col-sm-9'>
                <input
                  type='Number'
                  name='employeeId'
                  class='form-control'
                  id='e_id'
                  placeholder='Associate ID'
                  value={employeeId}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div class='form-group row'>
              <label for='time' class='col-sm-3 col-form-label'>
                Clock Time
              </label>
              <div class='col-sm-9'>
                <input
                  type='Time'
                  class='form-control'
                  id='time'
                  value={clockTime}
                  name='time'
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div class='form-group row'>
              <label for='date' class='col-sm-3 col-form-label'>
                Date
              </label>
              <div class='col-sm-9'>
                <input
                  type='Date'
                  class='form-control'
                  id='date'
                  value={attendanceDate}
                  name='date'
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div class='form-group row'>
              <div class='col-sm-3'>Checkbox</div>
              <div class='col-sm-9'>
                <div class='form-check'>
                  <input
                    class='form-check-input'
                    type='checkbox'
                    id='gridCheck1'
                  />
                  <label class='form-check-label' for='gridCheck1'>
                    I have correctly filled the record
                  </label>
                </div>
              </div>
            </div>
            <div class='form-group row'>
              <div class='col-sm-10'>
                <button
                  type='submit'
                  class='btn btn-primary'
                  onClick={handleOnSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
