/*

### トピック

[https://www.typescriptlang.org/docs/handbook/2/types-from-types.html](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html) の復習

### ゴール（めざす状態・主な主張）

今まであまり解けて居なかった人が解けるようにする

## 復習

- Generic
    - Constrains
    - default
- keyof
    - いろいろ keyof してどうなるか
- index access
    - HogeFuga[number]
- mapped type
    - key remapping
- conditional type
    - **Distributive Conditional Types**
- Template literal Type
- infer

## 実践

- Pick mapped
    - [https://github.com/type-challenges/type-challenges/blob/main/questions/00004-easy-pick/README.md](https://github.com/type-challenges/type-challenges/blob/main/questions/00004-easy-pick/README.md)
- First
    - [https://github.com/type-challenges/type-challenges/blob/main/questions/00014-easy-first/README.md](https://github.com/type-challenges/type-challenges/blob/main/questions/00014-easy-first/README.md)
- Return type
    - [https://github.com/type-challenges/type-challenges/blob/main/questions/00002-medium-return-type/README.md](https://github.com/type-challenges/type-challenges/blob/main/questions/00002-medium-return-type/README.md)
    
*/
import type { Equal, Expect, NotEqual, Debug } from "@type-challenges/utils"
// generic
type MyOmit<T, K extends keyof T = keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P]
}
type Dog = { kind: "aaa"; height: number }
type Case0 = [Debug<MyOmit<Dog>>]

// keyof
type Point = { x: number; y: number }
// Pは 'x' | 'y'
type P = keyof Point

// index access
type Person = { age: number; name: string; alive: boolean }
type Age = Person["age"] // number

type I1 = Person["age" | "name"]
// type I1 = string | number

type I2 = Person[keyof Person]
// type I2 = string | number | boolean
type AliveOrName = "alive" | "name"
type I3 = Person[AliveOrName]

type MyArray = [
  { name: "Alice"; age: 15 },
  { name: "Bob"; age: 23 },
  { name: "Eve"; age: 38 }
]
const x: MyArray = arr[number]
const x1: MyArray[number] = { name: "Alice", age: 15 }
const x2: MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
]

type _ = MyArray[0] // { name: "Alice", age: 15 },
type Person1 = MyArray[number]
// { name: "Alice", age: 15 } | { name: "Bob", age: 23 } | { name: "Eve", age: 38 }
type X = MyArray[0 | 1]
type Age1 = MyArray[number]["age"]
type Age2 = Person["age"]

// conditional type
type Koike<T> = T extends 1 ? true : false
type koike1 = Koike<2>
// TODO: conditional infer, distributive

// Mapped type

// Kはほとんど文字列のリテラル型のユニオン型
// Pはこの構文の中で新しく導入される型変数（適当に自分で名前を決める）
// { [P in K]: T }

type Hoge = {
  a: 1
  b: 2
}

type Fuga = {
  readonly // keyof Hoge -> 'a' | 'b'
  [K in keyof Hoge]: Hoge[K][]
}

// オブジェクトのキーをゴニョゴニョしたいときにasつける
type A = { [K in keyof Hoge as `on${K}`]: true }
/* type A = {
  ona: true;
  onb: true;
}
*/
type A1<T, P extends keyof T> = {
  [K in keyof T as K extends P ? never : K]: T[K]
}
type _a = A1<Hoge, "a">

// { a: Hoge['a'][] }
// { b: Hoge['b'][] }

// template literal

type Portal = "suumo" | "homes" | "rakumachi" | "athome"
// "suumo_open_flg" | "homes_open_flg" | "rakumachi_open_flg" | "athome_open_flg"
type Flg = `${Portal}_open_flg`

// infer
// conditional typeでしか使えない
// SomeType extends OtherType ? TrueType : FalseType
// OtherTypeで infer R（適当な名前）のように書ける

// infer Element[]だと怒られる
// 期待する型引数だったとき（trueだったとき）のみさらにその引数の操作が可能
type Flatten<T> = T extends Array<infer Element> ? Element : T
// number[]
type Arr = Array<number>
type Test = Flatten<Arr>
type Test1 = Flatten<number>

// Distributive Conditional Types
type ToArray<Type> = Type extends any ? Type[] : never

// string extends any ? string[] : never | number extends any ? number[] : never
type StrArrOrNumArr = ToArray<string | number> // string[] | number[] , not Array<string | number>
//   ToArray<string> | ToArray<number>;
