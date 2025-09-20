// // import axios from "axios"

// // const axiosClient =  axios.create({
// //     baseURL: 'http://localhost:5000',
// //     withCredentials: true,
// //     headers: {
// //         'Content-Type': 'application/json'
// //     }
// // });


// // export default axiosClient;

// // utils/axiosClient.js
// import axios from 'axios';

// const axiosClient = axios.create({
//   baseURL: 'http://localhost:5000',
// });

// axiosClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (err) => Promise.reject(err));

// export default axiosClient;


// utils/axiosClient.js
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000',
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Gets token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Sends as Authorization header
  }
  return config;
}, (err) => Promise.reject(err));

export default axiosClient;