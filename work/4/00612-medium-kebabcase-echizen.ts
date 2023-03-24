/*
  612 - KebabCase
  -------
  by Johnson Chu (@johnsoncodehk) #中級 #template-literal

  ### 質問

  キャメルケースもしくはパスカルケースの文字列を、ケバブケースに置換する方を実装します。

  `FooBarBaz` -> `foo-bar-baz`

  例えば

  ```ts
  type FooBarBaz = KebabCase<"FooBarBaz">;
  const foobarbaz: FooBarBaz = "foo-bar-baz";

  type DoNothing = KebabCase<"do-nothing">;
  const doNothing: DoNothing = "do-nothing";
  ```

  > GitHubで確認する：https://tsch.js.org/612/ja
*/

import { Equal } from "@type-challenges/utils"

/* _____________ ここにコードを記入 _____________ */

type Capital =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z"

// 初めに大文字が来た場合の処理が出来ない
type _KebabCase<S extends string> = S extends `${infer First}${infer Rest}`
  ? First extends Capital
    ? `-${Lowercase<First>}${KebabCase<Rest>}`
    : `${First}${KebabCase<Rest>}`
  : ""

// Restを見る
type KebabCase<S extends string> = S extends `${infer First}${infer Rest}`
  ? Rest extends Uncapitalize<Rest>
    ? `${Lowercase<First>}${KebabCase<Rest>}`
    : // oBarBaz -> o-BarBaz
      `${Lowercase<First>}-${KebabCase<Rest>}`
  : ""

type __KebabCase<S extends string, U extends boolean = true> = U extends true
  ? __KebabCase<Uncapitalize<S>, false>
  : S extends `${infer F}${infer L}`
  ? F extends Lowercase<F>
    ? `${F}${__KebabCase<L, false>}`
    : `-${Lowercase<F>}${__KebabCase<L, false>}`
  : S

type T = KebabCase<"FooBarBaz">
type T2 = KebabCase<"foo-bar">
type T3 = KebabCase<"ABC">

/* _____________ テストケース _____________ */
import type { Expect } from "@type-challenges/utils"

type cases = [
  Expect<Equal<KebabCase<"FooBarBaz">, "foo-bar-baz">>,
  Expect<Equal<KebabCase<"fooBarBaz">, "foo-bar-baz">>,
  Expect<Equal<KebabCase<"foo-bar">, "foo-bar">>,
  Expect<Equal<KebabCase<"foo_bar">, "foo_bar">>,
  Expect<Equal<KebabCase<"Foo-Bar">, "foo--bar">>,
  Expect<Equal<KebabCase<"ABC">, "a-b-c">>,
  Expect<Equal<KebabCase<"-">, "-">>,
  Expect<Equal<KebabCase<"">, "">>,
  Expect<Equal<KebabCase<"😎">, "😎">>
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/612/answer/ja
  > 解答を見る：https://tsch.js.org/612/solutions
  > その他の課題：https://tsch.js.org/ja
*/
