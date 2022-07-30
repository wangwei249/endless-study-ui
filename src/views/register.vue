<template>
  <div >
    
    <!-- 用户注册 --> 
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
         <el-row>
          <el-col :span="12">
            <el-form-item v-if="form.userId == undefined" label="登录名" prop="userName">
              <el-input v-model="form.userName" placeholder="请输入用户名称" />
            </el-form-item>
          </el-col> 
          </el-col>
        </el-row>
        <el-row> 
           <el-col :span="12">
            <el-form-item v-if="form.userId == undefined" label="登陆密码" prop="password">
              <el-input v-model="form.password" placeholder="请输入用户密码" type="password" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
           <el-col :span="12">
            <el-form-item v-if="form.userId == undefined" label="确认密码" prop="confirmPassword">
              <el-input v-model="form.confirmPassword" placeholder="请输入用户密码" type="password" />
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="18">
            <el-form-item label="用户昵称" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入用户昵称" />
            </el-form-item>
          </el-col> 
        </el-row>
        <el-row>
          <!-- <el-col :span="12">
            <el-form-item label="手机号码" prop="phonenumber">
              <el-input v-model="form.phonenumber" placeholder="请输入手机号码" maxlength="11" />
            </el-form-item>
          </el-col> -->
          <el-col :span="18">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50" />
            </el-form-item>
          </el-col>
        </el-row>
 
        <el-row>
          <el-col :span="18">
            <el-form-item label="用户性别">
              <el-select v-model="form.sex" placeholder="请选择">
                <el-option
                  v-for="dict in sexOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col> 
        </el-row> 

       <el-row>
          <el-col :span="18">
            <el-form-item prop="code">
              <el-input
                v-model="form.code"
                auto-complete="off"
                placeholder="验证码"
                style="width: 63%" 
                @keyup.enter.native="handleRegister"
              >
                <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
              </el-input>
              <div class="login-code">
                 <!-- @click="getCodeNew"   -->
                <img :src="newCodeUrl"  class="login-code-img" @click="getCodeNew"/> 
              </div>
            </el-form-item>
          </el-col> 
      </el-row> 


      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleRegister">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>        

  </div>
</template>

<script>
import { getCodeImg } from "@/api/login"; 
import { encrypt, decrypt } from '@/utils/jsencrypt'

export default {
  name: "Register",
  data() {
    //rules里使用，验证两次输入密码是否一致
    const equalToPassword = (rule, value, callback) => {
      if (this.form.password !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      
      loading: false,
      redirect: undefined,
      userRegister: true,
      newCodeUrl: '',
      // 性别状态字典
      sexOptions: [{'dictValue':'1','dictLabel':'男'},{'dictValue':'0','dictLabel':'女'}],
      // 表单参数[注册新用户]
      form: {
        username: "",
        password: ""
      },
      // 表单校验[注册新用户]
      rules: {
        userName: [
          { required: true, message: "用户名称不能为空", trigger: "blur" }
        ],
        nickName: [
          { required: true, message: "用户昵称不能为空", trigger: "blur" }
        ], 
        password: [
          { required: true, message: "用户密码不能为空", trigger: "blur" }
        ], 
        confirmPassword: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { required: true, validator: equalToPassword, trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱地址不能为空", trigger: "blur" },
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
        // phonenumber: [
        //   { required: true, message: "手机号码不能为空", trigger: "blur" },
        //   {
        //     pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
        //     message: "请输入正确的手机号码",
        //     trigger: "blur"
        //   }
        // ]
      }
    };
  },
 
  created() {
    //alert("重设验证码");
    this.getCodeNew(); 

    //下面是获取下拉列表时的正确方式，只不过注册页面尚未登录，没有令牌
    // this.getDicts("sys_user_sex").then(response => {
    //    this.sexOptions = response.data;
    // });
  },
  methods: { 
    getCodeNew() {
      getCodeImg('math').then(res => {
        
      //alert('afwe');
        this.newCodeUrl = "data:image/gif;base64," + res.img;
        this.form.uuid = res.uuid;
      });
    },
  

    /** 打开注册新用户 
    register() {

      //重设表单
      
      this.form.userName = '';
      this.form.password = '';
      this.reset();
      getCodeImg().then(res => {
        this.newCodeUrl = "data:image/gif;base64," + res.img;
        this.form.uuid = res.uuid;
  
      }); 

      this.userRegister = true;

         
    },*/

    /** 注册新用户 */
    handleRegister() {
      this.$refs.form.validate(valid => {
        if (valid) { 
          this.$store
            .dispatch("Register", this.form)
            .then(res => {
              //alert(JSON.stringify(res));
              alert("注册成功，请重新登录");
              //this.$router.push({ path: this.redirect || "/" });

              //创建新用户生词系统相关的默认数据 230220612  【已挪至后端注册用户内部方法调用】
              // addUserDefaultSetting(this.form.userId).then(response => {
              //     if (response.code === 200) {
              //       this.msgSuccess("新增成功"); 
              //       this.getList();   
              //     }
              // });

            })
            .catch(() => {
              this.loading = false;
              this.getCodeNew();
            });
        }
      });
    },


    // 表单重置
    reset() {
      this.form = {
        userId: undefined,
        deptId: undefined,
        userName: '', 
        nickName: '',
        password: '', 
        confirmPassword: undefined,
        phonenumber: undefined,
        email: undefined,
        sex: undefined,
        status: "0",
        remark: undefined,
        postIds: [],
        roleIds: [],
        uuid: undefined,
        code: undefined,
      };
      this.resetForm("form");
    },


  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
  
.login-code-img {
  height: 38px;
}
</style>
