import type { Delta } from '@vueup/vue-quill'
import type { CONTENT_TYPE, THEME_TYPE, TOOLBAR_TYPE } from '~/types/enums/editor'

export interface IEditorProps {
  toolbar?: TOOLBAR_TYPE | ObjectConstructor | ArrayConstructor
  theme?: THEME_TYPE
  readOnly?: boolean
  content?: string | Delta
  placeholder?: string
  contentType?: CONTENT_TYPE
}
