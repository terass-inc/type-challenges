/*
  2070 - Drop Char
  -------
  by CaptainOfPhB (@CaptainOfPhB) #中級 #template-literal #infer

  ### 質問

  Drop a specified char from a string.

  For example:

  ```ts
  type Butterfly = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'
  ```

  > GitHubで確認する：https://tsch.js.org/2070/ja
*/

/* _____________ ここにコードを記入 _____________ */

// echizen
type DropChar<
  S extends string,
  C extends string
> = S extends `${infer Start}${infer Rest}`
  ? Start extends C
    ? DropChar<Rest, C>
    : `${Start}${DropChar<Rest, C>}`
  : ''

// kosaka
type __DropChar<S, C> = S extends `${infer F}${infer L}`
  ? F extends C
    ? DropChar<L, C>
    : `${F}${DropChar<L, C>}`
  : S

type ____DropChar<
  S extends string,
  C extends string
> = S extends `${infer H}${C}${infer T}`
  ? `${H}${DropChar<T, C>}`
  : S extends C
  ? ''
  : S

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  // @ts-expect-error
  Expect<Equal<DropChar<'butter fly!', ''>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', '!'>, 'butter fly'>>,
  Expect<Equal<DropChar<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/2070/answer/ja
  > 解答を見る：https://tsch.js.org/2070/solutions
  > その他の課題：https://tsch.js.org/ja
*/
