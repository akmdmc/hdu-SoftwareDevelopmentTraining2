<template>
  <a-space style="display: flex;">
    <a-button @click="toUpdate">update</a-button>
    <a-button @click="before">上一页</a-button>
    <a-button @click="next">下一页</a-button>
  </a-space>
  <a-table style="margin-top: 20px" :columns="columns" :data="dataList" @change="handleChange" filter-icon-align-left :loading="dataListLoading" :pagination="false" row-class="row">
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
      <a-form-item field="name" label="name">
        <a-input 
          style="width: 250px"
          v-model="form.name" 
          placeholder="please enter name"/>
      </a-form-item>
      <a-form-item field="birthday" label="birthday">
        <a-input 
          style="width: 250px"
          v-model="form.birthday" 
          placeholder="please enter birthday"/>
      </a-form-item>
      <a-form-item field="identity" label="identity">
        <a-input 
          style="width: 250px"
          v-model="form.identity" 
          placeholder="please enter identity"/>
      </a-form-item>
      <a-form-item field="iphone" label="iphone">
        <a-input 
          style="width: 250px"
          v-model="form.iphone" 
          placeholder="please enter iphone"/>
      </a-form-item>
      <a-form-item field="fare" label="fare">
        <a-input 
          style="width: 250px"
          v-model="form.fare" 
          placeholder="please enter fare"/>
      </a-form-item>
      <a-form-item field="introduction" label="introduction">
        <a-input 
          style="width: 250px"
          v-model="form.introduction" 
          placeholder="please enter introduction"/>
      </a-form-item>
      <a-form-item field="departmentId" label="departmentId">
        <a-input 
          style="width: 250px"
          v-model="form.departmentId" 
          placeholder="please enter departmentId"/>
      </a-form-item>
      <a-form-item field="avatar" label="avatar">
        <a-input 
          style="width: 250px"
          v-model="form.avatar" 
          placeholder="please enter avatar"/>
      </a-form-item>
      <a-form-item field="workerNo" label="workerNo">
        <a-input 
          style="width: 250px"
          v-model="form.workerNo" 
          placeholder="please enter workerNo"/>
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
const where = "doctor";
const findKey = reactive({});
const pageIndex = ref(1);
const pageSize = ref(8);
const totalPage = ref(0);
const dataListLoading = ref(false);

onMounted(() => {
  getData();
});
interface doctor {
  id:number,
  name:string,
  sex:string,
  birthday:date,
  identity:string,
  iphone:string,
  fare:number,
  introduction:string,
  departmentId:number,//隶属科室
  avatar:string,
  workerNo:number
}
const visible = ref(false);
const form = reactive({
  id: '0',
  name: '张一',
  sex:'女',
  birthday:'1992-02-01T16:00:00.000+00:00',
  identity:'234567890123456789',
  iphone:'13912345678',
  fare:'60',
  introduction:'医生介绍',
  departmentId:'2',//隶属科室
  avatar:'https://img95.699pic.com/xsj/1f/i5/2w.jpg%21/fw/700/watermark/url/L3hzai93YXRlcl9kZXRhaWwyLnBuZw/align/southeast',
  workerNo:'1002',
});
const columns = [
      {
        title: 'id',
        dataIndex: 'id',
      },
      {
        title: 'name',
        dataIndex: 'name',
        slotName: 'name',
        height: 10,
        filterable: {
          slotName: 'record-filter',
          icon: () => h(IconSearch)
        }
      },
      {
        title: 'sex',
        dataIndex: 'sex',
        slotName: 'sex',
        height: 10,
        filterable: {
          slotName: 'record-filter',
          icon: () => h(IconSearch)
        }
      },
      {
        title: 'birthday',
        dataIndex: 'birthday',
        slotName: 'birthday',
        height: 10,
        filterable: {
          slotName: 'record-filter',
          icon: () => h(IconSearch)
        }
      },
      {
        title: 'identity',
        dataIndex: 'identity',
        slotName: 'identity',
        height: 10,
        filterable: {
          slotName: 'record-filter',
          icon: () => h(IconSearch)
        }
      },
      {
        title: 'iphone',
        dataIndex: 'iphone',
        slotName: 'iphone',
        height: 10,
        filterable: {
          slotName: 'record-filter',
          icon: () => h(IconSearch)
        }
      },
      {
        title: 'fare',
        dataIndex: 'fare',
        slotName: 'fare',
        height: 10,
        filterable: {
          slotName: 'record-filter',
          icon: () => h(IconSearch)
        }
      },
      {
        title: 'introduction',
        dataIndex: 'introduction',
        slotName: 'introduction',
        height: 10,
        filterable: {
          slotName: 'record-filter',
          icon: () => h(IconSearch)
        }
      },
      {
        title: 'departmentId',
        dataIndex: 'departmentId',
        slotName: 'departmentId',
        height: 10,
        filterable: {
          slotName: 'record-filter',
          icon: () => h(IconSearch)
        }
      },
      {
        title: 'avatar',
        dataIndex: 'avatar',
        slotName: 'avatar',
        height: 10,
        filterable: {
          slotName: 'record-filter',
          icon: () => h(IconSearch)
        }
      },
      {
        title: 'workerNo',
        dataIndex: 'workerNo',
        slotName: 'workerNo',
        height: 10,
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
    url: `/hospital_summer/${where}/list`,
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
      data.page.list.forEach((e: doctor, index: number) => {
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
    url: `/hospital_summer/${where}/delete`,
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
      url: `/hospital_summer/${ where }/${
        !form.id ? "save" : "update"
      }`,
      headers: {
        "Content-Type": "application/json",
      },
      method: "Post",
      data: {
        id: form.id || undefined,
        name: form.name,
        sex: form.sex,
        birthday: form.birthday,
        identity: form.identity,
        iphone: form.iphone,
        fare: form.fare,
        introduction: form.introduction,
        departmentId: form.departmentId,//隶属科室
        avatar: form.avatar,
        workerNo: form.workerNo,
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

.row{
  white-space: nowrap;
}

</style>