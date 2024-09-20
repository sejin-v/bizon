# Modal 사용방법
  
## 사용 예시

모달컴포넌트를 사용하는 부모 컴포넌트

```html
<script setup lang="ts">
import Modal from '~/example/components/modal/index.vue'

const modalShow = ref<boolean>(true)

const openModal = () => {
  modalShow.value = true
}

const handleCancel = () => { // 자식에서 emit으로 받아오는 event를 실행하기 위해 만든 함수
  modalShow.value = false
}

const handleConfirm = () => { // 자식에서 emit으로 받아오는 event를 실행하기 위해 만든 함수
  modalShow.value = false
}

const titleName = ref('타이틀이름') // 모달에서 사용할 타이틀 이름을 적어주세요.
</script>

<template>
  <button @click="openModal">
    모달 열기
  </button>
  <Modal v-model="modalShow" 
  :close-on-click-modal="true" 
  true의 경우 모달 외 부분을 클릭하면 창이 꺼집니다. 
  false의 경우 모달 외 부분을 클릭하면 창이 꺼지지 않습니다.
  
  :title="titleName" >
  모달에 들어가는 타이틀을 변수로 넣어줄 수 있습니다.
  

    <template #content>
      모달의 content 부분에 들어갈 내용을 적어주세요.
    </template>
    <template #footer>
      footer 부분의 경우는 버튼이 들어가는 부분 입니다.
      <button @click="handleCancel">
        취소
      </button>
     <button @click="handleConfirm">
        확인
      </button>
    </template>
  </Modal>
</template>

<style scoped></style>

```

<br>
 



## Attributes
#### align-center
    설    명 : 모달 화면을 수평 및 수직으로 정렬할 수 있습니다.
    타    입 : boolean
    기 본 값 : false
#### close-on-click-modal	
    설    명 : 모달 외 부분을 클릭하여 모달을 닫을 수 있습니다.
    타    입 : boolean
    기 본 값 : true

#### close-on-press-escape	
    설    명 : ESC키를 클릭하여 모달을 닫을 수 있습니다.
    타    입 : boolean
    기 본 값 : true
 
#### draggable		
    설    명 : 드래그 기능 활성화
    타    입 : boolean
    기 본 값 : false

#### destroy-on-close	
    설    명 : 모달 창이나 팝업 창이 자주 열리고 닫히는 경우, 창을 닫을 때마다 메모리를 해제하여 리소스를 효율적으로 관리할 수 있습니다. 하지만 창을 열 때마다 초기화해야 하는 경우에는 "false"로 설정하여 창을 파괴하지 않고 유지할 수 있습니다.
    타    입 : boolean
    기 본 값 : false
 
#### before-close
    설    명 : 이 이벤트는 모달 창을 닫기 전에 호출되며, 모달이 닫히기 직전에 사용자 정의 로직을 실행할 수 있는 기회를 제공합니다. "before-close" 이벤트 핸들러를 사용하면 모달이 닫히기 전에 일부 동작을 수행하거나 닫기를 막을 수 있습니다.
    타    입 : boolean
    기 본 값 : 
 