import axios from 'axios'
// import router from "@/router";

const requestAxios = axios.create({
    headers: {
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTI0MTg3NjUsIm1hbmFnZXJfaWQiOjg3LCJtZXJjaGFudF9pZCI6Miwicm9sZXMiOlsxLDE1XX0.NWlok8y4QDRdgWgYUuDSUQhaaV6pxHc1Lblci42WG046auLpsHWN9juVL88w2HNnrhSU22TXHWL53tqgdFXvR7F9GHqe3wdQoYGYmtQF2CHTLtnd4Q70wUbLicirz6ZdbZPhI7bCkCjvGpAzCnaKfcs1fMJCEqAhYJbBNgHjEhmj5bq4iaqErYNLPNkm3Jw9FrNvoh-QabMWDbKptn1CvEFtDhM0_CdfSYosOGYHxl226noQbsO1F8wcwbjAzHwReTGW8r675LTF_jTl4DmdaWGFc8BGBJuShEzJQfH9DLJLntCSfY03hjARewUESwPIiVvYL93KPPceDrp1JjFguA`,
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
