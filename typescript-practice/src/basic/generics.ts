// TypeScript 泛型练习

console.log('=== 泛型练习 ===');

/**
 * 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性
 */

// 1. 基本泛型函数
function success<T>(arg: T): T {
  return arg;
}

let result1 = success<string>('Hello, TypeScript!')
let result2 = success<number>(200)

// 2. 泛型数组
function createArray<T>(length: number, arg: T): Array<T> {
  return new Array<T>(length).fill(arg)
}

function createArray2<T>(length: number, arg: T[]): T[] {
  const arr = new Array<T>(length)
  arr.push(...arg)
  return arr
}

// 3. 泛型接口
interface CreateArrayFunc {
  <T>(length: number, value: T): Array<T>;
}
let createArray3: CreateArrayFunc = function <T>(length: number, value: T): Array<T> {
  return new Array<T>(length).fill(value)
}

interface CreateArrayFunc2<T> {
  (length: number, value: T): Array<T>;
}
let createArray4: CreateArrayFunc2<string> = function <T>(length: number, value: T): Array<T> {
  return new Array<T>(length).fill(value)
}

// 4. 泛型类
class GenericNumber<T> {
  zeroValue!: T                       // ! 非空断言可以告诉编译器稍后再赋值，避免初始化错误
  add!: (x: T, y: T) => T
}
let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function (x, y) {
  return x + y
}
console.log(myGenericNumber.add(41, 82))

// 5. 泛型约束，在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法。
// 此时，我们可以对泛型进行约束，只允许这个函数传入那些包含 length 属性的变量。这就是泛型约束。
interface Lengthwise {
  length: number;
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg  // 因为 arg 是 T 类型，所以返回值也应该是 T 类型
}

loggingIdentity({ length: 40 })

// 6. 多个类型参数之间也可以互相约束
function copyFields<T extends U, U>(target: T, source: U): T {
  for (let item in source) {
    target[item] = (<T>source)[item]
  }
  return target
}
let x = { a: 1, b: 2, c: 3, d: 4 }
copyFields(x, { b: 10, d: 20 })
console.log(x)

// 7. 泛型参数的默认类型, 当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用
function createArray5<T = string>(length: number, value: T): Array<T> {
  return new Array<T>(length).fill(value)
}
console.log(createArray5(3, 'x'))

// 8. 在泛型里使用类类型
class BeeKeeper {
  hasMask: boolean = true
}

class ZooKeeper {
  nametag: string = "Michael"
}

class AnimalX {
  numLegs: number = 4  // 腿的数量
}

class Bee extends AnimalX {
  keeper: BeeKeeper = new BeeKeeper()
}

class Lion extends AnimalX {
  keeper: ZooKeeper = new ZooKeeper()
}

/*
 泛型工厂函数（泛型约束 T 必须实现接口 AnimalX）
   c: new () => A 是参数 c 的类型。这是一种特殊的类型，叫做构造函数签名（Constructor Signature）。
    （1） new: 表示 c 必须是一个可以用 new 关键字调用的东西，也就是一个类的构造函数
    （2） (): 表示 c 必须是一个函数，返回值类型为 A
    （3） ==> A: 表示调用这个构造函数后（即 new c()），会返回一个类型为 A 的实例
   即，参数 c 必须是一个无参的类构造函数，并且这个类必须符合 <A extends AnimalX> 的约束
 */
function createInstance<A extends AnimalX>(c: new () => A): A {
  return new c()
}

const myBee = createInstance(Bee)
console.log(myBee.numLegs + ' -> ' + myBee.keeper.hasMask)
const myLion = createInstance(Lion)
console.log(myLion.numLegs + ' -> ' + myLion.keeper.nametag)

// 9. 高级泛型示例
// 条件类型
type IsString<T> = T extends string ? true : false
type IsStringResult1 = IsString<string>
type IsStringResult2 = IsString<number>

type NotNullable<T> = T extends null | undefined ? never : T
type A = NotNullable<string | number | undefined>
type B = NotNullable<null>
type C = NotNullable<undefined>
let aVal: A = 'a'
let bVal: B
let cVal: C
console.log(aVal) // bVal、cVal 不能被打印，因为它是 never 类型，而且 undefined/null 不需要打印验证

// 类型推断
type TypeName<T> = T extends string ? 'string' : T extends number ? 'number' : T extends boolean ? 'boolean' : T extends undefined ? 'undefined' : T extends Function ? 'function' : 'object'
type T1 = TypeName<string>
type T2 = TypeName<string[]>
type T3 = TypeName<() => void>
type T4 = TypeName<null>
type T5 = TypeName<undefined>
type T6 = TypeName<number>
type T7 = TypeName<boolean>
type T8 = TypeName<string | undefined>
type T9 = TypeName<string | (() => void)>
type T10 = TypeName<string | null | undefined | boolean>
type T11 = TypeName<string | number | (() => void)>

/*
  映射类型（Mapped Type）是一种基于已有类型创建新类型的方式，是元编程能力的一种体现。
    keyof T: 这是索引类型查询操作符。它会获取类型 T 的所有公共属性名。
    P in keyof T: 理解为 for...in 循环，P 是一个变量，它会依次遍历 keyof T 中的每个属性名。
    T[P]: 这是索引访问类型 (Indexed Access Type)，也叫查找类型 (Lookup Type)。它表示“获取类型 T 中属性名为 P 的那个属性的类型”
 */
type Readonlyed<T> = {
  readonly [P in keyof T]: T[P]
}

// 将一个类型 T 的所有属性都变为可选 (?)
type Partials<T> = {
  [P in keyof T]?: T[P]
};

interface Todo {
  title: string
  description: string
  completed: boolean
}
// 将 `Todo` 的变量都变为只读
type PartialTodo = Partials<Todo>
// 将 `Todo` 的变量都变为可选
type ReadonlyTodo = Readonlyed<Todo>

// 10. 泛型工具类型示例
interface SysUser {
  name: string
  age: number
  email: string
}

// Pick<T, K>：从类型 T 中选取部分属性 K，返回一个新的类型
type UserNameAndAge = Pick<SysUser, 'name' | 'age'>

// Omit<T, K>：从类型 T 中删除部分属性 K，返回一个新的类型
type UserWithoutAge = Omit<SysUser, 'age'>

// Record<K, T>：创建一个新类型，其中所有的键都被映射为类型 T
type UserMap = Record<string, SysUser>
let userMap: UserMap = {
  user1: {
    name: '张三',
    age: 18,
    email: 'zhangsan@qq.com'
  }
}
console.log(userMap)
console.log(userMap.user1)

type Roles = 'admin' | 'user' | 'guest'
type RolePermissions = Record<Roles, string[]>

const permissions: RolePermissions = {
  admin: ['read', 'write', 'delete'],
  user: ['read', 'write'],
  guest: ['read']
}
console.log(permissions)

// 11. 递归泛型
/*
  接收一个类型 T（通常是一个对象或数组），然后返回一个新类型，其中 T 的所有属性，包括其嵌套对象的所有属性，都变成了只读（readonly）的
  T[P] extends object ? DeepReadonly<T[P]>
    （1）T[P] 是一个对象，我们不能简单地使用它的原始类型。我们需要对这个嵌套的对象也进行只读处理
    （2）DeepReadonly<T[P]>：这就是递归发生的地方
 */
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}
interface NestedObject {
  a: {
    b: {
      c: string
    }
  }
}

// 创建一个只读的嵌套对象，递归处理嵌套对象，直到最底层的属性都变为只读
type DeepReadonlyNested = DeepReadonly<NestedObject>
declare const myObj: DeepReadonlyNested
// myObj.a = {}; // 错误! Cannot assign to 'a' because it is a read-only property.
// myObj.a.b = {}; // 错误! Cannot assign to 'b' because it is a read-only property.
// myObj.a.b.c = "new value"; // 错误! Cannot assign to 'c' because it is a read-only property.

console.log('✅ 泛型练习完成')