/*
  4182 - Fibonacci Sequence
  -------
  by windliang (@wind-liang) #中級

  ### 質問

  Implement a generic `Fibonacci<T>` that takes a number `T` and returns its corresponding [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number).

  The sequence starts:
  1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...

  For example
  ```ts
  type Result1 = Fibonacci<3> // 2
  type Result2 = Fibonacci<8> // 21
  ```

  > GitHubで確認する：https://tsch.js.org/4182/ja
*/

/* _____________ ここにコードを記入 _____________ */

type kosakaFibonacci<
  T extends number,
  CurrentIndex extends number[] = [1],
  PrevFib extends number[] = [],
  CurrentFib extends number[] = [1],
> = T extends CurrentIndex['length']
  ? CurrentFib['length']
  : kosakaFibonacci<T, [1, ...CurrentIndex], CurrentFib, [...PrevFib, ...CurrentFib]>
type K = kosakaFibonacci<20>
type koikeFibonacci1<T extends number> = [0, 1, 1, 2, 3, 5, 8, 13, 21][T]

// kkb
type kkbFibonacci<
  T extends number,
  C extends unknown[] = [unknown, unknown, unknown],
  A extends unknown[] = [unknown],
  B extends unknown[] = [unknown],
> = T extends 1 | 2
  ? 1
  : C['length'] extends T
  ? [...A, ...B]['length']
  : kkbFibonacci<T, [...C, unknown], B, [...A, ...B]>
  type KK = kkbFibonacci<20>

// wada
type NumToArr<T extends number, U extends any[] = []> = U['length'] extends T ? U : NumToArr<T, [...U, any]>

type Add<X extends number, Y extends number> = [
  ...NumToArr<X>,
  ...NumToArr<Y>,
]['length'] extends infer Sum extends number
  ? Sum
  : never

type wadaFibonacci<
  T extends number,
  U extends [number, number] = [0, 1],
  Current extends number = 1,
> = Current extends T ? U[1] : wadaFibonacci<T, [U[1], Add<U[0], U[1]>], Add<Current, 1>>
// ~wada
type W = wadaFibonacci<17>

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/4182/answer/ja
  > 解答を見る：https://tsch.js.org/4182/solutions
  > その他の課題：https://tsch.js.org/ja
*/
