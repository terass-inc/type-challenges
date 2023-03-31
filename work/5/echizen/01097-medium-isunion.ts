/*
  1097 - IsUnion
  -------
  by null (@bencor) #中級 #union

  ### 質問

  Implement a type `IsUnion`, which takes an input type `T` and returns whether `T` resolves to a union type.

  For example:

    ```ts
    type case1 = IsUnion<string>  // false
    type case2 = IsUnion<string|number>  // true
    type case3 = IsUnion<[string|number]>  // false
    ```

  > GitHubで確認する：https://tsch.js.org/1097/ja
*/

/* _____________ ここにコードを記入 _____________ */

/**
 * 'a' | 'b' extends 'a' | 'b'
 *
 * Tが分配されるならunion, されないなら unionでない
 * 'a' extends 'a' | 'b' -> true
 * 'a' | 'b' extends 'a' -> false
 *
 * [U] extends [T] で 分配前 extends 分配後 をして判定
 *
 * ただしこれだとTがneverの場合に
 * never extends neverでneverになるのでだめ
 */
type _IsUnion<T, U = T> = T extends T ? ([U] extends [T] ? false : true) : never

// 初めにneverかどうかの判定を入れる
type IsUnion<T, U = T> = [T] extends [never] ? false : T extends T ? ([U] extends [T] ? false : true) : never

type T = IsUnion<'a' | 'b'>
type T2 = IsUnion<'a'>
type T3 = _IsUnion<never>
type T4 = _IsUnion<never>

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<'a' | 'b' | 'c' | 'd'>, true>>,
  Expect<Equal<IsUnion<undefined | null | void | ''>, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | 'a'>, false>>,
  Expect<Equal<IsUnion<never>, false>>,
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/1097/answer/ja
  > 解答を見る：https://tsch.js.org/1097/solutions
  > その他の課題：https://tsch.js.org/ja
*/
