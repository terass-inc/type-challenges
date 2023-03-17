/*
  189 - Awaited
  -------
  by Maciej Sikora (@maciejsikora) #初級 #promise #built-in

  ### 質問

  Promise ライクな型が内包する型をどのように取得すればよいでしょうか。

  例えば：`Promise<ExampleType>`という型がある場合、どのようにして ExampleType を取得すればよいでしょうか。

  ```ts
  type ExampleType = Promise<string>

  type Result = MyAwaited<ExampleType> // string
  ```

  > この問題の元記事は [original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4) by [@maciejsikora](https://github.com/maciejsikora) です。

  > GitHubで確認する：https://tsch.js.org/189/ja
*/

/* _____________ ここにコードを記入 _____________ */

// 初稿 type MyAwaited<T> = T extends PromiseLike<infer P> ? MyAwaited<P> : T
// 結果同じに...
type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer P>
  ? P extends PromiseLike<any>
    ? MyAwaited<P>
    : P
  : T

/* type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer S>
  ? S extends PromiseLike<any>
    ? MyAwaited<S>
    : S
  : T
 */
/* _____________ テストケース _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type Z1 = Promise<Promise<Promise<string | boolean>>>
type T = { then: (onfulfilled: (arg: number) => any) => any }

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>
]

// @ts-expect-error
type error = MyAwaited<number>

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/189/answer/ja
  > 解答を見る：https://tsch.js.org/189/solutions
  > その他の課題：https://tsch.js.org/ja
*/
