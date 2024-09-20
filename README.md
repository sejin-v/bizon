# IXI Studio Client
- Typescript, Vue3, Vitejs 기반


## 🚀 시작하기

### 요구사항
node@16 버전 이상만 가능
### 개발환경 설정
1. 프로젝트 클론
```
git clone https://github.com/ai-search/igsn-studio-client.git
```

2. pnpm 전역 설치
```
npm i -g pnpm
```

3. 의존성 패키지 설치
```
pnpm i (또는 pnpm install)
```

4. 개발 서버 실행
```
pnpm dev (또는 pnpm run dev)
```

### Build
```
pnpm build
```

## TypeScript type generator
OpenAPI(3.0 이상) 규격에 따라 자동으로 API Schema(TypeScript type)을 생성해주는 도구입니다.   
[저장소 링크](https://github.com/drwpow/openapi-typescript/tree/main/packages/openapi-typescript)  

### Why 
Front/Back 간의 API 통신 시, API 스펙에 대한 TypeScript type을 수동으로 정의해야하고, 변경될 때마다 을 수동으로 수정해야 하는 번거로움이 있습니다.   
라이브러리는 이러한 개발시간을 단축하는 목적으로 개발되었습니다.  

- OpenAPI 스펙에 따라 API Schema를 자동으로 생성해주기 때문에, API 스펙이 변경되어도 손쉽게 대응할 수 있습니다.  
- YAML 또는 JSON에서 로컬 또는 원격으로 타입을 생성할 수 있습니다.  

### @nestia/migrate
기존 프로젝트에서 사용하던 `@nestia/migrate`는 Schema 생성에 중점을 둔 라이브러리가 아닙니다.  
때문에 에러가 많았고, 해결하는데 서버인원과 시간이 많이 소요되었습니다.  
이러한 문제점을 개선하고자 새로운 라이브러리를 도입하게 되었습니다.  
아래는 기존 사용 스크립트입니다.
```bash
URL_PATH=http://192.168.0.113:29090/dsi/api/api-docs
MOCK_DIR=mock
SWAGGER_FILE_PATH=$MOCK_DIR/swagger.json
SERVER_DIR=$MOCK_DIR/server
BACKEND_DIR=src/types/backend

echo "Download swagger file from $URL_PATH"
echo "Swagger file path: $SWAGGER_FILE_PATH"
echo "Server dir: $SERVER_DIR"
echo "Backend dir: $BACKEND_DIR"

# Kill the process that is listening to port local mockserver
kill -9 $(lsof -t -i:37001)
npx rimraf --preserve-root $MOCK_DIR
npx rimraf --preserve-root $BACKEND_DIR

mkdir -p $MOCK_DIR
mkdir -p $BACKEND_DIR

curl -o $SWAGGER_FILE_PATH $URL_PATH
npx  @nestia/migrate $SWAGGER_FILE_PATH $SERVER_DIR

# Copy the backend types to the frontend
cp -r $SERVER_DIR/src/api/structures/* $BACKEND_DIR
npx eslint --fix src/types/backend
cd $SERVER_DIR
```

### 사용법
`openapi-typescript` 라이브러리가 설치되었다 가정하고, 스크립트를 보겠습니다.
```bash
# Local schema

URL_PATH=https://sc-ixistudio.dev-sp.violet.uplus.co.kr/oapidoc/server.yaml
SCHEMA_FILE_PATH=src/types/schema.d.ts
npx openapi-typescript $URL_PATH -o $SCHEMA_FILE_PATH
npx eslint --fix $SCHEMA_FILE_PATH
# 🚀 ./path/to/my/schema.yaml -> ./path/to/my/schema.d.ts [7ms]
```

스키마 생성이 완료되면 [예제](https://openapi-ts.pages.dev/introduction#basic-usage) 와 같이 생성되지만
추가로 코드를 확인하겠습니다.


```typescript
export interface paths {
    "/v1/auth/sign-in/password": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 이메일 + 패스워드로 로그인
         * @description 이메일 + 패스워드로 로그인
         */
        post: operations["authSignInPassword"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/refresh": {
        // ...
        /**
         * JWT 재발급
         * @description 아직 만료되지 않은 JWT로 유효 기간을 연장한 새 JWT를 발급
         */
        post: operations["authRefresh"];
    /// ...
  }
}

export interface operations {
    authSignInPassword: {
        parameters: {
            query?: never;
            header: {
                /** @example 3a750cfe-80a2-4ca9-9bc0-53f1b7a2b9f4 */
                "X-Request-ID": components["parameters"]["RequestId"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: components["requestBodies"]["AuthSignInPassword"];
        responses: {
            200: components["responses"]["AuthSignInPassword200"];
            default: components["responses"]["CommonError"];
        };
    };
    authRefresh: {
        parameters: {
            query?: never;
            header: {
                /** @example 3a750cfe-80a2-4ca9-9bc0-53f1b7a2b9f4 */
                "X-Request-ID": components["parameters"]["RequestId"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["AuthRefresh200"];
            default: components["responses"]["CommonError"];
        };
    };
    // ...
}
export interface components {
  schemas: {
        PageInfo: {
            /** Format: int64 */
            page: number;
            /** Format: int64 */
            size: number;
            /** Format: int64 */
            totalElements: number;
            /** Format: int64 */
            totalPages: number;
        };    
        Project: components["schemas"]["SimpleTypeProject"] | components["schemas"]["GenTypeProject"] | components["schemas"]["AgentEngineTypeProject"];
        ProjectKey: {
            id: string;
            key: string;
        };
        ProjectReqBodyBase: {
            name: string;
            description: string;
        };    
        ProjectBase: {
            name: string;
            description: string;
            key: components["schemas"]["ProjectKey"];
        };
  },
  responses: {
        CommonError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["CommonErrResBody"];
            };
        };
        /** @description 성공 */
        AuthSignInPassword200: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["AuthSignInPasswordResBody200"];
            };
        };
        /** @description 성공 */
        AuthRefresh200: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["AuthRefreshResBody200"];
            };
        };
  },
    parameters: {
        /** @example 3a750cfe-80a2-4ca9-9bc0-53f1b7a2b9f4 */
        RequestId: string;
        ListProjectQueryPage: number;
        ListProjectQuerySize: number;
        /** @description 프로젝트 이름 or 프로젝트 키 */
        ListProjectQueryQ: string;
    };
    requestBodies: {
        /** @description 이메일 + 패스워드 */
        AuthSignInPassword: {
            content: {
                "application/json": components["schemas"]["AuthSignInPasswordReqBody"];
            };
        };
        /** @description 생성할 프로젝트 */
        CreateProject: {
            content: {
                "application/json": components["schemas"]["CreateProjectReqBody"];
            };
        };
    };
}
```
위 결과를 보면, `paths`, `operations`, `components` 등의 타입이 생성되었고, 각각의 타입은 API 스펙에 따라 자동으로 생성되었습니다.  
타입을 살펴보면 `paths`(컨트롤러) -> `operations`(서비스) -> `components`(구성요소|DTO) 순으로 의존성이 있음을 알 수 있습니다.  
1. `paths`는 API 경로에 대한 타입을 정의합니다.
2. `operations`는 API 경로에 대한 요청/응답 타입을 정의합니다.
3. `components`는 요청/응답에 대한 구성요소 타입을 정의합니다.  

실제 사용시 코드를 살펴보겠습니다.  (타프로젝트 코드로 위 스키마와 다르지만 이해가 쉽습니다.)
```typescript
type CmResType = components['schemas']['ComResponseDto']
export interface IApiWrapper<T> extends Omit<CmResType, 'body'> {
  body?: T
}
// type common code post
type TCMCodePost = paths['/codes']['post']
// type common code put
type TCMCodePut = paths['/codes/{codeGroup}/{code}']['put']
// type common code get
type TCMCodeGet = paths['/codes']['get']
// type common code  get query
type TCMCodeGetQuery = TCMCodeGet['parameters']['query']
// type common code get response
type TCmCodeGetResp = IApiWrapper<
  TCMCodeGet['responses']['200']['content']['application/json']
>
```
위 코드는 `paths`, `operations`, `components` 타입을 이용하여 API 요청/응답 타입을 정의한 코드입니다.  
각각 수동으로 타입을 뒤질 필요도 없이 자동완성에 손가락을 맡깁시다..  
```typescript
interface ICommonCodeProps {
  params: TCMCodeGetQuery
  disable?: boolean
  config?: SWRConfiguration
}
export function useCommonCodeSwr({
  params,
  disable,
  config,
}: ICommonCodeProps) {
  const url = paramToQuery(BASE_URL, params)
  const { fetcherJson } = useFetcher()
  return useSWR<TCmCodeGetResp>(disable ? null : url.href, fetcherJson, {
    keepPreviousData: true,
    errorRetryCount: 3,
    ...config,
  })
}
```
위 `useCommonCodeSwr`함수는 공통 코드를 받아오는 역할을 하며, parameter(`TCMCodeGetQuery`), response(`TCmCodeGetResp`) 타입을 사용하고 있습니다.  


```typescript
export function useCommonCode() {
  const { fetcher } = useFetcher()
  return {
    post: async (
      payload: TCMCodePost['requestBody']['content']['application/json'],
    ) => {
      const response = await fetcher(BASE_URL, {
        method: 'POST',
        // headers: {
        //   Authorization: `Bearer ${await userCredential.user.getIdToken()}`,
        // },
        body: JSON.stringify(payload),
      })
      return response.ok
    },
    put: async (
      groupCode: string,
      code: string,
      payload: TCMCodePut['requestBody']['content']['application/json'],
    ) => {
      const response = await fetcher(`${BASE_URL}/${groupCode}/${code}`, {
        method: 'PUT',
        body: JSON.stringify({
          codeName: payload.codeName,
          codeValue: payload.codeValue,
          codeDescription: payload.codeDescription,
          codeIndex: payload.codeIndex,
          useYn: payload.useYn,
        }),
      })
      return response.ok
    },
  }
}
```
위 `useCommonCode`함수는 공통 코드를 생성/수정하는 역할을 하며, 마찬가지로 각각의 API 요청/응답 타입을 유추 할 수 있습니다.  

### 결론
`openapi-typescript` 라이브러리를 사용하면, 서버 API 스펙 추가/변경에 대응하는데 많은 시간을 절약할 수 있습니다.  
기존 이슈도 해결되었고, 더 나은 개발 환경을 제공할 수 있습니다.    
API 스펙에 대한 걱정 없이 생산성 증가를 기대합니다.  





