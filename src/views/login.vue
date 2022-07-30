<template>
  <div class="login">
    
    <el-row :gutter="24" class="loginTitle">
        <el-col :span="4" style="padding-left:20px;background-image: url('../assets/image/titleBack.png')">
            <img src="@/assets/image/newWord4.png">
        </el-col>
    </el-row>
 
    <el-row :gutter="24" class="loginNew">
     <el-col :offset="2" :xs="0" :sm="8" :md="8" :lg="14"  >
          <el-carousel indicator-position="inside">
            <el-carousel-item >
              <img src="@/assets/image/intro1.png" style="width:100%;height:100%">
            </el-carousel-item>
            <el-carousel-item >
              <img src="@/assets/image/intro2.png" style="width:100%;height:100%">
            </el-carousel-item>
            <el-carousel-item >
              <img src="@/assets/image/intro3.png" style="width:100%;height:100%">
            </el-carousel-item>
            <el-carousel-item >
              <img src="@/assets/image/intro4.png" style="width:100%;height:100%">
            </el-carousel-item>
            <el-carousel-item >
              <img src="@/assets/image/intro5.png" style="width:100%;height:100%">
            </el-carousel-item>
            <el-carousel-item >
              <img src="@/assets/image/intro6.png" style="width:100%;height:100%">
            </el-carousel-item>
            <el-carousel-item >
              <img src="@/assets/image/intro7.png" style="width:100%;height:100%">
            </el-carousel-item>
            <el-carousel-item >
              <img src="@/assets/image/intro8.png" style="width:100%;height:100%">
            </el-carousel-item>
          </el-carousel>
     </el-col>

     <el-col :xs="24" :sm="14" :md="14" :lg="6"  style="height:'350px'">
       <el-card>
          <el-tabs v-model="activeName" @tab-click="handleClick"   stretch>
            <el-tab-pane label="微信登录" name="weixinTab" >
                <!-- <img src="@/assets/image/loginBackNew.webp"  width="250px" height="250px" class="wxImg"> -->
                <!-- <img  :src="WeixinUrl"  width="250px" height="250px" class="wxImg"> -->
                <div style="width:200px;height:250px;margin:0 auto;margin-top:20px;">
                <div id="qrcode" ref="qrcodeRef" ></div>
                <!-- <a>点击刷新</a> <br/> --> 
                </div>
                <div style="margin:0 auto;margin-left:150px;"><font color="red">二维码有效期1分钟</font></div>
                <div style="margin:0 auto;margin-left:100px;margin-top:30px">请使用微信扫描二维码登录注册</div>
            </el-tab-pane>
            <el-tab-pane label="账号登录" name="zhanghao">
                <!-- <el-card :body-style="{ padding: '0px',width:'740px',height: '450px',padding:'20px'}"> -->
                <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
                    <!-- <h3 class="title">学习系统</h3> --> 
                    <el-form-item prop="username">
                      <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
                        <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
                      </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                      <el-input
                        v-model="loginForm.password"
                        type="password"
                        auto-complete="off"
                        placeholder="密码"
                        @keyup.enter.native="handleLogin"
                      >
                        <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
                      </el-input>
                    </el-form-item>
                    <el-form-item prop="code">
                      <el-input
                        v-model="loginForm.code"
                        auto-complete="off"
                        placeholder="验证码"
                        style="width: 63%"
                        @keyup.enter.native="handleLogin"
                      >
                        <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
                      </el-input>
                      <div class="login-code">
                        <img :src="codeUrl" @click="getCode" class="login-code-img"/>
                      </div>
                    </el-form-item>
              
                    <el-form-item prop="code">
                      <div>  
                        <span style="font-size:14px;float:left">没有帐号?<a href="#" @click="register"><font color="green">立即注册</font></a>  </span>  
                        <span style="font-size:14px;float:right"> 
                          <a href="#" @click="resetPwd"><font color="green">忘记密码？</font></a> &nbsp;&nbsp;
                          <el-checkbox v-model="loginForm.rememberMe" style="">记住密码</el-checkbox>
                        </span>
                      </div>
                      
                    </el-form-item>

                    <el-form-item style="width:100%;">
                      <el-button
                        :loading="loading"
                        size="medium"
                        type="primary"
                        style="width:100%;"
                        @click.native.prevent="handleLogin"
                      >
                        <span v-if="!loading">登 录</span>
                        <span v-else>登 录 中...</span>
                      </el-button>
                    </el-form-item>
                  </el-form>
                <!-- </el-card> -->
            </el-tab-pane> 
          </el-tabs> 
       </el-card>
     </el-col>

    </el-row>




    <el-dialog :visible.sync="openContactUs" width="650px" height="600px" append-to-body   > 
        <el-tabs v-model="contactUsTabModel" stretch>
          <el-tab-pane label="联系我们" name="contactUsTab" > 
              <div style=" height:40px;margin:0 auto;margin-top:20px;">
                 <div>  <span><b>关于我们：</b></span></div>
                  <div> <span>endlessly.cn  基于全球互联网向广大网民提供无止境的信息管理服务。该网站创建于2022年，是为了提供优质的个人信息管理服务而创建。并提供个性化软件定制服务。</span></div>
              </div> 
              <el-divider></el-divider>
              <div style=" height:40px;margin:0 auto;margin-top:20px;">
                 <div>  <span><b>技术QQ群：</b></span></div>
                  <div> <span><el-tag>58999284</el-tag></span></div>
              </div> 
              <el-divider></el-divider>
              <div style=" height:40px;margin:0 auto;margin-top:20px;">
                 <div>  <span><b>QQ客服：</b></span></div>
                  <div> <span><el-tag>58999284</el-tag></span></div>
              </div> 
              <el-divider></el-divider>
              <div style=" height:40px;margin:0 auto;margin-top:20px;">
                 <div>  <span><b>广告业务：</b></span></div>
                  <div> <span><el-tag>58999284</el-tag></span></div>
              </div> 
              <el-divider></el-divider>
              <div style=" height:40px;margin:0 auto;margin-top:20px;">
                 <div>  <span><b>意见反馈：</b></span></div>
                  <div> <span>wangwei249@126.com</span></div>
              </div> 
          </el-tab-pane>
        </el-tabs>
    </el-dialog>

    <el-dialog :visible.sync="openSecret" width="1000px" height="900px" append-to-body   > 
       <div class="col-md-12" style="padding:0;font-family: Tahoma,'微软雅黑';">
            <div style="padding:5vh 10vw;line-height:30px;min-height:80vh;">
                <h4 class="line">隐私保护声明</h4>
                <div class="line" style="padding:10px 2vw;">
                    <p>
                        当您选择使用<span class="bold" style="color:#555;font-weight:bold;">endlessly.cn</span>
                        ，我们就有责任和义务保护您在本站所产生的所有数据和行为隐私，维护每一个用户的隐私权利。
                    </p>
                    <p>
                        我们尽量以清晰、容易理解的方式展现此隐私声明，
                        帮助您能够清晰地了解我们会收集哪些数据、为什么收集这些数据，
                        会利用这些数据做些什么及如何保护这些数据。
                    </p>
                    <p>
                  <span class="green" style="font-weight:bold;">
                      若您使用endlessly.cn的服务，即表示您认同我们在本政策中所述内容。
                  </span>
                    </p>
                </div>

                <h4 class="line" style="padding:20px 0;">我们会收集您的以下信息</h4>
                <div class="line " style="padding:0 2vw;">
                    <li>日志信息：当您使用endlessly.cn服务时，我们的服务器会自动记录一些信息，
                        例如您对我们的产品和/或服务的使用情况、IP地址、所访问服务的URL、浏览器的类型和使用的语言，
                        以及访问服务的日期、时间、时长等。例如：
                        127.0.0.1 - - [29/Oct/2022:03:44:39 +0800] "GET / HTTP/2.0"
                        200 3964 "-" "Mozilla/5.0 (Linux; Android 8.1.0; PACM00 Build/O11019; wv) AppleWebKit/537.36
                        (KHTML, like Gecko)
                        Version/4.0 Chrome/62.0.3202.84 Mobile Safari/537.36"
                    </li>
                    <li>设备信息：
                        为了提供更好的服务并改善用户体验，我们会收集设备属性信息（例如您的硬件型号、操作系统版本、设备配置、唯一设备标识符、网络设备硬件地址MAC等），
                        设备连接信息（浏览器的类型、电信运营商、使用的语言）。对于从您的各种设备上收集到的信息，
                        我们可能会将它们进行关联，以便我们能在这些设备上为您提供一致的服务。
                    </li>
                    <li>
                        位置信息：
                        当您开启浏览器定位功能并使用我们基于位置提供的相关服务时，
                        我们可能会收集和处理有关您实际所在位置的信息，以使得您不需要手动输入自身地理坐标就可获得相关服务。
                        我们会使用IP 地址获取您的位置信息，能够提供相关信息的其他信息。
                    </li>
                    <li>
                        <span class="red">临时数据</span>：
                        当您使用本站的数据临时分享服务时，我们会上传您的JSON数据到服务器，临时保存1小时后自动清除，分享页面也为您提供了立即删除功能。
                        我们仅仅使用此数据生成分享地址，我们承诺不会用作其他任何用途。为了确保您的数据安全，请勿使用分享功能分享敏感数据。
                    </li>
                </div>
                <h4 class="line" style="padding:20px 0;">信息的用途</h4>
                <div class="line " style="padding:0 2vw;">
                    <li>安全防护：
                        我们会使用您的访问日志，进行大数据分析，训练模型，以防护对本站一切可能性的攻击
                        例如：XSS、DDOS攻击等。
                    </li>
                    <li>内容推荐：
                        通过使用收集的信息，我们会得以向您提供定制化内容。
                        在符合相关法律法规的前提下，可能将通过某些服务所收集的信息用于我们的其他服务。
                    </li>
                    <li>
                        其他用途：
                        <span class="green" style="font-weight:bold;">
                    在将您的信息用于隐私声明未包含的用途时，我们会事先征求您的同意。</span>
                    </li>
                </div>
                <h4 class="line" style="padding:20px 0;">保存期限</h4>
                <div class="line " style="padding:0 2vw;">
                    <span>当您不再访问本站超过10年时间，我们会自动清理相关数据</span>
                </div>
                <h4 class="line" style="padding:20px 0;">您的隐私相关权利（尚未开始收集信息，此项暂不可用）</h4>
                <div class="line " style="padding:0 2vw;">
                    <li>查看权利：
                        通过邮件联系我们，获取与您相关的所有个人数据。
                    </li>
                    <li>修改权利：
                        通过邮件联系我们，更新您的任何个人数据，或限制我们的使用范围。
                    </li>
                    <li>
                        删除权利：
                        通过邮件联系我们，删除您的任何个人相关信息。
                    </li>
                </div>
                <h4 class="line" style="padding:20px 0;">联系方式：</h4>
                <div class="line " style="padding:0 2vw;">
                    <span>网站邮箱：</span>
                    <a href="wangwei249@126.com" style="font-family: Tahoma,'微软雅黑';">wangwei249@126.com</a>
                </div>
            </div>
        </div>
      </el-dialog>


     <el-dialog :visible.sync="openAuth" width="1000px" height="900px" append-to-body> 
      <div class="col-md-12" style="padding:0;font-family: Tahoma,'微软雅黑';">
        <div style="padding:5vh 10vw;line-height:30px;min-height:80vh;">
            <h4 class="line">权利保护声明</h4>
            <div class="line" style="padding:10px 0;">
                <p>
                    <span class="bold" style="color:#555;font-weight:bold;">endlessly.cn</span>
                    作为IT行业基于全球互联网向广大网民提供在线格式化、解析、验证等服务。
                    根据用户本人的指令，本站会以非人工方式自动处理第三方信息内容，以便用户能够方便使用解析、格式化等在线服务。
                    “endlessly.cn”自身不存储、控制、编辑或修改被服务内容的第三方网页上登载、存储、编辑、显示被检索（包括但不限于以文字、图片或音乐等形式出现）的信息的内容或其表现形式。

                </p>
                <p>
                    endlessly.cn一贯高度重视知识产权保护并遵守中国各项知识产权法律、法规和具有约束力的规范性文件。
                    根据法律、法规和规范性文件要求，本站制定了旨在保护权利人的合法权益的措施和步骤，
                    当权利人发现在本站存在的内容侵犯其合法权益时，
                    权利人应事先向本站发出“权利通知”，本站将根据中国法律法规和政府规范性文件采取措施移除相关内容。
                </p>
                <p>具体步骤如下：</p>
                <h5 class="line" style="padding:10px 0;">权利通知</h5>
                <div class="line " style="padding:0 2vw;">
                    <li> 1. 权利人发现本站存在内容或服务侵害其合法权益；</li>
                    <li> 2. 本站以自动服务方式处理的内容侵犯了上述权利人的合法权益。</li>
                </div>
                <div>
                    请上述个人或单位务必以邮件的方式向本站提交权利通知，邮箱地址：service@json.cn。<br/>
                    请注意：如果权利通知的陈述失实，权利通知提交者将承担对由此造成的全部法律责任（包括但不限于赔偿各种费用及律师费）。<br/>
                    如果上述个人或单位不确定网络上可获取的资料是否侵犯了其合法权益，本站建议首先咨询专业人士。<br/>
                    为了本站有效处理上述个人或单位的权利通知，请使用以下格式（包括各条款的序号）：
                </div>
                <div class="line " style="padding:0 2vw;">
                    <li> 1. 权利人对涉嫌侵权内容拥有商标权、著作权和/或其他依法可以行使权利的权属证明；</li>
                    <li> 2. 请充分、明确地描述确信被侵犯了权利人合法权益的内容并请提供非法登载该作品的第三方网址。</li>
                    <li> 3. 请指明涉嫌侵权网页的哪些内容侵犯了第2项中列明的权利人的合法权益。</li>
                    <li> 4. 请提供权利人具体的联络信息，包括姓名、身份证或护照复印件（对自然人）、单位登记证明复印件（对单位）、通信地址、电话号码、传真和电子邮件。</li>
                    <li> 5. 请提供涉嫌侵权内容在信息网络上的位置（如指明您举报的含有侵权内容的出处，即：指网页地址或侵权内容截图）以便我们与您举报的含有侵权内容的网页的所有权人/管理人联系。
                    </li>
                    <li>
                        6. 请在权利通知中加入如下关于通知内容真实性的声明：</br>

                        “我本人为所投诉内容的合法权利人；</br>
                        在我举报的内容侵犯了本人相应的合法权益。</br>
                        本人确认：如果本通知内容不完全属实，本人将承担由此产生的一切法律责任。”
                    </li>
                    <li>
                        7. 请在权利通知中加入以下陈述：“我保证，本通知中所述信息是充分、真实、准确的，我是所投诉内容的合法权利人，或，我已获授权，有权行使第2项中列明内容的权益。”
                    </li>
                    <li>8. 请您签署该文件，如果您是依法成立的机构或组织，请您加盖公章。</li>
                </div>
                <div>
                    请您把以上资料和联络方式<span style="font-weight:bold;">以邮件附件的方式</span>发往以下地址：<br/>
                    邮箱地址：<a>wangwei249@126.com</a><br/>
                    为了缩短您通知的处理时间，请您发送电子版《权利通知》相关材料时附上涉侵权URL地址。
                </div>
            </div>
        </div>
        </div>
       </el-dialog>


    <!-- 密码重置邮件发送 -->
    <el-dialog :visible.sync="openResetPwd" width="800px" height="600px" append-to-body>  
         <ResetPwdEmail ref="ResetPwdEmail"></ResetPwdEmail>
    </el-dialog>   


    <!--  底部  -->    
    <div class="el-login-footer">
      <font color="#454926"><a href="javascript:void(0)" @click="secret">隐私保护</a></font>  |  <a href="javascript:void(0)" @click="auth">权利保护</a>  |  
      <font color="#454926"><a href="javascript:void(0)" @click="contactUs">联系我们</a></font>  |  问题反馈 </br>
      <span>Copyright © 2022-2025 <a href="http://www.endlessly.cn">www.endlessly.cn</a> All Rights Reserved. 
      <a href="https://beian.miit.gov.cn/"><font color="blue">豫ICP备2022013318号-1</font></a></span>
    </div>
    


    <!-- 用户注册 -->
    <el-dialog  title="用户注册" 
               :visible.sync="userRegister" width="500px" append-to-body 
               :show-close="true"  :close-on-click-modal="false"> 
      
      <Register  ref="Register"></Register>

    </el-dialog>           

  </div>
</template>

<script>
import { getCodeImg,checkIsWxMapLogin } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'
import Register from "@/views/register";
import ResetPwdEmail from "@/views/resetPwdEmail";
import QRCode from "qrcodejs2";
import { uuid } from 'vue-uuid';

export default {
  name: "Login",
  components: {
    Register,
    ResetPwdEmail
  },
  data() {
    //rules里使用，验证两次输入密码是否一致
    const equalToPassword = (rule, value, callback) => {
      if (this.form.confirmPassword !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      codeUrl: "",
      cookiePassword: "",
      loginForm: {
        username: "admin",
        password: "admin123",
        rememberMe: false,
        code: "",
        uuid: "",
        uuidForWeixin: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" }
        ],
        code: [{ required: true, trigger: "change", message: "验证码不能为空" }]
      }, 

      loading: false,
      redirect: undefined, 
      userRegister: false,
      activeName: 'zhanghao',
      WeixinUrl: '',
      checkIsWxMapLoginClock:null,
      checkCountDown: 60,
      isWxMapLogin: false,  
      openContactUs: false,
      contactUsTabModel: 'contactUsTab',
      openSecret: false,
      openAuth: false,
      openResetPwd: false,
  
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.getCode();
    this.getCookie();
  },
  methods: {
    getCode() {
      getCodeImg('math').then(res => {
        this.codeUrl = "data:image/gif;base64," + res.img;
        this.loginForm.uuid = res.uuid;
      });
    },
 
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              //alert( this.redirect || "/" );
              this.$router.push({ path: this.redirect || "/" });
            })
            .catch(() => {
              this.loading = false;
              this.getCode();
            });
        }
      });
    },



    /** 打开注册新用户 */
    register() { 
      this.userRegister = true; 
      this.$refs.Register.getCodeNew();
    },
  
    handleClick(tab, event) {
 
      if(tab.name == 'weixinTab'){
         alert("功能即将开通");
         return;
         this.WeixinUrl = this.$router.options.base+'/static/image/loginBackNew.webp'; 
         //alert(encodeURIComponent('https://9f33960714.imdo.co/auth/wxcode'));
         this.uuidForWeixin = (uuid.v1());
         //生成url对应的二维码
         let that = this;
         let qrcode = new QRCode("qrcode", {
            width: 200,
            height: 200,
            correctLevel : 3,
            text: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6c8d12d25b64c78f&redirect_uri=https%3A%2F%2F9f33960714.imdo.co%2Fauth%2Fwxcode&response_type=code&scope=snsapi_userinfo&state='+this.uuidForWeixin+'#wechat_redirect',
         });


         //设置轮询，查看是否有uuid对应的token信息【微信扫码登录成功后，后台会自动创建用户并存储token】  
         this.checkCountDown = 60;
         this.isWxMapLogin = false;
         if(this.checkIsWxMapLoginClock){  
             clearInterval(this.checkIsWxMapLoginClock);
         } 
         this.checkIsWxMapLoginClock = setInterval(() => {
            checkIsWxMapLogin(this.uuidForWeixin).then(res => {
               this.checkCountDown--;
               if(null != res.data && !this.isWxMapLogin){ 
                  this.isWxMapLogin = true;  
                  //alert('查询到。');
                  this.$refs.qrcodeRef.innerHTML = '<img  src="'+this.$router.options.base+'/static/image/loadingMp.gif"  width="200px" height="200px">';
               }
            });
             
            //后台已经处理好了扫码登录的token，则清楚轮询器，重新获取token并设置到store，然后转向首页（转向首页时会在permission.js中通过token获取user信息）
            if(this.isWxMapLogin){
               //alert('fwef2');
               clearInterval(this.checkIsWxMapLoginClock); 
               this.$store.dispatch("LoginWeixin", this.uuidForWeixin).then(() => {
                    //alert( this.redirect || "/" ); 
                    this.$router.push({ path: this.redirect || "/" }); 
                    
                  }).catch(() => {
                    // this.loading = false;
                    // this.getCode();
                  });
            }

            if (this.checkCountDown <= 1) {
                clearInterval(this.checkIsWxMapLoginClock);
                this.$refs.qrcodeRef.innerHTML = '<img  src="'+this.$router.options.base+'/static/image/refreshMp.jpg"  width="200px" height="200px"  onclick="">';
                //alert('超时请刷新二维码。');
            }
 
         }, 1000);
      }else{
         this.WeixinUrl = '';
         this.checkCountDown = 60;
         this.isWxMapLogin = false;
         if(this.checkIsWxMapLoginClock){  
             clearInterval(this.checkIsWxMapLoginClock);
         } 
         this.delQrcode();
      } 
    },

    // 清空二维码,避免生成多个二维码
    delQrcode() {
        this.$refs.qrcodeRef.innerHTML = ""
    },


    contactUs() {
       this.openContactUs = true;
    },

    secret() {
       this.openSecret = true;
    },
    
    auth() {
       this.openAuth = true;
    },
        
    resetPwd() {
      this.openResetPwd = true;
      this.$refs.ResetPwdEmail.getCodeNew();
    },
 


  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  // display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  // background-image: url("../assets/image/loginBackNew.webp");
  background-size: cover;
}

.loginTitle {
   height:150px;
   background-color:#102b6a;
   background-image: url("../assets/image/titleBack.png");
}

.loginNew {
  margin-top: 100px;
}

.loginType {
  font-size: 18px;
  text-align: center;
  color: #bfbfbf;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 0px;
  background: #ffffff;
  width: 400px;
  height: 350px;
  padding: 20px 0px 0px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}

.wxImg {
  padding: 44px 0px 44px 94px;
}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 90px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: rgb(41, 39, 39);
  background-color: #e6dfdf;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}

::v-deep .el-tabs__nav-scroll {
  width: 50%;
  margin: 0 auto; 
}

.el-tabs__item {
  font-size: 18px !important;
}

.el-carousel__container {
  height: 440px !important;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #eff2f5;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #f3f7fc;
}

</style>
