<template>
 <!-- template下必须包裹一个层父元素，否则会报错。父元素不一定是div，其他的也可以 -->
    <div id="login"> 
       <!-- 这里是内容区 -->
       <div class="login-wrap">
           <ul class="menu-tab">
               <li :class="{'current':item.current}"  v-for="item in menuTab"  :key="item.id" @click="toggleMenu(item)">{{item.txt}}</li>
           </ul>
           <!-- 表单的开始 -->
           <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="login-form" size="medium">

        <el-form-item prop="username">
            <label >邮箱</label>
            <el-input type="text" v-model="ruleForm.username" autocomplete="off" class="item-form"></el-input>
        </el-form-item>

        <el-form-item prop="password">
            <label >密码</label>
            <el-input type="text" v-model="ruleForm.password" autocomplete="off" class="item-form" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="passwords"   v-show="model === 'register'">
            <label  >重复密码</label>
            <el-input type="text" v-model="ruleForm.passwords" autocomplete="off" class="item-form" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item  prop="code" class="item-form" >
            <label >验证码</label>
            <el-row :gutter="11">
                <!-- Layout 布局通过基础的 24 分栏，迅速简便地创建布局。：span之和相加为24 -->
                <el-col :span="14">  
                    <el-input v-model.number="ruleForm.code" class="item-form"  minlength="6" maxlength="6" ></el-input>
                </el-col>
                 <el-col :span="10">
                    <el-button type="success" class="block">获取验证码</el-button>
                </el-col>   
            </el-row>
        </el-form-item>
        <el-form-item>
            <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn  block">提交</el-button>
        </el-form-item>
        </el-form>
       </div>
    </div>
</template>
<script>
import {stripscript,validateEmail,validatePass,validateCodes} from '@/utils/validate';
export default{
    name:'login',
    data(){
       
    //  验证用户名
      var validateUsername= (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if(validateEmail(value)){
            callback(new Error ('用户名格式有误'));  
        } else{
          callback();   //true
        }
      };
    //   验证密码
      var validatePassword = (rule, value, callback) => {
        // console.log(stripscript(value));
        // 绑定过滤后的数据
        this.ruleForm.password = (stripscript(value));
        value = this.ruleForm.password;
        let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;  
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (validatePass(value)) {
          callback(new Error('密码为6至20位数字+字母'));
        } else {
          callback();
        }
      };
    //   验证重复密码
    var validatePasswords = (rule, value, callback) => {
        // 如果模块值为'login'直接通过
        if (this.model === 'login'){ callback();}
        // console.log(stripscript(value));
        // 绑定过滤后的数据
        this.ruleForm.passwords = (stripscript(value));
        value = this.ruleForm.passwords;
        let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;  
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value != this.ruleForm.password) {
          callback(new Error('重复密码错误'));
        } else {
          callback();
        }
      };
    //   验证验证码
      var validateCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入验证码'));
        }
        else if(validateCodes(value)){
            return callback(new Error('验证码格式有误'));   
        }else{
            callback();
        }
      };
      
        return{
            menuTab:[
                {txt:'登录',current:true,type:'login'},
                {txt:'注册',current:false,type:'register'}
            ],
            // 模块值，点击注册出现重复密码选项
            model:'login',
            //表单的数据
             ruleForm: {
                username: '',
                password: '',
                passwords:'',
                code: ''
                },
                rules: {
                username: [
                    { validator:validateUsername, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ],
                passwords: [
                    { validator: validatePasswords, trigger: 'blur' }
                ],
                code: [
                    { validator: validateCode, trigger: 'blur' }
                ]
                }
            };
    },
    creatde(){},
    //挂载完成后自动执行
    mounted(){
        
    },
    // 写函数的地方
    methods:{
        toggleMenu(data){
            // console.log(data)
            //es6中关于for循环的语法（index可以不加）
            this.menuTab.forEach((elem,index) => {
                elem.current = false
            });
            // 高光
            data.current = true;
        //    修改模块值
            this.model = data.type;
            
        },
        // 表单的方法
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      

    },
}
</script>
//  Lang=“scss”：写义类型
Scoped：局部，定义时：只有当前文件应用样式。否则为全局样式
<style lang="scss" scoped>
#login{
    height: 100vh;
    background-color: #344a5f;

}
.login-wrap{
    width: 330px;
    margin:auto;
}
.menu-tab{
    text-align: center;  
}
.menu-tab li{
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
}
.current{
    background-color: rgba(0,0,0,0.1);
}
.login-form{
    margin-top: 29px; 
    label{
    display: block;
    font-size: 14px;
    color: #fff;
    margin-bottom:3px;
    margin-top:13px;
}
//     .item-form{
//        margin-bottom: 13px;
// }
    .block{
        display: block;
        width: 100%;
    
}
    .login-btn{
        display: block;
        margin-top:32px;
}

}


</style>