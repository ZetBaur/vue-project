import axios from 'axios'
// import router from "@/router";

const requestAxios = axios.create({
    headers: {
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTI3NTY0MDUsIm1hbmFnZXJfaWQiOjg3LCJtZXJjaGFudF9pZCI6Miwicm9sZXMiOlsxLDE1XX0.jUtitlFNlIDktBcoBCgeVQaqFH0QqJmkbttBX_6qlGebU9P1U35Dv8bWcsUMTQv0MJ1kuanMveBx7TlMIBlxALpSirWwXf38rqxHVfMLbdPpy1Hr1FzqnSK3FdFnMC9O5sNG-GQ2k5ZZoGyodPS4tv_fW5oQyXLbzyGQBRFBMf_ifcW4LTy_qA5iVB8alqweyoxG3Ia1TWbUlzL2WNJPBowEvYmKHtoAhT8wUJxGu86w8OeilBGsls7FXA223I2LNOYkAhMmHskdryfxMsaocglw0CHDFsE1HeAK6lVicYnqoYkdzSI5YqEkKKKgyC5VOFg0nNe2BF74cYKGXb6mFg`,
        'Content-Type': 'application/json'
    }
    // headers: {
    //     Authorization: `Bearer ${localStorage.Token}`,
    //     'Content-Type': 'application/json'
    // }
})

// ----------------------------------------

// requestAxios.interceptors.response.use(null, error => {
//   if (error.response.status === 401) {
//     router.push("/login-form");
//   }
//   return Promise.reject(error);
// });

// ----------------------------------------

requestAxios.interceptors.request.use(
    (config) => {
        if (!config.headers.Authorization) {
            const token = localStorage.getItem('token')
            if (token) {
                config.headers.Authorization = token
            }
        }
        return config
    },
    (error) => Promise.reject(error)
)

export default requestAxios
