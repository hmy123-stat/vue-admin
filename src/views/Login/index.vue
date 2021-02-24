<template>
    <div id="login"> 
        <div  class="login_1">
            <el-button>登录</el-button>
            <el-button>注册</el-button>
        </div>
        <br>
        <div>
            邮箱<br>
            <input type="text">
        </div>
        
    </div>
</template>
<script>
export default{
    name:'login'
}
</script>
<style lang="scss" scoped>
#login{
    height: 100vh;
    background-color: #344a5f;

}
.el-button{
    background-color: #142d45;
    color:white;
    outline: none;
    display: inline-block;
    margin:0 auto;
}

</style>