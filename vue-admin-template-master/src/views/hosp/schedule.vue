<template>
  <div class="app-container">
    <div style="margin-bottom: 10px;font-size: 10px;">选择：</div>
    <el-container style="height: 100%">
      <el-aside width="200px" style="border: 1px silver solid">
        <!-- 部门 -->
        <el-tree
          :data="data"
          :props="defaultProps"
          :default-expand-all="true"
          @node-click="handleNodeClick"/>
      </el-aside>
      <el-main style="padding: 0 0 0 20px;">
        <el-row style="width: 100%">
          <!-- 排班日期 分页 -->
        </el-row>
        <el-row style="margin-top: 20px;">
          <!-- 排班日期对应的排班医生 -->
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getSchedulByHoscode } from '@/api/hosp'
export default {
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children', // 下级节点字段
        label: 'depname' // 大科室名称字段
      },
      hoscode: null
    }
  },
  created() { // 页面渲染之前执行 获取数据
    this.hoscode = this.$route.params.hoscode // 从当前设置的隐藏路由中获取hoscode值
    this.fetchData()
  },
  methods: {
    // 查询科室列表
    fetchData() {
      getSchedulByHoscode(this.hoscode)
        .then(response => {
          this.data = response.data
        })
    }
  }
}
</script>

<style>
  .el-tree-node.is-current > .el-tree-node__content {
    background-color: #409EFF !important;
    color: white;
   }

  .el-checkbox__input.is-checked+.el-checkbox__label {
    color: black;
   }
</style>
