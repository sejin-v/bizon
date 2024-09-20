# Confirm & alert 사용방법

모달을 사용하는 부모컴포넌트에서 <Modal/>을 불러오면 됩니다.
 
  
## 사용 예시

1. 하나의 객체를 생성합니다.

```html
 <script setup lang="ts">
const exameple ={
  content: '삭제하시겠습니까?', // content부분에 들어가는 내용을 적어주세요.(필수값)
  title: '알림창', // title 부분에 들어가는 내용을 적어주세요. 만약 title이 없다면,content 부분만 나옵니다.
  hideCancelButton: false, // cancelbutton 숨기는기능, false를 선택하면 취소버튼이 나오고 true를 선택하면 취소버튼이 사라집니다.
  confirmButtonText: '확인', // 확인 버튼 텍스트 입니다.
  cancelButtonText: '취소', // 취소 버튼 텍스트 입니다.
}
</script>
```

2. 실행하려는 함수 안에 openConfirm(example)을 입력해줍니다.

```html
<script>

const information = {
  content: '삭제하시겠습니까?', 
  title: '알림창', 
  hideCancelButton: false, 
  confirmButtonText: '확인', 
  cancelButtonText: '취소', 
}

const handleConfirm = () => {
  openConfirm(information).then(() => {
  }) 
}
</script>

<template>
  <div>
    <p>
      <el-button @click="handleConfirm">
        Confirm 열기
      </el-button>
    </p>
  </div>
</template>
<style scoped></style>
```
 

<br>
 