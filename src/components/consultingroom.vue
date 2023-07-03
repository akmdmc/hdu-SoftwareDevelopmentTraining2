<template>
  <div class="mod-config">
    <a-form
      :inline="true"
      :model="dataForm"
      @keyup.enter.native="getDataList()"
    >
      <a-form-item>
        <a-input
          v-model="dataForm.key"
          placeholder="参数名"
          clearable
        ></a-input>
      </a-form-item>
      <a-form-item>
        <a-button @click="getDataList()">查询</a-button>
        <a-button
          @click="
            addOrUpdateHandle({
              id: 0,
              name: '',
              introduction: '',
              departmentId:'',
            })
          "
          :style="{ marginLeft: '20px' }"
          type="primary"
          >新增</a-button
        >
      </a-form-item>
    </a-form>
    <a-modal
      :visible="deleteModel.visible"
      @ok="deleteModel.handleOk()"
      @cancel="deleteModel.handleCancel()"
      okText="确定"
      cancelText="取消"
      unmountOnClose
    >
      <template #title> 提示 </template>
      <div>您确定要删除吗？</div>
    </a-modal>
    <a-table
      :columns="columns"
      :data="dataList"
      :loading="dataListLoading"
      :pagination="false"
      style="width: 100%"
    >
      <template #optional="{ record }">
        <a-button type="text" size="small" @click="addOrUpdateHandle(record)"
          >修改</a-button
        >
        <a-button
          type="text"
          size="small"
          @click="
            (e) => {
              deleteModel.visible = true;
              deleteModel.nowSelectId = record.id;
            }
          "
          >删除</a-button
        >
      </template>
    </a-table>
    <!-- 弹窗, 新增 / 修改 -->
    <a-drawer
      :width="440"
      :visible="updateOrAddDrawer.visible"
      @ok="updateOrAddDrawer.handleOk"
      @cancel="updateOrAddDrawer.handleCancel"
      unmountOnClose
    >
      <template #title>
        {{ !updateOrAddDrawer.nowSelectId ? "新增" : "修改" }}
      </template>
      <div>
        <a-form
          :model="updateOrAddDrawer.departmentData"
          ref="dataForm"
          laba-width="80px"
        >
          <a-form-item label="诊室名称" prop="name">
            <a-input
              v-model="updateOrAddDrawer.departmentData.name"
              placeholder="诊室名称"
            ></a-input>
          </a-form-item>
          <a-form-item label="诊室介绍" prop="introduction">
            <a-input
              v-model="updateOrAddDrawer.departmentData.introduction"
              placeholder="诊室介绍"
            ></a-input>
          </a-form-item>
          <a-form-item label="所属科室id" prop="departmentId">
            <a-input
              v-model="updateOrAddDrawer.departmentData.departmentId"
              placeholder="所属科室id"
            ></a-input>
          </a-form-item>
        </a-form>
      </div>
    </a-drawer>

    <a-pagination
      v-model:current="pageIndex"
      :page-size="pageSize"
      :total="totalPage"
      show-jumper
      @change="pageChange()"
      class="pagination"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from "vue";
import { consultingRoom } from "../interface/consultingRoom";
import { Notification } from "@arco-design/web-vue";
import axios from "axios";

const columns = [
  {
    title: "主键",
    dataIndex: "id",
  },
  {
    title: "诊室名称",
    dataIndex: "name",
  },
  {
    title: "诊室介绍",
    dataIndex: "introduction",
  },
  {
    title: "所属科室id",
    dataIndex: "departmentId",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

const dataForm = reactive({
  key: "",
});

const dataList = reactive<consultingRoom[]>([]);

const pageIndex = ref(1);
const pageSize = ref(8);
const totalPage = ref(0);
const dataListLoading = ref(false);
const dataListSelections = reactive<consultingRoom[]>([]);
const addOrUpdateVisible = ref(false);

getDataList();

// 获取数据列表
async function getDataList() {
  dataListLoading.value = true;

  await axios({
    baseURL: import.meta.env.VITE_APP_DEV_BASE_URL,
    url: `/hospital_summer/consultingroom/list`,
    method: "GET",
    timeout: 2000,
    params: {
      page: pageIndex.value,
      limit: pageSize.value,
      key: dataForm.key,
    },
  }).then(({ data }) => {
    dataList.length = 0;
    if (data && data.code === 0) {
      data.page.list.forEach((e: consultingRoom, index: number) => {
        dataList[index] = e;
      });
      totalPage.value = data.page.totalCount;
      console.log(totalPage.value);
    } else {
      totalPage.value = 0;
    }
    dataListLoading.value = false;
  });
}

function pageChange() {
  getDataList();
}

const updateOrAddDrawer = reactive({
  nowSelectId: 0,
  visible: false,
  handleCancel: () => {
    updateOrAddDrawer.visible = false;
  },
  handleOk: async () => {
    updateOrAddDrawer.visible = false;
    await updateOrAddDrawer.dataFormSubmit();
  },
  // 表单提交
  dataFormSubmit: async () => {
    await axios({
      baseURL: import.meta.env.VITE_APP_DEV_BASE_URL,
      url: `/hospital_summer/consultingroom/${
        !updateOrAddDrawer.departmentData.id ? "save" : "update"
      }`,
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      data: {
        id: updateOrAddDrawer.departmentData.id || undefined,
        name: updateOrAddDrawer.departmentData.name,
        introduction: updateOrAddDrawer.departmentData.introduction,
      },
    }).then(({ data }) => {
      if (data && data.code === 0) {
        Notification.success({
          content: "操作成功",
        });
        deleteModel.visible = false;
      } else {
        Notification.error(data.msg);
      }
    });
  },
  departmentData: {
    id: 0,
    name: "",
    introduction: "",
    departmentId:'',
  },
});

// 新增 / 修改
function addOrUpdateHandle(record: consultingRoom) {
  updateOrAddDrawer.visible = true;
  updateOrAddDrawer.nowSelectId = record.id;
  updateOrAddDrawer.departmentData = record;
}

const deleteModel = reactive({
  nowSelectId: 0,
  visible: false,
  handleCancel: () => {
    deleteModel.visible = false;
  },
  handleOk: () => {
    deleteModel.visible = false;
    deleteHandle(deleteModel.nowSelectId);
  },
});
// 删除
async function deleteHandle(id: number) {
  var ids = id
    ? [id]
    : dataListSelections.map((item) => {
        return item.id;
      });
  await axios({
    baseURL: import.meta.env.VITE_APP_DEV_BASE_URL,
    url: "/hospital_summer/consultingroom/delete",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    data: ids,
  }).then(({ data }) => {
    console.log(data);
    if (data && data.code === 0) {
      Notification.success("操作成功");
      getDataList();
    } else {
      Notification.error(data.msg);
    }
  });
}
</script>

<style scoped>
.pagination {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
</style>
