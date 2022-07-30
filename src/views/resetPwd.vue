<template>
  <div >  
      <!-- 密码重置 --> 
      <el-row>
      </el-row>

      <el-row>
        <el-col :offset="10" :span="14">
 
            <el-form ref="form" :model="form" :rules="rules" label-width="80px"> 
              <el-row> 
                <el-col :span="12">
                  <el-form-item v-if="form.userId == undefined" label="新密码" prop="password">
                    <el-input v-model="form.password" placeholder="请输入新密码" type="password" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row> 
                <el-col :span="12">
                  <el-form-item v-if="form.userId == undefined" label="确认密码" prop="confirmPassword">
                    <el-input v-model="form.confirmPassword" placeholder="请输入确认密码" type="password" />
                  </el-form-item> 
                </el-col>
              </el-row> 


          </el-form>
 
      </el-col>
    </el-row> 

    
    <el-row> 
      <el-col  :offset="10" :span="14"> 
          <el-button type="primary" @click="handleResetPwd">确 定</el-button>
          <el-button @click="cancel">取 消</el-button> 
      </el-col>
    </el-row> 

  </div>
</template>

<script>
import { getCodeImg } from "@/api/login"; 
import { encrypt, decrypt } from '@/utils/jsencrypt'

export default {
  name: "ResetPwd",
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
      newCodeUrl: '',
      // 表单参数[注册新用户]
      form: {
        password: "",
        confirmPassword: "",
        uuid: this.$route.query.uuid
      },
      // 表单校验[注册新用户]
      rules: { 
        uuid: [
          { required: true, message: "uuid不能为空", trigger: "blur" }
        ], 
        password: [
          { required: true, message: "用户密码不能为空", trigger: "blur" }
        ], 
        confirmPassword: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { required: true, validator: equalToPassword, trigger: "blur" }
        ] 
       
      }

    };
  },
 
  created() {
     //alert(this.$route.query.uuid);
  },
  methods: { 
  
    /** 发送密码重置邮件 */
    handleResetPwd() {
      this.$refs.form.validate(valid => {
        if (valid) { 
          //alert(this.form.uuid);
          this.$store
            .dispatch("ResetPwd", this.form)
            .then(res => {
              alert(JSON.stringify(res));
              alert("密码重置成功，请重新登录");
  
            })
            .catch(() => {
              this.loading = false; 
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
