import axios from "axios";

const getIdToken = () => localStorage.getItem("id_token") || "";

//https://hackernoon.com/110percent-complete-jwt-authentication-with-django-and-react-2020-iejq34ta
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5000",
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "application/json";
    config.headers["Authorization"] = getIdToken();

    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

/*
axiosInstance.interceptors.response.use(
    response => response,
    error => {
      const originalRequest = error.config;
      
      if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
          const refresh_token = getIdToken();

          return axiosInstance
              .post('/token/refresh/', {refresh: refresh_token})
              .then((response) => {

                  localStorage.setItem('access_token', response.data.access);
                  localStorage.setItem('refresh_token', response.data.refresh);

                  axiosInstance.defaults.headers['Authorization'] = response.data.access;
                  originalRequest.headers['Authorization'] = response.data.access;

                  return axiosInstance(originalRequest);
              })
              .catch(err => {
                  console.log(err)
              });
      }
      return Promise.reject(error);
  }
);
*/
export default axiosInstance;
