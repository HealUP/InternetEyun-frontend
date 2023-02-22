<template>
  <div class="app-container">
    <el-table
      :data="list"
      :load="getChildrens"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      lazy>
      <el-table-column
        label="名称"
        sortable
        align="left"
        width="230">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="编码"
        width="220">
        <template slot-scope="{ row }">
          <span>{{ row.dictCode }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="值"
        width="230"
        align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.value }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="创建时间"
        align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { dictList } from '@/api/dict'
export default {
  data() {
    return {
      list: [] // 数据字典的列表数组
    }
  },
  created() { // 页面渲染前执行，这里用于获取数据
    this.getDistList(1) // 默认获取 id为1的数据
  },
  methods: {
    // 数据字典列表
    getDistList(id) {
      dictList(id)
        .then(response => {
          this.list = response.data
        })
    },
    // 获取孩子
    getChildrens(tree, treeNode, resolve) { // 查询下面层级的内容
      dictList(tree.id).then(response => {
        resolve(response.data)
      })
    }
  }
}

</script>

