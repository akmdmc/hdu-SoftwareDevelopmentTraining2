<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router";
import { ref } from "vue";

const identity = ref("管理员")
</script>

<template>
  <div class="container">
    <a-layout
      :style="{
        width: '90%',
      }"
    >
      <a-layout-header>
        <div class="menu">
          <a-menu mode="horizontal" :default-selected-keys="['1']">
            <a-menu-item
              key="0"
              :style="{ padding: 0, marginRight: '38px' }"
              disabled
            >
              <div
                :style="{
                  width: '80px',
                  height: '30px',
                  borderRadius: '2px',
                  background: 'blue',
                  color:'white',
                  cursor: 'pointer',
                }"
              >
              {{identity}}
              </div>
            </a-menu-item>
            <a-menu-item key="1"
              ><RouterLink to="/visit">visit</RouterLink></a-menu-item
            >
            <a-menu-item key="2"
              ><RouterLink to="/doctor">doctor</RouterLink></a-menu-item
            >
            <a-menu-item key="3"
              ><RouterLink to="/department">department</RouterLink></a-menu-item
            >
            <a-menu-item key="4"
              ><RouterLink to="/consultingroom"
                >consultingroom</RouterLink
              ></a-menu-item
            >
          </a-menu>
        </div></a-layout-header
      >
      <a-layout-content>
        <a-card
          :style="{ width: '100%', minHeight: '600px', marginTop: '20px' }"
        >
          <RouterView></RouterView> </a-card
      ></a-layout-content>
    </a-layout>
  </div>
</template>

<style scoped>
.container {
  width: 80vw;
  min-height: 700px;
  background-color: rgb(242, 243, 245);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
}
.container :deep(.arco-layout-header),
.container :deep(.arco-layout-footer),
.container :deep(.arco-layout-sider-children),
.container :deep(.arco-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-stretch: condensed;
  text-align: center;
}

.container :deep(.arco-layout-header),
.container :deep(.arco-layout-footer) {
  height: 64px;
  /* background-color: var(--color-primary-light-4); */
}
.container :deep(.arco-layout-content) {
  height: 800px;
  /* background-color: rgb(var(--arcoblue-6)); */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
