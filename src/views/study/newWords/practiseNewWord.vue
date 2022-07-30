<template>
  <div >
  
    <!-- 练习生词对话框 NEW --> 
    <!-- <el-dialog :title="titlePractise" 
               :visible.sync="openPractise" width="850px" 
               :show-close="false" 
               @close="closePractise" 
               custom-class="practiseDialog2">  -->
 

        <div slot="title" >
            <div ></div>
        </div> 
   
        <el-row :gutter="24" > 


          <el-col :span="8"   align="right">          
            <!-- 挑战好友页面 -->
            <el-popover
                    placement="right" @hide="hidePopover"
                    width="400"
                    trigger="click"
                    v-model="openChallenge">

                    <el-form ref="formChellenge" :model="form" :rules="rules" label-width="80px"  @submit.native.prevent>   
          
                      
                      <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
                      <el-input
                          v-model="userNameForSearch"
                          placeholder="输入好友名称/昵称回车键搜索"
                          clearable
                          size="small" 
                          @keyup.enter.native="listFriends"
                          style="margin-bottom:15px;"
                        />
                       <el-table
                          ref="multipleTable"
                          :data="userList"
                          tooltip-effect="dark"
                          style="width: 100%"
                          @selection-change="handleSelectionChangeChallenge">
                          <el-table-column
                            type="selection"
                            width="55">
                          </el-table-column>
                          <el-table-column  label="姓名" > 
                            <template slot-scope="scope">
                               <el-tag>{{scope.row.userName}} </el-tag>
                            </template>
                          </el-table-column>
                          <el-table-column  label="昵称" > 
                            <template slot-scope="scope">
                               {{scope.row.nickName}}
                            </template>
                          </el-table-column>
                       </el-table>    


                      <el-input v-model="form.challengePut" placeholder="挑战留言" style="margin-top:15px;margin-bottom:10px;"></el-input>
                      <el-button size="small" type="primary" @click="chellengeUser" icon="el-icon-position">发起</el-button>
                      <el-button size="small" type="info" @click="hidePopover" icon="el-icon-s-release">取消</el-button>
                    </el-form> 
                    <el-button slot="reference" icon="el-icon-share" type="primary" style="margin-bottom:15px;" @click="listFriends">挑战好友</el-button>
            </el-popover>


            <el-button  @click="closePractise"  icon="el-icon-error" style="margin-left:15px;margin-top:8px;"  >结束练习</el-button>
  
          </el-col>



          <el-col :span="8" :offset="8"  align="right">  
             <el-button type="success" style="margin-top:8px;" icon="el-icon-check">&nbsp;&nbsp;&nbsp; {{practiseRightTimes}}&nbsp;&nbsp;&nbsp;</el-button> 
             <el-button type="danger"  style="margin-left:15px;" icon="el-icon-close">&nbsp;&nbsp;&nbsp; {{practiseWrongTimes}}&nbsp;&nbsp;&nbsp;</el-button>  
          </el-col>
    
        </el-row>  





        <el-row :gutter="24"> 
    
          <el-col :span="18" align="middle"> 
             <el-card  shadow="always" body-style="{ padding: '10px' }">
              <span :style="wordStyle">
                  {{this.currentWord.word}}
              </span>  
             </el-card>  
          </el-col>
  
          <el-col :span="6" align="right">  
             <el-progress  :percentage="practiseRatio" type="circle" :width="100" :format="format" class="elprogress"></el-progress> 
          </el-col>

        </el-row>
        
        <el-row :gutter="22" v-if="challengeReplyShow">
          <el-col :span="12">
            <el-tag effect="plain">挑战者说</el-tag>     {{this.currentWord.challengePut}}
          </el-col>
        </el-row>  
        <el-row  v-if="challengeReplyShow" style="margin-top:5px;">
          <el-col  > 
    
            <el-input placeholder="我的回复" v-model="challengeReply"  size="15"></el-input> 
             
          </el-col>
        </el-row>
 
        <el-progress :percentage="countDownRatio" :status="countDownStatus" ></el-progress>
 
        <el-row :gutter="24">
          <el-col :span="24">
   
            <div v-for="(item, index) in this.suggestWords"  style="display: flex;"> 
              <el-card class="box-card"  @click.native="checkAnswer(item,index)"> 
                  <span style="margin-left: 2px" v-for="(means,i) in item.meansList" > 
                      <span v-if="i != item.meansList.length-1" ><font style="color:green;">{{means.posName}}</font> &nbsp;&nbsp;&nbsp;{{means.means}}  </br></br> </span>
                      <span v-if="i == item.meansList.length-1" ><font style="color:green;">{{means.posName}}</font> &nbsp;&nbsp;&nbsp;{{means.means}} </span>
                       
                  </span>  
              </el-card>   
            </div>
              
          </el-col> 
        </el-row>
    <!-- </el-dialog>  -->
    


 
 
  </div>
   
</template>

<script>
import CountTo from 'vue-count-to'
import LineChart from '@/views/dashboard/LineChart'
import RaddarChart from '@/views/dashboard/RaddarChart'
import PieChart from '@/views/dashboard/PieChart'
import BarChart from '@/views/dashboard/BarChart'
import Profile from "@/views/system/user/profile/index";
import { listNewWords, listNewWordsRandom,selectNewWordsCollect,selectExpectActual,selectChallengeCollect,getNewWords, delNewWords, addNewWords, updateNewWords,addChallenge,selectFriendsDyn,listHots,editBatch,selectRank} from "@/api/study/newWords";
import { listEnglishWords, getEnglishWords, delEnglishWords, addEnglishWords, updateEnglishWords,listEnglishWordsSuggest } from "@/api/study/englishWords";
import { listNewWordsRecords, getNewWordsRecords, delNewWordsRecords, addNewWordsRecords, updateNewWordsRecords } from "@/api/study/newWordsRecords";
import { listUser, getUser, delUser, addUser, updateUser, resetUserPwd, changeUserStatus } from "@/api/system/user";
import { listFriends, getFriends, delFriends, addFriends, updateFriends ,listFriendsTwoWay} from "@/api/study/friends";  
import { listSetting, getSetting, delSetting, addSetting, updateSetting,editSettingBatch } from "@/api/study/setting";
import QRCode from "qrcodejs2";
import { uuid } from 'vue-uuid'; 
 
export default {
  name: "PractiseNewWord",
  components: { 
    Profile
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 生词表格数据
      newWordsList: [],
      // 弹出层标题
      title: "",
      // 练习单词 弹出层
      titlePractise: "",
      // 是否显示弹出层
      open: false,
      openList: false, //生词列表是否展示 
      openTest: false,
      // 查询参数
      queryParams: {
        id: null,
        pageNum: 1,
        pageSize: 10,
        userId: null,
        wordId: null,
        status: null,
        wrongTimes: null,
        rightTimes: null,
        lastRigthTime: null,
        word: null,
        challengeId: null,
        challengeStatus: ""

      },
      // 查询参数
      queryFriendsParams: {
        userId: null,
        friendId: null,
        status: null,
        userName: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },

      //自动填充列表
      suggestWords: [],
      currentWord: {},
      // addButtonDisabled: false,
      // addButtonTip: "",
      wordStyle: "margin: 20px;color:black;font-size:58px;font-family:Arial;",
      english1: ['a','b','c','d','e','f','g','h','i','g','k','l','m','n'],
      english2: ['o','p','q','r','s','t','u','v','w','x','y','z'],
      practiseType: false, 
      practiseRatio: 0,       //单次练习正确率
      practiseRightTimes: 0,  //单次练习正确次数
      practiseWrongTimes: 0,   //单次练习错误次数
      practiseWordStatus: "A", //练习时查询单词的状态默认存活状态
      countDown: 60, //倒计时
      countDownRatio: 100,
      countDownStatus: 'success',
      clock:null,
 
      // 用户表格数据
      userList: [],
      challengeUserList: [],
      challengePut: "",
      openChallenge: false,
      openFight: false,
      suspend: false, //是否暂停计时，比如发起挑战时暂停计时 
      fightTableData: [],
      challengeNum: 0,
      challengeReply: "",
      challengeReplyShow: false,
      continueFight: false,  //是否连续应战（点击连续应战时）
      multipleSelectionChallenge: [], //选中要挑战的好友数据
      userNameForSearch: "", //挑战时查询的好友列表
 

       friendTableData: [],
       titleAddFriend: "添加好友",
       titleCheckFriend: "审核好友",
       titleNewWordSetting: "生词设置",
       openAddFriend: false,
       openCheckFriend: false,
       openNewWordSetting: false,
       // 表单参数
       friend: {},
       userNameForSearch: "",
       currentFriendStatus: "",
       currentFriendStatusTip: "",
       checkFriendCount: "",
       checkFriendTableData: [],
 
       activeNames: ['1','2'],   
 
       practiseWordArray: [],  //练习生词时一次加载多个（打开练习页面时加载一次，后续切换时不必每次都加载，减轻后端服务器压力）
       suggestWordsArray: [],  //练习生词时一次加载100个选项（打开练习页面时加载一次，后续切换时不必每次都加载，减轻后端服务器压力）
       oncePractiseCount: 0,   //单词练习生词次数,
       overTime: false,        //是否超时（如果超时需用户确认是否继续，防止用户打开一个练习页面去干其他事，一直在那刷新判错）

    };
  },
  created() {
    
  },
  methods: {
    /** 查询生词列表 */
    getList() { 
      this.loading = true;
      this.queryParams.userId = this.$store.state.user.id;
      listNewWords(this.queryParams).then(response => {
        this.newWordsList = response.rows;
        //alert(JSON.stringify(response.rows));
        for(var index in response.rows){
           response.rows[index].voice = JSON.parse(response.rows[index].voice);
        } 
        this.total = response.total;
        this.loading = false;
      });
    },
 

    selectChallengeCollect() {
        //1.查询单词统计信息 
        selectChallengeCollect(this.$store.state.user.id,'challenge').then(response => {  
            //alert(response.rows.length);
             let xaxisTemp = [];
             let arr1 = [];
             let arr2 = [];
             let arr3 = [];
             for(var index in response.rows){
                  xaxisTemp.push(response.rows[index].yearMonth);
                  arr1.push(response.rows[index].challengeNum);
                  arr2.push(response.rows[index].challengePassNum);
                  arr3.push(response.rows[index].challengeFailNum);
             } 
             this.barData.xaxis = xaxisTemp;
             var tmp1 = {name: '应战数',type: 'bar',stack: 'vistors',barWidth: '60%',data: arr1,animationDuration: 6000};
             var tmp2 = {name: '应战成功数',type: 'bar',stack: 'vistors',barWidth: '60%',data: arr2,animationDuration: 6000};
             var tmp3 = {name: '应战失败数',type: 'bar',stack: 'vistors',barWidth: '60%',data: arr3,animationDuration: 6000};
             this.barData = {xaxis: xaxisTemp,series: [tmp1,tmp2,tmp3]};
            //  this.lineChartData = {xaxis:arr1,expectedData:arr2,actualData:arr3};
        });
    },

  

    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    format(percentage) {
        return  `正确率${percentage}%`;
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        userId: this.$store.state.user.id,
        wordId: null,
        status: "A",
        wrongTimes: 0,
        rightTimes: 0,
        lastRigthTime: null,
        createBy: this.$store.state.user.id,
        createTime: null,
        updateBy: this.$store.state.user.id,
        updateTime: null,
        remark: null,
        challengeUserList: [],
        challengePut: ""
      };
      this.resetForm("form");
    },
 
   

    /** 练习按钮操作 */
    async handlePractise(fightId) {
      alert("fwefew");
      this.reset(); 
      this.countDown=60;
      this.countDownRatio = 100;
      this.countDownStatus = 'success';
      this.currentWord = {};
      this.suggestWords = [];
      this.openPractise = true;
      this.queryParams.challengeStatus = null;
      this.queryParams.word = '';
      this.queryParams.status = this.practiseWordStatus;
      this.wordStyle = "margin-left: 10px;color:black;font-size:58px;font-family:Arial";
      this.overTime = false;
      this.title = "练习生词"; 
      //alert(fightId);

      //区分是练习生词还是接受挑战进入（组装不同的查询条件）
      if(fightId > 0){
        this.queryParams.id = fightId;
        this.queryParams.challengeId = this.$store.state.user.id;
        this.queryParams.challengeStatus = "E";
        this.queryParams.userId = null;
        this.queryParams.status = null;  //不按单词状态去查，如果查询A生存的则会检测是否到预定联系时间、是否达到联系次数等，这里不限制
        this.challengeReplyShow = true;
      }else{
        this.queryParams.id = null;
        this.queryParams.challengeId = null;
        this.queryParams.challengeStatus = '';
        this.queryParams.userId = this.$store.state.user.id;
        this.queryParams.status = 'A';
        this.challengeReplyShow = false;
      }

      //加载随机生词 【云服务器上会发生建议单词已经查询出来但是currentWord值还没返回的情况，这个方法加上async，接口加上await 表示等待它执行完毕再往下走，相当于同步】
      var isNew = false;
      var canPractise = true;
      //打开页面时加载的生词用完了再加载
      if(this.practiseWordArray.length<=0){ 
          await listNewWordsRandom(this.queryParams).then(response => {
              if(response.rows.length<=0){
                  canPractise = false;
                  this.currentWord.word = "没有可练习的生词";
                  this.suspend = true;
                  this.$forceUpdate();
                  return;
              }else if(response.rows.length>0){
                  isNew = true;
                  canPractise = true;
                  this.oncePractiseCount++;
                  //alert(response.rows.length);
                  this.practiseWordArray = response.rows;
                  this.currentWord =this.practiseWordArray.pop(); 
                  //this.currentWord.exchange = JSON.parse(this.currentWord.exchange);
                  this.currentWord.result = "info";  

              }  
          });
      }else{
          isNew = true;
          canPractise = true;  
          this.oncePractiseCount++;
          this.currentWord =this.practiseWordArray.pop();  
          this.currentWord.result = "info";  
      }

      //符合练习条件则设置倒计时
      if(canPractise){        
          //设置倒计时
          if(this.clock){  
            window.clearInterval(this.clock);
          } 
          this.clock = window.setInterval(() => {
            //alert(this.countDown);
            if(!this.suspend){
                this.countDown--;
                this.countDownRatio = Math.floor(this.countDown/60*100);
                //console.log(this.countDownRatio);
                if(this.countDownRatio <= 40){ 
                  this.countDownStatus = 'exception';
                }else if(this.countDownRatio <= 70){
                  this.countDownStatus = 'warning';
                }
            } 
            if (this.countDown <= 1) {
              window.clearInterval(this.clock);
              //超时自动调用答题卡，设置word为空，判定为错误 ,注意深拷贝，不然两个是同一个对象
              let overWord = JSON.parse(JSON.stringify(this.currentWord));
              overWord.word = "abdfs";
              this.overTime = true;
              this.checkAnswer(overWord,-1);
            }
          }, 1000);
      }

  
      //有可练习的单词
      if(canPractise){
        //未加载过（打开练习页面时加载的101条）、或者打开后练习生词数高于10个时重新加载列表
        if(this.suggestWordsArray.length <= 0 ||  this.oncePractiseCount > 10){
            //加载选项备选项单词（随机两位字母模糊查询出5条)
            // var random1 = Math.round(Math.random()*13)+0;
            // var random2 = Math.round(Math.random()*11)+0;
            //this.queryParams.word = this.english1[random1]+this.english2[random2];  //后台通过数据库随机查询选项单词
            console.log(this.queryParams);
            //模糊查询单词返回满足条件的前五条
            await listEnglishWordsSuggest(this.queryParams).then(response => { 
              this.suggestWordsArray = response.rows;  
            });
            
        } 

        //从加载的101条选项中随机选择4个放入suggestWords
        for(var index=0;index<4;index++){ 
            this.suggestWords[index] = this.suggestWordsArray[Math.round(Math.random()*40)];
            //alert(JSON.stringify(this.suggestWords[index]));
            this.suggestWords[index].result = "";
        }
              
        //当前练习的生词随机加入到suggestWords的选项意思列表里【位置随机】
        this.suggestWords[parseInt(Math.random() * (this.suggestWords.length-1 - 0 + 1) + 0)] = this.currentWord;
        this.currentWord.result = "";
 
      } 
 
    },


    /** 检查答案是否正确 */
    async checkAnswer(wordClick,index){
        //alert(wordClick);   
        if(wordClick.word == this.currentWord.word){
            wordClick.result = "success"; 
            this.wordStyle = "margin-left: 10px;color:green;font-size:68px;";
        }else{
            wordClick.result = "danger"; 
            this.wordStyle = "margin-left: 10px;color:red;font-size:68px;";
        } 
        if(index >=0){ //排除超时自动调用的
          wordClick.editable = true;
          this.$set(this.suggestWords,index,wordClick);  
        } 

        //区分是练习生词还是接受挑战进入,如果是接受挑战，则设置挑战回复留言
        if(this.queryParams.id != null){
            //alert("id is not null");
            wordClick.challengeReply = this.challengeReply;
            wordClick.challengeStatus = (wordClick.result == "success"?"S":"F");
        } 

        //提交结果到后台【把给newWordRecord的部分属性赋值】
        wordClick.newWordsId = this.currentWord.id;
        wordClick.userId = this.$store.state.user.id;
        addNewWordsRecords(wordClick).then(response => {
              if (response.code === 200) {
                if(wordClick.result == "success"){
                   this.practiseRightTimes++;
                   this.msgSuccess("恭喜答对了！");
                }else{
                   this.practiseWrongTimes++;
                   this.msgError("不好意思答错了！！！");
                } 
                //实时计算本次练习正确率
                this.practiseRatio = Math.floor(this.practiseRightTimes/(this.practiseRightTimes+this.practiseWrongTimes)*100);

              }
        });

        //再次加载生词【下面是vue的settimeout的正确用法，否则间隔时间不生效】
        if(this.queryParams.id != null){
            for(var index in this.fightTableData){ 
                if(this.fightTableData[index].id == this.queryParams.id){
                    //alert("找到当前已答index:"+index);
                    this.fightTableData.splice(index,1);
                    index--;
                }
                
            } 
            //alert("剩余挑战长度："+this.fightTableData.length);
            //如果还有应战单词且选择了”连续应战“
            if(this.fightTableData.length>0 && this.continueFight){
               setTimeout(() => {
                  this.handlePractise(this.fightTableData[0].id);
               },500);
            }else{
              this.closePractise();
              //this.created();
            }
        }else{ //否则走正常的单词练习
            if(this.overTime){
               let that = this;
               await this.$alert('点击确定继续练习', '已超时', {
                  confirmButtonText: '确定',
                  callback: action => {
                    // this.$message({
                    //   type: 'info',
                    //   message: `action: ${ action }`
                    // });
                    setTimeout(() => {
                      that.handlePractise(0);
                    },500);
                  }
              });
            }else{
              setTimeout(() => {
                this.handlePractise(0);
              },500);
            }
            
        }
 
        
    },


    closePractise(){
      // this.practiseRatio = 0;       //单次练习正确率
      // this.practiseRightTimes = 0;  //单次练习正确次数
      // this.practiseWrongTimes = 0;   //单次练习错误次数
      // this.oncePractiseCount = 0;   //单词练习生词数（实际）
      // // this.openPractise = false;
      // this.continueFight = false;
      // this.suggestWordsArray = [];
      // this.practiseWordArray = []; 
      // if(this.clock){  
      //    window.clearInterval(this.clock);
      // } 
      alert('fwe');
      this.$emit('closePractise');
    },

   

    closeList(){ 
      this.openList = false;
      this.queryParams.word='';
    },
  
   
    /** 导出按钮操作 */
    handleExport() {
      this.download('study/newWords/export', {
        ...this.queryParams
      }, `study_newWords.xlsx`)
    },

    /**autoComplete 英语单词 */
    querySuggest(queryString, callback) {
      //console.log(queryString);
      //console.log(this.$store.state.user.name);
      //console.log(this.$store.state.user.id); 
      //重新联想时清空下面已展示的单词含义、读音等【上面是按照这两有没有值判断的，清空即可】
      this.currentWord.exchange = null;
      this.currentWord.voice = null;

      if(!queryString || queryString.length<2){
        callback(this.suggestWords);
      }else{
        this.queryParams.word = queryString;
        console.log(this.queryParams);
        //模糊查询单词返回满足条件的前五条
        listEnglishWordsSuggest(this.queryParams).then(response => {
          this.suggestWords = response.rows; 

          // 调用 callback 返回建议列表的数据
          callback(this.suggestWords);
        });
      }
       
    },
 

    playSound(){
      //alert(url);
      //this.$refs.audio.src = url; 
      //alert(event.currentTarget);
      this.$refs.audio[0].play();  //注意通过refs获取的id元素对应的是数组

    } ,

    playSoundTale(word){
      //alert(url);
      //this.$refs.audio.src = url; 
      //alert(event.currentTarget);
      //alert(word);
      this.$refs[word][0].play();  //注意通过refs获取的id元素对应的是数组

    } ,

  

    listFriends(){ 
      if(this.currentWord.word == '没有可练习的生词'){
          alert('没有可练习的生词');
          this.hidePopover();
      }else{ 
        this.queryFriendsParams.userId = this.$store.state.user.id;
        this.queryFriendsParams.status = 'S'; 
        this.queryFriendsParams.userName = this.userNameForSearch;
        listFriendsTwoWay(this.queryFriendsParams).then(response => {
            this.userList = response.rows; 
            this.openChallenge = true;
            this.suspend = true;
          }
        );
      }
 
    },
 
    chellengeUser() {
      //alert(this.multipleSelectionChallenge);
      //return;
      this.form.wordId = this.currentWord.wordId;
      this.$refs["formChellenge"].validate(valid => {
        if (valid) {  
            addChallenge(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("挑战成功");
                //this.openChallenge = false;  
                this.suspend = false;
                this.$refs.multipleTable.clearSelection();
                this.openChallenge = false;
              }
            });
          } 
      });
    },

    hidePopover() {
      //alert("hide");
      this.suspend = false;
      this.openChallenge = false;
      this.$refs.multipleTable.clearSelection();
    },
    closeFight() {
      this.openFight = false;
    },
    processFight(id) {
      //alert(id);
      this.handlePractise(id);
    },
    fightAll(){
      if(this.fightTableData.length<=0){
          this.msgError("没有可应战的生词！");
      }  
      this.continueFight = true;
      this.handlePractise(this.fightTableData[0].id); 
    },

    failAll() {
      //alert("头像");  
      for(var index in this.fightTableData){ 
          this.fightTableData[index].challengeStatus = 'F';
          this.fightTableData[index].challengeReply = '举手投降';
          editBatch(this.fightTableData).then(response => {
              if (response.code === 200) {
                this.msgSuccess("已投降");
                this.fightTableData = [];
              }
          });
                
      } 
    },
 

    nextPractiseFormatter(row, column) {
        let msg = '';
        if(row.rightTimes >= row.reqCount){
           msg = '已消灭';
        }else{
          let diffTime = row.reqIntervalTimes - row.elapseTimes; 
          if(diffTime > 0){
            if(diffTime >= 24){
              if(diffTime == 24){
                  msg = Math.floor(diffTime / 24)+"天后";
              }else{
                  msg = Math.floor(diffTime / 24)+"天"+diffTime%24+"小时后";
              } 
            }else{
              msg = diffTime +"小时后";
            }
            
          }else{
            msg = "现在可练习";
          }
        }
        
        return msg;
    },

    handleSelectionChangeChallenge(val) {
       this.multipleSelectionChallenge = val;
       this.form.challengeUserList = this.multipleSelectionChallenge;
    },
 

  },



  mounted() {
      
  }
};
</script>


<style lang="scss" scoped>
 

  .box-card {
    width: 830px;
    height: 100%;
    margin-bottom: 10px;
    cursor: pointer;
    background-color:#ffffff;
    border-radius: 5px; 
  }
  .box-card:hover {
    border-color: #C0C4CC;
    background-color:#dfebf7;
  }
 
 
</style>