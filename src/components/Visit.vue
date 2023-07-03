<template>
  <a-space style="display: flex;">
    <a-button @click="toUpdate">update</a-button>
    <a-button @click="before">上一页</a-button>
    <a-button @click="next">下一页</a-button>
  </a-space>
  <a-table style="margin-top: 20px" :columns="columns" :data="dataList" @change="handleChange" filter-icon-align-left :loading="dataListLoading" :pagination="false" @filter-change="ifChange">
    <template #record-filter="{ filterValue, setFilterValue, handleFilterConfirm, handleFilterReset}">
      <div class="custom-filter">
        <a-space direction="vertical">
          <a-input v-model="filterValue[0]" @input="(value)=>setFilterValue([value])" />
          <div class="custom-filter-footer">
            <a-button @click="handleFilterConfirm">Confirm</a-button>
            <a-button @click="handleFilterReset">Reset</a-button>
          </div>
        </a-space>
      </div>
    </template>
    <template #optional="{ record }">
      <div class="record-btn">
        <a-button @click="toDelete(record)">delete</a-button>
      </div>
    </template>
    <template #btn>
      <a-button>新增</a-button>
    </template>
  </a-table>
  <a-drawer :width="500" :visible="visible" @ok="handleOk" @cancel="handleCancel" unmountOnClose style="display:flex;">
    <template #title>
      修改
    </template>
    <a-form :model="form">
      <a-form-item field="id" label="id">
        <a-input 
          style="width: 250px"
          v-model="form.id" 
          placeholder="please enter id"/>
      </a-form-item>
      <a-form-item field="doctorName" label="doctorName">
        <a-input 
          style="width: 250px"
          v-model="form.doctorName"
          placeholder="please enter doctorName"/>
      </a-form-item>
      <a-form-item field="doctorId" label="doctorId">
        <a-input
          style="width: 250px"
          v-model="form.doctorId"
          placeholder="please enter doctorId"
        />
      </a-form-item>
      <a-form-item field="visitTimeSlot" label="visitTimeSlot">
        <a-input
          style="width: 250px"
          v-model="form.visitTimeSlot"
          placeholder="please enter visitTimeSlot"
        />
      </a-form-item>
      <a-form-item field="visitTime" label="visitTime">
        <a-input
          style="width: 250px"
          v-model="form.visitTime"
          placeholder="please enter visitTime"
        />
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script lang="ts" setup>
import { reactive, h, ref } from 'vue';
import { IconSearch } from '@arco-design/web-vue/es/icon';
import { onMounted } from 'vue';
import { Notification } from "@arco-design/web-vue";
import axios from 'axios';
const baseUrl = import.meta.env.VITE_APP_DEV_BASE_URL;

const dataList = reactive<any>([]);

const findKey = reactive({});
const pageIndex = ref(1);
const pageSize = ref(8);
const totalPage = ref(0);
const dataListLoading = ref(false);

onMounted(() => {
  getData();
});

const visible = ref(false);
const form = reactive({
  id: '0',
  doctorName: '张一',
  doctorId: '1',
  visitTimeSlot: '2023-07-01T02:00:00.000+00:00',
  visitTime: '2023-07-01T02:00:00.000+00:00',
});
const columns = [
      {
        title: 'id',
        dataIndex: 'id',
      },
      {
        title: 'doctorName',
        dataIndex: 'doctorName',
        slotName: 'doctorName',
        filterable: {
          slotName: 'record-filter',
          icon: () => h(IconSearch)
        }
      },
      {
        title: 'doctorId',
        dataIndex: 'doctorId',
        slotName: 'doctorId',
        filterable: {
          slotName: 'record-filter',
          icon: () => h(IconSearch)
        }
      },
      {
        title: 'visitTimeSlot',
        dataIndex: 'visitTimeSlot',
        slotName: 'visitTimeSlot',
        filterable: {
          slotName: 'record-filter',
          icon: () => h(IconSearch)
        }
      },
      {
        title: 'visitTime',
        dataIndex: 'visitTime',
        slotName: 'visitTime',
        filterable: {
          slotName: 'record-filter',
          icon: () => h(IconSearch)
        }
      },
      {
        title: 'Optional',
        slotName: 'optional'
      }
    ];

async function getData(){
  dataListLoading.value = true;
  await axios({
    baseURL: baseUrl,
    url: `/hospital_summer/visit/list`,
    method: "GET",
    timeout: 2000,
    params: {
      page: pageIndex.value,
      limit: pageSize.value,
      key: "",
    },
  }).then(({ data }) => {
    dataList.length = 0;
    if (data && data.code === 0) {
      data.page.list.forEach((e: visit, index: number) => {
        dataList[index] = e;
      });
      totalPage.value = data.page.totalCount/pageSize.value;
      console.log(data.page.totalCount);
    } else {
      totalPage.value = 0;
    }
    dataListLoading.value = false;
  });
  console.log(dataList);
}

const toDelete = async (record:any) => {
  console.log(record);
  let res = await axios({
    baseURL: baseUrl,
    url: `/hospital_summer/visit/delete`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: [record.id]
  })
  console.log(res);
  await getData();
}

const handleChange = (data, extra) => {
  

  console.log(findKey);
}
const toUpdate = () => {
  visible.value = true;
} 
const handleOk = async () => {
  console.log(form);
  await axios({
      baseURL: baseUrl,
      url: `/hospital_summer/visit/${
        !form.id ? "save" : "update"
      }`,
      headers: {
        "Content-Type": "application/json",
      },
      method: "Post",
      data: {
        id: form.id || undefined,
        doctorName: form.doctorName,
        doctorId: form.doctorId,
        visitTimeSlot: form.visitTimeSlot,
        visitTime: form.visitTime,
      },
    }).then(async ({ data }) => {
      console.log("data:" + data);
      if (data && data.code === 0) {
        Notification.success({
          content: "操作成功",
        });
        await getData();
        visible.value = false;
      } else {
        Notification.error(data.msg);
      }
    })

};
const handleCancel = () => {
  visible.value = false;
}

const before = () => {
  if(pageIndex.value <= 1){
    Notification.error({
      content: "已经是第一页了",
    });
    return;
  }
  pageIndex.value--;
  getData();
}

const next = () => {
  if(pageIndex.value >= totalPage.value){
    Notification.error({
      content: "已经是最后一页了",
    });
    return;
  }
  pageIndex.value++;
  getData();
}

</script>
<style>
.custom-filter {
  padding: 20px;
  background: var(--color-bg-5);
  border: 1px solid var(--color-neutral-3);
  border-radius: var(--border-radius-medium);
  box-shadow: 0 2px 5px rgb(0 0 0 / 10%);
}

.custom-filter-footer {
  display: flex;
  justify-content: space-between;
}

</style>