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

type FlattenOnce<T extends any[]> = T extends [infer F, ...infer L]
  ? F extends any[]
    ? [...F, ...FlattenOnce<L>]
    : [F, ...FlattenOnce<L>]
  : T

type HasFlatten<T extends any[]> = T extends [infer F, ...infer L]
  ? F extends any[]
    ? false
    : HasFlatten<L>
  : true

type FlattenDepth<
  T extends any[],
  C extends number = 1,
  D extends any[] = []
> = HasFlatten<T> extends true
  ? T
  : D["length"] extends C
  ? T
  : D extends [...infer A]
  ? FlattenDepth<FlattenOnce<T>, C, [unknown, ...A]>
  : never

type X<T extends any[] = [], C extends number = 1> = T["length"] extends C
  ? true
  : false

/* _____________ テストケース _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

type cases = [
  X,
  FlattenOnce<[1, 2, [3, 4], [[5]]]>,
  FlattenDepth<[1, 2, [3, 4], [[5]]]>,
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
