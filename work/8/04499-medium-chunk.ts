/*
  4499 - Chunk
  -------
  by キリサメ qianxi (@qianxi0410) #中級 #tuple

  ### 質問

  Do you know `lodash`? `Chunk` is a very useful function in it, now let's implement it.
  `Chunk<T, N>` accepts two required type parameters, the `T` must be a `tuple`, and the `N` must be an `integer >=1`

  ```ts
  type exp1 = Chunk<[1, 2, 3], 2> // expected to be [[1, 2], [3]]
  type exp2 = Chunk<[1, 2, 3], 4> // expected to be [[1, 2, 3]]
  type exp3 = Chunk<[1, 2, 3], 1> // expected to be [[1], [2], [3]]
  ```

  > GitHubで確認する：https://tsch.js.org/4499/ja
*/

/* _____________ ここにコードを記入 _____________ */
// kkb
type kkbChunk<T extends any[], U extends number, V extends any[] = []> = T extends [infer TH, ...infer TT]
  ? V['length'] extends U
    ? [V, ...kkbChunk<TT, U, [TH]>]
    : kkbChunk<TT, U, [...V, TH]>
  : V extends []
    ? []
    : [V]


// S, Resultはイテレーション間で結果を持ち越すためのやつ
// Sには長さNに達するまでTの各要素を追加していく
// Resultは結果を溜めるためのやつ
type echizenChunk<T extends any[], N extends number, S extends any[] = [], Result extends any[] = []> =
  // Tが空ならResultを返す
  // [...Result, S] だけで済ませたいが、Sが空の場合に最後に要らない空配列が入ってしまうため
  T extends []
    ? S extends []
      ? Result
      : [...Result, S]
    : T extends [infer F, ...infer R]
    ? // SにFを追加して、長さNになったらResultに追加してSは[]に戻す。まだ長さNでないならSにFを追加して続行
      [...S, F]['length'] extends N
      ? echizenChunk<R, N, [], [...Result, [...S, F]]>
      : echizenChunk<R, N, [...S, F], Result>
    : never

    // nakano
    // [1,2,3,4,5] ,3 -> [[1,2,3],4,5]
    // [1,2,3,4,5]  , 10  -> [1,2,3,4,5]
    type HeadN<T extends any[], N extends number> = T extends [...infer H, infer F]
  ? H['length'] extends N
    ? [H, F]
    : [...HeadN<H, N>, F]
  : []
type Tranform<T extends any[], N extends number> = HeadN<T, N> extends infer U
  ? U extends []
    ? []
    : U extends T
    ? [T]
    : U
  : never
type Chunk<T extends any[], N extends number> = Tranform<
  T,
  N
> extends infer U extends any[]
  ? U extends [infer H, ...infer R]
    ? [H, ...Chunk<R, N>]
    : U
  : never



//wada
type wadaChunk<
  T extends any[],
  U extends number,
  V extends any[] = [],
> = V['length'] extends U
  ? [V, ...wadaChunk<T, U>]
  : T extends [infer F, ...infer Rest]
  ? wadaChunk<Rest, U, [...V, F]>
  : V extends []
  ? []
  : [V]
  
/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>,
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/4499/answer/ja
  > 解答を見る：https://tsch.js.org/4499/solutions
  > その他の課題：https://tsch.js.org/ja
*/
