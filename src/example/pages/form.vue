<script setup lang="ts">
import CustomInput from '~/components/CustomInput.vue'
import CustomTextarea from '~/example/components/custom-textarea/CustomTextarea.vue'

// select
import type { IOptions, ITreeData } from '~/example/types/select-box'
import TreeSelectBox from '~/example/components/select-box/TreeSelectBox.vue'
import mockTreeData from '~/example/mock/selectTreeData.js'
import mockOptions from '~/example/mock/options.js'

const form = {
  input: 'Hi~ this is example',
  textarea: 'Hi~ this is example',
  checkbox1: 'Y',
  checkbox2: '',
  radio: 'A',
}

const chatValue = ref<string>('')
const chatAttachmentValue = ref<string>('')

const chatInputState = ref<string>('READY')

const sendChatMessage = () => {
  chatInputState.value = 'LOADING'
}
const sendChatFile = () => {
  chatInputState.value = 'LOADING'
}

// select
const options = ref<IOptions[]>(mockOptions)
const treeData = ref<ITreeData[]>(mockTreeData)

const noData = ref()
const initData = ref(3)
const initMultiData = ref([1, 2])
const initTreeData = ref('1-1-1')
</script>

<template>
  <div class="p-20">
    <h2 class="text-3xl font-semibold">
      Form
    </h2>
    <!-- input -->
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        input
      </mark>
      <div class="form">
        <label class="form__label">Basic</label>
        <div class="flex gap-3 w-full">
          <CustomInput v-model="form.input" max-length="10" placeholder="10글자 내로 입력하세요." size="sm" />
          <CustomInput v-model="form.input" max-length="10" placeholder="10글자 내로 입력하세요." />
          <CustomInput v-model="form.input" max-length="10" placeholder="10글자 내로 입력하세요." size="lg" />
        </div>
      </div>
      <div class="form">
        <label class="form__label">Use delete btn</label>
        <CustomInput v-model="form.input" placeholder="내용을 입력하세요." use-delete />
      </div>
      <div class="form">
        <label class="form__label">Disabled</label>
        <CustomInput v-model="form.input" max-length="10" placeholder="10글자 내로 입력하세요." disabled />
      </div>
      <div class="form">
        <label class="form__label">Readonly</label>
        <CustomInput v-model="form.input" max-length="10" placeholder="10글자 내로 입력하세요." readonly />
      </div>
      <div class="form">
        <label class="form__label--required">Error</label>
        <CustomInput v-model="form.input" placeholder="내용을 입력하세요." valid-message="입력하신 내용을 확인해주세요." />
      </div>
    </div>
    <hr>

    
    <hr>

    <!-- textarea -->
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        textarea
      </mark>
      <div class="form">
        <label class="form__label">Basic</label>
        <CustomTextarea v-model="form.textarea" max-length="20" placeholder="20자 내로 설명을 입력해주세요." />
      </div>
      <div class="form">
        <label class="form__label">Disabled</label>
        <CustomTextarea v-model="form.textarea" max-length="20" placeholder="20자 내로 설명을 입력해주세요." disabled />
      </div>
      <div class="form">
        <label class="form__label">Readonly</label>
        <CustomTextarea v-model="form.textarea" max-length="20" placeholder="20자 내로 설명을 입력해주세요." readonly />
      </div>
      <div class="form">
        <label class="form__label--required">Error</label>
        <CustomTextarea v-model="form.textarea" max-length="20" placeholder="20자 내로 설명을 입력해주세요."
          valid-message="입력하신 내용을 확인해주세요." />
      </div>
    </div>
    <hr>

    <!-- select -->
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        select
      </mark>
      <div class="form">
        <label class="form__label">Basic</label>
        <div class="flex gap-3 w-full">
          <basic-select-box v-model="noData" :options="options" size="sm" placeholder="선택하세요" />
          <basic-select-box v-model="initData" :options="options" />
          <basic-select-box v-model="initData" :options="options" size="lg" />
        </div>
      </div>
      <div class="form">
        <label class="form__label">Disabled</label>
        <basic-select-box v-model="initData" :options="options" disabled />
      </div>
      <div class="form">
        <label class="form__label">Readonly</label>
        <basic-select-box v-model="initData" :options="options" readonly />
      </div>
      <!-- <div class="form">
        <label class="form__label">chip</label>
        <basic-select-box v-model="initMultiData" :options="options" multiple clearable />
      </div>
      <div class="form">
        <label class="form__label">Tree</label>
        <TreeSelectBox v-model="initTreeData" :tree-data="treeData" />
      </div> -->
    </div>
    <hr>

    <!-- checkbox -->
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        checkbox
      </mark>
      <div class="form">
        <label class="form__label">Basic</label>
        <el-checkbox v-model="form.checkbox1" true-value="Y" false-value="N">
          A
        </el-checkbox>
        <el-checkbox v-model="form.checkbox2" true-value="Y" false-value="N">
          B
        </el-checkbox>
      </div>
      <div class="form">
        <label class="form__label">Disabled</label>
        <el-checkbox v-model="form.checkbox1" true-value="Y" false-value="N" disabled>
          A
        </el-checkbox>
        <el-checkbox v-model="form.checkbox2" true-value="Y" false-value="N" disabled>
          B
        </el-checkbox>
      </div>
    </div>
    <hr>

    <!-- radio -->
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        radio
      </mark>
      <div class="form">
        <label class="form__label">Basic</label>
        <el-radio-group v-model="form.radio">
          <el-radio value="A">
            A
          </el-radio>
          <el-radio value="B">
            B
          </el-radio>
        </el-radio-group>
      </div>
      <div class="form">
        <label class="form__label">Disabled</label>
        <el-radio-group v-model="form.radio" disabled>
          <el-radio value="A">
            A
          </el-radio>
          <el-radio value="B">
            B
          </el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
