<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="状态【T:生效，F：不生效】" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入状态【T:生效，F：不生效】"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="配置类型" prop="settingType">
        <el-select v-model="queryParams.settingType" placeholder="请选择配置类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="配置项" prop="settingName">
        <el-input
          v-model="queryParams.settingName"
          placeholder="请输入配置项"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="配置值" prop="settingValue">
        <el-input
          v-model="queryParams.settingValue"
          placeholder="请输入配置值"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态【T:生效，F：不生效】" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态【T:生效，F：不生效】" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态【T:生效，F：不生效】" prop="settingValueTwo">
        <el-input
          v-model="queryParams.settingValueTwo"
          placeholder="请输入状态【T:生效，F：不生效】"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态【T:生效，F：不生效】" prop="settingValueThree">
        <el-input
          v-model="queryParams.settingValueThree"
          placeholder="请输入状态【T:生效，F：不生效】"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态【T:生效，F：不生效】" prop="settingValueFour">
        <el-input
          v-model="queryParams.settingValueFour"
          placeholder="请输入状态【T:生效，F：不生效】"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['study:setting:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['study:setting:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['study:setting:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['study:setting:export']"
        >导出</el-button>
      </el-col>
	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="settingList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="状态【T:生效，F：不生效】" align="center" prop="id" />
      <el-table-column label="状态【T:生效，F：不生效】" align="center" prop="userId" />
      <el-table-column label="配置类型" align="center" prop="settingType" />
      <el-table-column label="配置项" align="center" prop="settingName" />
      <el-table-column label="配置值" align="center" prop="settingValue" />
      <el-table-column label="配置值" align="center" prop="remark" />
      <el-table-column label="状态【T:生效，F：不生效】" align="center" prop="status" />
      <el-table-column label="状态【T:生效，F：不生效】" align="center" prop="settingValueTwo" />
      <el-table-column label="状态【T:生效，F：不生效】" align="center" prop="settingValueThree" />
      <el-table-column label="状态【T:生效，F：不生效】" align="center" prop="settingValueFour" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['study:setting:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['study:setting:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改生词目标参数设置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="状态【T:生效，F：不生效】" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入状态【T:生效，F：不生效】" />
        </el-form-item>
        <el-form-item label="配置类型" prop="settingType">
          <el-select v-model="form.settingType" placeholder="请选择配置类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="配置项" prop="settingName">
          <el-input v-model="form.settingName" placeholder="请输入配置项" />
        </el-form-item>
        <el-form-item label="配置值" prop="settingValue">
          <el-input v-model="form.settingValue" placeholder="请输入配置值" />
        </el-form-item>
        <el-form-item label="配置值" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="状态【T:生效，F：不生效】">
          <el-radio-group v-model="form.status">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态【T:生效，F：不生效】" prop="settingValueTwo">
          <el-input v-model="form.settingValueTwo" placeholder="请输入状态【T:生效，F：不生效】" />
        </el-form-item>
        <el-form-item label="状态【T:生效，F：不生效】" prop="settingValueThree">
          <el-input v-model="form.settingValueThree" placeholder="请输入状态【T:生效，F：不生效】" />
        </el-form-item>
        <el-form-item label="状态【T:生效，F：不生效】" prop="settingValueFour">
          <el-input v-model="form.settingValueFour" placeholder="请输入状态【T:生效，F：不生效】" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listSetting, getSetting, delSetting, addSetting, updateSetting } from "@/api/study/setting";

export default {
  name: "Setting",
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
      // 生词目标参数设置表格数据
      settingList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        settingType: null,
        settingName: null,
        settingValue: null,
        status: null,
        settingValueTwo: null,
        settingValueThree: null,
        settingValueFour: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询生词目标参数设置列表 */
    getList() {
      this.loading = true;
      listSetting(this.queryParams).then(response => {
        this.settingList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        userId: null,
        settingType: null,
        settingName: null,
        settingValue: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        status: "0",
        settingValueTwo: null,
        settingValueThree: null,
        settingValueFour: null
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
      this.open = true;
      this.title = "添加生词目标参数设置";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getSetting(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改生词目标参数设置";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateSetting(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addSetting(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除生词目标参数设置编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delSetting(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('study/setting/export', {
        ...this.queryParams
      }, `study_setting.xlsx`)
    }
  }
};
</script>