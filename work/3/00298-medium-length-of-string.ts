/*
  298 - Length of String
  -------
  by Pig Fang (@g-plane) #中級 #template-literal

  ### 質問

  `String#length` と同じように、文字列リテラルの長さを計算します。

  > GitHubで確認する：https://tsch.js.org/298/ja


https://stackoverflow.com/questions/70296144/understanding-typescript-template-literal-type-with-anyany
https://github.com/microsoft/TypeScript/issues/42903#issuecomment-784366198

> A placeholder followed by a literal character span is matched by inferring zero or more characters from the source until the first occurrence of that literal character span in the source.
プレースホルダーの後にリテラル文字が続く場合、ソース内でそのリテラル文字が最初に出現するまで、ソースから0文字以上の文字を推論することでマッチングされます。 
*/

/* _____________ ここにコードを記入 _____________ */

type Count<
  S extends string,
  T extends string[]
> = S extends `${infer A}${infer B}` ? Count<B, [A, ...T]> : never
type LengthOfString2<S extends string> = Count<S, []>

type LengthOfString<
  S extends string,
  T extends string[] = []
> = S extends `${infer A}${infer B}`
  ? LengthOfString<B, [...T, A]>
  : T["length"]

type A<S extends string> = S extends `${infer A}${infer B}` ? [A, B] : never
type v = A<"">
type u = A<" ">

type BB = "" extends `${infer A}` ? true : false
type CC = "" extends `${infer A}${infer A}` ? true : false
type DD = "" extends `${infer A}${infer B}` ? true : false
/* _____________ テストケース _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

type X<S extends string> = S extends `${infer Start}${infer End}` ? Start : End
type Y<S extends string> = S extends `${infer Start}${infer End}` ? End : Start

type cases = [
  LengthOfString<"hoge">,
  LengthOfString2<"hoge">,
  "" extends `${infer A}` ? true : false,
  X<"A">,
  X<"AB">,
  Y<"A">,
  Y<"AB">,
  Expect<Equal<LengthOfString<"a">, 1>>,
  Expect<Equal<LengthOfString<"">, 0>>,
  Expect<Equal<LengthOfString<"kumiko">, 6>>,
  Expect<Equal<LengthOfString<"reina">, 5>>,
  Expect<Equal<LengthOfString<"Sound! Euphonium">, 16>>
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/298/answer/ja
  > 解答を見る：https://tsch.js.org/298/solutions
  > その他の課題：https://tsch.js.org/ja
*/
