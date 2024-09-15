// const Menu = () => (
//   <div>
//     <nav class="navbar navbar-expand-sm navbar-dark bg-dark p-3 ">
//       <div class="container-fluid">
//         <a class="navbar-brand" href="/">
//          <img  height={48} src="https://1000logos.net/wp-content/uploads/2021/04/ADP-logo.png"/>
//         </a>
//         <button
//           class="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#mynavbar"
//         >
//           <span class="navbar-toggler-icon"></span>
//         </button>
//         <div class="collapse navbar-collapse" id="mynavbar">
//           <ul class="navbar-nav" >
//             <li class="nav-item mx-3 fs-5">
//               <a class="nav-link" href="/login">

//                 Login
//               </a>
//             </li>
//             {/* <li class="nav-item  mx-3 fs-5">
//               <a class="nav-link" href="/signup">
//                 Sign Up
//               </a>
//             </li> */}
//             <li class="nav-item  mx-3 fs-5">
//               <a class="nav-link" href="/employee-reports">
//                 Employee Reports
//               </a>
//             </li>
//             <li class="nav-item  mx-3 fs-5">
//               <a class="nav-link" href="/hr-reports">
//                 HR Reports
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   </div>
// );

// export default Menu;

import React, { useState, useEffect } from 'react'
import authService from '../services/authService'

const Menu = () => {
  // const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);

  const user = authService.getCurrentUser()

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const user = await AuthService.getUser();
  //       setUser(user);
  //     } catch (error) {
  //       console.error('Error fetching user:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  return (
    <div>
      <nav class='navbar navbar-expand-sm navbar-dark bg-dark p-3 '>
        <div class='container-fluid'>
          <a class='navbar-brand' href='/'>
            <img
              height={48}
              src='https://1000logos.net/wp-content/uploads/2016/10/Batman-Logo-1964-768x432.png'
            />
          </a>
          <button
            class='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#mynavbar'
          >
            <span class='navbar-toggler-icon'></span>
          </button>
          <div class='collapse navbar-collapse' id='mynavbar'>
            <ul class='navbar-nav'>
              {!user ? (
                <li class='nav-item mx-3 fs-5'>
                  <a class='nav-link' href='/login'>
                    Login
                  </a>
                </li>
              ) : (
                <>
                  <li class='nav-item mx-3 fs-5'>
                    <a
                      class='nav-link'
                      href='/'
                      onClick={() => {
                        authService.logout()
                      }}
                    >
                      Logout - {user.name}
                    </a>
                  </li>
                  <li class='nav-item  mx-3 fs-5'>
                    <a class='nav-link' href={`/employee-reports/${user.id}`}>
                      Employee Reports
                    </a>
                  </li>
                </>
              )}
              <li class='nav-item  mx-3 fs-5'>
                <a class='nav-link' href='/hr-reports'>
                  HR Reports
                </a>
              </li>
              <li class='nav-item  mx-3 fs-5'>
                <a class='nav-link' href='/attendance'>
                  Attendance
                </a>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Menu
