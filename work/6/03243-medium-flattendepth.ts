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

type AAA = ParseInt<"-123.1">
type TT = ParseInt<"aa">
type X = `${number}`
const a: X = "123"
const b: X = "SSX"

type ReverseString<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${ReverseString<Rest>}${First}`
  : ""

type RR = ReverseString<"asdf">

type RemoveLeadingZeros<S extends string> = S extends "0"
  ? S
  : S extends `${"0"}${infer R}`
  ? RemoveLeadingZeros<R>
  : S

type RRR = RemoveLeadingZeros<"0123">

// 01
// 90

// 10
// 00

// 10
// 01
// 90
// 09
// 9

type InternalMinusOne<S extends string> =
  S extends `${infer Digit extends number}${infer Rest}`
    ? Digit extends 9
      ? `0${InternalMinusOne<Rest>}`
      : `${[1, 2, 3, 4, 5, 6, 7, 8, 9, 0][Digit]}${Rest}`
    : never
type MinusOne<T extends number> = ParseInt<
  RemoveLeadingZeros<ReverseString<InternalMinusOne<ReverseString<`${T}`>>>>
>

type P = MinusOne<9>

type kosakaFlattenOnce<T extends any[]> = T extends [infer F, ...infer L]
  ? F extends any[]
    ? [...F, ...kosakaFlattenOnce<L>]
    : [F, ...kosakaFlattenOnce<L>]
  : T

type kosakaHasFlatten<T extends any[]> = T extends [infer F, ...infer L]
  ? F extends any[]
    ? false
    : kosakaHasFlatten<L>
  : true

type kosakaFlattenDepth<
  T extends any[],
  C extends number = 1,
  D extends any[] = []
> = kosakaHasFlatten<T> extends true // フラットにできんの？
  ? T
  : D["length"] extends C
  ? T
  : D extends [...infer A]
  ? kosakaFlattenDepth<kosakaFlattenOnce<T>, C, [unknown, ...A]>
  : never

type __FlattenDepth<
  T,
  N extends number = 1,
  _T extends any[] = []
> = T extends [infer H, ...infer B]
  ? _T extends { length: N }
    ? [H, ...FlattenDepth<B, N, _T>]
    : [...FlattenDepth<H, N, [..._T, any]>, ...FlattenDepth<B, N, _T>]
  : T extends any[]
  ? T
  : [T]

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
;[1, 2]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/3243/answer/ja
  > 解答を見る：https://tsch.js.org/3243/solutions
  > その他の課題：https://tsch.js.org/ja
*/
