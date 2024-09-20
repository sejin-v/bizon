# Line Chart 사용방법

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
    타    입 : string
    기 본 값 : ''

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

### grid
직사각형 좌표로 그리드를 그립니다. 단일 그리드에서는 각각 최대 2개의 X 및 Y 축이 허용됩니다. 꺾은선형 차트, 막대형 차트, 분산형 차트 (버블 차트)를 그리드로 그릴 수 있습니다.

    - top: string 혹은 number, 기본값은 60으로 그리드 구성요소와 컨테이너 상단 사이의 거리. 숫자는 px로 입력되고 '20%'와 같이 컨테이너 너비에 대한 백분율 값 혹은 'top', 'middle', 'bottom' 입력 가능
    - bottom: string 혹은 number, 기본값은 60으로 그리드 구성요소와 컨테이너 하단 사이의 거리. 숫자는 px로 입력되고 '20%'와 같이 컨테이너 너비에 대한 백분율 값 입력 가능
    - left: string 혹은 number, 기본값은 '10%'으로 그리드 구성요소와 컨테이너 왼쪽 사이의 거리. 숫자는 px로 입력되고 '20%', 'left', 'center', 'right' 입력 가능
    - rigth: string 혹은 number, 기본값은 '10%'으로 그리드 구성요소와 컨테이너 오른쪽 사이의 거리. 숫자는 px로 입력되고 '20%'와 같이 컨테이너 너비에 대한 백분율 값 입력 가능
    - width: string 혹은 number, 기본값은 'auto'로 그리드 구성요소의 너비
    - height: string 혹은 number, 기본값은 'auto'로 그리드 구성요소의 높이

### xAxis
직사각형 좌표의 x축입니다. 일반적으로 단일 그리드 구성요소는 최대 2개의 x축(하단에 하나, 상단에 하나)을 배치 할 수 있습니다. 두 개 이상의 x축을 배치해야 할 때 겹치는 것을 방지하기 위해 오프셋을 사용할 수 있습니다.

    - type: string, 기본값은 'category'로 축 유형을 뜻함
    1. 'value': 연속 데이터에 적합한 수치 축
    2. 'category': 개별 범주 데이터에 적합한 범주 축 (카테고리 데이터는 series.data 또는 dataset.source에서 자동으로 검색하거나 xAxis.data를 통해 지정 가능)
    3. 'time': 연속 시계열 데이터에 적합한 시간 축. 값 축에 비해 시간 형식이 더 좋고 틱 계산 방법이 다름 (예를 들어, 범위에 따라 틱에 월, 주, 일 또는 시간을 사용하도록 결정함)
    4. 'log': 로그 데이터에 적합한 로그 축
    - axisLabel: object, 축 라벨과 관련된 설정

### yAxis
직사각형 좌표의 y축입니다. 일반적으로 단일 그리드 구성요소는 최대 2개의 y축(왼쪽에 하나, 오른쪽에 하나)을 배치 할 수 있습니다. 두 개 이상의 y축을 배치해야 할 때 겹치는 것을 방지하기 위해 오프셋을 사용할 수 있습니다.

    - type: string, 기본값은 'value'로 축 유형을 뜻함
    1. 'value': 연속 데이터에 적합한 수치 축
    2. 'category': 개별 범주 데이터에 적합한 범주 축 (카테고리 데이터는 series.data 또는 dataset.source에서 자동으로 검색하거나 xAxis.data를 통해 지정 가능)
    3. 'time': 연속 시계열 데이터에 적합한 시간 축. 값 축에 비해 시간 형식이 더 좋고 틱 계산 방법이 다름 (예를 들어, 범위에 따라 틱에 월, 주, 일 또는 시간을 사용하도록 결정함)
    4. 'log': 로그 데이터에 적합한 로그 축
    - axisLabel: object, 축 라벨과 관련된 설정

### series-lines
선 그래프. "from"과 "to"에 대한 정보로 라인 데이터를 그리는 데 사용됩니다. 항공 노선을 지도에 그리는 데 적용되어 이러한 노선을 시각화합니다.

    - type: string, 'line'으로 작성하여 line chart를 생성
    - name: string, 툴팁에 표시하고 범례로 필터링 하거나 데이터 및 구성을 업데이트하는 데 사용되는 시리즈 이름
    - encode: object, 각 차원에 대해 인코딩되는 항목을 정의. 차원을 사용하여 특정 차원에 대한 이름을 정의하는 경우 encode 해당 이름을 직접 참조 가능.
    * 인코딩의 기본 구조
    : 콜론의 왼쪽 부분은 'x', 'y', 'radius'와 같은 축 이름 'angle'  또는 "tooltip", "itemName" 등과 같은 특수 예약 이름이고 콜론의 오른쪽 부분은 차원 이름 또는 차원 인덱스(0 기준) 하나 이상의 차원을 지정 가능. 일반적으로 모든 매핑을 지정할 필요는 없으며 필요한 매핑만 지정
    - itemStyle: object, 파선의 기호점 스타일

<br>

## 공식문서 링크
  https://echarts.apache.org/en/index.html