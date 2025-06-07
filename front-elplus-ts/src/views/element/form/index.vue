<script setup lang="ts">
interface FormData {
  name: string
  password: string
  amount: number
  favoriteLanguage: string
}

const form = reactive<FormData>({
  name: '',
  password: '',
  amount: 0,
  favoriteLanguage: '',
})

/** 自动补全输入框 - 开始 */
interface VueItem {
  value: string;
  link: string;
}
const queryVueItem = (queryString: string, cb: any) => {
  const results = queryString ? vueList.value.filter(item => item.value.includes(queryString)) : vueList.value
  cb(results)
}
const vueList = ref<VueItem[]>([
  { value: 'vue', link: 'https://github.com/vuejs/vue' },
  { value: 'element', link: 'https://github.com/ElemeFE/element' },
  { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
  { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
  { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
  { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
  { value: 'babel', link: 'https://github.com/babel/babel' },
])
const selectVueState = (item: Record<string, any>) => {
  console.log(item.value, item.link)
}
/** 自动补全输入框 - 结束 */


</script>

<template>
  <h3>表单</h3>
  <el-text>表单组件，基于 Element Plus 的 Form 组件进行二次封装，提供了一些常用的表单组件。</el-text>

  <div style="margin-top: 20px;">
    <el-form v-model="form" label-width="80px" label-position="left" class="spirit-form">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="姓名" prop="name">
            <el-input placeholder="请输入姓名" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="密码" prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="form.password" clearable show-password/>
        </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="金额" prop="amount">
            <el-input clearable
                placeholder="请输入金额"
                v-model="form.amount"
                :formatter="(value: string) => `$ ${value === '0'  ? '' : value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="(value: string) => value.replace(/\$\s?|(,*)/g, '') "/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最爱前端" prop="favoriteLanguage">
          <el-autocomplete
              v-model="form.favoriteLanguage"
              :fetch-suggestions="queryVueItem"
              :trigger-on-focus="true"
              clearable
              class="inline-input w-50"
              placeholder="请输入"
              @select="selectVueState"
          />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.spirit-form {
  .el-input {
    --el-input-width: 100%;
  }
  .el-select {
    --el-select-width: 100%;
  }
}
</style>