import React, { useState } from "react";
import authService from "../services/authService";

function Homepage() {
  const [user,setUser] = useState(authService.getCurrentUser())
  return (
    <div>
      <div className="container py-1">
        <header className="pb-2 px-3 pt-2 mb-4 border-bottom rounded-1">
          <a
            href="/"
            className="d-flex align-items-center text-dark text-decoration-none"
          >
            <img
              src="https://1000logos.net/wp-content/uploads/2016/10/Batman-Logo-1964-768x432.png"
              width="60"
              height="41"
              className="me-2"
              alt="ADP Logo"
            />
            <span className="fs-3 fw-bold">
              Time And Attendance Management System
            </span>
          </a>
        </header>

        <div className="p-3 mb-4 text-white bg-dark rounded-3">

          <div className="container-fluid py-2">
            <h1 className="display-6 fw-bold mb-5">
              Welcome To Time and Attendance Section
            </h1>

            <p className="col-12 fs-5 mb-5">
              Features : <span className='mark'> 1. Attendance Overview 2. Payroll Overview 3. Daily Attendance  4. Employee CRUD </span>
            </p>

            <p className="col-12 fs-5 mb-4">
              Login now to check your attendance and payroll.
            </p>

            <a href="/login">
              <button className="btn btn-outline-light" type="button">
                Login
              </button>
            </a>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h2>Daily Attendance</h2>
              <p className="m-4">
               Automatic Clock In and Clock Out based on history
              </p>

              <a href="/attendance">
                <button className="btn btn-outline-light" type="button">
                  Attendance
                </button>
              </a>
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-5 text-white bg-dark border rounded-3">
              <h2>HR Reports</h2>
              <p className="m-4">
                Get list of all employee with details and features to edit and delete
              </p>

              <a href="/hr-reports">
                <button className="btn btn-outline-light" type="button">
                  HR Reports
                </button>
              </a>
            </div>
          </div>
          <div className="col-md-6 mt-4">
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h2>Employee Reports</h2>
              <p className="m-4">
               Get overtime hours, total working days, total absence and other details with dynamic charts
              </p>

              <a href={(user && user.id ?`employee-reports/${user.id}` : "/login")}>
                <button className="btn btn-outline-light" type="button">
                  Employee Reports
                </button>
              </a>
            </div>
          </div>
          <div className="col-md-6 mt-4">
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h2>Payroll Visualizer</h2>
              <p className="m-4">
              Dynamic Payroll History and Query by Month for each Employee
              </p>

              <a href={(user && user.id ?`employee-payroll/${user.id}` : "/login")}>
                <button className="btn btn-outline-light" type="button">
                  Payroll
                </button>
              </a>
            </div>
          </div>
        </div>

        <footer className="pt-3 mt-4 text-muted border-top">&copy; 2024</footer>
      </div>
    </div>
  );
}

export default Homepage;
