import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import authHeader from '../services/authHeader'


export default function EmployeeUpdate() {
  const { id } = useParams()
  const [formData, setFormData] = useState(null)

  useEffect(() => {
    axios
      .get(`http://localhost:5001/employees/${id}`,{
        headers: authHeader(),
      })
      .then((response) => {
        setFormData({
          ...response.data,
          timeShift: {
            id: response.data.timeShift.id,
          },
        })
      })

      .catch((error) => {
        console.log(error)
        window.location.href = `/hr-reports`
      })
  }, [id])

  const handleOnChange = (event) => {
    const { name, value } = event.target
    if (name === 'timeShift') {
      setFormData({
        ...formData,
        timeShift: {
          id: parseInt(value),
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleOnSubmit = (event) => {
    event.preventDefault()
    console.log(formData)
    axios
      .put(`http://localhost:5001/employees`, formData , {
        headers: authHeader(),
      })
      .then((response) => {
        console.log(response)

        // Handle successful response
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        window.location.href = `/employee-reports/${id}`
      })
  }

  if (formData == null) {
    return <>Loading</>
  }

  return (
    <div>
      <div class='lc-block my-5'>
            <h4>
              Edit Employee <span className='mark'>{formData.name}</span>
            </h4>
          </div>
      <div class='text-start d-flex justify-content-center my-5'>
        <div class='w-50'>
          <form class='d-grid gap-4'>
            <div class='form-group row'>
              <label for='id' class='col-sm-3 col-form-label'>
                ID
              </label>
              <div class='col-sm-9'>
                <input
                  type='Number'
                  name='id'
                  class='form-control'
                  id='id'
                  placeholder='ID'
                  value={formData.id}
                  onChange={handleOnChange}
                  disabled
                />
              </div>
            </div>
            <div class='form-group row'>
              <label for='timeShiftId' class='col-sm-3 col-form-label'>
                Time Shift
              </label>
              <div class='col-sm-9'>
                <select
                  class='form-select'
                  name='timeShift'
                  id='timeShiftId'
                  value={formData.timeShift.id}
                  onChange={handleOnChange}
                >
                  <option value='1'>Morning</option>
                  <option value='2'>Night</option>
                </select>
              </div>
            </div>
            <div class='form-group row'>
              <label for='name' class='col-sm-3 col-form-label'>
                Name
              </label>
              <div class='col-sm-9'>
                <input
                  type='text'
                  name='name'
                  class='form-control'
                  id='name'
                  placeholder='Name'
                  value={formData.name}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div class='form-group row'>
              <label for='email' class='col-sm-3 col-form-label'>
                Email
              </label>
              <div class='col-sm-9'>
                <input
                  type='email'
                  name='email'
                  class='form-control'
                  id='email'
                  placeholder='Email'
                  value={formData.email}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div class='form-group row'>
              <label for='phone' class='col-sm-3 col-form-label'>
                Phone
              </label>
              <div class='col-sm-9'>
                <input
                  type='tel'
                  name='phone'
                  class='form-control'
                  id='phone'
                  placeholder='Phone'
                  value={formData.phone}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div class='form-group row'>
              <label for='jobTitle' class='col-sm-3 col-form-label'>
                Job Title
              </label>
              <div class='col-sm-9'>
                <input
                  type='text'
                  name='jobTitle'
                  class='form-control'
                  id='jobTitle'
                  placeholder='Job Title'
                  value={formData.jobTitle}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div class='form-group row'>
              <label for='department' class='col-sm-3 col-form-label'>
                Department
              </label>
              <div class='col-sm-9'>
                <input
                  type='text'
                  name='department'
                  class='form-control'
                  id='department'
                  placeholder='Department'
                  value={formData.department}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div class='form-group row'>
              <div class='col-sm-10'>
                <button
                  type='submit'
                  class='btn btn-warning'
                  onClick={handleOnSubmit}
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
