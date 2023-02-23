<template>
  <div class="app-container">
    <div class="el-toolbar">
      <div class="el-toolbar-body" style="justify-content: flex-start;">
        <el-button type="text" @click="exportData"><i class="fa fa-plus"/>导出</el-button>
        <el-button type="text" @click="importData"><i class="fa fa-plus"/> 导入</el-button>
      </div>
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

      <el-dialog :visible.sync="dialogImportVisible" title="导入" width="480px">
        <el-form label-position="right" label-width="170px">

          <el-form-item label="文件">
            <el-upload
              :multiple="false"
              :on-success="onUploadSuccess"
              :action="'http://localhost:8202/admin/cmn/dict/importData'"
              class="upload-demo">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogImportVisible = false">
            取消
          </el-button>
        </div>
      </el-dialog>
    </div>
</div></template>

<script>
import { dictList } from '@/api/dict'
export default {
  data() {
    return {
      dialogImportVisible: false, // 弹框
      list: [] // 数据字典的列表数组
    }
  },
  created() { // 页面渲染前执行，这里用于获取数据
    this.getDistList(1) // 默认获取 id为1的数据
  },
  methods: {
    // 导入数据字典
    importData() {
      this.dialogImportVisible = true
    },
    // 上传成功时调用这个方法
    onUploadSuccess() {
      this.dialogImportVisible = false
      // 并刷新页面，即调用查数据的方法
      this.getDistList(1)
    },
    // 导出数据字典
    exportData() {
      // 调出导出接口
      window.location.href = 'http://localhost:8202/admin/cmn/dict/exportData'
    },
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

