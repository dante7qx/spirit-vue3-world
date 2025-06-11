function greet(name: string): string {
  return `你好, ${name}。欢迎来到 TypeScript 和 pnpm 的世界！`;
}
let message = greet("但丁");
console.log(message);

import './basic/types'
import './basic/interfaces'
import './basic/classes'
import './basic/generics'
import './advanced/utility-types'

console.log('✅ 所有练习模块加载完成！');