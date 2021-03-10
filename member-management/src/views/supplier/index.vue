<template>
  <div>
    <el-form
      ref="searchForm"
      :inline="true"
      :model="searchMap"
      style="margin-top: 20px"
      class="demo-form-inline"
    >
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="供应商名单"></el-input>
      </el-form-item>
      <el-form-item prop="linkman" v-if="!isDialog">
        <el-input v-model="searchMap.linkman" placeholder="联系人"></el-input>
      </el-form-item>
      <el-form-item prop="mobile" v-if="!isDialog">
        <el-input
          v-model="searchMap.mobile"
          placeholder="联系人电话"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchData">查询</el-button>
        <el-button type="primary" @click="handleAdd" v-if="!isDialog"
          >新增</el-button
        >
        <el-button @click="resetForm('searchForm')" v-if="!isDialog"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      :highlight-current-row="isDialog"
      @current-change="clickCurrentChange"
      :data="list"
      height="580"
      border
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="name" label="供应商名称"> </el-table-column>
      <el-table-column prop="linkman" label="联系人"> </el-table-column>
      <el-table-column prop="mobile" label="联系电话" v-if="!isDialog">
      </el-table-column>
      <el-table-column prop="remark" label="备注" v-if="!isDialog">
      </el-table-column>
      <el-table-column label="操作" width="150" v-if="!isDialog">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      :layout="
        !isDialog ? 'total, sizes, prev, pager, next, jumper' : ' prev,next'
      "
      :total="total"
    >
    </el-pagination>
    <el-dialog
      v-if="!isDialog"
      title="供应商编辑"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <el-form
        :model="pojo"
        ref="pojoForm"
        label-width="100px"
        label-position="right"
        style="width: 400px"
        :rules="rules"
      >
        <el-form-item label="供应商名单" prop="name">
          <el-input v-model="pojo.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="linkman">
          <el-input v-model="pojo.linkman" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile">
          <el-input v-model="pojo.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            v-model="pojo.remark"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <!-- <el-button type="primary" @click="addData('pojoForm')">确 定</el-button> -->
        <el-button
          type="primary"
          @click="
            pojo.id === null ? addData('pojoForm') : updateData('pojoForm')
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>


<script>
import supplierApi from "@/api/supplier";
export default {
  props: {
    //接受父组件传递来的数据，通过isDialog来判断 是否为弹框
    //如果为true就是弹框，否则是列表
    isDialog: Boolean,
  },
  data() {
    return {
      list: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      searchMap: {
        name: "",
        linkman: "",
        mobile: "",
        remark: "",
      },
      dialogFormVisible: false,
      pojo: {
        id: null,
        name: "",
        linkman: "",
        mobile: "",
        remark: "",
      },
      rules: {
        name: [{ required: true, message: "供应商不能为空", trigger: "blur" }],
        linkman: [
          { required: true, message: "联系人不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      supplierApi
        .search(this.currentPage, this.pageSize, this.searchMap)
        .then((response) => {
          const resp = response.data;
          this.list = resp.data.rows;
          this.total = resp.data.total;
          console.log(resp);
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //提交新增数据
    addData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(111);
          supplierApi.add(this.pojo).then((response) => {
            const resp = response.data;
            if (resp.flag) {
              this.fetchData();
              this.dialogFormVisible = false;
            } else {
              this.$message({
                message: resp.message,
                type: "warning",
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    //弹出新增窗口
    handleAdd() {
      //this.pojo = {};
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["pojoForm"].resetFields();
      });
    },
    handleEdit(id) {
      console.log("编辑" + id);
    },
    //编辑
    handleEdit(id) {
      console.log("修改", id);
      this.handleAdd();
      supplierApi.getById(id).then((response) => {
        const resp = response.data;
        if (resp.flag) {
          this.pojo = resp.data;
        }
      });
    },
    updateData(formName) {
      console.log(`updateData`);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //提交更新
          supplierApi.update(this.pojo).then((response) => {
            const resp = response.data;
            if (resp.flag) {
              //刷新列表
              this.fetchData();
              this.dialogFormVisible = false;
            } else {
              this.$message({
                message: resp.message,
                type: "warning",
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    handleDelete(id) {
      console.log("删除", id);
      this.$confirm("确定删除这条记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          supplierApi.deleteById(id).then((response) => {
            const resp = response.data;
            if (resp.flag) {
              this.fetchData();
              this.$message({
                type: "success",
                message: resp.message,
              });
            } else {
              this.$message({
                type: "error",
                message: resp.message,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消成功",
          });
        });
    },
    clickCurrentChange(currentRow) {
      console.log(currentRow);
      this.$emit("option-supplier", currentRow);
    },
  },
};
</script>