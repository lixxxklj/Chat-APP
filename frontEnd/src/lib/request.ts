import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:5001/api',
  withCredentials: true,       // 携带 Cookie / Authorization
  timeout: 5000
})

export default instance