<script setup lang="ts">
import type {PageInfo} from "@/types/api/types.ts"

const props = defineProps({
  current: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  pageCount: {
    type: Number,
    required: false
  },
  pagination: {
    type: Function as PropType<() => Promise<void>>,
    required: false
  }
})

const emit = defineEmits(['pagination'])

const pageSizes = ref([10, 20, 30, 50])

const pageInfo = reactive<PageInfo>({
  current: props.current || 1,
  pageSize: props.pageSize || 10,
  total: props.total || 0,
  pageCount: props.pageCount || 0
})

const pageSizeChange = async (val: number) => {
    pageInfo.pageSize = val
    emit('pagination', pageInfo)
}
const pageCurrentChange = async (val: number) => {
    pageInfo.current = val
    emit('pagination', pageInfo)
}

</script>

<template>
  <div class="page-container">
    <el-pagination
        :current-page="pageInfo.current"
        :page-size="pageInfo.pageSize"
        :total="pageInfo.total"
        :page-sizes="pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="pageSizeChange"
        @current-change="pageCurrentChange"
    />
  </div>
</template>

<style scoped lang="scss">
.page-container {
  display: flex;
  justify-content: right;
  margin: 20px 5px 20px 0;
}
</style>