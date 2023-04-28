/*
  4518 - Fill
  -------
  by キリサメ qianxi (@qianxi0410) #中級 #tuple

  ### 質問

  `Fill`, a common JavaScript function, now let us implement it with types.
  `Fill<T, N, Start?, End?>`, as you can see,`Fill` accepts four types of parameters, of which `T` and `N` are required parameters, and `Start` and `End` are optional parameters.
  The requirements for these parameters are: `T` must be a `tuple`, `N` can be any type of value, `Start` and `End` must be integers greater than or equal to 0.

  ```ts
  type exp = Fill<[1, 2, 3], 0> // expected to be [0, 0, 0]
  ```
  In order to simulate the real function, the test may contain some boundary conditions, I hope you can enjoy it :)

  > GitHubで確認する：https://tsch.js.org/4518/ja
*/

/* _____________ ここにコードを記入 _____________ */
// kkb
type kkbFill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  Counter extends unknown[] = [],
  FillFlag extends boolean = false,
> = Start extends End
  ? T
  : T extends [infer TH, ...infer TT]
    ? FillFlag extends true
      ? End extends Counter['length']
        ? [TH, ...kkbFill<TT, N, Start, End, [unknown, ...Counter], false>]
        : [N, ...kkbFill<TT, N, Start, End, [unknown, ...Counter], true>]
      : Start extends Counter['length']
        ? [N, ...kkbFill<TT, N, Start, End, [unknown, ...Counter], true>]
        : [TH, ...kkbFill<TT, N, Start, End, [unknown, ...Counter], false>]
    : []


//  wada
type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  V extends any[] = [],
  IsReplace extends boolean = false,
> = T extends []
  ? V
  : T extends [infer F, ...infer R]
  ? Start extends End
    ? [...Fill<R, N, Start, End, [...V, F], false>]
    : IsReplace extends true
    ? V['length'] extends End
      ? [...Fill<R, N, Start, End, [...V, F], false>]
      : [...Fill<R, N, Start, End, [...V, N], true>]
    : V['length'] extends Start
    ? [...Fill<R, N, Start, End, [...V, N], true>]
    : [...Fill<R, N, Start, End, [...V, F], false>]
  : V
  
// echizen
// GPT君
type echizenFill<T extends any[], N, Start extends number = 0, End extends number = T['length']> = T extends [
  infer F,
  ...infer R,
]
  ? Start extends 0
    ? End extends 0
      ? T
      : [N, ...echizenFill<R, N, 0, End extends 1 ? 0 : End>]
    : [F, ...echizenFill<R, N, Start extends 1 ? 0 : Start, End extends 1 ? 0 : End>]
  : []


/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Fill<[], 0>, []>>,
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 20>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>,

  Expect<Equal<Fill<[1, 2, 3, 4], true, 2, 3>, [1, 2, true, 4]>>,
  Expect<Equal<echizenFill<[1, 2, 3, 4], true, 2, 3>, [1, 2, true, 4]>>, // これ通る？
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/4518/answer/ja
  > 解答を見る：https://tsch.js.org/4518/solutions
  > その他の課題：https://tsch.js.org/ja
*/
