import type { UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.directive('click-outside', {
    beforeMount(el, binding) {
      el.clickOutsideEvent = function (event: MouseEvent) {
        if (!(el === event.target || el.contains(event.target))) {
          binding.value(event, el)
        }
      }
      document.body.addEventListener('click', el.clickOutsideEvent)
    },
    mounted(el) {
      // console.info('click-outside mounted', el)
    },
    unmounted(el) {
      document.body.removeEventListener('click', el.clickOutsideEvent)
    },
  })
}
