// TypeScript 接口练习

console.log('=== 接口练习 ===');

// 1. 基本接口
interface User {
  name: string
  age: number
  email?: string                    // 可选属性，使用 ? 表示，可选属性可以不存在
  readonly password: string         // 只读属性，使用 readonly 表示，只读属性不能被修改
  [propName: string]: any           // 索引签名，表示可以有任意数量的属性，属性名是 string 类型，属性值是 any 类型
}

let user: User = {
  name: 'John',
  age: 30,
  password: '123456',
  email: 'john@example.com',
  gender: 'male',
  city: '天水'
}

console.log(user)
user.city = '北京'
console.log(user)

const addUser = (user: User) : User => {
  user.age += 1
  return user
}
let user1: User = {
  name: 'John',
  age: 30,
  password: '123456',
  gender: 'male',
}
console.log(addUser(user1))

// 2. 索引签名
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray = ["Bob", "Fred"];
let myStr: string = myArray[0];

console.log(myArray, myStr)

// 3. 接口定义函数
interface SearchFunc {
  (source: string, subString: string, author?: string): boolean | string
}
let mySearch1: SearchFunc = (source: string, subString: string): boolean => {
  return source.search(subString) !== -1
}

let mySearch2: SearchFunc = (source: string, subString: string, author?: string): string => {
  return (author ?? '作者未指定') + ' - ' +  (source.search(subString) !== -1)
}

console.log(mySearch1('Hello World', 'World'))
console.log(mySearch2('Hello World', 'World', 'Dante'))

// 4. 接口定义类
interface ClockInterface {
  currentTime: Date
  setTime(d: Date): void
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) {}
}

// 5. 继承接口，接口可以继承多个接口
interface Shape {
  color: string
}

interface Square extends Shape {
  sideLength: number
}

let square: Square = {} as Square
square.color  = 'blue'
square.sideLength = 10
console.log(square)

let square2: Square = {
  color: 'red',
  sideLength: 20
}
console.log(square2)

// 6. 多重继承，接口可以继承多个接口
interface PenStroke {
  penWidth: number
}

interface Square2 extends PenStroke, Shape {
  sideLength: number
}
let square3: Square2 = {
  color: 'blue',
  sideLength: 10,
  penWidth: 5
}
console.log(square3)

// 7，混合类型接口，指的是一个对象同时具备多种类型的特性，比如函数类型、对象类型等。接口可以用来定义混合类型，让对象既能像函数一样被调用，又能拥有属性和方法
interface Counter {
  (start: number): string   // 函数类型
  interval: number          // 对象类型
  reset(): void             // 方法类型
}

//  实现了一个 getCounter 函数，用于创建符合 Counter 接口的对象
function getCounter(): Counter {
  // 定义了一个匿名函数，使用 as Counter 进行类型断言，将该函数强制转换为 Counter 类型
  let counter = function (start: number) {
    return `计数: ${start}`
  } as Counter
  counter.interval = 123
  counter.reset = function () {
    counter(0)
    counter.interval = 0
  }
  return counter
}

let myCounter = getCounter()
console.log(myCounter(5))
console.log(myCounter.interval)
myCounter.reset()
console.log(myCounter.interval)

// 8，接口继承类，接口可以继承类，继承后接口将获得类的成员类型，包括构造函数、属性和方法
// （1）接口可以继承类的“公共和受保护的成员结构
// （2）如果类中有私有或受保护成员，那么接口只能被同一个类体系中的类实现
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() { }
}


// 9. 泛型接口
interface GenericIdentityFn<T> {
  (arg: T): T
}

function identity<T>(arg: T): T {
  return arg
}

let myIdentity: GenericIdentityFn<number> = identity

console.log('✅ 接口练习完成');