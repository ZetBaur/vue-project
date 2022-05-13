import axios from 'axios'
// import router from "@/router";

const requestAxios = axios.create({
    headers: {
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTI1MDM4NTgsIm1hbmFnZXJfaWQiOjg3LCJtZXJjaGFudF9pZCI6Miwicm9sZXMiOlsxLDE1XX0.bwM1cJ8fqqDxUlRaLuO43IP9cWU2q31dHj5-ibyS8rDPiedI_JaZAtZqKhtB3iqUO8CC96wDzgX7mlo8CHK1OV1dRw4CSbzv0ell3uOaLuFUtxaIAKgkfzZUADFPzUsFBTD4-Dbn6NlGDWHLFN-5otSr9lXqG2-Na2F44ozDLAcnogA3CLpGM9uN1wE5bGygCxUKcQKvlzWNrl49K5my7jvXEpFM2YL0CqiHLRfYrYyAOwne5J36o928qmcgRNWPC8hwNW2BZD5dNQbzW617-sUdCHwlb6Ca9ONsFDartWRAJyM1P6Mj1CRd64MzOTIQpC_UX6GPE1JVU9tUNcatrw`,
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
