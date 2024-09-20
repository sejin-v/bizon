# Pagination 사용방법

필요한 값을 props로 보내주면 됩니다.
  
## Attributes

#### v-model=""
    설    명 : 현재 페이지
    타    입 : number
    기 본 값 : 1

#### total-count=""
    설    명 : 게시물 총 갯수
    타    입 : number
    기 본 값 : 100

#### limit=""
    설    명 : 현재 페이지에 보여질 게시물의 갯수
    타    입 : number
    기 본 값 : 20

#### limit-options=""
    설    명 : limit를 바꿀 수 있는 select의 옵션 설정
    타    입 : number[]
    기 본 값 : [50, 100]

#### max-page-shown=""
    설    명 : 보여질 pagination의 갯수
    타    입 : number
    기 본 값 : 5

#### below-limit-shown
    설    명 : totalCount가 limit보다 작을 시 pagination 숨김/표시
    타    입 : boolean
    기 본 값 : false

#### limit-options-shown
    설    명 : limit를 바꿀 수 있는 select 숨김/표시, 사용 시 Event의 change-limit와 함께 사용해야합니다.
    타    입 : boolean
    기 본 값 : false

<br>

## Event
#### @change-limit
    설    명 : 부모 component의 limit를 바꿀 수 있는 이벤트
    
    ex) const changeLimit = (newLimit: number) => console.log(newLimit)
    
