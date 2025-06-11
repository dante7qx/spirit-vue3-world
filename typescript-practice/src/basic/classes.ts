// TypeScript 类练习

console.log('=== 类练习 ===');

// 1. 基本类
class Greeter {
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }
  greet() {
    return `Hello, ${this.greeting}`
  }
}

let greeter = new Greeter('world')
console.log(greeter.greet())

// 2. 继承
class Animal {
  name: string
  constructor(name: string) {
    this.name = name
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`)
  }
}

class Dog extends Animal {
  breed: string // 新增属性
  constructor(name: string, breed: string) {
    super(name) // 调用父类构造函数
    this.breed = breed
  }
  bark() {
    console.log('Woof! Woof!')
  }
  move(distanceInMeters: number = 45) {
    super.move(distanceInMeters) // 调用父类方法
  }
}

const dog = new Dog('狗', '全科')
dog.bark()
dog.move()

// 3. 公共，私有与受保护的修饰符（同 Java）
class Person {
  public name: string // 公共属性（默认范围，可不加 public）
  private readonly age: number // 私有属性
  protected sex: string // 受保护的属性
  constructor(name: string, age: number, sex: string) {
    this.name = name
    this.age = age
    this.sex = sex
  }

  introduce(): string {
    return `我是 ${this.name}, 今年 ${this.age} 岁, 性别 ${this.sex}`
  }

  getAge(): number  {
    return this.age
  }
  protected getSex() {
    return this.sex
  }
}

class Employee extends Person {
  private readonly department: string
  constructor(name: string, age: number, sex: string, department: string) {
    super(name, age, sex)
    this.department = department
  }
  getElevatorPitch() {
    return `我是 ${this.name}, 我有 ${this.getAge()} 岁, ${this.getSex()} 岁, 所在部门是 ${this.department}`
  }
}

const employee = new Employee('乔纳森', 20, '男', 'Java开发部')
console.log(employee.getElevatorPitch())

// 4. 参数属性，构造函数参数会自动创建并赋值给类的成员变量。等同于类中定义该属性同时给该属性赋值，使代码更简洁
class Student {
  constructor(
      public name: string,
      private age: number,
      protected grade: string
  ) {}

  getInfo() {
    return `${this.name}, age ${this.age}, grade ${this.grade}`;
  }
}

const student = new Student('张三', 18, 'A')
console.log(student.getInfo())

// 5. 存取器（Accessors）指的是通过 get 和 set 方法来控制类中属性的访问和赋值行为
class Employee2 {
  private _salary: number = 0

  static readonly MAX_SALARY: number = 100000
  get salary(): number {
    return this._salary
  }
  set salary(value: number) {
    if (value < 0) {
      throw new Error('Salary cannot be negative')
    } else {
      this._salary = value
    }
  }
}

let employee2 = new Employee2()
employee2.salary = 1000
console.log(`${employee2.salary}, 最高可得 ${Employee2.MAX_SALARY}`)

// 6. 抽象类（Abstract Classes）是不能被实例化的类，只能被继承。抽象类通常包含抽象方法，这些方法必须在子类中实现
abstract class Animal2 {
  abstract makeSound(): void
  move(): void {
    console.log('roaming the earch...')
  }
} // 抽象类不能被实例化
class Dog2 extends Animal2 {
  makeSound() {
    console.log('Woof! Woof!')
  }
} // 子类必须实现抽象方法
class Cat extends Animal2 {
  makeSound() {
    console.log('Meow!')
  }
}

//let animal2 = new Animal2() // 报错：不能创建抽象类的实例
let dog2 = new Dog2()
dog2.move()
dog2.makeSound()
let cat = new Cat()
cat.move()
cat.makeSound()

console.log('✅ 类练习完成');