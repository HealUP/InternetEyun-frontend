<template>
  <div class="app-container">
    医院设置列表
  </div>
</template>

<script>
// TODO 引入接口定义的文件中导出的方法  使用别名来引入，然后再用.来调用方法居然不行？
import { getHospSetList } from '@/api/hospset'

export default {
  // 定义变量和初始值
  data() {
    return {
      current: 1, // 当前页
      limit: 3, // 每页显示记录数
      searchObj: {},
      list: [] // 每页数据集合
    }
  },
  created() {
    // 页面渲染之前执行，一般用于调用methods定义的方法，得到数据
    this.getList()
  },
  methods: {// 定义方法,请求接口调用
    // 医院设置列表的方法
    getList() {
      getHospSetList(this.current, this.limit, this.searchObj)
        .then(response => { // 请求成功 response是接口返回的数据
          console.log(response)
        })
        .catch(error => { // 请求失败
          console.log(error)
        })
    }

  }
}
</script>

