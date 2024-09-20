# Toast 사용방법

toast를 사용하는 곳에서 openToast 함수를 사용하면 됩니다.
  
## 사용 예시

1. 예제를 위한 버튼을 생성하고 이벤트를 부여합니다.
```html
<template>
    <el-button @click="handleToast">
    toast
  </el-button>
</template>
```

2. parameter 보낼 옵션을 지정하고 이벤트와 연결된 함수의 실행문 안에서  openToast 함수를 사용합니다.
```html
<script>

const options: MessageOptions = {
  message: 'toast 예제입니다.',
  type: undefined, // undefined, 'success', 'warning', 'error' 중 선택 가능
  showClose: true,
}

const handleToast = () => {
  openToast(options)
}

</script>
```

3. 옵션 종류
    1. message: text, toast에 나타낼 메시지를 입력합니다.
    2. type: text, toast의 색상에 따른 종류를 지정합니다
      - undefined, 'info' : 일반 메시지 (회색)
      - 'success': 성공 메시지 (초록색)
      - 'warning': 주의 메시지 (노란색)
      - 'error': 오류/실패 메시지 (빨간색)
    3. showClose: boolean, toast를 바로 닫을 수 있는 X(닫기) 버튼의 활성화 여부를 결정합니다.
      - false: 닫기 버튼이 나타나지 않습니다.
      - true: 닫기 버튼을 나타냅니다.