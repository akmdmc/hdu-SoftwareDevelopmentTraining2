<template>
  <!-- <a-space direction="vertical" size="medium" fill>
    <a-descriptions :data="data" title="User Info" :column="1"></a-descriptions>
  </a-space>
  <a-form :model="form" :style="{ width: '40vw' }" @submit="handleSubmit">
    <a-form-item field="name" tooltip="Please enter username" label="Username">
      <a-input
        v-model="form.name"
        placeholder="please enter your username..."
      />
    </a-form-item>
    <a-form-item field="post" label="Post">
      <a-input v-model="form.post" placeholder="please enter your post..." />
    </a-form-item>
    <a-form-item field="isRead">
      <a-checkbox v-model="form.isRead"> I have read the manual </a-checkbox>
    </a-form-item>
    <a-form-item>
      <a-button html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form> -->
</template>

<script lang="ts" setup>
// import { reactive, onMounted } from "vue";
// import { useRouter, type LocationQueryValue } from "vue-router";
// import { onBeforeMount } from "vue/dist/vue.js";
// const router = useRouter();
// const form = reactive({
//   doctorName: "",
//   doctorId: "",
//   isRead: false,
// });
// onBeforeMount(() => {
//   console.log(Object.keys(router.currentRoute.value.query));
//   Object.keys(router.currentRoute.value.query).forEach((key) => {
//     data.push({
//       label: key,
//       value: router.currentRoute.value.query[key],
//     });
//   });
// });
</script>
<style>
 .body{
    display: flex;
 }
</style>
