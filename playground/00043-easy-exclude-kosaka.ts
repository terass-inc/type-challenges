/*
  43 - Exclude
  -------
  by Zheeeng (@zheeeng) #初級 #built-in #union

  ### 質問

  組み込みの型ユーティリティ`Exclude <T, U>`を使用せず、`U`に割り当て可能な型を`T`から除外する型を実装します。

  例えば：

  ```ts
  type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
  ```

  > GitHubで確認する：https://tsch.js.org/43/ja
*/

/* _____________ ここにコードを記入 _____________ */

/* 
// https://github.com/type-challenges/type-challenges/issues/1646
In my understanding, extends in generic type will do some implicit iteration on each union type input. which means:

'a' | 'b' | 'c' extends 'a' | 'b' will do
-> 'a' extends 'a' | 'b' &&
'b' extends 'a' | 'b' &&
'c' extends 'a' | 'b' 
*/

// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types
// Distributive conditional types

type MyExclude<T, U> = T extends U ? never : T

// https://github.com/type-challenges/type-challenges/issues/19573
// type MyExclude<T, U> = {
//   [K in T extends U ? never : T as string]: K extends U ? never : K
// }[0]

type a = MyExclude<"a" | "b" | "c", "b" | "c">

/* _____________ テストケース _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

type cases = [
  Expect<Equal<MyExclude<"a" | "b" | "c", "a">, "b" | "c">>,
  Expect<Equal<MyExclude<"a" | "b" | "c", "a" | "b">, "c">>,
  Expect<
    Equal<MyExclude<string | number | (() => void), Function>, string | number>
  >
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/43/answer/ja
  > 解答を見る：https://tsch.js.org/43/solutions
  > その他の課題：https://tsch.js.org/ja
*/
