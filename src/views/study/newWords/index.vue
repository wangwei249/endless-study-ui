<template>
  <div class = "newWordStyle" >

      <el-row :gutter="24" style="{margin-top:3px;margin-bottom:6px;margin-left:30px;margin-right:30px; }"> 
         <el-card :body-style="{ padding: '0px'}" >
           <div class="page-header-content">
              <div class="avatar">
                <el-avatar :src="avater" size="large"></el-avatar> 
              </div>  
              <div class="content">
                <div class="content-title"> 
                   {{nickName}}
                </div>
                <span> {{this.gradeDesc}}  |  {{deptname}}  |  </span>
                <span> 会员有效期： {{validTo}} </span>  
                <span v-if="outDateFlag"><font color="red">已过期</font></span>
                <!-- <span><a href="javascript:void(0);" @click="toPay()"><font color="green">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;续费</font></a> </span> -->
              </div>
           


             <div style="margin-top:17px;">  
                <el-tooltip class="item" effect="dark" content="添加好友" placement="top-start"> 
                  <el-badge  value="" class="item"  type="warning">
                    <el-button size="small"   icon="el-icon-zoom-in" circle @click="addFriend"></el-button>
                  </el-badge>
                </el-tooltip>
             </div> 
             <div style="margin-top:17px;"> 
               <el-tooltip class="item" effect="dark" content="新的朋友审核" placement="top-start">    
                <el-badge :value="checkFriendTableData.length==0?'':checkFriendTableData.length" class="item" type="success">
                  <el-button size="small"  icon="el-icon-chat-dot-round" circle @click="checkFriend"></el-button>
                </el-badge>
                </el-tooltip>
             </div> 
             <div style="margin-top:17px;"> 
               <el-tooltip class="item" effect="dark" content="个人设置" placement="top-start"> 
                <el-badge  value="" class="item" type="info"> 
                    <el-button size="small"  icon="el-icon-user" circle @click="toUserProfile()"></el-button> 
                </el-badge>
               </el-tooltip>
             </div> 
             <div style="margin-top:17px;margin-right:17px;"> 
                <el-badge  value="" class="item" type="info">
                  <el-button size="small" type="warning" icon="el-icon-switch-button" @click="logout"  circle></el-button>
                </el-badge>
             </div> 
        </div>
              

          
         </el-card> 
    </el-row>  
 

    <el-row :gutter="24" class="panel-group"  style="margin-top:0px;margin-bottom:6px;margin-left:20px;margin-right:20px">
    
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
          <div class="card-panel" @click="newWordSetting">
            <div class="card-panel-icon-wrapper icon-money">
              <svg-icon icon-class="tool" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                设置
              </div>
              <!-- <count-to :start-val="0" :end-val="aliveNum" :duration="3200" class="card-panel-num" /> -->
              <!-- 生词设置 -->
            </div> 
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24">    
      <el-col :span="4" class="card-panel-col">
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
            <!-- 收集生词 -->
          </div>
        </div>
      </el-col>
      <el-col :span="4" class="card-panel-col">
        <div class="card-panel" @click="handlePractise2('english')">
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
      <el-col :span="4" class="card-panel-col">
        <div class="card-panel" @click="handlePractise2('means')">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="skill" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              练习(2)
            </div>
            <count-to :start-val="0" :end-val="practiseNum" :duration="3200" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :span="4" class="card-panel-col">
        <div class="card-panel" @click="handlePractise2('lisen')">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="skill" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              练习(3)
            </div>
            <count-to :start-val="0" :end-val="practiseNum" :duration="3200" class="card-panel-num" />
          </div>
        </div>
      </el-col>

      <el-col :span="4" class="card-panel-col">
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
      <el-col :span="4" class="card-panel-col">
        <div class="card-panel" @click="handleTest">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="color" class-name="card-panel-icon" />
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


      <el-col :span="10" style="">

        
        <!-- 热门词汇 -->
        <el-card   shadow="hover"  style="margin-bottom:10px;height:50%;" >
          <div slot="header" class="clearfix">
            <span>热门词汇</span>
            <el-button style="float: right; padding: 3px 0" type="text"></el-button>
          </div>
          <div style="float:left;"  v-for="hotWord in hotWordsData"  class="text item" >
            <div>
                <el-tooltip placement="left" effect="light">
                  <div slot="content">
                    <div  v-for="(means,i) in hotWord.meansList" class="text item"> 
                        <span><font style="color:green;">{{means.posName}}</font> &nbsp;&nbsp;&nbsp;{{means.means}}  </br></span> 
                    </div>
                  </div>
                  <el-tag effect="dark" :type="tagType[hotWord.wordId%4]"  @click="addToMe(hotWord)">{{hotWord.word}}</el-tag>
                </el-tooltip>
            </div>
          </div>
        </el-card>    

        <!-- 好友动态 -->  
        <el-card   shadow="hover" style="height:50%;">
          <div slot="header" class="clearfix">
            <span>好友动态 【<el-button style="float: center; padding: 3px 0" type="text" @click="selectRank()">排行版</el-button>】</span>
            
          </div>
          <div v-for="friend in friendsDyn" class="text item" v-if="friendsDyn.length>0">
     
            <el-card :body-style="{ padding: '5px' }">
              <!-- <div class="avatar" style="float:left"> -->
                <!-- <el-avatar :src="avater" size="small"></el-avatar> -->
                <b style="margin-right:20px;margin-left:10px;">{{friend.nickName}} </b>
              
              
              <!-- <el-divider direction="vertical"></el-divider> -->
              <time class="time">{{friend.createTime}}</time>
              <el-divider direction="vertical"></el-divider>
              <span style="margin-right:20px;margin-left:20px;">添加生词 </span>
              <!-- <el-divider direction="vertical"></el-divider> -->

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
                <el-button type="primary" size="small" icon="el-icon-plus"  circle @click = "addToMe(friend)"> </el-button>
              </el-tooltip> 

              <!-- </div> -->
            </el-card> 

          </div>

          <div v-for="index of 5"  class="text item" v-if="friendsDyn.length == 0">
     
            <el-card :body-style="{ padding: '15px' }">
                暂无动态
            </el-card> 

          </div>
        </el-card>



      </el-col>
      
    </el-row>

        
    <div>
     <el-divider></el-divider>
     <span  style="text-align: center;display:block;font-size:14px"><a href="https://beian.miit.gov.cn/">豫ICP备2022013318号-1</a>&nbsp;&nbsp;&nbsp;&nbsp;www.endlessly.cn </span><br/>
     <span  style="text-align: center;display:block;font-size:10px">版权所有 2022-2025 </span>
     
    </div>



 
    <!-- 接受挑战 -->
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

        <el-table ref="fightTable" :data="fightTableData" style="width: 100%"  height="550">
          <el-table-column prop="userName" label="发起挑战者"> </el-table-column>
          <el-table-column prop="nickName" label="挑战者昵称"> </el-table-column>
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
          <el-option label="全部" value="" />
          <el-option label="存活" value="A" />
          <el-option label="消灭" value="D" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        <el-button
              type="warning"
              icon="el-icon-download"
              size="mini"
              @click="handleExport"
              v-hasPermi="['system:user:export']"
            >导出</el-button>
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
    <AddNewWord  ref="AddNewWord" :openAdd="showOpenAdd"></AddNewWord> 


 
    <!-- 练习生词对话框 NEW 已单独备份 -->  
    <PractiseNewWord2  ref="PractiseNewWord2" :openPractise2="showPractise2" :practiseType="practiseType"></PractiseNewWord2> 



    <!-- 添加好友对话框 -->
    <el-dialog :title="titleAddFriend" 
               :visible.sync="openAddFriend" width="350px" append-to-body 
               :show-close="true" >  
                
        <span v-if="currentFriendStatusTip != ''" style="color:green;margin-bottom:15px;">{{currentFriendStatusTip}}</span> 
        <el-input v-model="userNameForSearch" placeholder="请输入用户名" @keyup.enter.native="searchUser"></el-input>   
        <el-divider></el-divider>     
        <el-table ref="friendTable" :data="friendTableData" style="width: 100%">
          <el-table-column prop="userName" label="登录名"> </el-table-column> 
          <el-table-column prop="nickName" label="用户昵称"> </el-table-column> 
          <el-table-column prop="" label="处理" >
            <template slot-scope="scope"> 
                <el-button type="success" :disabled="currentFriendStatus == 'S' || currentFriendStatus == 'N' " 
                  disable-transitions @click="addFriendLast(scope.row.userId)">添加
                </el-button>
            </template>
          </el-table-column>
        </el-table>         
         
    </el-dialog>

    <!-- 审核好友申请对话框 -->
    <el-dialog :title="titleAddFriend" 
               :visible.sync="openCheckFriend" width="550px" append-to-body 
               :show-close="true"  >       
        <el-table ref="checkFriendTable" :data="checkFriendTableData" style="width: 100%">
          <el-table-column prop="fuserName" label="登录名"> </el-table-column> 
          <el-table-column prop="fnickName" label="用户昵称"> </el-table-column> 
          <el-table-column prop="" label="审核" >
            <template slot-scope="scope"> 
                <el-button type="success"  disable-transitions @click="checkFriendLast(scope.row.id,'S')">同意 </el-button>
                <el-button type="warn"  disable-transitions @click="checkFriendLast(scope.row.id,'F')">拒绝 </el-button>
            </template>
          </el-table-column>
        </el-table>         
         
    </el-dialog>


    <!-- 生词设置对话框 -->
    <el-dialog :title="titleNewWordSetting" 
               :visible.sync="openNewWordSetting" width="900px" append-to-body 
               :show-close="true"  >       

        <el-row  :gutter="24">
          <el-col :span="18">
             &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          </el-col>
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" content="保存设置" placement="top-start">     
                <el-button type="success" icon="el-icon-check"  @click="saveSetting"  style="margin-bottom:10px;padding:10px;">保存设置</el-button>
            </el-tooltip>
          </el-col>
        </el-row>

        <el-collapse v-model="activeNames" >
            <el-collapse-item title="生词练习间隔时间设置" name="1">  
              <el-tooltip class="item" effect="dark" content="新增次数" placement="top-start">     
                <el-button type="primary" icon="el-icon-plus" size="small" @click="addMemory" style="padding:10px;"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除次数" placement="top-start">     
                <el-button type="primary" icon="el-icon-delete" size="small" @click="delMemory" style="padding:10px;"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="恢复默认值" placement="top-start">  
                <el-button type="primary" icon="el-icon-refresh-right" size="small"  @click="refreshMemory" style="margin-bottom:10px;padding:10px;"></el-button>
              </el-tooltip>

              <div class="block" v-for="(memory,i) in this.wordSettingMemory" >
                <!-- <el-slider :value="memory111.settingValue" show-input max="200"> fwe </el-slider>{{memory111.settingValue}} -->
                <el-tag effect="plain">第{{memory.settingName}}次</el-tag>练习间隔(小时) <el-input-number v-model="memory.settingValue" :step="24"  size="small"></el-input-number>
              </div>      
            </el-collapse-item>

            <el-collapse-item title="生词目标值设置" name="2">  
              <el-tooltip class="item" effect="dark" content="新增月份目标" placement="top-start">     
                <el-button type="primary" icon="el-icon-plus" size="small" @click="addCollect" style="padding:10px;"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除月份目标" placement="top-start">     
                <el-button type="primary" icon="el-icon-delete" size="small" @click="delCollect" style="padding:10px;"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="恢复默认值" placement="top-start">  
                <el-button type="primary" icon="el-icon-refresh-right" size="small" @click="refreshCollect" style="margin-bottom:10px;padding:10px;"></el-button>
              </el-tooltip>

              <div class="block" v-for="(collect,i) in this.wordSettingTarget" >
                <!-- <el-slider :value="memory111.settingValue" show-input max="200"> fwe </el-slider>{{memory111.settingValue}} -->
                <el-tag>月份</el-tag>{{collect.settingName}}  
                <el-divider direction="vertical"></el-divider>
                <el-tag>收集生词目标</el-tag><el-input-number v-model="collect.settingValue" :step="50" size="small"></el-input-number>
                <el-divider direction="vertical"></el-divider>
                <el-tag>消灭生词目标</el-tag><el-input-number v-model="collect.settingValueTwo" :step="50" size="small"></el-input-number>
                <el-divider direction="vertical"></el-divider>
                <el-tag>练习准确率</el-tag><el-input-number v-model="collect.settingValueThree" :step=0.1 max=1  size="small"></el-input-number>
              </div>     
            </el-collapse-item>          
            
        </el-collapse>     

         
    </el-dialog>
 
    <!-- 个人设置 -->
    <el-dialog  title="个人设置" 
               :visible.sync="openUserProfile" width="1100px" append-to-body 
               :show-close="true"  > 
         <Profile></Profile>
    </el-dialog>

    <!-- 小游戏 -->
    <el-dialog :title="titleTest" 
            :visible.sync="openTest" width="850px" height="800px" append-to-body ref="gameDialog" id="gameDialog"
            :show-close="false" 
            @close="closePractise" 
            class="practiseDialog" custom-class="practiseDialog2">   
          <el-button type="primary" @click="sendMessage"> 向playCanvas发消息 </el-button>
          <iframe :src ="jumpUrl" id="ifr1" name="ifr1" scrolling="yes" width="800px" height="500px"></iframe>
    </el-dialog>

    <!-- 排行榜 -->
    <el-dialog  title="排行榜" 
               :visible.sync="openRank" width="500px" append-to-body 
               :show-close="true"  > 
        
          <el-tabs v-model="rankActiveName" @tab-click="handleRankClick">
            <el-tab-pane label="收集单词排行榜" name="all">  
                <el-table
                  :data="ranks"
                  style="width: 100%">
                   <el-table-column
                      type="index"
                      min-width="30%"
                      label="排名">
                      <!-- <template slot-scope="scope">  
                          <el-tag size="medium">{{ scope.row.index }}</el-tag> 
                      </template> -->
                   </el-table-column>   
                  <el-table-column
                    prop="userName"
                    label="昵称"
                    min-width="35%"> 
                  </el-table-column>
                  <el-table-column
                    prop="allNum"
                    label="收集单词数"
                    min-width="35%">
                  </el-table-column> 
                </el-table> 
            </el-tab-pane>


            <el-tab-pane label="消灭单词排行榜" name="dead">
                <el-table
                  :data="ranks"
                  style="width: 100%">
                   <el-table-column
                      type="index"
                      min-width="20%"
                      label="排名">
                      <!-- <template slot-scope="scope">  
                          <el-tag size="medium">{{ scope.row.index }}</el-tag> 
                      </template> -->
                   </el-table-column>   
                  <el-table-column
                    prop="userName"
                    label="昵称"
                    min-width="40%"> 
                  </el-table-column>
                  <el-table-column
                    prop="allNum"
                    label="消灭单词数"
                    min-width="40%">
                  </el-table-column> 
                </el-table> 
            </el-tab-pane>
            </el-tab-pane> 
          </el-tabs>
    </el-dialog>


    <!-- 续费 -->
    <el-dialog  title="续费窗口" 
            :visible.sync="openPay" width="650px" height="600px" append-to-body 
            :show-close="false" 
            @close="closePractise"  >  
         
              <el-tag>续费后会员有效期到：{{afterPayValidTo}}</el-tag>
         
              <!-- <span style="margin-left: 2px" >  
                  <span ><font >{{means.name}}</font> </span> 
                  <span ><font style="color:green;font-size:'30px'">{{means.price}}</font> 元</span> 
              </span>   -->
              <el-radio-group v-model="payType" @change="changePay()"> 
                  <el-card>
                    <el-radio  v-for="(means,i) in payData" :label="means.price"> 
                          <font >{{means.name}}</font><el-divider direction="vertical"></el-divider><font style="color:green;size:'30px'">{{means.price}}</font> 元 
                    </el-radio>
                 </el-card>   
              </el-radio-group>   
          <el-button type="success" plain @click="pay()" style="margin-top:20px;">去支付</el-button> 

          <!-- 调出二维码 -->
          <div v-if="payCode" style="width:200px;height:250px;margin:0 auto;margin-top:20px;">
            <div id="qrcode" ref="qrcodeRef" ></div>
            <!-- <a>点击刷新</a> <br/> --> 
          </div>

    </el-dialog>

    <!-- 续费 -->
    <el-dialog  title="扫码支付窗口" :visible.sync="wxPay" width="650px" height="600px" append-to-body 
            :show-close="false"> 
         
         二维码


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
import AddNewWord from "@/views/study/newWords/addNewWord";
import PractiseNewWord from "@/views/study/newWords/practiseNewWord";
import PractiseNewWord2 from "@/views/study/newWords/practiseNewWord2";

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
    BarChart,
    Profile,
    AddNewWord,
    PractiseNewWord,
    PractiseNewWord2
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
      // suggestWords: [],
      // currentWord: {},
      
      // addButtonDisabled: false,
      // addButtonTip: "",
      //wordStyle: "margin: 20px;color:black;font-size:58px;font-family:Arial;",
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
      titleTest: '小游戏',
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
      validTo: this.$store.state.user.validTo,
      nickName: this.$store.state.user.nick,
      deptname: this.$store.state.user.deptname,
      friendsDyn: [],
      showChart: "月度目标",
 

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

       wordSettingMemory: [],
       wordSettingTarget: [],
       activeNames: ['1','2'],
       openUserProfile: false,
       hotWordsData: [],
       tagType: ['success','info','danger','warning'],
       gradeDesc: '', //用户等级描述
       openRank: false, //排行榜开关
       ranks: [],  //排行榜数据
       rankActiveName: 'all', //默认排行榜展示tab
       outDateFlag: false, //是否过期
       openPay: false, //续费窗口
       payData: [
              { price: 20, name: '一个月' },
              { price: 50, name: '三个月' },
              { price: 180, name: '一年' },
              { price: 500, name: '永久' }],
       payType: "",       
       afterPayValidTo: this.$store.state.user.validTo,
       wxPay: false,
       payCode: false, //是否显示付款二维码,
       //jumpUrl: this.$router.options.base+'/static/jump/index.html',
       jumpUrl: '',
       practiseWordArray: [],  //练习生词时一次加载多个（打开练习页面时加载一次，后续切换时不必每次都加载，减轻后端服务器压力）
       suggestWordsArray: [],  //练习生词时一次加载100个选项（打开练习页面时加载一次，后续切换时不必每次都加载，减轻后端服务器压力）
       oncePractiseCount: 0,   //单词练习生词次数,
       overTime: false,        //是否超时（如果超时需用户确认是否继续，防止用户打开一个练习页面去干其他事，一直在那刷新判错）
       showPractise2: false,
       practiseType: "english",
       showOpenAdd: false,

    };
  },
  created() {
    this.getList();
    this.getNewWordCollect();
    this.listNewWordChallenge();
    this.selectExpectActual();
    this.selectChallengeCollect();
    this.selectFriendsDyn();
    this.listCheckFriend();
    //lert(this.$store.state.user.avatar);
    this.gradeDesc = this.getGradeDesc();
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
            if(response != ''){
              this.allNum = response.allNum; 
              this.passNum = response.passNum; 
              this.aliveNum = response.aliveNum; 
              this.practiseNum = response.practiseNum; 
            }
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
        updateBy: this.$store.state.user.id,
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
      // this.reset();
      // this.currentWord = {};
      // this.suggestWords = [];
      this.showOpenAdd = true;
      this.title = "添加生词";
 
      this.$nextTick(() => {
　　　　　this.$refs.AddNewWord.handleAdd();
　　　 }) 
    
      
    },

    /**关闭新增单词页面时调用 */
    closeAddNewWord() {
       //alert("close add"); 
       this.getList(); 
       this.getNewWordCollect();
       this.listNewWordChallenge();
       this.open = false;
    },

    // handlePractiseNew(fightId) {
    //   this.$nextTick(() => {
    //     this.openPractise = true;
    //     alert(this.$refs.AddNewWord);
    //     this.$refs.PractiseNewWord.handlePractise(fightId);
    //   });
    // },

    /**生词练习 （子组件） */
    handlePractise2(practiseType) {
      this.$nextTick(() => { 
         this.showPractise2 = true;
         this.practiseType = practiseType;
　　　　　this.$refs.PractiseNewWord2.handlePractise();
　　　 })
    },



    /** 练习按钮操作 迁移注释 (练习生词)
    async handlePractise(fightId) {
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
    */

    
    /** 检查答案是否正确 迁移注释 (练习生词)
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
*/
    closePractise(){ 
     //alert(this.$refs.PractiseNewWord);
      this.practiseRatio = 0;       //单次练习正确率
      this.practiseRightTimes = 0;  //单次练习正确次数
      this.practiseWrongTimes = 0;   //单次练习错误次数
      this.oncePractiseCount = 0;   //单词练习生词数（实际）
      this.openPractise = false;
      this.continueFight = false;
      this.suggestWordsArray = [];
      this.practiseWordArray = [];
      this.getList();
      this.getNewWordCollect();
      this.listNewWordChallenge(); 
      //this.$refs.PractiseNewWord.closePractise();
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
  
    /** 提交按钮【新增生词】
    submitForm() { 
      //let _this = this;
      this.$refs["form"].validate(valid => {
        if (valid) {  
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
          } 
      });
    },
     */

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

    /**autoComplete 英语单词 
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
    */

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


    createIframe(dom, src, onload) {
        //在document中创建iframe 
        var iframe = document.createElement("iframe"); 
        //设置iframe的样式 
        iframe.style.width = "800px"; 
        iframe.style.height = "500px"; 
        // iframe.style.margin = "0"; 
        // iframe.style.padding = "0"; 
        // iframe.style.overflow = "hidden"; 
        iframe.style.scrolling = "yes"; 
        iframe.style.border = "none"; 
        //绑定iframe的onload事件,处理事件的兼容问题

        if ( onload && Object.prototype.toString.call(onload) === "[object Function]"

        ) {
            if (iframe.attachEvent) {
                iframe.attachEvent("onload", onload); 
            } else if (iframe.addEventListener) {
                iframe.addEventListener("load", onload); 
            } else {
                iframe.onload = onload; 
            } 
        } 
        iframe.src = src; 
        //把iframe载入到dom以下 
        dom.appendChild(iframe); 
        return iframe; 
    },


     /** 放松（小游戏） */
    handleTest() { 
      //alert(this.$router.options.base);
      //alert(this.jumpUrl);
      //this.jumpUrl = this.jumpUrl+"?userId="+20;  
      this.jumpUrl = this.$router.options.base+'/static/jump/index.html'+"?userId="+11;
      this.openTest = true;
      // var gameDialog = document.getElementById("gameDialog");
      // alert(gameDialog);
      //this.createIframe(gameDialog,this.jumpUrl,true);
    },

    sendMessage() {
       var iframe = document.getElementById("ifr1");
       iframe.contentWindow.postMessage({
          score: 25,
          type: 'scoreType',
       }, "http://localhost");
     
    },

    callVueBack() {
        alert('callVueBack');
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

    /**
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
       */

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
    // }, 
 
    /**
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
     */

    hidePopover() {
      //alert("hide");
      this.suspend = false;
      this.openChallenge = false;
      this.$refs.multipleTable.clearSelection();
    },

    /** 迁移注释 (练习生词) */
    closeFight() {
      this.openFight = false;
    },
    processFight(id) {
      //alert(id);
      this.$nextTick(() => {
　　　　　this.$refs.PractiseNewWord2.handlePractise(id);
　　　 })
      //this.handlePractise(id);
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
    },



   
    //添加好友、好友审核
    listCheckFriend() {
      this.friend.friendId = this.$store.state.user.id;
      this.friend.status = 'N'; 
      listFriends(this.friend).then(response => {
          //alert(response.rows);
          if(response.rows != ''){
             this.checkFriendCount = response.rows.length;
             this.checkFriendTableData = response.rows;
          }else{
             this.checkFriendCount = 0;
             this.checkFriendTableData = [];
             this.openCheckFriend = false;  

          }
      }); 
    },

    addFriend() {
      this.openAddFriend = true;  
    },

    searchUser() {
      //alert(this.userNameForSearch);
      this.friend.userName = this.userNameForSearch;
      this.friend.status = ''; 
      listUser(this.friend).then(response => {
          this.friendTableData = response.rows;   
          //查询目前是否是好友或已申请好友
          this.friend.userId = this.$store.state.user.id;
          this.friend.friendId = response.rows[0].userId; 
          this.currentFriendStatus = '';
          this.currentFriendStatusTip = '';
          listFriends(this.friend).then(response => {
              if(response.rows.length > 0){
                  if(response.rows[0].status == 'N'){ 
                    this.currentFriendStatusTip = "已经发出好友申请，请耐心等待"; //
                  }else if(response.rows[0].status == 'S'){ 
                    this.currentFriendStatusTip = "已经是好友关系"; //
                  }
                  this.currentFriendStatus = response.rows[0].status;  
              }else{ //查询是否对方已经给我发过好友申请
                  this.friend.userId = this.friend.friendId; 
                  this.friend.friendId = this.$store.state.user.id;
                  listFriends(this.friend).then(response => {
                    if(response.rows.length > 0){
                        if(response.rows[0].status == 'N'){ 
                          this.currentFriendStatusTip = "对方已经发出好友申请，请审核通过即可"; //
                        }else if(response.rows[0].status == 'S'){ 
                          this.currentFriendStatusTip = "已经是好友关系"; //
                        }
                        this.currentFriendStatus = response.rows[0].status;  
                    }
                  });
              }
          });
        }
      );
      
    },

    addFriendLast(userId) {
      //alert(userId);
      //alert(this.$store.state.user.id);
      this.friend.userId = this.$store.state.user.id;
      this.friend.friendId = userId;
      this.friend.status = "N"; //申请状态 
      addFriends(this.friend).then(response => {
          if (response.code === 200) {
                this.msgSuccess("新增成功，请等待好友审核");
                this.openAddFriend = false; 
          }
        }
      );
    },

    checkFriend() {
      this.openCheckFriend = true;  
    },
    checkFriendLast(id,status) {
      //alert(userId);
      //alert(this.$store.state.user.id);
      this.friend.id = id; 
      this.friend.status = status; //申请状态 
      updateFriends(this.friend).then(response => {
          if (response.code === 200) {
              this.msgSuccess("处理成功");
              this.listCheckFriend();
          }
        }
      );
    },

    //生词设置
    newWordSetting() { 
      this.listSettingMemory();
      this.listSettingTarget();
      this.openNewWordSetting = true;
    },

    listSettingMemory() {
      listSetting({"settingType": "memory_method","userId": this.$store.state.user.id}).then(response => {
        this.wordSettingMemory = response.rows;
        //alert(this.wordSettingMemory[1].settingValue); 
      });
    },
    listSettingTarget() {
      listSetting({"settingType": "collect_target","userId": this.$store.state.user.id}).then(response => {
        this.wordSettingTarget = response.rows;
        //alert(this.wordSettingMemory[1].settingValue); 
      });
    },



    addMemory() {
       var newMemory = {};
       newMemory.userId = this.$store.state.user.id;
       newMemory.settingType = "memory_method";
       newMemory.settingName =  this.wordSettingMemory.length+1;
       newMemory.settingValue = 0;
       newMemory.status = "T";
       this.wordSettingMemory.push(newMemory);
    },
    delMemory() {
       this.wordSettingMemory.pop();
    },
    refreshMemory() {
        this.listSettingMemory();
    },

    addCollect() {
       var newTarget = {};
       newTarget.userId = this.$store.state.user.id;
       newTarget.settingType = "collect_target";
       //计算下一个月 
       var date = new Date(this.wordSettingTarget[this.wordSettingTarget.length-1].settingName);
       var nextYearMonth = '';
       if(date.getMonth()>10){
           nextYearMonth = (date.getFullYear()+1)+"-01";
       }else{
         if(date.getMonth()<=7){
           nextYearMonth = date.getFullYear() +"-0" + (date.getMonth()+2);
         }else{
           nextYearMonth = date.getFullYear() +"-" + (date.getMonth()+2); 
         }
       }
       newTarget.settingName =  nextYearMonth;
       newTarget.settingValue = 0;
       newTarget.settingValueTwo = 0;
       newTarget.settingValueThree = 0;
       newTarget.status = "T";
       this.wordSettingTarget.push(newTarget);
    },
    delCollect() {
       this.wordSettingTarget.pop();
    },
    refreshCollect() {
         this.listSettingTarget();
    },

    saveSetting() {
      //alert(this.wordSettingMemory.length);
      //alert(this.wordSettingTarget.length); 
      editSettingBatch(this.wordSettingMemory).then(response => {
        if (response.code === 200) {
            editSettingBatch(this.wordSettingTarget).then(response => {
              if (response.code === 200) {
                  this.msgSuccess("保存成功");
                  this.selectExpectActual();
                  this.openNewWordSetting = false;
              }else{
                  this.msgError("保存失败");
              }
            }); 
        }
      });

   },

   toUserProfile() {
      this.openUserProfile = true;
   },

   
   addToMe(word) {
     //alert(wordId);
    //  this.currentWord = word;
    //  this.currentWord.exchange = '';  //不知道为什么exchange没有自动转为json对象
    //  this.currentWord.voice = JSON.parse(this.word.voice); 
     this.form.wordId = word.wordId; 
     this.form.userId = this.$store.state.user.id;
     this.form.status = 'A';
     this.form.wrongTimes = 0;
     this.form.rightTimes = 0;
     this.form.createBy = this.form.userId;

     //查询是否存在，若存在则提示 
      listNewWords({"userId": this.$store.state.user.id,"wordId": this.form.wordId}).then(response => {
            if(response.rows.length >0){ 
                this.msgError("您已收集过此单词");
                // const h = this.$createElement; 
                // this.$notify({
                //   title: '已存在',
                //   message: h('i', { style: 'color: teal'}, '您已收集此单词')
                // });
            }else{
                //this.submitForm();
                addNewWords(this.form).then(response => {
                  if (response.code === 200) {
                    this.msgSuccess("新增成功");
                    //this.open = false;
                    this.getList(); 
                    this.getNewWordCollect();
                    this.listNewWordChallenge();
                    //支持继续添加
                    if(this.open){
                      this.handleAdd(); 
                    } 
                  }
                });
            }
      });
   },


   getGradeDesc() {
      if(this.allNum >= 0 && this.allNum <= 50){
          return '青铜';
      }else if(this.allNum > 50 && this.allNum <= 200){
          return '白银';
      }else if(this.allNum > 200 && this.allNum <= 500){
          return '黄金';
      }else if(this.allNum > 500 && this.allNum <= 800){
          return '铂金';
      }else if(this.allNum > 800 && this.allNum <= 1200){
          return '钻石';
      }else if(this.allNum > 1200 && this.allNum <= 2000){
          return '星耀';
      }else if(this.allNum > 2000){
          return '王者';
      }
   },

   /** 导出按钮操作 */
    handleExport() {
      this.download('study/newWords/export', {
        ...this.queryParams
      }, `user_${new Date().getTime()}.xlsx`)
    },
 
    
    selectRank() {
       this.openRank = true;
       //1.排行榜
       selectRank(null).then(response => {   
          this.ranks = response.rows;
      });
       
    },
    handleRankClick(){
       if(this.rankActiveName == 'dead'){
           //1.排行榜
            selectRank('D').then(response => {   
                this.ranks = response.rows;
            });
       }else{
            //1.排行榜
            selectRank(null).then(response => {   
                this.ranks = response.rows;
            });
       }
    },

    checkValidTo() {
       let validDate = Date.parse(new Date(this.validTo));
       if(validDate > new Date){
          return false;
       }else{
          return true;
       }
    },

    toPay() {
       this.openPay = true;
    },

    pay() {
       //alert(this.payType);
       if(this.payType == ''){
          alert("请选择付费方式");
          return;
       }

      //  this.openPay = false;
      //  this.wxPay = true;
       this.payCode = true; 

       //生成url对应的二维码
       this.uuidForWeixin = (uuid.v1());
         
       let that = this;
       let qrcode = new QRCode("qrcode", {
          width: 200,
          height: 200,
          correctLevel : 3,
          text: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6c8d12d25b64c78f&redirect_uri=https%3A%2F%2F9f33960714.imdo.co%2Fauth%2FweChatPay&response_type=code&scope=snsapi_userinfo&state='+this.uuidForWeixin+'#wechat_redirect',
       });

       
       

    },

    changePay() {
      
       if(this.payType == '20'){
          this.afterPayValidTo = this.$moment(Date.parse(new Date(this.validTo))).add(1,'months').format('YYYY-MM-DD HH:mm:ss');
       }else if(this.payType == '50'){
          this.afterPayValidTo = this.$moment(Date.parse(new Date(this.validTo))).add(3,'months').format('YYYY-MM-DD HH:mm:ss');
       }else if(this.payType == '180'){
          this.afterPayValidTo = this.$moment(Date.parse(new Date(this.validTo))).add(1,'years').format('YYYY-MM-DD HH:mm:ss');
       }else if(this.payType == '500'){
          this.afterPayValidTo = this.$moment(Date.parse(new Date(this.validTo))).add(100,'years').format('YYYY-MM-DD HH:mm:ss');
       } 
    },



    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          //location.href = '/index';
          //alert(this.$router.options.base+'/index');
          location.href = this.$router.options.base+'/index';   //如果部署到nginx非根节点，如study，则此处需加上前置study，本机不需要
        })
      })
    },


    changeTitleTest(score) {
       this.titleTest = this.titleTest+score;
    }


  },



  mounted() {
     
      listHots(30).then(response => {
            if(response.rows.length >0){ 
                //alert(response.rows.length);
                this.hotWordsData = response.rows;
            } 
      });

      this.outDateFlag = this.checkValidTo();

      // window.addEventListener("message",function (event) {
      //       alert(event.origin);
      //       if (event.origin === "http://playcanvas") { // always check message came from your website
      //           var score = event.data.score2;
      //           this.changeTitleTest(score);
      //       }
      //   }, false);

      let that = this;
      // 监听子页面想父页面的传参
       window.addEventListener('message', function(event) {
          //alert("子页面传参到父页面："+event.data.score);
          //this.changeTitleTest(event.data.score);
          that.titleTest = that.titleTest+event.data.score;
          //此处执行事件
          console.log('监听子页面向父页面的传参', event.data);
       });

  },
 
};

       

         
</script>


<style lang="scss" scoped>

  .newWord {
    // display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    // background-image: url("../../../assets/image/loginBackNew.webp");
    // background-color: #abafb3;
    background-size: cover;
  }

  .newWordStyle {
    margin-top:10px;
    margin-left:50px;
    margin-right:50px;  
  }

  .headerUserInfo {
    margin-top:3px;
    margin-bottom:6px;
    margin-left:30px;
    margin-right:30px;
    background-image: url("../../../assets/image/headerBackImg.png");
  }

  .practiseTop {
     background-image: url("../../../assets/image/practiseBack.png");
  }

  .text {
    font-size: 10px;
  }

  .textHot {
    font-size: 18px;
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

      .icon-tool {
        background: #db5c07;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #5de90c;
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

    .icon-tool {
        background: #db5c07;
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #5de90c;
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
      // background: #f8f9fa;
      background-image: url('../../../assets/image/practiseBack.png');
      padding-top: 10px;
    }
    .el-dialog__body { 
      margin: 0 10px 10px 10px;
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


  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
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