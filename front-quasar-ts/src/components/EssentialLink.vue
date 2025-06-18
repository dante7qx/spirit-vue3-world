<template>
  <q-item clickable tag="a" target="_blank" :href="link">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
export interface EssentialLinkProps {
  title: string
  caption?: string
  link?: string
  icon?: string
}

/**
 * withDefaults 是 Vue 3 中 <script setup> 语法糖下的一个编译器宏，
 * 用于给 defineProps() 定义的 props 设置默认值
 */
withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
})
</script>
