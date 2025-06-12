export interface TreeNode {
  label: string
  value: string
  disabled?: boolean
  children?: TreeNode[]
}