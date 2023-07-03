<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('hospital_summer:consultingroom:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('hospital_summer:consultingroom:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        label="主键">
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="诊室名称">
      </el-table-column>
      <el-table-column
        prop="introduction"
        header-align="center"
        align="center"
        label="诊室介绍">
      </el-table-column>
      <el-table-column
        prop="departmentId"
        header-align="center"
        align="center"
        label="所属科室id">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AddOrUpdate from './consultingroom-add-or-update'
@Component({
  components: {
    AddOrUpdate
  }
})
export default class Component extends Vue {
  dataForm: any = {
    key: ''
  }
  dataList: Array<any> = []
  pageIndex: number = 1
  pageSize: number = 10
  totalPage: number = 0
  dataListLoading: boolean = false
  dataListSelections: Array<any> = []
  addOrUpdateVisible: boolean = false
  activated() {
    this.getDataList()
  }
  getDataList() {
    this.dataListLoading = true
    this.$http({
      url: this.$http.adornUrl('/hospital_summer/consultingroom/list'),
      method: 'get',
      params: this.$http.adornParams({
        'page': this.pageIndex,
        'limit': this.pageSize,
        'key': this.dataForm.key
      })
    }).then(({
      data
    }) => {
      if (data && data.code === 0) {
        this.dataList = data.page.list
        this.totalPage = data.page.totalCount
      } else {
        this.dataList = []
        this.totalPage = 0
      }
      this.dataListLoading = false
    })
  }
  sizeChangeHandle(val) {
    this.pageSize = val
    this.pageIndex = 1
    this.getDataList()
  }
  currentChangeHandle(val) {
    this.pageIndex = val
    this.getDataList()
  }
  selectionChangeHandle(val) {
    this.dataListSelections = val
  }
  addOrUpdateHandle(id) {
    this.addOrUpdateVisible = true
    this.$nextTick(() => {
      (this.$refs.addOrUpdate as any).init(id)
    })
  }
  deleteHandle(id) {
    var ids = id ? [id] : this.dataListSelections.map(item => {
      return item.id
    })
    this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.$http({
        url: this.$http.adornUrl('/hospital_summer/consultingroom/delete'),
        method: 'post',
        data: this.$http.adornData(ids, false)
      }).then(({
        data
      }) => {
        if (data && data.code === 0) {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.getDataList()
            }
          })
        } else {
          this.$message.error(data.msg)
        }
      })
    })
  }
}
</script>
