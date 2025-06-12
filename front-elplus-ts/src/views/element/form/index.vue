<script setup lang="ts">
import {cascaderData, cityList} from './data.ts'
import zhHk from 'element-plus/es/locale/lang/zh-hk'
import {type CheckboxValueType, type FormInstance, type FormRules} from 'element-plus'
import {Check, Close, StarFilled, UserFilled} from "@element-plus/icons-vue"

interface FormData {
  name: string
  age: number | null
  password: string
  amount: number
  favoriteLanguage: string
  favoriteLanguageUrl: string
  component: string[]
  fruits: string[]
  favoriteFruit: string
  city: string[]
  recordDate: string
  startDate: string
  endDate: string
  skill: string[]
  rate: number
  currentCity: string
  favoriteCity: string[]
  visitedCity: string[]
  clock1: string
  enableClock1: boolean
  clock2?: string | undefined
  enableClock2?: boolean | undefined
  remark: string
}

const form = reactive<FormData>({
  name: '',
  age: null,
  password: '',
  amount: 0,
  favoriteLanguage: '',
  favoriteLanguageUrl: '',
  component: [],
  fruits: [],
  favoriteFruit: '',
  city: [],
  recordDate: '',
  startDate: '',
  endDate: '',
  skill: [],
  rate: 0,
  currentCity: '',
  favoriteCity: [],
  visitedCity: [],
  clock1: '',
  enableClock1: false,
  clock2: undefined,
  enableClock2: false,
  remark: ''
})

// 校验金额规则
const checkAmount = (_rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入金额！'))
  }
  const numValue = Number(value)
  if (isNaN(numValue)) {
    callback(new Error('请输入数字！'))
  } else {
    if (numValue < 100) {
      callback(new Error('金额必须超过100！'))
    } else {
      callback()
    }
  }
}

const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' },
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { type: 'number', message: '年龄必须是数字' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' },
  ],
  amount: [
    { required: true, trigger: 'blur' },
    { validator: checkAmount, trigger: 'blur'},
  ]
})

/** 自动补全输入框 - 开始 */
interface VueItem {
  value: string;
  link: string;
}

// 模拟后端接口数据请求时间
let timeout: ReturnType<typeof setTimeout>

const queryVueItem = (queryString: string, cb: (arg: any) => void) => {
  const results = queryString ? vueList.value.filter(item => item.value.includes(queryString)) : vueList.value
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    cb(results)
  }, 1000 * Math.random())
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
  form.favoriteLanguageUrl = item.link
}
/** 自动补全输入框 - 结束 */

const dataRange = ref<string[]>()
const monthRange = ref<string[]>()
const changeDateRange = (date: string[] | null) => {

  if(date && date.length === 2) {
    form.startDate = date[0]
    form.endDate = date[1]
  }
  console.log(date, form)
}

/** 喜爱城市多选框 — 开始 */
const checkAllCity = ref(false)
const isIndeterminate = ref(false)
const handleCheckAllCityChange = (val: CheckboxValueType) => {
  form.favoriteCity = val ? cityList.map(city => city.value) : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange =  (value: string[]) => {
  let checkedCount = value.length
  checkAllCity.value = checkedCount === cityList.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cityList.length
}

const visitedCityExpandedKeys = ref<string[]>([]);

/** 喜爱城市多选框 — 结束 */

const spiritForm = ref<FormInstance>()
// 重置表单
const reset = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  dataRange.value = []
  monthRange.value = []
}

// 提交表单
const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      console.log(form)
    }
  })
}

onMounted(() => {
  visitedCityExpandedKeys.value = [cityList[0].value, cityList[0].label];
})
</script>

<template>
  <h3>表单 Form</h3>
  <el-text>表单组件，基于 Element Plus 的 Form 组件进行二次封装，提供了一些常用的表单组件。</el-text>

  <div style="margin-top: 20px;">
    <el-form ref="spiritForm" :model="form" :rules="rules" label-width="80px" label-position="left" class="spirit-form">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="姓名" prop="name">
            <el-input placeholder="请输入姓名" v-model="form.name" maxlength="12" show-word-limit :suffix-icon="UserFilled"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="年龄" prop="age">
            <el-input placeholder="请输入年龄" v-model.number="form.age" :suffix-icon="UserFilled"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
        <el-form-item label="密码" prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="form.password" clearable show-password/>
        </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="金额" prop="amount">
            <el-input clearable
                placeholder="请输入金额"
                v-model.number="form.amount"
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
              @clear="form.favoriteLanguageUrl = ''">
            <template #loading>
              <svg class="circular" viewBox="0 0 50 50">
                <circle class="path" cx="25" cy="25" r="20" fill="none" />
              </svg>
            </template>
            <template #default="{ item }">
              <el-text>{{ `${item.value} --> ${item.link}` }}</el-text>
            </template>
          </el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="链接" prop="favoriteLanguageUrl">
            <el-text>
              <el-link type="primary" :href="form.favoriteLanguageUrl" target="_blank" underline="never">
                {{form.favoriteLanguageUrl}}
              </el-link>
            </el-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组件" prop="component">
            <el-cascader v-model="form.component" :options="cascaderData" clearable filterable placeholder="请选择">
              <template #default="{ node, data }">
                <span>{{ data.label }}</span>
                <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
              </template>
              <template #suggestion-item="{ item }">
                <span>🔍 {{ item.pathLabels.join(' > ') }}</span>
              </template>
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-text>后端接收 string[] 类型，然后 JSON.stringify 后入库，读取时再 JSON.parse</el-text>
        </el-col>
        <el-col :span="10">
          <el-form-item label="水果" prop="fruits">
            <el-checkbox-group v-model="form.fruits">
              <el-checkbox
                  v-for="(item, index) in [{value: 'apple', label: '苹果'}, {value: 'orange',label: '橘子'}, {value: 'peach', label: '水蜜桃'}]"
                  :key="index"
                  :label="item.label"
                  :value="item.value"/>
            </el-checkbox-group>
            <el-text style="margin-left: 20px;">{{ form.fruits }}</el-text>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="城市" prop="city">
            <el-checkbox-group v-model="form.city" :min="1" :max="3">
              <el-checkbox
                  v-for="(city, index) in cityList"
                  :key="index"
                  :label="city.label"
                  :value="city.value"/>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-checkbox-group v-model="form.city" :min="1" :max="3">
            <el-checkbox-button
                v-for="(city, index) in cityList"
                :key="index"
                :label="city.label"
                :value="city.value"
            type="success"/>
          </el-checkbox-group>
        </el-col>
        <el-col :span="6">
          <el-form-item label="记录日期" prop="recordDate">
            <el-config-provider :locale="zhHk">
              <el-date-picker
                  v-model="form.recordDate"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  clearable />
            </el-config-provider>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="时间区间">
            <el-date-picker
                v-model="dataRange"
                type="datetimerange"
                range-separator=" ~ "
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                format="YYYY-MM-DD HH:mm"
                value-format="YYYY-MM-DD HH:mm:ss"
                clearable
                @change="changeDateRange" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="月份区间">
            <el-date-picker
                v-model="monthRange"
                type="monthrange"
                range-separator=" ~ "
                start-placeholder="开始月份"
                end-placeholder="结束月份"
                format="YYYY-MM"
                value-format="YYYY-MM"
                clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="技能" prop="skill">
            <el-input-tag
                v-model="form.skill"
                draggable
                clearable
                trigger="Space"
                :max="3"
                tag-type="success"
                tag-effect="plain"
                placeholder="请输入技能，多个以空格键分隔"
                aria-label="输入后请按下空格键">
              <template #tag="{ value }">
                <div class="flex items-center">
                  <el-icon class="mr-1">
                    <StarFilled />
                  </el-icon>
                  <span>{{ value }}</span>
                </div>
              </template>
            </el-input-tag>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="最爱水果" prop="favoriteFruit">
            <el-radio-group v-model="form.favoriteFruit">
              <el-radio
                  v-for="(item, index) in [{value: 'apple', label: '苹果'}, {value: 'orange',label: '橘子'}, {value: 'peach', label: '水蜜桃'}]"
                  :key="index"
                  :label="item.label"
                  :value="item.value"/>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="评分" prop="rate">
            <el-rate v-model="form.rate" allow-half clearable />
            <el-text style="margin-left: 10px;">{{ form.rate === 0 ? '未评分' : `${form.rate}分` }}</el-text>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" placeholder="请输入备注" v-model="form.remark" maxlength="512" :rows="3" resize="none" show-word-limit/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="居住城市" prop="currentCity">
            <el-select v-model="form.currentCity" placeholder="请选择" filterable clearable>
              <el-option
                  v-for="item in cityList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="喜爱城市" prop="favoriteCity">
            <el-select
              v-model="form.favoriteCity"
              placeholder="请选择"
              multiple
              collapse-tags
              :max-collapse-tags="3"
              clearable
              @change="handleCheckedCitiesChange">
              <template #header>
                <el-checkbox v-model="checkAllCity" :indeterminate="isIndeterminate" @change="handleCheckAllCityChange">
                  全选
                </el-checkbox>
              </template>
              <el-option
                  v-for="item in cityList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="曾到城市" prop="visitedCity">
            <el-tree-select
                v-model="form.visitedCity"
                :data="cityList"
                node-key="value"
                :render-after-expand="false"
                :default-expanded-keys="visitedCityExpandedKeys"
                show-checkbox
                check-strictly
                check-on-click-node
                multiple
                clearable
                placeholder="请选择">
              <template #default="{ node }">
                <tree-node-slot :data="node.data" />
              </template>
            </el-tree-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="闹钟1" prop="clock1">
            <el-time-picker
                v-model="form.clock1"
                format="HH:mm"
                value-format="HH:mm:ss"
                placeholder="请选择时间"
                clearable />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item prop="enableClock1">
            <el-switch
                v-model="form.enableClock1"
                class="mt-2"
                style="margin-left: -84px"
                inline-prompt
                :active-icon="Check"
                :inactive-icon="Close"
            />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="闹钟2" prop="clock2">
            <el-time-select
                v-model="form.clock2"
                start="03:00"
                step="00:15"
                end="10:00"
                format="HH:mm"
                value-format="HH:mm:ss"
                placeholder="请选择时间"
                clearable />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item prop="enableClock2">
            <el-switch
                v-model="form.enableClock2"
                class="mt-2"
                style="margin-left: -84px"
                inline-prompt
                :active-icon="Check"
                :inactive-icon="Close"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="text-align: center;">
      <el-button type="primary" @click="submit(spiritForm)">确 定</el-button>
      <el-button @click="reset(spiritForm)">取 消</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.spirit-form {
  /*
  .el-input {
    --el-input-width: 100%;
  }
  */
  :deep(.el-input),
  :deep(.el-select),
  :deep(.el-cascader),
  :deep(.el-date){
    width: 100%;
  }
}
.circular {
  display: inline;
  height: 30px;
  width: 30px;
  animation: loading-rotate 2s linear infinite;
}
.path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: var(--el-color-primary);
  stroke-linecap: round;
}
</style>