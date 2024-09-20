<script setup lang="ts">
import { HOLIDAY_API_KEYS } from '~/example/types/enums/custom-datepicker'

const axiosResponseData = ref()

const requestAxios = async () => {
  try {
    const res = await request({
      method: 'GET',
      url: HOLIDAY_API_KEYS.URL,
      params: {
        serviceKey: HOLIDAY_API_KEYS.KEY,
        solYear: 2023,
        numOfRows: 100,
      },
      meta: {
        useProgress: true,
      },
    })
    axiosResponseData.value = res
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="p-20">
    <el-button type="primary" @click="requestAxios">
      API Request
    </el-button>
    <div class="mt-5">
      <h1 :style="{ fontSize: '20px' }">
        API Response
      </h1>
      <div class="mt-3" :style="{
      width: '1000px',
      height: '100%',
      border: 'solid 1px',
    }">
        {{ axiosResponseData }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
