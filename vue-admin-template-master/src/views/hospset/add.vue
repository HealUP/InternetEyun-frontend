<template>
  <div class="app-container">
    医院设置添加
    <el-form label-width="120px">
      <el-form-item label="医院名称">
        <el-input v-model="hospitalSet.hosname"/>
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="hospitalSet.hoscode"/>
      </el-form-item>
      <el-form-item label="api基础路径">
        <el-input v-model="hospitalSet.apiUrl"/>
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-input v-model="hospitalSet.contactsName"/>
      </el-form-item>
      <el-form-item label="联系人手机">
        <el-input v-model="hospitalSet.contactsPhone"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
      <div/>
    </el-form>
  </div>
</template>

<script>
import { saveHospSet, getHospSet, updateHospSet } from '@/api/hospset'
export default {
  data() {
    return {
      hospitalSet: {} // 双向绑定 一种情况是由表单输入对象的属性，存到该对象中，
      // 另一种情况是，当调用编辑接口时，由隐藏路由跳转到新增信息页面，从隐藏路由的id值中查到数据后，赋值给当前的对象，回显数据
    }
  },
  created() { // 页面渲染之前执行 回显数据
    // 调用接口根据id 查询得到医院设置信息
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id // 获取路由id值
      this.getHospitalSet(id) // 调用方法，根据id查询医院设置信息
    } else { // 没有id的话将表单数据清空，否则点击新增功能时会显示有数据
      this.hospitalSet = {}
    }
  },
  methods: {
    // 根据id查询
    getHospitalSet(id) {
      getHospSet(id)
        .then(response => {
          this.hospitalSet = response.data
        })
    },
    // 添加功能
    save() {
      saveHospSet(this.hospitalSet)
        .then(response => {
          // 提示
          this.$message({
            type: 'success',
            message: '添加成功！'
          })
          // 跳转,路由跳转方式 路径跳到路径
          this.$router.push({ path: '/hospSet/list' })
        })
    },
    // 修改功能
    update() {
      updateHospSet(this.hospitalSet)
        .then(response => {
          // 提示
          this.$message({
            type: 'success',
            message: '修改成功！'
          })
          // 跳转,路由跳转方式 路径跳到路径
          this.$router.push({ path: '/hospSet/list' })
        })
    },
    // 做判断添加还是修改，如果可以从hospitalSet取出值的，说明是修改，反之是添加功能
    saveOrUpdate() {
      // saveHospSet(this.hospitalSet)
      if (!this.hospitalSet.id) { // 如果没有id 是添加操作
        this.save()
      } else { // 有id, 是修改操作
        this.update()
      }
    }
  }
}
</script>
