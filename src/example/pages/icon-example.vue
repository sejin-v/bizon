<script setup lang="ts">
const icons = [
  { fileName: 'action' },
  { fileName: 'airplain' },
  { fileName: 'api-reference__full' },
  { fileName: 'api-reference__line' },
  { fileName: 'api-reference-btn-1' },
  { fileName: 'api-reference-btn-2' },
  { fileName: 'arrow__down--121' },
  { fileName: 'arrow__down--333' },
  { fileName: 'arrow__down--999' },
  { fileName: 'arrow__full--676' },
  { fileName: 'arrow-l__line--444' },
  { fileName: 'arrow-l__line--555' },
  { fileName: 'arrow-l__line--e2d' },
  { fileName: 'arrow-r__full--fff' },
  { fileName: 'arrow-r__line--9e4' },
  { fileName: 'arrow-r__line--444' },
  { fileName: 'arrow-r__line--555' },
  { fileName: 'arrow-r__line--c7c' },
  { fileName: 'arrow-t__line--555' },
  { fileName: 'ask' },
  { fileName: 'back__line--776' },
  { fileName: 'best-practice__full' },
  { fileName: 'best-practice__line' },
  { fileName: 'bookmark__full--9e4' },
  { fileName: 'bookmark__full--purple' },
  { fileName: 'briefcase__full--a5a' },
  { fileName: 'button__play--776' },
  { fileName: 'calendar__line--c7c' },
  { fileName: 'caution__full--fe3' },
  { fileName: 'character--right' },
  { fileName: 'chart__line-api' },
  { fileName: 'chart__line-error' },
  { fileName: 'chart__line-good' },
  { fileName: 'chat__summary' },
  { fileName: 'chat-user__circle--1' },
  { fileName: 'chat-user__circle--2' },
  { fileName: 'check__circle--36d' },
  { fileName: 'check__full--333' },
  { fileName: 'check__full--fff' },
  { fileName: 'clip__line--666' },
  { fileName: 'clipboard__full--purple' },
  { fileName: 'close__line--121' },
  { fileName: 'close__line--fff' },
  { fileName: 'copy__line--333' },
  { fileName: 'core__circle--f99' },
  { fileName: 'delete__circle--eae' },
  { fileName: 'delete__file--fff' },
  { fileName: 'delete__line--555' },
  { fileName: 'direct__line--333' },
  { fileName: 'double-arrow-l__line--555' },
  { fileName: 'double-arrow-r__line--555' },
  { fileName: 'double-ellipsis__full' },
  { fileName: 'double-simbol__line' },
  { fileName: 'download__line--222' },
  { fileName: 'emotion__bad' },
  { fileName: 'emotion__good' },
  { fileName: 'emotion__soso' },
  { fileName: 'emotion__bad--active' },
  { fileName: 'emotion__good--active' },
  { fileName: 'emotion__soso--active' },
  { fileName: 'file__docx' },
  { fileName: 'file__etc' },
  { fileName: 'file__hwp' },
  { fileName: 'file__img' },
  { fileName: 'file__pdf' },
  { fileName: 'file__plus--bbb' },
  { fileName: 'file__ppt' },
  { fileName: 'file__pptx' },
  { fileName: 'file__word' },
  { fileName: 'file__xlsx' },
  { fileName: 'file__zip' },
  { fileName: 'holeman__left' },
  { fileName: 'holeman__login' },
  { fileName: 'holeman__profile' },
  { fileName: 'holeman' },
  { fileName: 'home-purple-bg' },
  { fileName: 'home-purple-holeman' },
  { fileName: 'icon__emoji-sunglasses' },
  { fileName: 'icon__sidebar-collapse' },
  { fileName: 'icon__sidebar-open' },
  { fileName: 'image__circle--f9b' },
  { fileName: 'info__full--c5c' },
  { fileName: 'info__line--555' },
  { fileName: 'ixi__circle--9e4' },
  { fileName: 'ixi-gen__bridge' },
  { fileName: 'ixi-service' },
  { fileName: 'ixi-universe__1' },
  { fileName: 'ixi-universe__2' },
  { fileName: 'ixi-universe__3' },
  { fileName: 'ixi-universe__4' },
  { fileName: 'keyboard__line--aaa' },
  { fileName: 'link__line--9e4' },
  { fileName: 'link__line--333' },
  { fileName: 'link__line--666' },
  { fileName: 'link__line--fff' },
  { fileName: 'lock__full--a5a' },
  { fileName: 'logo__playground' },
  { fileName: 'logo__solution--fff' },
  { fileName: 'logo__solution' },
  { fileName: 'logo__studio' },
  { fileName: 'logo--fff' },
  { fileName: 'logo--purple' },
  { fileName: 'logout__line--222' },
  { fileName: 'microphone__line--aaa' },
  { fileName: 'microphone__line--purple' },
  { fileName: 'minus__line--333' },
  { fileName: 'minus__line--999' },
  { fileName: 'minus__line--fff' },
  { fileName: 'minus-round__full' },
  { fileName: 'modify__eraser--555' },
  { fileName: 'more__dot--555' },
  { fileName: 'more__full--white' },
  { fileName: 'move__line--9e4' },
  { fileName: 'move__line--555' },
  { fileName: 'notice__line--555' },
  { fileName: 'ocr' },
  { fileName: 'overview__ethics' },
  { fileName: 'overview__full' },
  { fileName: 'overview__line' },
  { fileName: 'overview__security' },
  { fileName: 'overview__telecom' },
  { fileName: 'plus__line--333' },
  { fileName: 'plus__line--999' },
  { fileName: 'plus__line--fff' },
  { fileName: 'plus-round__full' },
  { fileName: 'preparing' },
  { fileName: 'prompt' },
  { fileName: 'qna' },
  { fileName: 'question__full' },
  { fileName: 'question__line' },
  { fileName: 'refresh__line--555' },
  { fileName: 'refresh__line--776' },
  { fileName: 'report__full--purple' },
  { fileName: 'search__line--9e4' },
  { fileName: 'search__line--121' },
  { fileName: 'search__line--fff' },
  { fileName: 'send__line--aaa' },
  { fileName: 'send__line--purple' },
  { fileName: 'service__circle--00c' },
  { fileName: 'setting__line--e2d' },
  { fileName: 'setting__line--fff' },
  { fileName: 'setting-circle__full' },
  { fileName: 'simbol__api' },
  { fileName: 'simbol__line--e2d' },
  { fileName: 'simbol__line--purple' },
  { fileName: 'simbol__studio' },
  { fileName: 'speech__circle--ff7' },
  { fileName: 'studio-go__full' },
  { fileName: 'studio-go__line' },
  { fileName: 'studio-guide__full' },
  { fileName: 'studio-guide__line' },
  { fileName: 'summary__full--purple' },
  { fileName: 'summary' },
  { fileName: 'system-mgmt' },
  { fileName: 'target__circle--728' },
  { fileName: 'task__line--515' },
  { fileName: 'thumbs-circle__full' },
  { fileName: 'token-circle__full' },
  { fileName: 'tooltip' },
  { fileName: 'trash__line--555' },
  { fileName: 'tv__circle--00c' },
  { fileName: 'user__circle--f3f' },
  { fileName: 'user__full--a5a' },
  { fileName: 'vision__circle--7d7' },
  { fileName: 'voice__circle--f99' },
  { fileName: 'voice__line--aaa' },
  { fileName: 'voice__line--purple' },
  { fileName: 'warn-circle__full' },
  { fileName: 'qna-bubble' },
  { fileName: 'copywriter' },
]
</script>

<template>
  <div class="p-20">
    <h2 class="text-3xl font-semibold">
      icon list
    </h2>
    <ul class="flex flex-wrap gap-5 my-10">
      <li v-for="ic in icons" :key="`pages-${ic.fileName}`" class="example__icon">
        <div class="example__icon-image">
          <icon :name="`${ic.fileName}`" width="100" height="100" class="p-2" />
        </div>
        <div class="example__icon-name">
          <span>
            {{ ic.fileName }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.example {
  &__icon {
    overflow: hidden;
    width: 140px;
    border: 1px solid #c7c7c7;
    border-radius: 10px;

    &-image {
      @apply flex items-center justify-center;
      width: 100%;
      padding: 10px;
      background: #075617;
    }

    &-name {
      @apply flex items-center justify-center;
      @include font($font-weight: 500);
      min-height: 60px;
      padding: 5px;
      border-top: 1px solid #c7c7c7;
      word-break: break-all;
    }
  }
}
</style>
