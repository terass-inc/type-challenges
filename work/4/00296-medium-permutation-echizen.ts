/*
  296 - Permutation
  -------
  by Naoto Ikuno (@pandanoir) #中級 #union

  ### 質問

  Union 型を Union 型の値の順列を含む配列に変換する順列型を実装します。

  ```typescript
  type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
  ```

  > GitHubで確認する：https://tsch.js.org/296/ja
*/

/* _____________ ここにコードを記入 _____________ */

type A1<T> = [T]
type T1 = A1<'A' | 'B' | 'C'>

// distributiveにする
type A2<T> = T extends T ? [T] : never
type T2 = A2<'A' | 'B' | 'C'>
/**
 * 'A' extends 'A' ? ['A', ...A3<'B' | 'C'>]: never
 *
 * 次は 'B' | 'C'でdistributiveになる
 * 'B' extends 'B' ? ['B', ...A3<'C'>]: never
 * 'C' extends 'C' ? ['C', ...A3<never>]: never
 *
 * T extends never ? ... だとなぜダメ？
 */

type A3<T, K = T> = T extends never ? [] : T extends T ? [T, ...A3<Exclude<K, T>>] : never
type T3 = A3<'A' | 'B' | 'C'>

// neverになる
type S = ['A', 'B', 'C', ...never]

// type Permutation<T, K = T> = T extends T ? [T, ...Permutation<Exclude<K, T>>] : []
type Permutation<T, K = T> = [T] extends [never] ? [] : T extends T ? [T, ...Permutation<Exclude<K, T>>] : never

type T = Permutation<'A' | 'B' | 'C'>

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<
    Equal<
      Permutation<'A' | 'B' | 'C'>,
      ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
    >
  >,
  Expect<
    Equal<
      Permutation<'B' | 'A' | 'C'>,
      ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
    >
  >,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>,
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/296/answer/ja
  > 解答を見る：https://tsch.js.org/296/solutions
  > その他の課題：https://tsch.js.org/ja
*/
