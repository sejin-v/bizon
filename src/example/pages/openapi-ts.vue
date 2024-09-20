<template>
  <div class="p-20">
    <h2 class="text-3xl font-semibold">OpenAPI</h2>
    <!-- btn__primary -->
    <div class="my-10">
      <mark
        class="inline-block mb-5 text-xl font-bold bg-purple-200 px-3 py-1 rounded-lg"
      >
        OpenAPI 사용 설명서(node 20.x 이상 권장)
      </mark>
      <div class="mb-10">
        <h1 class="text-2xl mb-4">OpenAPI 타입 생성기 주요 기능</h1>
        <ul>
          <li class="mb-3">
            <span class="text-purple-700 font-semibold">✅</span> 이 도구는
            다음과 같은 주요 기능을 제공합니다:
          </li>
          <li class="mb-3">
            <span class="text-purple-700 font-semibold">✅</span> OpenAPI 3.0 및
            3.1 지원: 디스크리미네이터와 같은 고급 기능도 지원합니다.
          </li>
          <li class="mb-3">
            <span class="text-purple-700 font-semibold">✅</span> 런타임 프리
            타입 생성: 기존 코드 생성 방식보다 성능이 뛰어납니다.
          </li>
          <li class="mb-3">
            <span class="text-purple-700 font-semibold">✅</span> YAML 또는 JSON
            스키마 로드: 로컬 또는 원격으로 스키마를 로드할 수 있습니다.
          </li>
          <li class="mb-3">
            <span class="text-purple-700 font-semibold">✅</span> 대용량
            스키마에 대한 빠른 타입 생성: 심지어 거대한 스키마도 밀리초 내에
            타입을 생성할 수 있습니다.
          </li>
        </ul>
      </div>
      <pre class="bg-gray-100 rounded-lg p-4 mb-10">
        <code class="text-purple-700">
          사용법

          `openapi-typescript` 라이브러리가 설치되었다 가정하고, 스크립트를 보겠습니다.

          Local schema

          //dash 또는 terminal
          
          URL_PATH=https://sc-ixistudio.dev-sp.violet.uplus.co.kr/oapidoc/server.yaml
          SCHEMA_FILE_PATH=src/types/schema.d.ts
          npx openapi-typescript $URL_PATH -o $SCHEMA_FILE_PATH
          npx eslint --fix $SCHEMA_FILE_PATHㅊ


          🚀 ./path/to/my/schema.yaml -> ./path/to/my/schema.d.ts [7ms]
        </code>
      </pre>
      <p class="text-lg mb-6">
        <span class="text-purple-700 font-semibold"
          >OpenAPI 스키마 타입 생성:</span
        ><br />
        npx openapi-typescript $URL_PATH -o $SCHEMA_FILE_PATH 명령어를
        실행합니다.<br />
        $URL_PATH는 OpenAPI 스키마 파일의 URL 경로입니다.<br />
        $SCHEMA_FILE_PATH는 생성된 TypeScript 타입 파일의 저장 경로입니다.<br />
        이 명령어를 통해 OpenAPI 3.0 또는 3.1 스키마를 사용하여 런타임 프리
        TypeScript 타입을 생성할 수 있습니다.
      </p>
      <p class="text-lg">
        <span class="text-purple-700 font-semibold"
          >ESLint로 코드 자동 수정:</span
        ><br />
        npx eslint --fix 명령어를 실행합니다.<br />
        이 명령어는 방금 생성된 TypeScript 타입 파일의 코드 스타일과 문법을
        자동으로 수정해 줍니다.<br />
        수정된 타입 파일의 경로는 $SCHEMA_FILE_PATH에 지정됩니다.<br />
        이렇게 하면 OpenAPI 스키마를 TypeScript 타입으로 변환하고, 생성된 타입
        파일의 코드 품질을 자동으로 개선할 수 있습니다.
      </p>
    </div>
    <h1 class="text-2xl mb-4">TypeScript 프로젝트에서 사용방법</h1>
    <pre class="bg-gray-100 rounded-lg p-4 mb-10">
        <code class="text-purple-700">
          import { paths } from '~/types/schema';

          type TProjectsGet = paths["/api/v1/projects"]["get"];
          type TProjectListResponse = TProjectsGet['responses']['200']['content']['application/json'];
          type TProjectSearchPrams = TProjectsGet['parameters']['query']

          const getProjectList = async (params: TProjectSearchPrams) => {
            try {
              const res = await request&lt;TProjectListResponse&gt;({
                method: 'GET',
                url: '/projects',
                params,
              })
              return res
            }
            catch (error) {
              console.error(error)
            }
          }
          
          ============================================================

          또 이와같이 시작지점이 달라도 결과는 같은 타입을 보도록 지정 할 수 있습니다.

          type TProjectSearchPrams = TProjectsGet['parameters']['query']
          type TProjectSearchPramsUseOperations = operations['listProject']['parameters']['path']
              
          결과

          query?: {
            lastProjectId?: components["parameters"]["ListProjectQueryLastProjectId"];
            size?: components["parameters"]["ListProjectQuerySize"];
            /** @description 프로젝트 이름 or 프로젝트 키 */
            q?: components["parameters"]["ListProjectQueryQ"];
          };

          ============================================================
        </code>
      </pre>
    <p>* 사용 방법의 예시일 뿐 실제 사용과는 거리가 있을 수 있습니다.<br /></p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
pre {
  font-size: 16px;
}

code {
  font-size: 14px;
}
</style>
