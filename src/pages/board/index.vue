<script setup lang="ts">
import Notice from './components/Notice.vue'
import Faq from './components/Faq.vue'

const activeTab = ref('notice')
</script>

<template>
  <div class="box--fff">
    <h2 class="title">게시판</h2>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="공지사항" name="notice">
        <Notice />
      </el-tab-pane>
      <el-tab-pane label="FAQ" name="faq">
        <Faq />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
