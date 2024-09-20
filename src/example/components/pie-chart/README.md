# Pie Chart 사용방법

필요한 값을 props로 보내주면 됩니다.
  
## Attributes

### chart-data=""
    설    명 : 차트에 출력할 데이터
    타    입 : Array
    기 본 값 : () => []

### title=""
    설    명 : 차트의 제목을 나타냅니다.
    타    입 : string
    기 본 값 : ''

### legend=""
    설    명 : 차트의 범례를 나타냅니다.
    타    입 : boolean
    기 본 값 : false

<br>

## Option

### title
  차트 제목을 설정합니다

    - show: boolean, 제목을 나타내거나 숨길 수 있음
    - text: string, 타이틀에 표시될 텍스트를 지정
    - left, top, right, bottom: string 또는 숫자, 타이틀의 위치를 조정
    - textStyle: 객체, 타이틀 텍스트의 스타일을 설정
    ex) {color: '#333', fontSize: 14, fontWeifht: 'bolder'}

### dataset
  스타일별로 분리된 데이터 관리의 편의성을 제공하고, 다른 시리즈별 데이터 재사용이 가능합니다. 또 데이터에서 시각적으로 데이터 인코딩을 가능하게 하여 일부 시나리오에서 편리함을 제공합니다.

    - source: Array 또는 Object, 소스 데이터. 일반적으로 소스 데이터는 아래 형식을 적용할 수 있는 테이블을 설명함
ex)
```html
<script>
  // 첫 번째 행/열에 차원 이름을 제공하거나 제공하지 않고 데이터만 제공할 수 있는 2차원 배열
  [
    ['product', '2015', '2016', '2017'],
    ['Matcha Latte', 43.3, 85.8, 93.7],
    ['Milk Tea', 83.1, 73.4, 55.1],
    ['Cheese Cocoa', 86.4, 65.2, 82.5],
    ['Walnut Brownie', 72.4, 53.9, 39.1]
  ]
  // 행 기반 키-값 형식 (객체 배열). 여기서 키는 차원 이름을 나타냄
  [
    {product: 'Matcha Latte', count: 823, score: 95.8},
    {product: 'Milk Tea', count: 235, score: 81.4},
    {product: 'Cheese Cocoa', count: 1042, score: 91.2},
    {product: 'Walnut Brownie', count: 988, score: 76.9}
  ]
  // 열 기반 키-값 형식. 여기서 각 값은 테이블의 열을 나타냄
  {
    'product': ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie'],
    'count': [823, 235, 1042, 988],
    'score': [95.8, 81.4, 91.2, 76.9]
  }
</script>
```

### tooltip
도구 설명 구성 요소입니다. 툴팁은 다양한 위치에서 구성될 수 있습니다.

- 전역에서 구성됨: tooltip
- 좌표계로 구성됨: grid.tooltip, polar.tooltip, single.tooltip
- 시리즈로 구성됨: series.tooltip
- series.data.tooltip의 각 항목에 구성됨.

      - tirgger: string,
      1. 'item': 기본값으로, 분산형 차트나 원형 차트와 같이 범주 축이 없는 차트에 주로 사용되는 데이터 항목에 의해 트리거 됨
      2. 'axis': 막대형 차트나 꺾은선형 차트와 같이 범주 축이 있는 차트에 주로 사용되는 축별로 트리거 됨
      3. 'none': 아무것도 트리거하지 않음

### legend
범례 구성 요소입니다. 범례 구성 요소는 다양한 계열의 기호, 색상 및 이름을 표시합니다. 범례를 클릭하면 차트에 계열 표시를 전활할 수 있습니다.

    - show: boolean, 기본값은 true로 범례를 나타내거나 숨김
    - left: string 혹은 number, 범례 구성요소와 컨테이너 왼쪽 사이의 거리로 숫자는 px 값으로 입력되고 '20%', 'left', 'center', 'right'를 입력할 수 있음
    - top: string 혹은 number, 범례 구성요소와 컨테이너 상단 사이의 거리로 숫자는 px 값으로 입력되고 '20%', 'top', 'middle', 'bottom'을 입력할 수 있음
    - rigth: string 혹은 number, 범례 구성요소와 컨테이너 오른쪽 사이의 거리로 숫자는 px 값으로 입려되고 '20%'로 백분율 값 입력 가능
    - bottom: string 혹은 number, 범례 구성요소와 컨테이너 하단 사이의 거리로 숫자는 px 값으로 입력되고 '20%'로 백분율 값 입력 가능
    - selectedMode: string 혹은 boolean, 기본값은 true로 범례를 클릭하여 계열 표시를 전환할 수 있는지 여부를 제어하는 범례의 선택 모드입니다. 기본적으로 활성화 되어 있으며 false로 비활성화할 수 있습니다. 또한 단일 선택과 다중 선택을 위해 'single' 또는 'multiple'로 설정할 수 있습니다.

### series-pie
원형 차트는 주로 다양한 범주의 비율을 표시하는 데 사용됩니다. 각 호 길이는 데이터 양의 비율을 나타냅니다.

    - type: string, 'bar'으로 작성하여 bar chart를 생성
    - radius: number 혹은 string 혹은 Array, 기본값은 [0, '75%']로 원형 차트의 반경
      1. number: 외부 반경을 직접 지정
      2. string: 예를 들어, '20%'는 외부 반경이 뷰포트 크기(차트 컨테이너의 너비와 높이 사이의 작은 크기)의 20%임을 의미
      3. Array.<number | string>: 첫 번째 항목은 내부 반경을 지정하고, 두 번째 항목은 외부 반경을 지정. 각 항목은 위의 정의를 따름 (도넛 차트는 내부 반경을 설정하여 표현 가능)
    - left: string 혹은 number, 원형 차트 구성 요소와 컨테이너 왼쪽 사이의 거리로 숫자는 px 값으로 입력되고 '20%', 'left', 'center', 'right'를 입력할 수 있음
    - top: string 혹은 number, 원형 차트 구성 요소와 컨테이너 상단 사이의 거리로 숫자는 px 값으로 입력되고 '20%', 'top', 'middle', 'bottom'을 입력할 수 있음
    - rigth: string 혹은 number, 원형 차트 구성 요소와 컨테이너 오른쪽 사이의 거리로 숫자는 px 값으로 입려되고 '20%'로 백분율 값 입력 가능
    - bottom: string 혹은 number, 원형 차트 구성 요소와 컨테이너 하단 사이의 거리로 숫자는 px 값으로 입력되고 '20%'로 백분율 값 입력 가능
    - width: string 혹은 number, 기본값은 'auto'로 원형 차트 구성 요소의 너비
    - height: string 혹은 number, 기본값은 'auto'로 원형 차트 구성 요소의 높이
    - encode: object, 각 차원에 대해 인코딩되는 항목을 정의. 차원을 사용하여 특정 차원에 대한 이름을 정의하는 경우 encode 해당 이름을 직접 참조 가능
    * 인코딩의 기본 구조
    : 콜론의 왼쪽 부분은 'x', 'y', 'radius'와 같은 축 이름 'angle'  또는 "tooltip", "itemName" 등과 같은 특수 예약 이름이고 콜론의 오른쪽 부분은 차원 이름 또는 차원 인덱스(0 기준) 하나 이상의 차원을 지정 가능. 일반적으로 모든 매핑을 지정할 필요는 없으며 필요한 매핑만 지정
    - label: object, 값 혹은 이름 등과 같은 그래픽 항목에 대한 일부 데이터 정보를 설명하는 원형 차트의 텍스트 레이블

<br>

## 공식문서 링크
  https://echarts.apache.org/en/index.html