# Custom Input 사용방법

필요한 값을 props로 보내주면 됩니다.
  
## Attributes


#### v-model=""
    설    명 : input에 입력되는 문자열
    타    입 : string
    기 본 값 : ''

#### type
    설    명 : input에 type을 지정합니다. (현재 text, number, password 가능)
    타    입 : string
    기 본 값 : 'text'

#### width=""
    설    명 : input의 넓이를 조절할 수 있습니다. (%)
    타    입 : string
    기 본 값 : '100'

#### maxlength=""
    설    명 : input에 입력되는 문자열의 길이를 제한할 수 있습니다.
    타    입 : string
    기 본 값 : ''

#### prefix-icon=""
    설    명 : input 앞에 삽입 될 아이콘
    타    입 : string
    기 본 값 : ''

#### placeholder=""
    설    명 : input의 placeholder
    타    입 : string
    기 본 값 : ''

#### valid-message=""
    설    명 : input 하단에 나타나는 문자열
    타    입 : string
    기 본 값 : ''

#### readonly
    설    명 : input를 읽기 전용으로 전환합니다.
    타    입 : boolean
    기 본 값 : false

#### disabled
    설    명 : input를 비활성화 상태로 전환합니다.
    타    입 : boolean
    기 본 값 : false

#### useShowPassword
    설    명 : password 보이기/숨기기 아이콘이 나타납니다.
    타    입 : boolean
    기 본 값 : false

#### useComma
    설    명 : type이 number일 때 1000단위 마다 콤마가 찍힙니다.
    타    입 : boolean
    기 본 값 : false

#### use-count
    설    명 : maxlength가 지정되어 있을 때 input에 입력된 문자열의 길이를 나타냅니다. 
    타    입 : boolean
    기 본 값 : false

#### use-Delete
    설    명 : input의 값을 모두 비우는 버튼 활성화 
    타    입 : boolean
    기 본 값 : false

<br>

## Event
#### @blur
    설    명 : input에서 focus가 벗어났을 때 발생하는 이벤트
  
#### @focus
    설    명 : input에 focus 되었을 때 발생하는 이벤트
    