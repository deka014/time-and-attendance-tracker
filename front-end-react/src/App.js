import logo from './logo.svg'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import Employee from './components/Employee'
import HrPage from './components/HrPage'
import Menu from './components/Menu'
import { Route, Routes } from 'react-router-dom'
import EmployeeAdd from './components/EmployeeAdd'
import Payroll from './components/Payroll'
import AttendanceCustom from './components/AttendanceCustom'

import { ToastContainer} from 'react-toastify';
import EmployeeUpdate from './components/EmployeeUpdate'
import Homepage from './components/Homepage'

function App() {
  return (
    <div className='App'>
      <Menu />
      <ToastContainer />
      <div class='container mt-4'>
        <div class='row'>
        <div class='col-12'>
            <Routes>
              <Route
                path='/'
                element={<Homepage/>}
              ></Route>
            </Routes>
          </div>
          <div class='col-12'>
            <Routes>
              <Route
                path='/employee-reports/:id'
                element={<Employee />}
              ></Route>
            </Routes>
          </div>
          <div class='col-12'>
            <Routes>
              <Route path='/employee-payroll/:id' element={<Payroll />}></Route>
            </Routes>
          </div>
          <div class='col-12'>
            <Routes>
              <Route path='/login' element={<Login />}></Route>
            </Routes>
          </div>
          <div class='col-12'>
            <Routes>
              <Route path='/signup' element={<Signup />}></Route>
            </Routes>
          </div>
          <div class='col-12'>
            <Routes>
              <Route path='/hr-reports' element={<HrPage />}></Route>
            </Routes>
          </div>
          <div class='col-12'>
            <Routes>
              <Route path='/employee/add' element={<EmployeeAdd />}></Route>
            </Routes>
          </div>
          <div class='col-12'>
            <Routes>
              <Route path='/employee/:id/edit' element={<EmployeeUpdate />}></Route>
            </Routes>
          </div>
          <div class='col-12'>
            <Routes>
              <Route path='/attendance' element={<AttendanceCustom />}></Route>
            </Routes>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default App
