<script setup lang="ts">
const icons = [
  { fileName: 'user__full--fff' },
  { fileName: 'logout__line--181' },
  { fileName: 'delete__full--7f8' },
  { fileName: 'show-pw' },
  { fileName: 'hide-pw' },
  { fileName: 'check__line--fff' },
  { fileName: 'logo-bizon' },
  { fileName: 'show-pw' },
  { fileName: 'hide-pw' },
  { fileName: 'caution__full--e22' },
  { fileName: 'check-circle__line' },
  { fileName: 'close__line--181' },
  { fileName: 'arrow-r__line--7f8' },
  { fileName: 'star__line--7f8' },
  { fileName: 'star__full--eb1' },
  { fileName: 'triangle__full--525' },
  { fileName: 'info-bar--21d' },
  { fileName: 'arrow-l__line--525' },
  { fileName: 'arrow-l__line--d2d' },
  { fileName: 'arrow-r__line--525' },
  { fileName: 'arrow-r__line--4c8' },
  { fileName: 'd-arrow-l__line--525' },
  { fileName: 'nodata--7f8' },
  { fileName: 'system-error' },
]
</script>

<template>
  <div class="p-20">
    <h2 class="text-3xl font-semibold">icon list</h2>
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
      font-weight: 500;
      min-height: 60px;
      padding: 5px;
      border-top: 1px solid #c7c7c7;
      word-break: break-all;
    }
  }
}
</style>
