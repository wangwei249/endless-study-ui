<template>
  <div>

      <el-row :gutter="24" style="margin-top:0px;margin-bottom:6px;padding-left:10px;"> 
         <el-card :body-style="{ padding: '0px'}" >
           <div class="page-header-content">
              <div class="avatar">
                <el-avatar :src="avater" size="large"></el-avatar>
              </div>  
              <div class="content">
                <div class="content-title"> 
                   {{nickName}}
                </div>
                <div>前端工程师 | 蚂蚁金服 - 某某某事业群</div>
              </div>
           


             <div style="margin-top:17px;">  
                 <el-badge  value="" class="item"  type="warning">
                  <el-button size="small"   icon="el-icon-edit" circle></el-button>
                </el-badge>
             </div> 
             <div style="margin-top:17px;"> 
               <el-tooltip class="item" effect="dark" content="新的朋友审核" placement="top-start">    
                <el-badge :value="2" class="item" type="success">
                  <el-button size="small"  icon="el-icon-chat-dot-round" circle ></el-button>
                </el-badge>
                </el-tooltip>
             </div> 
             <div style="margin-top:17px;"> 
                <el-badge  value="" class="item" type="info">
                  <el-button size="small"  icon="el-icon-user" circle ></el-button>
                </el-badge>
             </div> 
             <div style="margin-top:17px;margin-right:17px;"> 
                <el-badge  value="" class="item" type="info">
                  <el-button size="small" type="warning" icon="el-icon-switch-button" circle></el-button>
                </el-badge>
             </div> 
        </div>
              

          
         </el-card> 
    </el-row>  
 

    <el-row :gutter="24" class="panel-group">
    
      <el-col :span="14"> 

      <el-row :gutter="24">  
        <el-col :span="6" class="card-panel-col">
          
          <div class="card-panel" @click="getListByStatus('')">
            <div class="card-panel-icon-wrapper icon-people">
              <svg-icon icon-class="chart" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                总数
              </div>
              <count-to :start-val="0" :end-val="allNum" :duration="2600" class="card-panel-num" />
            </div> 
          </div> 
        </el-col>
        <el-col :span="6" class="card-panel-col">
          <div class="card-panel" @click="getListByStatus('D')">
            <div class="card-panel-icon-wrapper icon-eye">
              <svg-icon icon-class="eye" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                消灭 
              </div>
              <count-to :start-val="0" :end-val="passNum" :duration="3000" class="card-panel-num" /> 
            </div> 
          </div>
        </el-col>
        <el-col :span="6" class="card-panel-col">
          <div class="card-panel" @click="getListByStatus('A')">
            <div class="card-panel-icon-wrapper icon-eyeopen">
              <svg-icon icon-class="eye-open" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                存活
              </div>
              <count-to :start-val="0" :end-val="aliveNum" :duration="3200" class="card-panel-num" />
            </div> 
          </div>
        </el-col>  
        <el-col :span="6" class="card-panel-col">
          <div class="card-panel" @click="getListByStatus('A')">
            <div class="card-panel-icon-wrapper icon-eyeopen">
              <svg-icon icon-class="eye-open" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                设置
              </div>
              <count-to :start-val="0" :end-val="aliveNum" :duration="3200" class="card-panel-num" />
            </div> 
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24">    
      <el-col :span="6" class="card-panel-col">
        <div class="card-panel" @click="handleAdd">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="question" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              新增
              <!-- <a href="http://www.baidu.com/"><input type="button" value='百度'></a> -->
            </div>
            <!-- <count-to :start-val="0" :end-val="10" :duration="3000" class="card-panel-num" /> -->
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="card-panel-col">
        <div class="card-panel" @click="handlePractise(0)">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="skill" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              练习
            </div>
            <count-to :start-val="0" :end-val="practiseNum" :duration="3200" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="card-panel-col">
        <div class="card-panel" @click="openFight = true">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="wechat" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              应战
            </div>
            <count-to :start-val="0" :end-val="challengeNum" :duration="3600" class="card-panel-num" /> 
          </div>
        </div>
      </el-col> 
      <el-col :span="6" class="card-panel-col">
        <div class="card-panel" @click="handleTest">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="wechat" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              放松
            </div>
            <!-- <count-to :start-val="0" :end-val="challengeNum" :duration="3600" class="card-panel-num" />  -->
          </div>
        </div>
      </el-col>  
      </el-row>

      <el-row :gutter="24"  style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">  
            <el-col :xs="24" :sm="24" :lg="24"> 
              <el-radio-group v-model="showChart">
                <el-radio-button label="月度目标"></el-radio-button>
                <el-radio-button label="状态分布"></el-radio-button>
                <el-radio-button label="应战数据"></el-radio-button>
                <el-radio-button label="练习统计"></el-radio-button>
              </el-radio-group>
              <div class="chart-wrapper"> 
                    <line-chart :chart-data="lineChartData" v-if="showChart=='月度目标'"/>
                    <pie-chart :chart-data="pieData"  v-if="showChart=='状态分布'"/>
                    <bar-chart :chart-data="barData"  v-if="showChart=='应战数据'"/>
                    <raddar-chart :chart-data="raddarData"  v-if="showChart=='练习统计'"/>
              </div> 
            </el-col> 
      </el-row>


      </el-col> 


      <el-col :span="10">
          
        <el-card   shadow="hover">
          <div slot="header" class="clearfix">
            <span>好友动态</span>
            <el-button style="float: right; padding: 3px 0" type="text"></el-button>
          </div>
          <div v-for="friend in friendsDyn" :key="friend" class="text item">
            <div class="avatar">
              <el-avatar :src="avater" size="small"></el-avatar>
              {{friend.nickName  }} 
            </div>
            
            <el-divider direction="vertical"></el-divider>
            {{friend.createTime}}
            <el-divider direction="vertical"></el-divider>
             添加生词 
             <el-divider direction="vertical"></el-divider>

             <el-tooltip placement="left" effect="light">
              <div slot="content">
                <div  v-for="(means,i) in friend.meansList" class="text item"> 
                    <span><font style="color:green;">{{means.posName}}</font> &nbsp;&nbsp;&nbsp;{{means.means}}  </br></span> 
                </div>
              </div>
              <el-tag>{{friend.word}}</el-tag>
            </el-tooltip>
 
              <el-divider direction="vertical"></el-divider> 

            <el-tooltip effect="dark" content="添加到我的生词库" placement="top-start"> 
              <el-button type="primary" size="small" icon="el-icon-plus"  circle > </el-button>
            </el-tooltip>
          </div>
        </el-card>
      </el-col>
      
    </el-row>



    <el-drawer title="接受挑战"
                  :visible.sync="openFight"
                  direction="rtl"
                  :before-close="closeFight">  

        <!-- <el-popconfirm confirm-button-text='确定' cancel-button-text='再想想' icon="el-icon-info" icon-color="red"
                    title="确定要应战全部吗？请做好准备，点确定开始"> -->
            <el-button type="primary" style="margin-left:10px;" @click="fightAll">应战全部</el-button> 
        <!-- </el-popconfirm> -->

        <el-button type="warning" :disabled="fightTableData.length<=0" style="margin-bottom:15px;" @click="failAll">举手投降</el-button>
        <el-divider  content-position="left">待应战总数：{{fightTableData.length}}</el-divider>  

        <el-table ref="fightTable" :data="fightTableData" style="width: 100%"  height="500">
          <el-table-column prop="userId" label="谁挑战我"> </el-table-column>
          <el-table-column prop="word" label="单词" > </el-table-column>
          <el-table-column prop="createTime" label="挑战时间"> </el-table-column>
          <el-table-column prop="" label="处理" >
            <template slot-scope="scope">
              <el-button type="success" disable-transitions @click="processFight(scope.row.id)">应战
              </el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-drawer>


    
    <el-row :gutter="24" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <!-- <el-col :xs="24" :sm="24" :lg="24"> 
             <div class="chart-wrapper"> 
                  <line-chart :chart-data="lineChartData" />
              </div> 
      </el-col> -->
     <!-- <el-col :xs="12" :sm="12" :lg="12">
           <div class="chart-wrapper">
               <pie-chart :chart-data="pieData" />
             </div>   
      </el-col> -->
    </el-row>

    <!-- <el-row :gutter="24" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
 
      <el-col :xs="24" :sm="24" :lg="12"> 
             <div class="chart-wrapper">
                <bar-chart :chart-data="barData"/>
             </div>  
      </el-col> 
      <el-col :xs="24" :sm="24" :lg="12">
           <div class="chart-wrapper">
                <raddar-chart :chart-data="raddarData"/>
             </div>   
      </el-col>  
    </el-row> -->


   <!-- 生词查询列表dialog --> 
   <el-dialog :title="title" :visible.sync="openList" width="960px" append-to-body @close="closeList" >
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px" > 
      <el-form-item label="单词" prop="word">
        <el-input
          v-model="queryParams.word"
          placeholder="请输入单词"
          clearable
          size="small" 
        />
      <!-- @keyup.enter.native="handleQuery" -->
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
 
	    <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>
  
    <el-table v-loading="loading" :data="newWordsList" height="350" @selection-change="handleSelectionChange"> 
      <el-table-column label="序号" type="index" align="center" show-overflow-tooltip width="50px"/>
  
      <el-table-column label="单词" align="center" prop="word" width="180">
         <template slot-scope="scope">
            <el-tooltip placement="left" effect="light">
              <div slot="content">
                <div  v-for="(means,i) in scope.row.meansList" class="text item"> 
                    <span><font style="color:green;">{{means.posName}}</font> &nbsp;&nbsp;&nbsp;{{means.means}}  </br></span> 
                </div>
              </div>
              <el-tag style="font-size:18px;">{{scope.row.word}}</el-tag>
            </el-tooltip>
         </template>  
      </el-table-column>  


      <el-table-column label="听" align="center" prop="word" width="150px">
          <template slot-scope="scope"> 
               <span v-for="(value,key,index) in scope.row.voice" >   
                  <!--英语发音-->
                  <!-- <span v-if="value && key == 'ph_en'">
                    <!-- <el-tag size="small"></el-tag> -->
                    <!-- 英[{{value}} ]  -->
                  <!-- </span>    -->
                  <!--英语读音-->
                  <span v-if="value && key == 'ph_en_mp3'">  
                    <i class="el-icon-headset" @click="playSoundTale(scope.row.word)"></i>
                    <audio controls="controls" class="audioClass"  hidden 
                      :src="value"  
                      :ref="scope.row.word"></audio> 
                  </span>  
              </span> 

          </template> 
      </el-table-column>   
      <!-- <el-table-column label="生词状态" align="center" prop="status">
          <template slot-scope="scope">
               <span v-if="scope.row.rightTimes < scope.row.reqCount">
                  <el-tag type="danger" >未掌握</el-tag>
               </span>
               <span v-else-if="scope.row.rightTimes >= scope.row.reqCount">
						      <el-tag type="success" >已消灭</el-tag>
					     </span>
          </template> 
      </el-table-column> -->
      <!-- <el-table-column label="错误次数" align="center" prop="wrongTimes" />
      <el-table-column label="正确次数" align="center" prop="rightTimes" /> -->

      <el-table-column label="完成进度" align="center" prop="rightTimes" width="180"> 
          <template slot-scope="scope"> 
             <el-progress :percentage="scope.row.rightTimes/scope.row.reqCount*100" ></el-progress>
          </template>    
      </el-table-column>

      <el-table-column label="上一次正确时间" align="center" prop="lastRigthTime" width="180"> 
        <!-- <template slot-scope="scope">
          <span>{{ parseTime(scope.row.lastRigthTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template> -->
      </el-table-column>
      
      <!-- <el-table-column label="要求次数" align="center" prop="reqCount" />
      <el-table-column label="要求间隔" align="center" prop="reqIntervalTimes" />
      <el-table-column label="时间流逝" align="center" prop="elapseTimes" /> -->

      <el-table-column label="下次可练习时间" align="center" prop="elapseTimes" width="180">
         <template slot-scope="scope">
            <el-tooltip placement="left" effect="light">
              <div slot="content">
                正确次数:{{scope.row.rightTimes}}<br/>
                过关次数:{{scope.row.reqCount}}<br/>
                要求间隔:{{scope.row.reqIntervalTimes}}<br/>
                已过时间:{{scope.row.elapseTimes}}
              </div>
              <el-button size="small" :type="`${scope.row.rightTimes >= scope.row.reqCount?'success':'warning'}`">{{nextPractiseFormatter(scope.row)}}</el-button>
            </el-tooltip>
         </template>  
      </el-table-column>  
       
      <!-- <el-table-column label="备注" align="center" prop="remark" />  -->
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    /> 
    </el-dialog>


    <!-- 添加生词对话框 -->
    <el-dialog :title="title"  :visible.sync="open" width="500px" append-to-body> 
    
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
      <div slot="footer" class="dialog-footer">  
        <el-button type="primary" @click="submitForm" :disabled="addButtonDisabled">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>




    <!-- 练习生词对话框 
    <el-dialog :title="titlePractise" :visible.sync="openPractise" width="700px" append-to-body :show-close="false">
  
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
 
      <el-row :gutter="20" class="mb8"> 
          <span :style="wordStyle">
                {{this.currentWord.word}}
          </span>    
          <el-progress  :percentage="practiseRatio" width="80" :format="format" class="elprogress"></el-progress>
          
          <el-card class="box-card">
            <div v-for="(item, index) in this.suggestWords" :key="index"> 
              <el-button :type="item.result" round  style="text-align: left;margin-top: 2px" @click="checkAnswer(item,index)"> 
                  <span style="margin-left: 2px" v-for="means in item.meansList" > 
                      <el-tag size="small" effect="plain">{{means.posName}}</el-tag> &nbsp;&nbsp;&nbsp;{{means.means}}  </br></br>
                  </span> 
                </el-button> 
                
            </div>
          </el-card>
      </el-row> 
    </el-dialog>
    -->

    <!-- 练习生词对话框 NEW --> 
    <el-dialog :title="titlePractise" 
               :visible.sync="openPractise" width="850px" 
               :show-close="false" 
               @close="closePractise" 
               custom-class="practiseDialog2"> 
        <!-- <el-divider><i class="el-icon-mobile-phone"></i></el-divider> -->

        <div slot="title" >
            <div >编辑框</div>
        </div> 
   
        <el-row :gutter="24"> 
           <el-col :span="8" align="left">  
             <el-button type="success" style="margin-top:8px;" icon="el-icon-check">&nbsp;&nbsp;&nbsp; {{practiseRightTimes}}&nbsp;&nbsp;&nbsp;</el-button> 
             <el-button type="danger"  style="margin-left:15px;" icon="el-icon-close">&nbsp;&nbsp;&nbsp; {{practiseWrongTimes}}&nbsp;&nbsp;&nbsp;</el-button> 
        
          </el-col>

          <el-col :span="8"  :offset="8"  align="right">          
            <!-- <el-badge value="new" class="item">
              <el-button size="small" @click="listUsers">挑战好友</el-button> 
            </el-badge> -->
            <el-popover
                    placement="right" @hide="hidePopover"
                    width="400"
                    trigger="click"
                    v-model="openChallenge">

                    <el-form ref="formChellenge" :model="form" :rules="rules" label-width="80px"  @submit.native.prevent>   
             
                      <!-- <el-checkbox-group v-model="form.challengeUserList"  v-for="(means,i) in userList" >
                        <el-checkbox :label="means.friendId" >
                          {{means.userName}}-{{means.nickName}}
                        </el-checkbox>  
                      </el-checkbox-group>  -->
                      
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
                    <el-button slot="reference" icon="el-icon-share" style="margin-bottom:15px;" @click="listFriends">挑战好友</el-button>
            </el-popover>


            <el-button  @click="closePractise"  icon="el-icon-error" style="margin-left:15px;margin-top:8px;"  >结束练习</el-button>
  
          </el-col>
    
        </el-row>  


        <el-row :gutter="24"> 
          <!-- <el-col :span="4" align="middle">  
             <el-button type="success" style="margin-bottom:15px;" icon="el-icon-check">&nbsp;&nbsp;&nbsp; {{practiseRightTimes}}&nbsp;&nbsp;&nbsp;</el-button> 
             <el-button type="danger"  style="margin-bottom:15px;margin-left:0px;" icon="el-icon-close">&nbsp;&nbsp;&nbsp; {{practiseWrongTimes}}&nbsp;&nbsp;&nbsp;</el-button> 
        
          </el-col>    -->
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
            <!-- <el-tag effect="plain">我的回复</el-tag>   -->
            <el-input placeholder="我的回复" v-model="challengeReply"  size="15"></el-input> 
             
          </el-col>
        </el-row>

        <!-- <el-divider content-position="left"><span class="countDown">倒计时：{{countDown}}</span></el-divider> -->
        <!-- <el-progress :percentage="100" status="exception"></el-progress> -->
        <el-progress :percentage="countDownRatio" :status="countDownStatus" ></el-progress>
 
        <el-row :gutter="24">
          <el-col :span="24">
            <!-- <div class="grid-content bg-purple">
              <el-card class="box-card">
                <div v-for="(item, index) in this.suggestWords" :key="index"> 
                  <el-button :type="item.result" round  style="text-align: left;margin-top: 2px" @click="checkAnswer(item,index)"> 
                      <span style="margin-left: 2px" v-for="means in item.meansList" > 
                          <el-tag size="small" effect="plain">{{means.posName}}</el-tag> &nbsp;&nbsp;&nbsp;{{means.means}}  </br></br>
                      </span> 
                    </el-button> 
                    
                </div>
              </el-card>
            </div> --> 

              
            <div v-for="(item, index) in this.suggestWords" :key="index" style="display: flex;"> 
              <el-card class="box-card"  @click.native="checkAnswer(item,index)"> 
                  <span style="margin-left: 2px" v-for="(means,i) in item.meansList" > 
                      <span v-if="i != item.meansList.length-1" ><font style="color:green;">{{means.posName}}</font> &nbsp;&nbsp;&nbsp;{{means.means}}  </br></br> </span>
                      <span v-if="i == item.meansList.length-1" ><font style="color:green;">{{means.posName}}</font> &nbsp;&nbsp;&nbsp;{{means.means}} </span>
                       
                  </span>  
              </el-card>   
            </div>
              
          </el-col> 
        </el-row>
    </el-dialog> 
    


    <el-dialog :title="titleTest" 
            :visible.sync="openTest" width="850px" height="800px" append-to-body 
            :show-close="false" 
            @close="closePractise" 
            class="practiseDialog" custom-class="practiseDialog2">  
          <iframe src ="/static/jump/index.html" id="ifr1" name="ifr1" scrolling="yes" width="800px" height="500px"></iframe>
    </el-dialog>

  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import LineChart from '@/views/dashboard/LineChart'
import RaddarChart from '@/views/dashboard/RaddarChart'
import PieChart from '@/views/dashboard/PieChart'
import BarChart from '@/views/dashboard/BarChart'
import { listNewWords, listNewWordsRandom,selectNewWordsCollect,selectExpectActual,selectChallengeCollect,getNewWords, delNewWords, addNewWords, updateNewWords,addChallenge,selectFriendsDyn} from "@/api/study/newWords";
import { listEnglishWords, getEnglishWords, delEnglishWords, addEnglishWords, updateEnglishWords,listEnglishWordsSuggest } from "@/api/study/englishWords";
import { listNewWordsRecords, getNewWordsRecords, delNewWordsRecords, addNewWordsRecords, updateNewWordsRecords } from "@/api/study/newWordsRecords";
import { listUser, getUser, delUser, addUser, updateUser, resetUserPwd, changeUserStatus } from "@/api/system/user";
import { listFriends, getFriends, delFriends, addFriends, updateFriends ,listFriendsTwoWay} from "@/api/study/friends"; 

const lineChartData = {
        newVisitis: {
          xaxis: [],
          expectedData: [],
          actualData: []
        },


        messages: {
          expectedData: [200, 192, 120, 144, 160, 130, 140],
          actualData: [180, 160, 151, 106, 145, 150, 130]
        },
        purchases: {
          expectedData: [80, 100, 121, 104, 105, 90, 100],
          actualData: [120, 90, 100, 138, 142, 130, 130]
        },
        shoppings: {
          expectedData: [130, 140, 141, 142, 145, 150, 160],
          actualData: [120, 82, 91, 154, 162, 140, 130]
        }

}

export default {
  name: "NewWords",
  components: {
    CountTo,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart
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
      // 是否显示弹出层
      openPractise: false,
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
      addButtonDisabled: false,
      addButtonTip: "",
      wordStyle: "margin: 20px;color:black;font-size:58px;font-family:Arial",
      english1: ['a','b','c','d','e','f','g','h','i','g','k','l','m','n'],
      english2: ['o','p','q','r','s','t','u','v','w','x','y','z'],
      practiseType: false,
      allNum: 0,  //生词总数
      passNum: 0, //已消灭数
      aliveNum: 0, //未掌握数
      practiseNum: 0, //可练习的生词数
      allRatio: 0,       //总体练习正确率
      practiseRatio: 0,       //单次练习正确率
      practiseRightTimes: 0,  //单次练习正确次数
      practiseWrongTimes: 0,   //单次练习错误次数
      practiseWordStatus: "A", //练习时查询单词的状态默认存活状态
      countDown: 60, //倒计时
      countDownRatio: 100,
      countDownStatus: 'success',
      clock:null,
      autocompleteFocus: true,
      lineChartData: lineChartData.newVisitis,
      titleTest: 'test',
      pieData: [
              { value: 360, name: '已消灭' },
              { value: 220, name: '可练习' },
              { value: 150, name: '需等待' }],
      barData: {},        
      raddarData: {},
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
      avater: this.$store.state.user.avatar,
      nickName: this.$store.state.user.nick,
      friendsDyn: [],
      showChart: "月度目标",

    };
  },
  created() {
    this.getList();
    this.getNewWordCollect();
    this.listNewWordChallenge();
    this.selectExpectActual();
    this.selectChallengeCollect();
    this.selectFriendsDyn();
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

    /** 查询单词统计信息 */
    getNewWordCollect() {
        //1.查询单词统计信息 
        selectNewWordsCollect(this.$store.state.user.id).then(response => {  
            this.allNum = response.allNum; 
            this.passNum = response.passNum; 
            this.aliveNum = response.aliveNum; 
            this.practiseNum = response.practiseNum;
            //设置饼图数据
            this.pieData = [
              { value: this.passNum, name: '已消灭' },
              { value: this.practiseNum, name: '可练习' },
              { value: this.allNum-this.passNum- this.practiseNum, name: '需等待' }];
        });
    },

    
    /** 查询线性图表信息【查询月份目标设定的目标值，完成值，通过值】 */
    selectExpectActual() {
        //1.查询单词统计信息 
        selectExpectActual(this.$store.state.user.id).then(response => {  
             //alert(response.rows.length);
             //线型图
             let arr1 = [];
             let arr2 = [];
             let arr3 = [];
             //雷达图
             let nowDate = new Date();
             let yearMonth = nowDate.getFullYear()+"-"+((nowDate.getMonth()+1)<10?"0"+(nowDate.getMonth()+1):(nowDate.getMonth()+1));
             let currentMonthData = {}; 
             for(var index in response.rows){
                  arr1.push(response.rows[index].yearMonth);
                  arr2.push(response.rows[index].expectNum);
                  arr3.push(response.rows[index].actualNum);
                  if(response.rows[index].yearMonth == yearMonth){
                      currentMonthData = response.rows[index];
                  }
             } 
             //线型图-数据
             this.lineChartData = {xaxis:arr1,expectedData:arr2,actualData:arr3};
             //雷达图-数据 [只显示当月的目标和实际] 后期可切换月份看
             var tmp1 = [{ name: '生词数量', max: currentMonthData.expectNum },
                         { name: '练习准确率', max: currentMonthData.expectRightRatio },
                         { name: '消灭生词数', max: currentMonthData.expectPassNum }];
             var tmp2 = [currentMonthData.yearMonth];
             var tmp3 = [{value: [currentMonthData.actualNum, currentMonthData.actualRightRatio, currentMonthData.actualPassNum],name: currentMonthData.yearMonth}];
             this.raddarData = {indicator:tmp1,legendData:tmp2,data:tmp3};
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

    selectFriendsDyn() { 
      //1.查询好友动态
      selectFriendsDyn(this.$store.state.user.id).then(response => {  
          //alert('好友动态列表长度：'+response.rows.length);
          this.friendsDyn = response.rows;
      });
        
    },

    /** 查询挑战统计信息 */
    listNewWordChallenge() { 
      //alert(this.$store.state.user.id);
      this.queryParams.challengeId = this.$store.state.user.id;
      this.queryParams.challengeStatus = "E";
      this.queryParams.userId = null;
      this.queryParams.id = null;//清空id，应战时会设置这个id，重新加载时不应该有id
      this.queryParams.status = null;  //不按单词状态去查，如果查询A生存的则会检测是否到预定联系时间、是否达到联系次数等，这里不限制
      listNewWordsRandom(this.queryParams).then(response => {
          //alert(response.rows.length);
          this.fightTableData = response.rows;
          this.challengeNum = response.rows.length; 
          this.queryParams.challengeId =  null; //避免练习生词dialog打开时去统计挑战
      });
      // this.queryParams.challengeId = null;
      // this.queryParams.challengeStatus = "";
      // this.queryParams.userId = this.$store.state.user.id;
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
        updateBy: listNewWordsRandom,
        updateTime: null,
        remark: null,
        challengeUserList: [],
        challengePut: ""
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
      //this.$refs.autocomplete.$refs.input.focus();
      this.$nextTick(() => {
　　　　　　this.$refs.autocomplete.focus()  
　　　　})
    },
    /** 练习按钮操作 */
    handlePractise(fightId) {
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
      this.title = "练习生词"; 
      //alert(fightId);
      if(fightId > 0){//区分是练习生词还是接受挑战进入
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

      //加载随机生词
      var isNew = false;
      listNewWordsRandom(this.queryParams).then(response => {
          if(response.rows.length<=0){
              return;
          }
          if(response.rows.length>0){
              isNew = true;
              this.currentWord = response.rows[0]; 
              //this.currentWord.exchange = JSON.parse(this.currentWord.exchange);
              this.currentWord.result = "info";  
              
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
                  this.checkAnswer(overWord,-1);
                }
              }, 1000);
          } 

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
            setTimeout(() => {
              this.handlePractise(0);
            },500);
        }
 
        
    },

    closePractise(){
      this.practiseRatio = 0;       //单次练习正确率
      this.practiseRightTimes = 0;  //单次练习正确次数
      this.practiseWrongTimes = 0;   //单次练习错误次数
      this.openPractise = false;
      this.continueFight = false;
      this.getList();
      this.getNewWordCollect();
      this.listNewWordChallenge();
      if(this.clock){  
         window.clearInterval(this.clock);
      } 
    },

    closeList(){ 
      this.openList = false;
      this.queryParams.word='';
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
                //this.open = false;
                this.getList(); 
                this.getNewWordCollect();
                this.listNewWordChallenge();
                //支持继续添加 
                this.handleAdd();
                
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


        /** 练习按钮操作 */
    handleTest() { 
      this.openTest = true;
    },

    handleSetLineChartData(type) { 
      if(type == 'newVisitis'){
        this.$router.push({ path:'/study/newWords'  }); //转向“生词”页面
      }else if(type == 'messages'){
         
      }
      
      //this.$emit('handleSetLineChartData', type); //这里没有引用panelGroup.vue，所以不必提交调用父组件的方法
      this.lineChartData = lineChartData[type];
    },

    listUsers(){
      listUser().then(response => {
          this.userList = response.rows;
          //alert(this.userList);
          this.openChallenge = true;
          this.suspend = true;
        }
      );
    },

    handleSearchFriendForEnter() {
       
    },

    listFriends(){ 
      this.queryFriendsParams.userId = this.$store.state.user.id;
      this.queryFriendsParams.status = 'S'; 
      this.queryFriendsParams.userName = this.userNameForSearch;
      listFriendsTwoWay(this.queryFriendsParams).then(response => {
          this.userList = response.rows; 
          this.openChallenge = true;
          this.suspend = true;
        }
      );

      // //我加的别人
      // listFriends(this.queryFriendsParams).then(response => {
      //     this.userList = this.userList.push(response.rows); 
      //     this.openChallenge = true;
      //     this.suspend = true;
      //   }
      // );
      // //别人加的我
      // this.queryFriendsParams.userId = null;
      // this.queryFriendsParams.friendId = this.$store.state.user.id;
      // listFriends(this.queryFriendsParams).then(response => {
      //     this.userList =  response.rows; 
      //     this.openChallenge = true;
      //     this.suspend = true;
      //   }
      // );
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
      alert("头像");  
    },


    getListByStatus(status) {
      this.queryParams.word = '';
      this.queryParams.status = status;
      this.queryParams.challengeId = null;
      this.getList();
      this.openList = !this.openList;
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
    }

  },



  mounted() {

     
  }
};
</script>


<style lang="scss" scoped>
  .text {
    font-size: 10px;
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
    margin-bottom: 6px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .practiseDialog {
    background-color:#d3eff3;
  }
  

  .panel-group {
    margin-top: 18px;

    .card-panel-col {
      margin-bottom: 32px;
    }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-eye {
        background: #f1da07;
      }

      .icon-eyeopen {
        background: #0ce90c;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }


    .icon-eye {
      color: #f1da07;
    }

    .icon-eyeopen {
      color: #0ce90c;
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }

  .chart-wrapper {
    padding: 8px;
  }

}




  /deep/ .el-dialog.practiseDialog2{
    border-radius: 2px;
    margin-bottom: 0;
    margin-top: 4vh !important;
    display: flex;
    flex-direction: column; 
    overflow: hidden;
    box-sizing: border-box;
    .el-dialog__header {
      background: #1e4b5f;
      padding-top: 15px;
    }
    .el-dialog__body {
      margin: 0 20px 20px 20px;
      padding: 0;
      overflow: no;
    }
  }

  .page-header-content {
    display: flex;

    .avatar {
       flex: 0 1 72px;
       & > span {
         display: block;
         width: 72px;
         height: 72px;
         border-radius: 72px;
       }
    }

    .content {
      position: relative;
      top: 14px;
      flex: 1 1 auto;
      margin-left: 24px;
      color: #a7abbd;
      line-height: 10px;
      font-size: 10px;

      .content-title {
        margin-bottom: 12px;
        color:black;
        font-weight: 500;
        font-size: 20px;
        line-height: 28px;
      }
    }

  } 


  .info-title {
        margin-bottom: 6px;
        color:black;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }  
    
 
</style>