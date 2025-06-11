// TypeScript 工具类型练习

console.log('=== 工具类型练习 ===')

interface AuthUser {
  id: number
  name: string
  email: string
  age: number
  isActive: boolean
}

// 1. Partial<T> - 将T的所有属性变为可选
type PartialUser = Partial<AuthUser>

const updateUser = (id: number, updates: PartialUser) => {
  // 只需要传入需要更新的字段
  console.log(`更新用户 ${id}:`, updates)
}

updateUser(100, { name: 'John', isActive: false })
updateUser(200, { email: "new@email.com", age: 25 })

// 2. Required<T> - 将T的所有属性变为必需
interface OptionalUser {
  id?: number;
  name?: string;
  email?: string;
}
type RequiredUser = Required<OptionalUser>
const createUser = (user: RequiredUser) => {
  // 现在所有属性都是必需的
  console.log('创建用户:', user)
}
createUser({id: 101, name: 'John', email: 'john@example.com' })
// createUser({ id: 101, name: 'John'})  // 报错，缺少 email 属性

// 3. Pick<T, K> - 从T中选择部分属性K
type UserBasicInfo = Pick<AuthUser, 'id' | 'name' | 'email'>
const displayUserInfo = (user: UserBasicInfo) => {
  console.log(`用户${user.id}: ${user.name} (${user.email})`);
}
displayUserInfo({ id: 100, name: 'John', email: 'john@example.com' })

// 4. Omit<T, K> - 从T中排除属性K
type UserWithoutAgeAndIsActive = Omit<AuthUser, 'age' | 'isActive'>
const registerUser = (user: UserWithoutAgeAndIsActive) => {
  const newUser = { age: 38, isActive: true, ...user };
  console.log('注册用户:', newUser)
}
registerUser({ id: 100, name: 'John', email: 'john@example.com' })

// 5. Record<K, T> - 创建具有键K和值T的记录类型 (重点掌握)
type UserRoles = 'admin' | 'user' | 'guest'
type UserRolePermissions = Record<UserRoles, string[]>  // 每个角色对应一个权限数组
const perms: UserRolePermissions = {
  admin: ['read', 'write', 'delete'],
  user: ['read', 'write'],
  guest: ['read']
}
console.table(perms)
console.table(perms.admin)

// 6. Exclude<T, U> - 从T中排除可以赋值给U的类型
type PrimaryColors = 'red' | 'green' | 'blue'
type Colors = 'red' | 'green' | 'blue' | 'yellow' | 'purple'
type NonPrimaryColors = Exclude<Colors, PrimaryColors>
const nonPrimaryColors: NonPrimaryColors[] = ['yellow', 'purple']
console.table(nonPrimaryColors)

//  7. Extract<T, U> - 从T中提取可以赋值给U的类型
type Colors2 ='red' | 'green' | 'blue' | 'yellow' | 'purple'
type PrimaryColors2 ='red' | 'green' | 'blue'
type ExtractedColors = Extract<Colors2, PrimaryColors2>
const extractedColors: ExtractedColors[] = ['red', 'green', 'blue']
console.table(extractedColors)

// 路由参数提取
type ExtractRouteParams<T extends string> =
    T extends `${infer Start}:${infer Param}/${infer Rest}`
        ? { [K in Param]: string } & ExtractRouteParams<`${Start}${Rest}`>
        : T extends `${infer Start}:${infer Param}`
            ? { [K in Param]: string }
            : {};

type UserRouteParams = ExtractRouteParams<'/users/:userId/posts/:postId'>;
const userParams: UserRouteParams = { userId: '123', postId: '456' }
console.log('路由参数提取')
console.table(userParams)

// 8. NonNullable<T> - 从T中排除null和undefined类型
type NullableType = string | null | undefined
type NonNullableType = NonNullable<NullableType>
const nonNullableValue: NonNullableType = 'Hello, TypeScript!' // 不能为null或undefined
console.log(nonNullableValue)

// 9. ReturnType<T> - 获取函数T的返回类型
// 语法: type FooReturn = ReturnType<typeof foo>, 只能作用于函数类型
// 如果你在多个地方用到了同一个函数的返回类型，而你又不想重复定义 interface，可以用 ReturnType 提取
function getCurrentUser(): AuthUser {
  return { id: 100, name: 'John', email: 'john@example.com', age: 40, isActive: true }
}
type UserType = ReturnType<typeof getCurrentUser>
const loginUser: UserType = getCurrentUser()
console.table(loginUser)

// 10. Parameters<T> - 获取函数类型T的参数类型组成的元组
function createPost(title: string, content: string, author: string,  date: Date): void {
  console.log(`创建文章: ${title} by ${author}, 时间：${date}`);
}
type PostParams = Parameters<typeof createPost>
const newPost: PostParams = ['TypeScript 高级指南', '深入学习 TypeScript 高级特性', 'John', new Date()]
createPost(...newPost)  // 展开数组作为实参传入函数

// 11. ConstructorParameters<T> - 获取构造函数类型T的参数类型组成的元组
class DBConnection {
  constructor(host: string, port: number, username: string, password: string) {}
}
type DBConnParams = ConstructorParameters<typeof DBConnection>
const dbConn: DBConnParams = ['localhost', 3306, 'root', 'password']
const db = new DBConnection(...dbConn)
console.log(db)

// 12. InstanceType<T> - 获取构造函数类型T的实例类型
type DBConnectionInstance = InstanceType<typeof DBConnection>
const dbInstance: DBConnectionInstance = new DBConnection('localhost', 3306, 'root', 'password')
console.log(dbInstance)

// 14. 条件类型（Conditional Types）
// 条件类型允许我们根据某个条件来选择类型。语法：T extends U ? X : Y
// 条件类型可以用于泛型函数的返回类型，根据传入的类型返回不同的类型
type Check<T> = T extends string ? string : number
const checkValue: Check<string> = 'hello'   // hello
const checkValue2: Check<number> = 123      // 123

// 15. 映射类型（Mapped Types）
// 映射类型允许我们对类型的每个属性进行转换。语法：{ [K in keyof T]: X }
type Mutable<T> = {
  -readonly [K in keyof T]: T[K]  // 去掉只读属性
}

interface Usr {
  readonly id: number
  name: string
  email: string
}

type MutableUser = Mutable<Usr>
const mutableUser: MutableUser = { id: 100, name: 'John', email: 'john@example.com' }
console.table(mutableUser)

// 移除可选修饰符
type Concrete<T> = {
  [P in keyof T]-?: T[P]
}

// 16. 字符串字面量类型（String Literal Types）
// 字符串字面量类型允许我们指定字符串的具体值。语法：'value'
type EmailLocaleIDs = "welcome_email" | "email_heading"
type FooterLocaleIDs = "footer_title" | "footer_sendoff"
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`
const locale: AllLocaleIDs = "welcome_email_id"
console.log(locale)

// 17. 键重映射（Key Remapping）
// 键重映射允许我们对类型的每个属性进行重命名。语法：{ [K in keyof T as NewKey]: T[K] }

// 把对象类型 T 中的每个属性 K，转换为以 "get" + 首字母大写形式的新 key，并将其值变为一个函数，返回原来属性的类型。
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
}

interface PersonList {
  name: string;
  age: number;
  location: string;
}

type LazyPerson = Getters<PersonList>
// 生成如下结果
// {
//   getName: () => string;
//   getAge: () => number;
//   getLocation: () => string;
// }
const lazyPerson: LazyPerson = {
  getName: () => 'John',
  getAge: () => 30,
  getLocation: () => 'New York'
}
console.table(lazyPerson)

// 18. 事件处理器类型
type EventHandlers<T> = {
  [K in keyof T as `on${Capitalize<string & K>}Change`]?: (value: T[K]) => void
}
interface FormData {
  name: string;
  email: string;
  age: number;
}
type FormEventHandlers = EventHandlers<FormData>

const formEventHandlers: FormEventHandlers = {
  onNameChange: (value: string) => console.log(`Name changed to ${value}`),
  onEmailChange: (value) => console.log(`Email changed to ${value}`),
  onAgeChange: (value) => console.log(`Age changed to ${value}`)
}

// 19. 实用示例: API响应类型
interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

type UserResponse = ApiResponse<AuthUser>
type UsersResponse = ApiResponse<AuthUser[]>
const userResponse: UserResponse = {
  data: { id: 100, name: 'John', email: 'john@example.com', age: 40, isActive: true },
  status: 200,
  message: 'Success'
}
console.table(userResponse)

const usersResponse: UsersResponse = {
  data: [
      { id: 100, name: 'John', email: 'john@example.com', age: 40, isActive: true },
      { id: 101, name: 'Jane', email: 'jane@example.com', age: 35, isActive: false }
  ],
  status: 200,
  message: 'Success'
}
console.table(usersResponse)
console.table(usersResponse.data)
