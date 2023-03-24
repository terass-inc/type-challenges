/*
  645 - Diff
  -------
  by ZYSzys (@ZYSzys) #中級 #object

  ### 質問

  Get an `Object` that is the difference between `O` & `O1`

  > GitHubで確認する：https://tsch.js.org/645/ja
*/

/* _____________ ここにコードを記入 _____________ */

// 順序が逆だとだめ
type __Diff<O, O1> = O1 extends O
  ? Diff<O1, O>
  : {
      [P in Exclude<keyof O, keyof O1>]: O[P]
    }

// これはnever
type U = Exclude<'a' | 'b', 'a' | 'b' | 'c'>

type Diff<O, O1> = {
  [P in Exclude<keyof O, keyof O1> | Exclude<keyof O1, keyof O>]: P extends keyof O
    ? O[P]
    : P extends keyof O1
    ? O1[P]
    : never
}

type T = Diff<Foo, Bar>
type T2 = Diff<Bar, Foo>
type T3 = Diff<Foo, Coo>
type T4 = Diff<Coo, Foo>

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>,
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/645/answer/ja
  > 解答を見る：https://tsch.js.org/645/solutions
  > その他の課題：https://tsch.js.org/ja
*/
