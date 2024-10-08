// import axios from "axios";

// const API_URL = "http://localhost:5001/";

// class AuthService {
//   login(email, password) {
//     return axios
//       .post(API_URL + "login", {
//         email,
//         password
//       })
//       .then(response => {
//         if (response.data.accessToken) {
//           localStorage.setItem("user", JSON.stringify(response.data));
//         }

//         return response.data;
//       });
//   }

//   logout() {
//     localStorage.removeItem("user");
//   }

//   register(username, email, password) {
//     return axios.post(API_URL + "register", {
//       username,
//       email,
//       password
//     });
//   }

//   getCurrentUser() {
//     return JSON.parse(localStorage.getItem('user'));;
//   }
// }

// export default new AuthService();

import axios from "axios";

const API_URL = "http://localhost:5001/";

const authService = {
  login(email, password) {
    return axios
      .post(API_URL + "login", {
        email,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  },

  logout() {
    localStorage.removeItem("user");
  },

  // register(formData) {
  //   return axios.post(API_URL + "register", formData);
  // },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default authService;