// import ARadialLoading from "./components/ARadialLoading"
interface ImportMetaEnv {
  readonly VITE_API_CONTEXT_PATH: string
  readonly VITE_ENV_LOGGER: string
  readonly VITE_ICON_SRC_PATH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// declare module '@vue/runtime-core' {
//   export interface GlobalComponents {
//     // ARadialLoading: typeof ARadialLoading,
//   }
// }