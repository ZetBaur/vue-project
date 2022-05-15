import axios from 'axios'
// import router from "@/router";

const requestAxios = axios.create({
    headers: {
        Authorization: `BBearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTI2Nzg3OTUsIm1hbmFnZXJfaWQiOjg3LCJtZXJjaGFudF9pZCI6Miwicm9sZXMiOlsxLDE1XX0.X_O5lP9PqCH8BHnGdsaiMO8VtsOSVECKaEF4lCq_c5hy9j29ldhgi29JDF88HKL0xXwLpxRZ5aKPPnNjTEG17NGa92kt7Wkkj20YoeMzxI6s3Ek6SJDG8Ayie_iy17d4m2Yu-4f7qvDpR2vYijdwozYZOn7RSAozfxv1n1syvT4Iuww5DploBsRrmrX8cE1R-8UdWE-BJMoFj2jDHayhqD7jnrdA0yRzO9C30t6b_xA7tUA1CjQnbgT_FnQ3ZYOysWm0I8xmpkxFGfNhM5pmVkMA9B0GO7bD-3OqIxAs-_SYQv7f5QDrXbzn52yFL8A3wQIJMGOoN57Bl-IqxoM9BQ`,
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
