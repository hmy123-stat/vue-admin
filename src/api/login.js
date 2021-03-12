import service from "@/utils/request"
// 获取验证码
export function GetSms(data){
    service.request({
        method:"post",
        url:"/getSms/",
        data
        // 左边的data是变量名（key）后台接收的，右边的data是接收的参数.如果两者都是同名的情况下，可以写成单一一个即可（es6的写法）
    })
  ;}
// 获取用户角色
// 登录
// 注册