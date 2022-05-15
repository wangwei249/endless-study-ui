<template>
  <div class="app-container">
        分威风威风
  </div>
</template>

<script>
import { listNewWords, listNewWordsRandom,selectNewWordsCollect,getNewWords, delNewWords, addNewWords, updateNewWords} from "@/api/study/newWords";
import { listEnglishWords, getEnglishWords, delEnglishWords, addEnglishWords, updateEnglishWords,listEnglishWordsSuggest } from "@/api/study/englishWords";
import { listNewWordsRecords, getNewWordsRecords, delNewWordsRecords, addNewWordsRecords, updateNewWordsRecords } from "@/api/study/newWordsRecords";

export default {
  name: "NewWords",
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
      // 是否显示弹出层
      openPractise: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        wordId: null,
        status: null,
        wrongTimes: null,
        rightTimes: null,
        lastRigthTime: null,
        word: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },

      //自动填充列表
      suggestWords: [],
      currentWord: {},
      wordStyle: "margin-left: 10px;color:black;font-size:48px;",
      english1: ['a','b','c','d','e','f','g','h','i','g','k','l','m','n'],
      english2: ['o','p','q','r','s','t','u','v','w','x','y','z'],
      practiseType: false,
      allNum: 0,  //生词总数
      passNum: 0, //已消灭数
      aliveNum: 0, //未掌握数
      allRatio: 0,       //总体练习正确率
      practiseRatio: 0,       //单次练习正确率
      practiseRightTimes: 0,  //单次练习正确次数
      practiseWrongTimes: 0   //单次练习错误次数
    };
  },
  created() {
    this.getList();
      //模糊查询单词返回满足条件的前五条
      selectNewWordsCollect(this.$store.state.user.id).then(response => {  
          this.allNum = response.allNum; 
          this.passNum = response.passNum; 
          this.aliveNum = response.aliveNum; 
      
      });
  },
  methods: {
    /** 查询生词列表 */
    getList() {
      this.loading = true;
      listNewWords(this.queryParams).then(response => {
        this.newWordsList = response.rows;
        this.total = response.total;
        this.loading = false;
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
        status: "S",
        wrongTimes: 0,
        rightTimes: 0,
        lastRigthTime: null,
        createBy: this.$store.state.user.id,
        createTime: null,
        updateBy: listNewWordsRandom,
        updateTime: null,
        remark: null
      };
      this.resetForm("form");
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
      this.reset();
      this.currentWord = {};
      this.suggestWords = [];
      this.open = true;
      this.title = "添加生词";
    },
    /** 练习按钮操作 */
    handlePractise() {
      this.reset();
      this.currentWord = {};
      this.suggestWords = [];
      this.openPractise = true;
      this.wordStyle = "margin-left: 10px;color:black;font-size:48px;";
      this.title = "练习生词";
      //加载随机生词
      listNewWordsRandom(this.queryParams).then(response => {
          this.currentWord = response.rows[0]; 
          //this.currentWord.exchange = JSON.parse(this.currentWord.exchange);
          this.currentWord.result = "info";  
      });

      
      //加载选项备选项单词（随机两位字母模糊查询出5条)
      var random1 = Math.round(Math.random()*13)+0;
      var random2 = Math.round(Math.random()*11)+0;
      this.queryParams.word = this.english1[random1]+this.english2[random2];
      //alert(this.english1[random1]);
      console.log(this.queryParams);
      //模糊查询单词返回满足条件的前五条
      listEnglishWordsSuggest(this.queryParams).then(response => {
        this.suggestWords = response.rows; 
        for(var index in this.suggestWords){ 
          this.suggestWords[index].result = "";
        }
        //把随机生词，随机加入到选项意思列表里 
        this.suggestWords[parseInt(Math.random() * (this.suggestWords.length-1 - 0 + 1) + 0)] = this.currentWord;
        this.currentWord.result = "";
      });
      

    },
    checkAnswer(wordClick,index){
        //alert(wordClick);   
        if(wordClick.word == this.currentWord.word){
            wordClick.result = "success"; 
            this.wordStyle = "margin-left: 10px;color:green;font-size:58px;";
        }else{
            wordClick.result = "danger"; 
            this.wordStyle = "margin-left: 10px;color:red;font-size:58px;";
        } 
        wordClick.editable = true;
        this.$set(this.suggestWords,index,wordClick);  

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
        setTimeout(() => {
          this.handlePractise()
        },500);
    },

    closePractise(){
      this.practiseRatio = 0;       //单次练习正确率
      this.practiseRightTimes = 0;  //单次练习正确次数
      this.practiseWrongTimes = 0;   //单次练习错误次数
      this.openPractise = false;
    },
 
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getNewWords(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改生词";
      });
    },
    /** 提交按钮
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateNewWords(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addNewWords(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            });
          }
        }
      });
    }, */
    /** 提交按钮【新增生词】 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) { 
            
            addNewWords(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            });
          } 
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除生词编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delNewWords(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
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
        alert(this.currentWord.voice.ph_en);
        this.form.wordId = item.id;

    } 

  },

  mounted() {

     
  }
};
</script>


<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 650px;
    height: 100%;
  }

  .item {
    margin-top: 1px;
    margin-right: 40px;
  }

  .elprogress{
    margin-bottom: 10px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    padding: 1px 0;
  }

  .box-card2 {
    width: 98%;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>