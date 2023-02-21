<!--定义banner列表-->
<template>
  <div class="app-container">
    医院设置列表
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="医院名称">
        <el-input v-model="searchObj.hosname" placeholder="医院名称"/>
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="searchObj.hoscode" placeholder="医院编号"/>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
    </el-form>
    <!-- 工具条 -->
    <div>
      <el-button type="danger" size="mini" @click="removeRows()">批量删除</el-button>
    </div>
    <el-table
      :data="list"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column
        type="index"
        label="序号"
        width="50"/>
      <el-table-column
        prop="hosname"
        label="医院名称"
        width="180"/>
      <el-table-column
        prop="hoscode"
        label="医院编号"/>
      <el-table-column
        prop="apiUrl"
        label="api基础路径"
        width="200"/>
      <el-table-column
        prop="contactsName"
        label="联系人姓名"/>
      <el-table-column
        prop="contactsPhone"
        label="联系人手机"/>
      <el-table-column
        label="状态"
        width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? '可用' : '不可用' }}
        </template>
      </el-table-column>
      <!-- 删除列 -->
      <el-table-column
        label="操作"
        width="280"
        align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)">删除
          </el-button>
          <el-button
            v-if="scope.row.status==1"
            type="primary"
            size="mini"
            @click="lockHospitalSet(scope.row.id, 0)">锁定
          </el-button>
          <el-button
            v-if="scope.row.status==0"
            type="danger"
            size="mini"
            @click="lockHospitalSet(scope.row.id, 1)">取消锁定
          </el-button>
        </template>
      </el-table-column>
      <!-- 删除按钮 -->
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page.sync="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="prev, pager, next, jumper"
      @current-change="getList"/>
  </div>
</template>

<script>
// TODO 引入接口定义的文件中导出的方法  使用别名来引入，然后再用.来调用方法居然不行？
import { getHospSetList, deleteHospSet, batchHospSet, lockHospSet } from '@/api/hospset'

export default {
  // 定义变量和初始值
  data() {
    return {
      current: 1, // 当前页
      limit: 3, // 每页显示记录数
      searchObj: {}, // 条件对象
      list: [], // 每页数据集合
      total: 0, // 总记录数
      multipleSelection: []
    }
  },
  created() {
    // 页面渲染之前执行，一般用于调用methods定义的方法，得到数据
    this.getList()
  },
  methods: {// 定义方法,请求接口调用

    // 批量删除时 得到复选框中的id列表
    handleSelectionChange(selection) {
      this.multipleSelection = selection // 赋值给multipleSElection,但里面包含了很多信息，要从中取出id值
    },
    // 批量删除医院信息的方法
    removeRows() {
      // 弹出确认框
      this.$confirm('此操作将永久删除医院设置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 确定则执行下面逻辑
        var idList = [] // 存放id值
        // 遍历数组得到每个id值，设置到idList数组里面
        for (var i = 0; i < this.multipleSelection.length; i++) {
          var obj = this.multipleSelection[i]
          var id = obj.id
          idList.push(id)
        }
        // 接口调用
        batchHospSet(idList)
          .then(response => {
            // 提示
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
            // 刷新页面】
            this.getList()
          })
      })
    },

    // 医院设置列表的方法
    getList(page = 1) { // page默认为1
      this.current = page
      getHospSetList(this.current, this.limit, this.searchObj)
        .then(response => { // 请求成功 response是接口返回的数据
          this.list = response.data.records// 返回集合赋予list
          this.total = response.data.records.total // 总记录数
          console.log(response)
        })
        .catch(error => { // 请求失败
          console.log(error)
        })
    },
    // 删除医院设置的方法
    removeDataById(id) {
      // 弹出确认框
      this.$confirm('此操作将永久删除医院设置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 确定就执行then方法
        deleteHospSet(id) // 调用删除接口
          .then(response => { // 删除接口返回一个删除成功的提示
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 刷新页面 即再查询一次列表，默认查第一页
            this.getList()
          })
      })
    },
    // 锁定和取消锁定
    lockHospitalSet(id, status) {
      console.log('获取到的id:' + id)
      lockHospSet(id, status)
        .then(response => {
          // 刷新页面
          this.getList()
        })
        .catch(error => {
          console.log(error)
        })
    }
    // 添加医院设置信息

  }
}
</script>

