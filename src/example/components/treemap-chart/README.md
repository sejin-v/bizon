# Treemap Chart 사용방법

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

### series-treemap
트리맵은 "계층적 데이터" 또는 "트리 데이터"를 표시하는 일반적인 방법입니다. 주로 [나무]의 모든 계층에서 중요한 노드를 면적으로 강조 표시합니다.

    예) 
    1. 시각적 매핑: 트리맵은 숫자 값을 영역에 매핑 또한 데이터의 일부 차원은 색상, 색상 밝기 등과 같은 다른 시각적 채널에 매핑 가능
    2. 드릴 다운: 트리 노드를 클릭하면 이 노드가 루트로 설정되고 해당 하위 노드가 표시 됨 (leafDepth가 설정 되면 이 기능이 횔성화 됨)
    * 드릴다운에 대한 예
    - 다른 구성 요소와 마찬가지로 left/top/bottom/right/width/height를 사용하여 트리 맵을 위치시킵니다.
    - 구성 항목 루트를 일시적으로 사용할 수 없습니다. 사용자는 트리 맵을 확대하여 작은 하위 또는 깊은 하위 항목을 볼 수 있거나 leafDepth를 사용하여 "드릴다운" 기능을 활성화할 수 있습니다.
    - series-treemap.levels는 모든 레벨을 정의하는 데 사용됩니다.

<br>

    - type: string, 'treemap'으로 작성하여 treemap chart를 생성
    - data: 아래 예시 참고
ex) 
```html
<script>
[
  {
    value: 1212,
    children: [
      {
        value: 2323,
        id: 'someid-1',
        name: 'description of this node',
        children: [...],
        label: {
          ...
        }
      },
      {
        value: 4545,
        id: 'someid-2',
        name: 'description of this node',
        children: [
          {
            value: 5656,
            id: 'someid-3',
            name: 'description of this node',
            children: [...]
          },
          ...
        ]
      }
    ]
  },
  {
    value: [23, 59, 12]
  }
]
/* 
- data.value: number 혹은 Array, 영역 크기를 나타내는 이 노드의 값입니다. 또한 배열의 첫 번째 항목이 영역 크기를 나타내는 [2323, 43, 55]와 같은 배열일 수도 있습니다. 배열의 다른 항목은 추가 시각적 매핑에 사용될 수 있습니다.
- data.id: string, 필수는 아니나 API를 사용하는 경우 id를 사용하여 노드를 찾습니다.
- data.name: string, 설명 텍스트를 직사각형으로 표시합니다.
- data.visualDimension: number, treemap 데이터의 모든 차원을 시각적으로 매핑할 수 있습니다. series.data의 값은 배열일 수 있고 배열의 각 항목은 "차원"을 나타냅니다. visualDimension 시각적 매핑이 수해오딜 차원을 지정합니다.
(series.levels의 각배열 요소에 나타날 수 있으며 트리의 각 수준에 대한 통합 설정을 나타냅니다.)
(series.data의 각 노드에 나타날 수 있으며 각 노드의 특정 설멍을 나타냅니다.)
* 더 자세한 사항은 공식문서를 참고하세요.
*/
</script>
```
    - roam: boolean 혹은 string, 기본값은 true로 드래그 로밍(이동 및 확대/축소)을 활성화할지 여부
      1. false: 로밍 비활성화
      2. 'scale' 또는 'zoom': 확대/축소만 가능
      3. 'move' 또는 'pan': 이동만 가능
      4. true: 확대/축소, 이동 모두 가능
    - nodeClick: boolean 혹은 string, 기본값은 'zoomToNode'로 노드를 클리갈 때의 동작
      1. false: 클릭한 후에 아무 작업도 수행하지 않음
      2. 'zoomToNode': 클릭한 노드를 확대/축소
      3. 'link': 노드 데이터에 '링크'가 있는 경우 클릭 후 하이퍼링크 점프 
    - breadcrumb: object, 현재의 노드 경로를 표시
    - leafDepth: number, 기본값은 null/undefined로 "드릴 다운"이 비활성화 되어 있음.이 설정을 하면 "드릴다운" 기능 활성화. 즉, 트리 노드를 클릭하면 이 노드가 루트로 설정되고 해당 하위 항목이 표시 됨. leafDepth는 최대 몇 개의 레벨이 표시되는지 나타냄
    - label: object, 각 노드의 레이블 스타일을 설명 (treemap에서 label 속성은 둘 이상의 위치에 나타날 수 있음)
      1. 이는 시리즈의 통합 설정을 나타내는 series에 나타날 수 있음
      2. series.levels의 각 배열 요소에 나타날 수 있으며 트리의 각 수준에 대한 통합 설정을 나타냄
      3. series.data의 각 노드에 나타날 수 있으며 각 노드의 특정 설정을 나타냄
    - levels: Array, 다중 레벨 구성. 
    트리맵은 4단계 구성을 채택함 "each node" --> "each level" --> "each series"
    즉, 각 노드를 구성하거나 트리의 각 수준을 구성하거나 각 계열에 대한 전체 구성을 설정할 수 있음. 가장 높은 우선순위는 노드 구성
예)
```html
<script>
data: [
    {
        name: 'nodeA',
        children: [
            {name: 'nodeAA'},
            {name: 'nodeAB'},
        ]
    },
    {
        name: 'nodeB',
        children: [
            {name: 'nodeBA'}
        ]
    }
],
levels: [
    {...}, // 데이터 구조의 최상위 레벨 구성
        // (위에 표시된 'nodeA', 'nodeB'를 포함하는 수준)
    {...}, // 다음 단계의 구성
        // (위에 표시된 'nodeAA', 'nodeAB', 'nodeBA'를 포함하는 수준)
    {...}, // 또 다음 단계의 구성
    ...
]
</script>
```


<br>

## 공식문서 링크
  https://echarts.apache.org/en/index.html