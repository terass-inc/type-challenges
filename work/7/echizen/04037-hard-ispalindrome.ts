/*
  4037 - IsPalindrome
  -------
  by jiangshan (@jiangshanmeta) #上級 #string

  ### 質問

  Implement type ```IsPalindrome<T>``` to check whether  a string or number is palindrome.

  For example:

  ```typescript
  IsPalindrome<'abc'> // false
  IsPalindrome<121> // true
  ```

  > GitHubで確認する：https://tsch.js.org/4037/ja
*/

/* _____________ ここにコードを記入 _____________ */

// やりたいのは T extends Reverse<T> ? true : false 的なやつ
type EchizenIsPalindrome<T extends number | string> = `${T}` extends Reverse<`${T}`> ? true : false
type Reverse<T extends string> = T extends `${infer F}${infer Rest}` ? `${Reverse<Rest>}${F}` : ''

// kosaka
type kosakaReverseString<T, A extends string = ''> = T extends `${infer F}${infer R}`
  ? kosakaReverseString<R, `${F}${A}`>
  : A

type kosakaIsPalindrome<T extends string | number> = `${T}` extends kosakaReverseString<`${T}`> ? true : false

type koikeIsPalindrome<T extends string | number> = T extends ''
  ? true
  : `${T}` extends `${infer H}${infer B}`
  ? B extends ''
    ? true
    : B extends `${infer R}${H}`
    ? koikeIsPalindrome<R>
    : false
  : false

// kkb
/*
type ToArray<T extends string | number | any[]> = T extends any[]
  ? T
  : T extends string
  ? T extends `${infer Head}${infer Tail}`
    ? [Head, ...ToArray<Tail>]
    : []
  : ToArray<`${T}`>

type fuga = ToArray<'abc'>
type hogehoge = [1, 2, 3]['length']
type fugafuga = Equal<1, 1>

type IsPalindrome<T extends number | string | any[]> = ToArray<T> extends infer U
  ? U['length'] extends 1
    ? true
    : U extends [infer Head, ...infer Mid, infer Tail]
    ? Equal<Head, Tail> extends true
      ? IsPalindrome<Mid>
      : false
    : never
  : never
*/

type ToArray<T extends string> = T extends any[]
  ? T
  : T extends string
  ? T extends `${infer Head}${infer Tail}`
    ? [Head, ...ToArray<Tail>]
    : []
  : ToArray<T>

type IsPalindrome<T extends number | string, _T extends any[] = ToArray<`${T}`>> = _T['length'] extends 1
  ? true
  : _T extends [infer Head, ...infer Mid, infer Tail]
  ? Equal<Head, Tail> extends true
    ? IsPalindrome<T, Mid>
    : false
  : never

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsPalindrome<'abc'>, false>>,
  Expect<Equal<IsPalindrome<'b'>, true>>,
  Expect<Equal<IsPalindrome<'abca'>, false>>,
  Expect<Equal<IsPalindrome<'abcba'>, true>>,
  Expect<Equal<IsPalindrome<121>, true>>,
  Expect<Equal<IsPalindrome<19260817>, false>>,
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/4037/answer/ja
  > 解答を見る：https://tsch.js.org/4037/solutions
  > その他の課題：https://tsch.js.org/ja
*/
