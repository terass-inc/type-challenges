/*
  3243 - FlattenDepth
  -------
  by jiangshan (@jiangshanmeta) #中級 #array

  ### 質問

  Recursively flatten array up to depth times.

  For example:

  ```typescript
  type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
  type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
  ```

  If the depth is provided, it's guaranteed to be positive integer.

  > GitHubで確認する：https://tsch.js.org/3243/ja
*/

/* _____________ ここにコードを記入 _____________ */

type FlattenDepth<Arr, Depth extends number = 1> = Arr extends [
  infer H,
  ...infer Tail
]
  ? [
      ...(H extends any[]
        ? Depth extends 0
          ? [H]
          : FlattenDepth<H, MinusOne<Depth>>
        : [H]),
      ...FlattenDepth<Tail, Depth>
    ]
  : []

// https://github.com/type-challenges/type-challenges/issues/13507
type ParseInt<T extends string> = T extends `${infer Digit extends number}`
  ? Digit
  : never
type ReverseString<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${ReverseString<Rest>}${First}`
  : ""
type RemoveLeadingZeros<S extends string> = S extends "0"
  ? S
  : S extends `${"0"}${infer R}`
  ? RemoveLeadingZeros<R>
  : S
type InternalMinusOne<S extends string> =
  S extends `${infer Digit extends number}${infer Rest}`
    ? Digit extends 0
      ? `9${InternalMinusOne<Rest>}`
      : `${[9, 0, 1, 2, 3, 4, 5, 6, 7, 8][Digit]}${Rest}`
    : never
type MinusOne<T extends number> = ParseInt<
  RemoveLeadingZeros<ReverseString<InternalMinusOne<ReverseString<`${T}`>>>>
>

/* _____________ テストケース _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

type cases = [
  FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>,
  FlattenDepth<[1, [2, [3, [4, [5]]]]]>,
  FlattenDepth<[1, 2, [3, 4], [[[5]]]]>,
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<
    Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>
  >
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/3243/answer/ja
  > 解答を見る：https://tsch.js.org/3243/solutions
  > その他の課題：https://tsch.js.org/ja
*/
