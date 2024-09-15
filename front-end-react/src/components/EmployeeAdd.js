import React, { useState } from 'react'
import axios from 'axios'
import authHeader from '../services/authHeader'


export default function EmployeeAdd() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    jobTitle: '',
    department: '',
    timeShift: {
      id: '1', //default value
    },
    password : '',
    role : ''
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target
    if (name === 'timeShift') {
      setFormData({
        ...formData,
        [name]: {
          id: value,
        },
      })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:5001/register', formData ,{
        headers: authHeader(),
      } )
      .then((response) => {
        window.location.href = `/employee-reports/${response.data.id}`
        // Handle successful response
      })
      .catch((error) => {
        console.log(error)
        // window.location.href = `/hr-reports`
      })
    // console.log(formData);
    // You can store the values in your state or send them to your backend here
  }

  return (
    <div>
      <div class='lc-block my-5'>
            <h4>
              Add a new <span className='mark'>Employee</span>
            </h4>
          </div>
      <div class='text-start d-flex justify-content-center my-5'>
        <div class='w-50'>
          <form class='d-grid gap-4'>
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
              <label for='pass' class='col-sm-3 col-form-label'>
                Password
              </label>
              <div class='col-sm-9'>
                <input
                  type='password'
                  name='password'
                  class='form-control'
                  id='pass'
                  placeholder='Password'
                  value={formData.password}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div class='form-group row'>
              <label for='role_id' class='col-sm-3 col-form-label'>
                Role
              </label>
              <div class='col-sm-9'>
                <input
                  type='text'
                  name='role'
                  class='form-control'
                  id='role_id'
                  placeholder='Role'
                  value={formData.role}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            
            <div class='form-group row'>
              <div class='col-sm-10'>
                <button
                  type='submit'
                  class='btn btn-primary'
                  onClick={handleOnSubmit}
                >
                 Add New Employee
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
