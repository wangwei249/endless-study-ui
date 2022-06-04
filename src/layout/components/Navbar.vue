<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
 

    <div class="right-menu">


      <template v-if="device!=='mobile'">
        <!-- <search id="header-search" class="right-menu-item" /> -->
        
        <!-- <el-tooltip content="吉想官网" effect="dark" placement="bottom">
            <jee-think-site id="jeethink-site" class="right-menu-item hover-effect" />
        </el-tooltip>
        
        <el-tooltip content="购买源码" effect="dark" placement="bottom">
             <jee-think-doc id="jeethink-doc" class="right-menu-item hover-effect" />
        </el-tooltip> -->
 
     
        <!-- <screenfull id="screenfull" class="right-menu-item hover-effect" /> -->

        <!-- <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip> -->
        <el-tooltip class="item" effect="dark" content="添加新的好友" placement="top-start">     
            <el-button type="primary" icon="el-icon-zoom-in" circle @click="addFriend" style="margin-right:10px;"></el-button>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" content="新的朋友审核" placement="top-start">      
          <!-- <el-badge :value="checkFriendCount"  class="item"> -->
            <el-button type="info" icon="el-icon-chat-dot-round" circle @click="checkFriend" style="margin-right:10px;"></el-button> 
          <!-- </el-badge> -->
        </el-tooltip>
        
        <el-tooltip class="item" effect="dark" content="生词目标设置" placement="top-start"> 
          <el-button type="success" icon="el-icon-setting" circle @click="newWordSetting" style="margin-right:15px;"></el-button> 
        </el-tooltip>

        <el-tooltip class="item" effect="dark" content="个人中心" placement="top-start"> 
          <router-link to="/user/profile">
            <el-button type="info" icon="el-icon-user" circle style="margin-right:15px;"></el-button>
          </router-link> 
        </el-tooltip>

        <el-tooltip class="item" effect="dark" content="退出登录" placement="top-start"> 
          <el-button type="warning" icon="el-icon-switch-button" circle @click="logout" style="margin-right:10px;" ></el-button> 
        </el-tooltip>  

      </template>


      <!-- <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/user/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="addFriend">
            <span>添加好友</span>
          </el-dropdown-item>
          <el-dropdown-item @click.native="checkFriend">
            <el-badge :value="checkFriendCount" class="item">
            <span>好友申请</span>
            </el-badge>
          </el-dropdown-item>
     
          <el-dropdown-item divided @click.native="newWordSetting">
            <el-badge  class="item">
            <span>生词设置</span>
            </el-badge>
          </el-dropdown-item>

          <!-- <el-dropdown-item @click.native="setting = true">
            <span>布局设置</span>
          </el-dropdown-item> -->
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </div>

    <!-- 添加好友对话框 -->
    <el-dialog :title="titleAddFriend" 
               :visible.sync="openAddFriend" width="350px" append-to-body 
               :show-close="true" >  
                
        <span v-if="currentFriendStatusTip != ''" style="color:green;margin-bottom:15px;">{{currentFriendStatusTip}}</span> 
        <el-input v-model="userNameForSearch" placeholder="请输入用户名" @keyup.enter.native="searchUser"></el-input>   
        <el-divider></el-divider>     
        <el-table ref="friendTable" :data="friendTableData" style="width: 100%">
          <el-table-column prop="userId" label="用户ID"> </el-table-column>
          <el-table-column prop="userName" label="用户名" > </el-table-column> 
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
               :visible.sync="openCheckFriend" width="450px" append-to-body 
               :show-close="true"  >       
        <el-table ref="checkFriendTable" :data="checkFriendTableData" style="width: 100%">
          <el-table-column prop="userId" label="用户ID"> </el-table-column> 
          <el-table-column prop="" label="审核" >
            <template slot-scope="scope"> 
                <el-button type="success"  disable-transitions @click="checkFriendLast(scope.row.userId,'S')">同意 </el-button>
                <el-button type="warn"  disable-transitions @click="checkFriendLast(scope.row.userId,'F')">拒绝 </el-button>
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
                <el-button type="success" icon="el-icon-check"  @click="saveSetting"  style="margin-bottom:10px;">保存设置</el-button>
            </el-tooltip>
          </el-col>
        </el-row>

        <el-collapse v-model="activeNames" >
            <el-collapse-item title="生词练习间隔时间设置" name="1">  
              <el-tooltip class="item" effect="dark" content="新增次数" placement="top-start">     
                <el-button type="primary" icon="el-icon-plus" size="small" @click="addMemory"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除次数" placement="top-start">     
                <el-button type="primary" icon="el-icon-delete" size="small" @click="delMemory"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="恢复默认值" placement="top-start">  
                <el-button type="primary" icon="el-icon-refresh-right" size="small"  @click="refreshMemory" style="margin-bottom:10px;"></el-button>
              </el-tooltip>

              <div class="block" v-for="(memory,i) in this.wordSettingMemory" >
                <!-- <el-slider :value="memory111.settingValue" show-input max="200"> fwe </el-slider>{{memory111.settingValue}} -->
                <el-tag effect="plain">第{{memory.settingName}}次</el-tag>练习间隔(小时) <el-input-number v-model="memory.settingValue" :step="24"  size="small"></el-input-number>
              </div>      
            </el-collapse-item>

            <el-collapse-item title="生词目标值设置" name="2">  
              <el-tooltip class="item" effect="dark" content="新增月份目标" placement="top-start">     
                <el-button type="primary" icon="el-icon-plus" size="small" @click="addCollect"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除月份目标" placement="top-start">     
                <el-button type="primary" icon="el-icon-delete" size="small" @click="delCollect"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="恢复默认值" placement="top-start">  
                <el-button type="primary" icon="el-icon-refresh-right" size="small" @click="refreshCollect" style="margin-bottom:10px;"></el-button>
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

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import JeeThinkSite from '@/components/JeeThink/Site'
import JeeThinkDoc from '@/components/JeeThink/Doc'
import { listUser, getUser, delUser, addUser, updateUser, resetUserPwd, changeUserStatus } from "@/api/system/user";
import { listFriends, getFriends, delFriends, addFriends, updateFriends } from "@/api/study/friends";
import { listSetting, getSetting, delSetting, addSetting, updateSetting,editSettingBatch } from "@/api/study/setting";

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    SizeSelect,
    Search,
    JeeThinkSite,
    JeeThinkDoc
  },
  data() {
    return {
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

    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    }
  },
  created() {
      this.listCheckFriend();
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.href = '/index';
        })
      })
    },


    listCheckFriend() {
      this.friend.friendId = this.$store.state.user.id;
      this.friend.status = 'N'; 
      listFriends(this.friend).then(response => {
          if(response.rows != ''){
             this.checkFriendCount = response.rows.length;
             this.checkFriendTableData = response.rows;
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
                this.msgSuccess("新增成功");
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
    },

    listSettingMemory() {
      listSetting({"settingType": "memory_method"}).then(response => {
        this.wordSettingMemory = response.rows;
        //alert(this.wordSettingMemory[1].settingValue);
        this.openNewWordSetting = true;
      });
    },
    listSettingTarget() {
      listSetting({"settingType": "collect_target"}).then(response => {
        this.wordSettingTarget = response.rows;
        //alert(this.wordSettingMemory[1].settingValue);
        this.openNewWordSetting = true;
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
              }else{
                  this.msgError("保存失败");
              }
            }); 
        }
      });

    },

  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 50%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

</style>
