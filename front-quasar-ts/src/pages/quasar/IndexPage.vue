<script setup lang="ts">
import { ref } from 'vue'
import StyleIdentity from 'pages/quasar/StyleIdentity.vue'
import SpiritGrid from 'pages/quasar/SpiritGrid.vue'
import SpiritLayout from 'pages/quasar/SpiritLayout.vue'

const tab = ref('style')
</script>

<template>
  <div class="text-h4 text-center q-ma-sm shadow-1 text-white bg-green-6">Quasar组件</div>

  <div class="q-pa-sm">
    <q-tabs
      align="left"
      v-model="tab"
      inline-label
      no-caps
      shrink
      outside-arrows
      mobile-arrows
      class="bg-blue-grey-10 text-white shadow-2"
    >
      <q-tab name="style" icon="style" label="Style & Identity" />
      <q-btn-dropdown auto-close stretch flat  icon="view_quilt" label="Layout & Grid">
        <q-list>
          <q-item clickable @click="tab = 'grid'">
            <q-item-section>Grid</q-item-section>
          </q-item>

          <q-item clickable @click="tab = 'layout'">
            <q-item-section>Layout</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="style">
        <style-identity />
      </q-tab-panel>

      <q-tab-panel name="grid">
        <spirit-grid />
      </q-tab-panel>

      <q-tab-panel name="layout">
        <spirit-layout />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<style scoped lang="scss">

</style>
