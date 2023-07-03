<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="科室名称" prop="name">
      <el-input v-model="dataForm.name" placeholder="科室名称"></el-input>
    </el-form-item>
    <el-form-item label="科室介绍" prop="introduction">
      <el-input v-model="dataForm.introduction" placeholder="科室介绍"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class Component extends Vue {
  visible: boolean = false
  dataForm: any = {
    id: 0,
    name: '',
    introduction: ''
  }
  dataRule: any = {
    name: [{
      required: true,
      message: '科室名称不能为空',
      trigger: 'blur'
    }],
    introduction: [{
      required: true,
      message: '科室介绍不能为空',
      trigger: 'blur'
    }]
  }
  init(id) {
    this.dataForm.id = id || 0
    this.visible = true
    this.$nextTick(() => {
      (this.$refs['dataForm'] as any).resetFields()
      if (this.dataForm.id) {
        this.$http({
          url: this.$http.adornUrl(`/hospital_summer/department/info/${this.dataForm.id}`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            this.dataForm.name = data.department.name
            this.dataForm.introduction = data.department.introduction
          }
        })
      }
    })
  }
  dataFormSubmit() {
    (this.$refs['dataForm'] as any).validate(valid => {
      if (valid) {
        this.$http({
          url: this.$http.adornUrl(`/hospital_summer/department/${!this.dataForm.id ? 'save' : 'update'}`),
          method: 'post',
          data: this.$http.adornData({
            'id': this.dataForm.id || undefined,
            'name': this.dataForm.name,
            'introduction': this.dataForm.introduction
          })
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.visible = false
                this.$emit('refreshDataList')
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }
    })
  }
}
</script>
