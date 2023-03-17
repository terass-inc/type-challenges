/*
  110 - Capitalize
  -------
  by Anthony Fu (@antfu) #中級 #template-literal

  ### 質問

  文字列の最初の文字を大文字に変換し、それ以外はそのままにする `Capitalize<T>` を実装します。

  例えば

  ```ts
  type capitalized = Capitalize<'hello world'> // expected to be 'Hello world'
  ```

  > GitHubで確認する：https://tsch.js.org/110/ja
*/

/* _____________ ここにコードを記入 _____________ */
type CharMap = {
  a: "A"
  b: "B"
  c: "C"
  d: "D"
  e: "E"
  f: "F"
  g: "G"
  h: "H"
  i: "I"
  j: "J"
  k: "K"
  l: "L"
  m: "M"
  n: "N"
  o: "O"
  p: "P"
  q: "Q"
  r: "R"
  s: "S"
  t: "T"
  u: "U"
  v: "V"
  w: "W"
  x: "X"
  y: "Y"
  z: "Z"
}

type Upper<S extends string> = S extends keyof CharMap ? CharMap[S] : S
type MyCapitalize<S extends string> = S extends `${infer F}${infer P}`
  ? `${Upper<F>}${P}`
  : S

type MyCapitalize<S extends string> = S extends `${infer Head}${infer Tail}`
  ? `${Uppercase<Head>}${Tail}`
  : S

/* _____________ テストケース _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

type cases = [
  MyCapitalize<"a">,
  MyCapitalize<"ab">,
  Expect<Equal<MyCapitalize<"foobar">, "Foobar">>,
  Expect<Equal<MyCapitalize<"FOOBAR">, "FOOBAR">>,
  Expect<Equal<MyCapitalize<"foo bar">, "Foo bar">>,
  Expect<Equal<MyCapitalize<"">, "">>,
  Expect<Equal<MyCapitalize<"a">, "A">>,
  Expect<Equal<MyCapitalize<"b">, "B">>,
  Expect<Equal<MyCapitalize<"c">, "C">>,
  Expect<Equal<MyCapitalize<"d">, "D">>,
  Expect<Equal<MyCapitalize<"e">, "E">>,
  Expect<Equal<MyCapitalize<"f">, "F">>,
  Expect<Equal<MyCapitalize<"g">, "G">>,
  Expect<Equal<MyCapitalize<"h">, "H">>,
  Expect<Equal<MyCapitalize<"i">, "I">>,
  Expect<Equal<MyCapitalize<"j">, "J">>,
  Expect<Equal<MyCapitalize<"k">, "K">>,
  Expect<Equal<MyCapitalize<"l">, "L">>,
  Expect<Equal<MyCapitalize<"m">, "M">>,
  Expect<Equal<MyCapitalize<"n">, "N">>,
  Expect<Equal<MyCapitalize<"o">, "O">>,
  Expect<Equal<MyCapitalize<"p">, "P">>,
  Expect<Equal<MyCapitalize<"q">, "Q">>,
  Expect<Equal<MyCapitalize<"r">, "R">>,
  Expect<Equal<MyCapitalize<"s">, "S">>,
  Expect<Equal<MyCapitalize<"t">, "T">>,
  Expect<Equal<MyCapitalize<"u">, "U">>,
  Expect<Equal<MyCapitalize<"v">, "V">>,
  Expect<Equal<MyCapitalize<"w">, "W">>,
  Expect<Equal<MyCapitalize<"x">, "X">>,
  Expect<Equal<MyCapitalize<"y">, "Y">>,
  Expect<Equal<MyCapitalize<"z">, "Z">>
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/110/answer/ja
  > 解答を見る：https://tsch.js.org/110/solutions
  > その他の課題：https://tsch.js.org/ja
*/
