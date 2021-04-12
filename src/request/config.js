import axios from "axios";
import Vue from "vue";

Vue.prototype.$axios = axios;

const http = axios.create({
  timeout: 3000,
  baseURL: ""
});

http.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.log(error);
  }
);

http.interceptors.response.use(
  response => {
    let res = {};
    //判断状态码200返回数据，404跳转404页面
    res.status = response.status;
    res.data = response.data;
    return res;
  },
  error => {
    console.log(error);
  }
);
export default http;
