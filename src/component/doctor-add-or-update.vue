<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="dataForm.name" placeholder="姓名"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-input v-model="dataForm.sex" placeholder="性别"></el-input>
    </el-form-item>
    <el-form-item label="出生日期" prop="birthday">
      <el-input v-model="dataForm.birthday" placeholder="出生日期"></el-input>
    </el-form-item>
    <el-form-item label="身份证号" prop="identity">
      <el-input v-model="dataForm.identity" placeholder="身份证号"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="iphone">
      <el-input v-model="dataForm.iphone" placeholder="手机号"></el-input>
    </el-form-item>
    <el-form-item label="挂号费" prop="fare">
      <el-input v-model="dataForm.fare" placeholder="挂号费"></el-input>
    </el-form-item>
    <el-form-item label="基本介绍" prop="introduction">
      <el-input v-model="dataForm.introduction" placeholder="基本介绍"></el-input>
    </el-form-item>
    <el-form-item label="隶属科室" prop="departmentId">
      <el-input v-model="dataForm.departmentId" placeholder="隶属科室"></el-input>
    </el-form-item>
    <el-form-item label="照片" prop="avatar">
      <el-input v-model="dataForm.avatar" placeholder="照片"></el-input>
    </el-form-item>
    <el-form-item label="员工编号" prop="workerNo">
      <el-input v-model="dataForm.workerNo" placeholder="员工编号"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          name: '',
          sex: '',
          birthday: '',
          identity: '',
          iphone: '',
          fare: '',
          introduction: '',
          departmentId: '',
          avatar: '',
          workerNo: ''
        },
        dataRule: {
          name: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '性别不能为空', trigger: 'blur' }
          ],
          birthday: [
            { required: true, message: '出生日期不能为空', trigger: 'blur' }
          ],
          identity: [
            { required: true, message: '身份证号不能为空', trigger: 'blur' }
          ],
          iphone: [
            { required: true, message: '手机号不能为空', trigger: 'blur' }
          ],
          fare: [
            { required: true, message: '挂号费不能为空', trigger: 'blur' }
          ],
          introduction: [
            { required: true, message: '基本介绍不能为空', trigger: 'blur' }
          ],
          departmentId: [
            { required: true, message: '隶属科室不能为空', trigger: 'blur' }
          ],
          avatar: [
            { required: true, message: '照片不能为空', trigger: 'blur' }
          ],
          workerNo: [
            { required: true, message: '员工编号不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/hospital_summer/doctor/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.name = data.doctor.name
                this.dataForm.sex = data.doctor.sex
                this.dataForm.birthday = data.doctor.birthday
                this.dataForm.identity = data.doctor.identity
                this.dataForm.iphone = data.doctor.iphone
                this.dataForm.fare = data.doctor.fare
                this.dataForm.introduction = data.doctor.introduction
                this.dataForm.departmentId = data.doctor.departmentId
                this.dataForm.avatar = data.doctor.avatar
                this.dataForm.workerNo = data.doctor.workerNo
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/hospital_summer/doctor/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'name': this.dataForm.name,
                'sex': this.dataForm.sex,
                'birthday': this.dataForm.birthday,
                'identity': this.dataForm.identity,
                'iphone': this.dataForm.iphone,
                'fare': this.dataForm.fare,
                'introduction': this.dataForm.introduction,
                'departmentId': this.dataForm.departmentId,
                'avatar': this.dataForm.avatar,
                'workerNo': this.dataForm.workerNo
              })
            }).then(({data}) => {
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
  }
</script>
