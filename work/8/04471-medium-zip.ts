/*
  4471 - Zip
  -------
  by キリサメ qianxi (@qianxi0410) #中級 #tuple

  ### 質問

  In This Challenge, You should implement a type `Zip<T, U>`, T and U must be `Tuple`
  ```ts
  type exp = Zip<[1, 2], [true, false]> // expected to be [[1, true], [2, false]]
  ```

  > GitHubで確認する：https://tsch.js.org/4471/ja
*/

/* _____________ ここにコードを記入 _____________ */

type kosakaZip<T extends any[], U extends any[]> = T extends [infer A, ...infer B]
  ? U extends [infer C, ...infer D]
    ? [[A, C], ...kosakaZip<B, D>]
    : []
  : []

type echizenZip<T, U> = [T, U] extends [[infer TF, ...infer TR], [infer UF, ...infer UR]]
 ? [[TF, UF], ...echizenZip<TR, UR>] 
 : []


type koikeZip<T, U> = [T, U] extends [
    [infer THead, ...infer TRest],
    [infer UHead, ...infer URest]
  ]
    ? [[THead, UHead], ...Zip<TRest, URest>]
    : []
    
    
// kkb
type kkbZip<T extends any[], U extends any[]> = T extends [infer TH, ...infer TT]
  ? U extends [infer UH, ...infer UT]
    ? [[TH, UH], ...kkbZip<TT, UT>]
    : []
  : []

// hayashi
type hysZip<T extends any[], U extends any[]> = T extends [infer F, ...infer L]
  ? U extends [infer T, ...infer K]
    ? [[F, T], ...hysZip<L, K>]
    : []
  : []

//wada
type wadaZip<
  T extends any[],
  U extends any[],
  V extends any[] = [],
> = V['length'] extends T['length']
  ? V
  : V['length'] extends U['length']
  ? V
  : wadaZip<T, U, [...V, [T[V['length']], U[V['length']]]]>

  // nakano
  type Zip<T extends any[], U extends any[]> = Filter<{
    [A in keyof T]: [T[A], A extends keyof U ? U[A] : never]
  }>
  type Filter<T extends any[]> = T extends [
    infer H,
    ...infer T extends [any, any][]
  ]
    ? H extends [any, never]
      ? Filter<T>
      : [H, ...Filter<T>]
    : []
  
/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>,
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/4471/answer/ja
  > 解答を見る：https://tsch.js.org/4471/solutions
  > その他の課題：https://tsch.js.org/ja
*/
