import type {TreeNode} from "@/types/tree.ts"

export const cascaderData = [
  {
    value: 'guide',
    label: '指南',
    children: [
      {
        value: 'disciplines',
        label: '设计原则',
        children: [
          {
            value: 'consistency',
            label: '一致性',
          },
          {
            value: 'feedback',
            label: '反馈',
          },
          {
            value: 'efficiency',
            label: '效率',
          },
          {
            value: 'controllability',
            label: '可控性',
          },
        ],
      },
      {
        value: 'navigation',
        label: '导航',
        children: [
          {
            value: 'side nav',
            label: '侧边导航',
          },
          {
            value: 'top nav',
            label: '顶部导航',
          },
        ],
      },
    ],
  },
  {
    value: 'component',
    label: '组件',
    children: [
      {
        value: 'basic',
        label: '基础组件',
        children: [
          {
            value: 'layout',
            label: '布局',
          },
          {
            value: 'color',
            label: '颜色',
          },
          {
            value: 'typography',
            label: '字体排版',
          },
          {
            value: 'icon',
            label: '图标',
          },
          {
            value: 'button',
            label: '按钮',
          },
        ],
      },
      {
        value: 'form',
        label: '表单组件',
        children: [
          {
            value: 'radio',
            label: '单选框',
          },
          {
            value: 'checkbox',
            label: '多选框',
          },
          {
            value: 'input',
            label: '输入框',
          },
          {
            value: 'input-number',
            label: '数字输入框',
          },
          {
            value: 'select',
            label: '选择器',
          },
          {
            value: 'cascader',
            label: '级联选择器',
          },
          {
            value: 'switch',
            label: '开关',
          },
          {
            value: 'slider',
            label: '滑块',
          },
          {
            value: 'time-picker',
            label: '时间选择器',
          },
          {
            value: 'date-picker',
            label: '日期选择器',
          },
          {
            value: 'datetime-picker',
            label: '日期时间选择器',
          },
          {
            value: 'upload',
            label: '上传',
          },
          {
            value: 'rate',
            label: '评分',
          },
          {
            value: 'form',
            label: '表单',
          },
        ],
      },
      {
        value: 'data',
        label: '数据展示',
        children: [
          {
            value: 'table',
            label: '表格',
          },
          {
            value: 'tag',
            label: '标签',
          },
          {
            value: 'progress',
            label: '进度条',
          },
          {
            value: 'tree',
            label: '树形控件',
          },
          {
            value: 'pagination',
            label: '分页器',
          },
          {
            value: 'badge',
            label: '徽章',
          },
        ],
      },
      {
        value: 'notice',
        label: '通知反馈',
        children: [
          {
            value: 'alert',
            label: '警告提示',
          },
          {
            value: 'loading',
            label: '加载中',
          },
          {
            value: 'message',
            label: '消息提示',
          },
          {
            value: 'message-box',
            label: '弹窗提示',
          },
          {
            value: 'notification',
            label: '通知提醒',
          },
        ],
      },
      {
        value: 'navigation',
        label: '导航组件',
        children: [
          {
            value: 'menu',
            label: '菜单',
          },
          {
            value: 'tabs',
            label: '标签页',
          },
          {
            value: 'breadcrumb',
            label: '面包屑导航',
          },
          {
            value: 'dropdown',
            label: '下拉菜单',
          },
          {
            value: 'steps',
            label: '步骤条',
          },
        ],
      },
      {
        value: 'others',
        label: '其他组件',
        children: [
          {
            value: 'dialog',
            label: '对话框',
          },
          {
            value: 'tooltip',
            label: '文字提示',
          },
          {
            value: 'popover',
            label: '弹出框',
          },
          {
            value: 'card',
            label: '卡片',
          },
          {
            value: 'carousel',
            label: '走马灯',
          },
          {
            value: 'collapse',
            label: '折叠面板',
          },
        ],
      },
    ],
  },
  {
    value: 'resource',
    label: '资源',
    children: [
      {
        value: 'axure',
        label: 'Axure 组件库',
      },
      {
        value: 'sketch',
        label: 'Sketch 模板',
      },
      {
        value: 'docs',
        label: '设计文档',
      },
    ],
  },
]

export const cityList: TreeNode[] = [
  {
    value: 'shanghai',
    label: '上海',
    children: [
      {
        value: 'pudong',
        label: '浦东新区',
      },
      {
        value: 'putuo',
        label: '普陀区',
      },
    ],
  },
  {
    value: 'beijing',
    label: '北京',
    children: [
      {
        value: 'haidian',
        label: '海淀区',
        children: [
          {
            value: 'zhongguancun',
            label: '中关村',
          },
        ],
      },
      {
        value: 'chaoyang',
        label: '朝阳区',
        children: [
          {
            value: 'wangjing',
            label: '望京',
            disabled: true,
          },
        ],
      },
    ],
  },
  {
    value: 'guangzhou',
    label: '广州',
    children: [
      {
        value: 'yuexiu',
        label: '越秀区',
        children: [
          {
            value: 'beijinglu',
            label: '北京路',
          },
        ],
      },
      {
        value: 'tianhe',
        label: '天河区',
        children: [
          {
            value: 'zhucun',
            label: '珠村',
          },
        ],
      },
    ],
  },
  {
    value: 'chengdu',
    label: '成都',
    children: [
      {
        value: 'wuhou',
        label: '武侯区',
      },
      {
        value: 'jinniu',
        label: '金牛区',
      },
    ],
  },
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          {
            value: 'xihu',
            label: '西湖',
          },
        ],
      },
    ],
  },
]
