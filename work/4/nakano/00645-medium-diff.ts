/*
  645 - Diff
  -------
  by ZYSzys (@ZYSzys) #中級 #object

  ### 質問

  Get an `Object` that is the difference between `O` & `O1`

  > GitHubで確認する：https://tsch.js.org/645/ja
*/

/* _____________ ここにコードを記入 _____________ */

type Diff<O, O1> = {
  [K in keyof O | keyof O1 as K extends keyof O
    ? K extends keyof O1
      ? never
      : K
    : K]: K extends keyof O ? O[K] : K extends keyof O1 ? O1[K] : never
}

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
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/645/answer/ja
  > 解答を見る：https://tsch.js.org/645/solutions
  > その他の課題：https://tsch.js.org/ja
*/
