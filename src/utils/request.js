import axios from 'axios'
// 创建axios，赋值给变量service
// 手把手撸码前端API http://www.web-jshtml.cn/productApi
const BASEURL = process.env.NODE_ENV === 'production' ? ' ' : '/devApi';
const service = axios.create({
  baseURL: BASEURL,   //htt://192.168.0.102:8080/api/ == http://www.web-jshtml.cn/productapi/devApi
  timeout: 1000,
});
// 添加请求拦截器
service.interceptors.request.use(function (config){
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
//添加响应拦截器
service.interceptors.response.use(function (response){
  //对响应数据做点什么
  return response;
}, function (error) {
  //对响应错误做点什么
  return Promise.reject(error);
});
export default service;
// 使用export defaul 时，文件import不需要使用花括号，但不能同时存在多个default