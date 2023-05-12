/*
  4425 - Greater Than
  -------
  by ch3cknull (@ch3cknull) #中級 #array

  ### 質問

  In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`

  Negative numbers do not need to be considered.

  For example

  ```ts
  GreaterThan<2, 1> //should be true
  GreaterThan<1, 1> //should be false
  GreaterThan<10, 100> //should be false
  GreaterThan<111, 11> //should be true
  ```

  Good Luck!

  > GitHubで確認する：https://tsch.js.org/4425/ja
*/

/* _____________ ここにコードを記入 _____________ */

type StringToTuple<T extends number> =
  `${T}` extends `${infer Head extends number}${infer Tail extends number}`
    ? [Head, ...StringToTuple<Tail>]
    : [T]

// type GreaterThan<T extends number, U extends number> = {
//   [N in keyof StringToTuple<T>]: Compare<
//     StringToTuple<T>[N],
//     StringToTuple<U>[N]
//   >
// }

type GreaterThan<
  T extends number,
  U extends number,
  C extends any[] = []
> = `${T}`["length"] extends C["length"]
  ? []
  : [
      Compare<StringToTuple<T>[C["length"]], StringToTuple<U>[C["length"]]>,
      ...GreaterThan<T, U, [0, ...C]>
    ]

type Compare<A extends number, B extends number> = [A, B] extends
  | [0, 0]
  | [0, 1]
  | [0, 2]
  | [0, 3]
  | [0, 4]
  | [0, 5]
  | [0, 6]
  | [0, 7]
  | [0, 8]
  | [0, 9]
  | [1, 2]
  | [1, 3]
  | [1, 4]
  | [1, 5]
  | [1, 6]
  | [1, 7]
  | [1, 8]
  | [1, 9]
  | [2, 3]
  | [2, 4]
  | [2, 5]
  | [2, 6]
  | [2, 7]
  | [2, 8]
  | [2, 9]
  | [3, 4]
  | [3, 5]
  | [3, 6]
  | [3, 7]
  | [3, 8]
  | [3, 9]
  | [4, 5]
  | [4, 6]
  | [4, 7]
  | [4, 8]
  | [4, 9]
  | [5, 6]
  | [5, 7]
  | [5, 8]
  | [5, 9]
  | [6, 7]
  | [6, 8]
  | [6, 9]
  | [7, 8]
  | [7, 9]
  | [8, 9]
  ? false
  : true

/* _____________ テストケース _____________ */
import type { Debug, Equal, Expect } from "@type-challenges/utils"

type cases = [
  GreaterThan<20, 20>,
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/4425/answer/ja
  > 解答を見る：https://tsch.js.org/4425/solutions
  > その他の課題：https://tsch.js.org/ja
*/
