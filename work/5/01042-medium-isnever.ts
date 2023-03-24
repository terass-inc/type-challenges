/*
  1042 - IsNever
  -------
  by hiroya iizuka (@hiroyaiizuka) #中級 #union #utils

  ### 質問

  Implement a type IsNever, which takes input type `T`.
  If the type of resolves to `never`, return `true`, otherwise `false`.

  For example:

  ```ts
  type A = IsNever<never>  // expected to be true
  type B = IsNever<undefined> // expected to be false
  type C = IsNever<null> // expected to be false
  type D = IsNever<[]> // expected to be false
  type E = IsNever<number> // expected to be false
  ```

  > GitHubで確認する：https://tsch.js.org/1042/ja
*/

/* _____________ ここにコードを記入 _____________ */
// https://scrapbox.io/mrsekut-p/T_%E3%81%8Cnever%E3%81%AE%E6%99%82%E3%81%AE%E3%80%81T_extends_.._%E3%81%AF%E3%80%81%E5%95%8F%E7%AD%94%E7%84%A1%E7%94%A8%E3%81%A7never%E3%81%AB%E3%81%AA%E3%82%8B

type IsNever<T> = [T] extends [never] ? true : false

const n: never = 1 as never

/* _____________ テストケース _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

type cases = [
  IsNever<never>,
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<never | string>, false>>,
  Expect<Equal<IsNever<"">, false>>,
  Expect<Equal<IsNever<undefined>, false>>,
  Expect<Equal<IsNever<null>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<{}>, false>>
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/1042/answer/ja
  > 解答を見る：https://tsch.js.org/1042/solutions
  > その他の課題：https://tsch.js.org/ja
*/
