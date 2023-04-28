/*
  5117 - Without
  -------
  by Pineapple (@Pineapple0919) #中級 #union #array

  ### 質問

  Implement the type version of Lodash.without, Without<T, U> takes an Array T, number or array U and returns an Array without the elements of U.

  ```ts
  type Res = Without<[1, 2], 1>; // expected to be [2]
  type Res1 = Without<[1, 2, 4, 1, 5], [1, 2]>; // expected to be [4, 5]
  type Res2 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>; // expected to be []
  ```

  > GitHubで確認する：https://tsch.js.org/5117/ja
*/

/* _____________ ここにコードを記入 _____________ */
// kkb
type kkbWithout<
  T extends number[],
  U extends number | number[],
  _U extends number[] = U extends number ? [U] : U,
> = T extends [infer Head, ...infer Tail extends number[]]
  ? Head extends _U[number]
    ? [...kkbWithout<Tail, U, _U>]
    : [Head, ...kkbWithout<Tail, U, _U>]
  : []

type kosakaWithout<
  T extends number[],
  U extends number[] | number
> = U extends number[]
  ? T extends [infer F, ...infer R extends number[]]
    ? F extends U[number]
      ? Without<R, U>
      : [F, ...Without<R, U>]
    : []
  : U extends number
  ? Without<T, [U]>
  : never

// 型の制約は、U extends any[]するなら要らない
type echizenWithout<T extends any[], U extends any | any[]> = T extends [infer F, ...infer R]
  ? F extends (U extends any[] ? U[number] : U)
    ? echizenWithout<R, U>
    : [F, ...echizenWithout<R, U>]
  : []

// >>>>>>>>BEST<<<<<<<<<
type koikeWithout<T, U> = T extends [infer Head, ...infer Tail]
  ? Head extends (U extends any[] ? U[number] : U)
    ? koikeWithout<Tail, U>
    : [Head, ...koikeWithout<Tail, U>]
  : []

//wada
type Without<
  T,
  U,
  V = U extends any[] ? U[number] : U, // UNION!
> = T extends [infer F, ...infer R]
  ? F extends V
    ? Without<R, any, V>
    : [F, ...Without<R, any, V>]
  : []

// nakano
type Value<T extends number | number[]> = T extends number[] ? T[number] : T
type Without<T extends any[], U extends number | number[]> = T extends [infer A, ...infer B] ? A extends Value<U> ? Without<B, U>  : [A, ...Without<B, U>] :[]

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/5117/answer/ja
  > 解答を見る：https://tsch.js.org/5117/solutions
  > その他の課題：https://tsch.js.org/ja
*/
