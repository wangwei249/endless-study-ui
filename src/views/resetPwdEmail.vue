<template>
  <div > 
    <!-- 密码重设邮件发送 --> 
     <el-form ref="form" :model="form" :rules="rules" label-width="30px"> 

          <el-row>
            <el-col :span="12">
            <el-form-item > 
              <b>将会向您的邮箱里发送一封带密码重置链接的邮件</b>
            </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item  prop="email">
                <el-input v-model="form.email" placeholder="请输入注册用户时的邮箱地址" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item >
                  <el-input
                    v-model="form.code"
                    auto-complete="off"
                    placeholder="验证码"
                    style="width: 63%" 
                    @keyup.enter.native="handleResetPwd"
                  >
                    <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
                  </el-input>
                  <div class="login-code"> 
                    <img :src="newCodeUrl"  class="login-code-img"  @click="getCodeNew"/> 
                  </div>
              </el-form-item>
          </el-col>
          </el-row>


          <el-row>
            <el-col :span="12">
              <el-form-item>
                <el-button type="primary" @click="handleResetPwd">密码重置</el-button>
                <el-button>取消</el-button>
              </el-form-item> 
          </el-col>
          </el-row>

    </el-form> 
     

  </div>
</template>

<script>
import { getCodeImg } from "@/api/login"; 
import { encrypt, decrypt } from '@/utils/jsencrypt'

export default {
  name: "ResetPwdEmail",
  data() { 
    return { 
      newCodeUrl: '',
      form: {
        email: '',
        code: '',
        uuid: '',
      }, 
      rules: {
        email: [
          { required: true, message: "邮箱地址不能为空", trigger: "blur" },
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
   
      }

    };
  },
 
  created() {
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


    /** 发送密码重置邮件 */
    handleResetPwd() {
      this.$refs.form.validate(valid => {
        if (valid) { 
          //alert(this.form.uuid);
          this.$store
            .dispatch("ResetPwdEmail", this.form)
            .then(res => {
              //alert(JSON.stringify(res));
              alert("密码重置链接已发送到您的邮箱，请在10分钟内打开邮件进行重置密码操作！");
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


  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
  
.login-code-img {
  height: 38px;
}
</style>
