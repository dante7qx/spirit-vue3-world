
// TypeScript 基础类型练习

console.log('=== 基础类型练习 ===');

// 1. 基本类型
let isDone: boolean = false
let decimal: number = 6       // 十进制
let hex: number = 0xf00d      // 十六进制
let binary: number = 0b1010   // 二进制
let octal: number = 0o744     // 八进制
let color: string = 'blue'
let fullName: string = `Michale Dante`

// 2. 数组
let list1: number[] = [1, 2, 3]
let list2: Array<number> = [1, 2, 3]

// 3. 元组 Tuple
let tom: [string, number, boolean] = ['Tom', 25, false]

// 4. 枚举
enum Color {
  Red, Green, Blue
}
let c: Color = Color.Green

enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

// 5. Any 任意类型, 表示允许赋值为任意类型
let noSure: any = 4
noSure = 'maybe a string instead'
noSure = true

// 6. unknown 未知类型, 表示只能赋值给 any 类型
let userInput: unknown
let userName: unknown

if (typeof userInput === "string") {
  userName = userInput;
}
noSure = userName

// 7. void 空类型, 表示没有任何返回值
function warnUser(): void {
  console.log('This is my warning message');
}

// 8. null 和 undefined
let u: undefined = undefined
let n: null = null

// 9. never 永远不存在的值的类型
function error(message: string): never {
  throw new Error(message)
}

// 10. Object 类型, 代表所有非 null 和非 undefined 的值，它可以是任意对象、数组、函数等
// Object（首字母大写）：代表所有非 null 和非 undefined 的值，包含原始类型（如 string、number、boolean 等）的装箱对象
// object（小写）：表示非原始类型，即对象、数组、函数等，不包含原始类型
function create(o: object | null) {
  if (o) {
    console.log('传入的对象是:', o)
  } else {
    console.log('传入的是 null')
  }
}
create({ name: 'Jane', age: 25 })
create(null)

// 11. 类型断言, 用来手动指定一个值的类型。 语法: value as type 或 <type>value
// 类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误
let someValue: unknown = "this is a string"
let strLength: number = (someValue as string).length
let strLength2: number = (<string>someValue).length

class ApiError extends Error {
  code: number = 0
}
class HttpError extends Error {
  statusCode: number = 200
}

function isApiError(error: Error) {
  return error instanceof ApiError;
}

// 12. 联合类型, 表示取值可以为多种类型中的一种
function getLength(something: string | number): number {
  /*
  if (typeof something === 'string') {
    return something.length;
  } else {
    return something.toString().length;
  }
  */
  return something.toString().length;
}
console.log(getLength('hello'))
console.log(getLength(123))

// 13. 交叉类型, 允许多个类型合并为一个类型。合并后的类型会拥有所有参与合并类型的特性，用 & 符号来表示。
interface Colorful {
  color: string
}

interface Circle {
  radius: number
}

type ColorfulCircle = Colorful & Circle

const cc: ColorfulCircle = {
  color: 'red',
  radius: 5
}
console.log(cc)

// 14. 字面值类型, 把变量的值限定为某个或某些具体的字面值。字面值类型能让类型定义更加精确，增强类型检查的严格性
type Move = "left" | "right" | "center" | "down"
function move(move: Move) {
  console.log(`Moving ${move}`);
}
move('right')
// 错误，传入的值不在 Move 类型范围内
// move('up')

// 15. 类型别名（Type Aliases）用于给某个类型定义一个新的名称，方便在代码里复用这个类型。语法：type NewTypeName = ExistingType
type Point = {
  x: number, y: number
}
const point: Point = {
  x: 1,
  y: 2
}

type UID = string | number
const uid1: UID = 123
const uid2: UID = '1234@qwer'

// 16.扩展运算符（Spread）或 剩余参数运算符（Rest）
// 扩展运算符（...）用于展开数组或对象的元素，使其成为独立的元素或属性。
// 剩余参数运算符（...）用于将多个参数收集到一个数组中。
const arr1 = [1, 2, 3]
console.log(arr1)
console.log(...arr1)  // 展开数组可以作为实参传入函数

const usr = { name: 'Alice', age: 30 }
const updated = { ...usr, age: 31 }
console.table(updated)  // age 被覆盖

// 剩余参数（Rest）
function sum(...nums: number[]) {
  return nums.reduce((a, b) => a + b, 0)
}
console.log(sum(1, 2, 3, 4, 5))

// 解构赋值
const [first, ...rest] = [1, 2, 3, 4]
console.log(first)
console.log(rest)

console.log('✅ 基础类型练习完成');