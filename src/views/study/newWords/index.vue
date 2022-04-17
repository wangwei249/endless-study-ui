<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px"> 
      <el-form-item label="单词" prop="word">
        <el-input
          v-model="queryParams.word"
          placeholder="请输入单词"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="生词状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择生词状态" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item> 
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['study:newWords:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handlePractise"
          v-hasPermi="['study:newWords:add']"
        >练习</el-button>
      </el-col>
  
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['study:newWords:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['study:newWords:remove']"
        >删除</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['study:newWords:export']"
        >导出</el-button>
      </el-col>

      <el-col :span="1.5">
        <el-button
          type="text"
          size="mini" 
          v-hasPermi="['study:newWords:add']"
        >生词总数:{{allNum}}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="text"
          size="mini" 
          v-hasPermi="['study:newWords:add']"
        >已消灭:{{passNum}}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="text"
          size="mini" 
          v-hasPermi="['study:newWords:add']"
        >未掌握:{{aliveNum}}</el-button>
      </el-col>

	    <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <!-- <el-row :gutter="20" class="mb8"> 
      <el-col :span="15">
        <el-tag>完成率</el-tag> 
        <el-progress :percentage="50" :format="format"></el-progress>
      </el-col>
    </el-row>   -->

    <el-table v-loading="loading" :data="newWordsList" @selection-change="handleSelectionChange"> 
      <el-table-column label="序号" type="index" align="center" show-overflow-tooltip width="50px">
      </el-table-column>
      <el-table-column label="单词" align="center" prop="word" />
      <el-table-column label="生词状态" align="center" prop="status">
          <template slot-scope="scope">
               <span v-if="scope.row.rightTimes < 3">
                  <el-tag type="danger" >未掌握</el-tag>
               </span>
               <span v-else-if="scope.row.rightTimes >= 3">
						      <el-tag type="success" >已消灭</el-tag>
					     </span>
          </template> 
      </el-table-column>
      <el-table-column label="错误次数" align="center" prop="wrongTimes" />
      <el-table-column label="正确次数" align="center" prop="rightTimes" />
      <el-table-column label="上一次正确时间" align="center" prop="lastRigthTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.lastRigthTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />


<!-- 
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['study:newWords:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['study:newWords:remove']"
          >删除</el-button>
        </template>
      </el-table-column> -->


    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加生词对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
     
       <el-form-item label="请输入生词" label-width="130px">

        <el-autocomplete 
            class="inline-input"
              v-model="form.word"
              :fetch-suggestions="querySuggest"
              placeholder="请输入内容"
              @select="handleSelect"
              value-key="word"
            ></el-autocomplete> 
       </el-form-item>

       <el-card class="box-card2" v-if="this.currentWord.voice">
          <div slot="header" class="clearfix">
            <span>读音</span> 
          </div>
          <span v-for="(value,key,index) in this.currentWord.voice"  class="text item"> 
              <span v-if="value">
                <el-tag size="small">{{key}}</el-tag>
                {{value}}  
              </span> 
          </span> 
       </el-card>

       <el-card class="box-card2" v-if="this.currentWord.exchange">
          <div slot="header" class="clearfix">
            <span>含义</span> 
          </div>
          <div  v-for="means in this.currentWord.meansList" class="text item">
                <el-tag size="small">{{means.posName}}</el-tag>
                {{means.means}} 
          </div> 
       </el-card>

       <el-card class="box-card2" v-if="this.currentWord.exchange">
          <div slot="header" class="clearfix">
            <span>转换</span> 
          </div>
          <span v-for="(value,key,index) in this.currentWord.exchange"  class="text item"> 
              <span v-if="value">
                <el-tag size="small">{{key}}</el-tag>
                {{value}}  
              </span> 
          </span> 
       </el-card>
  
      </el-form> 
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>


    <!-- 练习生词对话框 -->
    <el-dialog :title="titlePractise" :visible.sync="openPractise" width="700px" append-to-body :show-close="false">
 

      <!-- 表格方式，已测试通过，特别注意slot数据更新后需要重设会table的data里才生效
      <span style="margin-left: 10px;color:blue;font-size:28px;">
            {{this.currentWord.word}}
      </span>
        
      </br>
      
       <el-table
      :data="this.suggestWords"
      style="width: 100%;border:0px">
        <el-table-column 
          label=""
          width="680">
          <template slot-scope="scope"> 
            <el-button :type="scope.row.result" round  style="text-align: left;margin-top: 2px" @click="checkAnswer(scope.row,scope.$index)"> 
              <span style="margin-left: 2px" v-for="means in scope.row.meansList" > 
                  <el-tag size="small">{{means.posName}}</el-tag> &nbsp;&nbsp;&nbsp;{{means.means}} </br>
              </span> 
            </el-button>

          </template>
        </el-table-column>
      </el-table> -->

      <el-row :gutter="20" class="mb8"> 
        <el-col :span="15">    
          <el-badge value="new" class="item">
            <el-button size="small">挑战好友</el-button>
          </el-badge>
          <el-badge value="hot" class="item" >
            <el-button size="small" @click="closePractise">结束练习</el-button>
          </el-badge>
   
       </el-col>  

      </el-row>

      <!-- <el-row :gutter="20" class="mb8">
       <el-col :span="20"> 
        <el-tag>本次练习正确率</el-tag> 
        <el-progress :percentage="50" :format="format"></el-progress>
       </el-col> 
      </el-row> -->
      <el-row :gutter="20" class="mb8">
      
     
          <span :style="wordStyle">
                {{this.currentWord.word}}
          </span>      
          <!-- <el-switch
            v-model="practiseType"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="全部生词" >
          </el-switch> -->
           
          <el-progress  :percentage="practiseRatio" width="80" :format="format" class="elprogress"></el-progress>
        

        <el-card class="box-card">
        <div v-for="(item, index) in this.suggestWords" :key="index"> 
           <el-button :type="item.result" round  style="text-align: left;margin-top: 2px" @click="checkAnswer(item,index)"> 
              <span style="margin-left: 2px" v-for="means in item.meansList" > 
                  <el-tag size="small" effect="plain">{{means.posName}}</el-tag> &nbsp;&nbsp;&nbsp;{{means.means}}  </br></br>
              </span> 
            </el-button> 
            <!-- <el-divider></el-divider> -->
        </div>
      </el-card>
      </el-row>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div> -->
    </el-dialog>


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