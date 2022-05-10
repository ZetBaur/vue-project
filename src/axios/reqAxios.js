import axios from "axios";
// import router from "@/router";

const requestAxios = axios.create({
  // baseURL: 'https://192.168.191.74:44329'
  // baseURL: 'https://alashpro.kz:10100/swagger/index.html'
  // baseURL: 'https://alashpro.kz:10100'
});

// ----------------------------------------

// requestAxios.interceptors.response.use(null, error => {
//   if (error.response.status === 401) {
//     router.push("/login-form");
//   }
//   return Promise.reject(error);
// });

// ----------------------------------------

requestAxios.interceptors.request.use(
  config => {
    if (!config.headers.Authorization) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = token;
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

export default requestAxios;
