<template>
  <div >
     <el-dialog :title="title"  :visible.sync="openAdd" width="500px" append-to-body @close="closeAddNewWord" > 
      <el-form ref="form" :model="form" :rules="rules" label-width="80px"  @submit.native.prevent> 
       <el-form-item label="请输入生词" label-width="130px"> 
        <el-autocomplete 
            class="inline-input"
              v-model="form.word"
              :fetch-suggestions="querySuggest"
              placeholder="请输入内容"
              @select="handleSelect"
              @keyup.enter.native="handleSelectForEnter"
              value-key="word" 
              ref="autocomplete"
            ></el-autocomplete> 
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span v-if="addButtonTip != ''"><el-tag type="danger">已存在</el-tag></span>
       </el-form-item>

       <el-card class="box-card2" v-if="this.currentWord.voice">
          <div slot="header" class="clearfix">
            <el-tag>读音</el-tag> 
          </div>
          <span v-for="(value,key,index) in this.currentWord.voice"  class="text item">  
              <!--英语发音-->
              <span v-if="value && key == 'ph_en'">
                <!-- <el-tag size="small"></el-tag> -->
                英[{{value}} ] 
              </span>  
              <!--英语读音-->
              <span v-if="value && key == 'ph_en_mp3'">
                <!-- <img src="@/assets/image/sounds.jpg" width="40px" height="40px" @click="playSound(value)"/> -->
                <i class="el-icon-headset" @click="playSound()"></i>
                <audio controls="controls" class="audioClass"  hidden 
                  :src="value"  
                  ref="audio"></audio> 
              </span> 
          
          </span> 
       </el-card>

       <el-card class="box-card2" v-if="this.currentWord.exchange">
          <div slot="header" class="clearfix">
            <el-tag>含义</el-tag> 
          </div>
          <div  v-for="(means,i) in this.currentWord.meansList" class="text item"> 
              <span><font style="color:green;">{{means.posName}}</font> &nbsp;&nbsp;&nbsp;{{means.means}}  </br></span>
              <!-- <span v-if="i == this.currentWord.meansList.length-1" ><font style="color:green;">{{means.posName}}</font> &nbsp;&nbsp;&nbsp;{{means.means}} </span> -->
          </div> 
       </el-card>

       <el-card class="box-card2" v-if="this.currentWord.exchange">
          <div slot="header" class="clearfix">
            <el-tag>转换</el-tag> 
          </div>
          <span v-for="(value,key,index) in this.currentWord.exchange"  class="text item"> 
              <span v-if="value && key == 'word_third'">
                第三人称单数:{{value}}  &nbsp;
              </span> 
              <span v-if="value && key == 'word_ing'">
                现在分词:{{value}}  &nbsp;
              </span>
              <span v-if="value && key == 'word_past'">
                过去式:{{value}}  &nbsp;
              </span>
              <span v-if="value && key == 'word_done'">
                过去分词:{{value}}  &nbsp;
              </span>
              
              
          </span> 
       </el-card>


      </el-form> 

      <div style="align:right">
       <div slot="footer" style="margin-top:60px;margin-left:380px;">  
          <el-button type="primary" @click="submitForm" :disabled="addButtonDisabled">确 定</el-button>
          <!-- <el-button @click="cancel">取 消</el-button> -->
        </div>
      </div>
     </el-dialog>
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
  name: "AddNewWord",
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

      suggestWords: [],
      currentWord: {},
      addButtonTip: "",
      addButtonDisabled: false,
 
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
      
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        wordId: [
          {"pattern": /^[0-9]*$/,"message": "请输入生词"}
        ]
   
      },

      openAdd: false,

       

    };
  },
  created() {
 
  },
  methods: {
   
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset(); 
      this.$emit("cancel");
    },
   
    // 表单重置
    reset() {
      this.form = {
        id: null,
        userId: this.$store.state.user.id,
        wordId: 0,
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
      this.addButtonTip = "";
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {  
      //alert('add');
      this.reset();
      this.openAdd = true;
      this.currentWord = {};
      this.suggestWords = []; 
      this.$nextTick(() => {
　　　　　　this.$refs.autocomplete.focus()  
　　　 })
    },
 
 
 
    /** 提交按钮【新增生词】 */
    submitForm() { 
      //let _this = this;
      this.$refs["form"].validate(valid => {
        this.form.userId = this.$store.state.user.id;
        //alert(JSON.stringify(this.$refs.autocomplete));
        if (valid) {  
            if(this.form.wordId >0 ){
              addNewWords(this.form).then(response => {
                if (response.code === 200) {
                  
                  this.msgSuccess("新增成功"); 
                  //改为关闭新增页面时再刷新，节省系统资源
                  // this.getList(); 
                  // this.getNewWordCollect();
                  // this.listNewWordChallenge();
                  //支持继续添加
                  this.handleAdd(); 
                }
              });
            }else{
              alert("请输入生词"); 
            }

          } 
      });
    }, 

    /**autoComplete 英语单词 */
    querySuggest(queryString, callback) {
      //console.log(queryString);
      //console.log(this.$store.state.user.name);
      //console.log(this.$store.state.user.id); 
      if(!queryString || queryString == ''){
         this.form.wordId = 0;
         callback(this.suggestWords);
      }
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
          //排序，长度小的在前面
          this.suggestWords.sort(function(a,b) {
              return a.word.length - b.word.length;
          })
          // 调用 callback 返回建议列表的数据
          callback(this.suggestWords);
        });
      }
       
    },

    handleSelect(item) {
        console.log(item);
        this.currentWord = item;
        // alert(this.currentWord.meansList.length);
        // this.meansList = this.currentWord.meansList;
        // alert(this.meansList.length);
        // //alert(JSON.stringify(this.currentWord.meansList));
        //给form赋值
        this.currentWord.exchange = JSON.parse(this.currentWord.exchange);  //不知道为什么exchange没有自动转为json对象
         this.currentWord.voice = JSON.parse(this.currentWord.voice);
        //alert(this.currentWord.voice.ph_en);
        this.form.wordId = item.id;

        //查询是否存在，若存在则提示 
        listNewWords({"userId":this.form.userId,"wordId":this.form.wordId}).then(response => {
              if(response.rows.length >0){ 
                  this.addButtonDisabled = true;
                  this.addButtonTip = "已存在生词列表中，请不要重复添加";
              }else{
                  this.addButtonDisabled = false;
                  this.addButtonTip = "";
              }
        });

    } ,
    handleSelectForEnter() {
          //alert(this.queryParams.word); 
          for(var index in this.suggestWords){ 
              if(this.suggestWords[index].word == this.queryParams.word){
                 this.handleSelect(this.suggestWords[index]);
              } 
          }
          this.$refs.autocomplete.suggestions = [];

          //查询是否存在，若存在则提示 
          listNewWords({"userId":this.form.userId,"wordId":this.form.wordId}).then(response => {
                if(response.rows.length >0){ 
                    this.addButtonDisabled = true;
                    this.addButtonTip = "已存在生词列表中，请不要重复添加";
                }else{
                    this.addButtonDisabled = false;
                    this.addButtonTip = "";
                }
          });

    } ,

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

    

 

  },

  
  props: {
    openAdd: {
      type: Boolean,
      default: "false",
    }
  }, 

  watch: {
    openAdd: {
      deep: true,
      handler(val) {
        //alert(val);
        this.openAdd = val;
      }
    }
  },
 
  mounted() {
    
  }
};
</script>


<style lang="scss" scoped>
  .box-card2 {
    width: 98%;
    margin-bottom: 6px;
  }
</style>