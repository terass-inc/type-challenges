/*
  1130 - ReplaceKeys
  -------
  by 贱贱 (@lullabyjune) #中級 #object-keys

  ### 質問

  Implement a type ReplaceKeys, that replace keys in union types, if some type has not this key, just skip replacing,
  A type takes three arguments.


  For example:

  ```ts
  type NodeA = {
    type: 'A'
    name: string
    flag: number
  }

  type NodeB = {
    type: 'B'
    id: number
    flag: number
  }

  type NodeC = {
    type: 'C'
    name: string
    flag: number
  }


  type Nodes = NodeA | NodeB | NodeC

  type ReplacedNodes = ReplaceKeys<Nodes, 'name' | 'flag', {name: number, flag: string}> // {type: 'A', name: number, flag: string} | {type: 'B', id: number, flag: string} | {type: 'C', name: number, flag: string} // would replace name from string to number, replace flag from number to string.

  type ReplacedNotExistKeys = ReplaceKeys<Nodes, 'name', {aa: number}> // {type: 'A', name: never, flag: number} | NodeB | {type: 'C', name: never, flag: number} // would replace name to never
  ```

  > GitHubで確認する：https://tsch.js.org/1130/ja
*/

/* _____________ ここにコードを記入 _____________ */

// わからん
type ReplaceKeys<U, T, Y> = U extends U ? {[P in keyof T] : P extends keyof U ? } :never



type Foo = {
  hoge: string
  fuga: number
}

type Bar = {
  aaa: boolean
  bbb: string
  hoge: number
}

// Foo & Barだと、「FooでもありBarでもある」なので両方のプロパティを必ず持ったオブジェクトになる
// （ただし、hogeは number & string型でnever型となる
type FooAndBar = Foo & Bar
// なので、以下のように全てのプロパティ名のユニオン方になる
// type KI = "aaa" | "hoge" | "fuga" | "bbb"
type KI = keyof FooAndBar

// Foo | Barだと、「FooもしくはBarである」なので、共通している 'hoge'しかkeyにならない
// FooOrBar型のオブジェクトで、アクセスできるプロパティはhogeだけ
type FooOrBar = Foo | Bar
// type KU = "hoge"
type KU = keyof FooOrBar

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type NodeA = {
  type: 'A'
  name: string
  flag: number
}

type NodeB = {
  type: 'B'
  id: number
  flag: number
}

type NodeC = {
  type: 'C'
  name: string
  flag: number
}

type ReplacedNodeA = {
  type: 'A'
  name: number
  flag: string
}

type ReplacedNodeB = {
  type: 'B'
  id: number
  flag: string
}

type ReplacedNodeC = {
  type: 'C'
  name: number
  flag: string
}

type NoNameNodeA = {
  type: 'A'
  flag: number
  name: never
}

type NoNameNodeC = {
  type: 'C'
  flag: number
  name: never
}

type Nodes = NodeA | NodeB | NodeC
type ReplacedNodes = ReplacedNodeA | ReplacedNodeB | ReplacedNodeC
type NodesNoName = NoNameNodeA | NoNameNodeC | NodeB

type cases = [
  Expect<Equal<ReplaceKeys<Nodes, 'name' | 'flag', { name: number; flag: string }>, ReplacedNodes>>,
  Expect<Equal<ReplaceKeys<Nodes, 'name', { aa: number }>, NodesNoName>>,
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/1130/answer/ja
  > 解答を見る：https://tsch.js.org/1130/solutions
  > その他の課題：https://tsch.js.org/ja
*/
