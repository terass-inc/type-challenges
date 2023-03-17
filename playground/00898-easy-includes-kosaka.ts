/*
  898 - Includes
  -------
  by null (@kynefuk) #初級 #array

  ### 質問

  JavaScriptの`Array.include`関数を型システムに実装します。この型は、2 つの引数を受け取り、`true`や`false`を出力しなければなりません。

  例えば：

  ```ts
  type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
  ```

  > GitHubで確認する：https://tsch.js.org/898/ja
*/

/* _____________ ここにコードを記入 _____________ */

// めっちゃ頭いいとおもったけどだめ
// https://github.com/type-challenges/type-challenges/issues/1568

/* type Includes<T extends readonly any[], U> = {
  [P in T[number]]: true
}[U] extends true
  ? true
  : false

type Proc1<T extends readonly any[]> = {
  [P in T[number]]: true
}

type Proc2<T extends readonly any[], U> = {
  [P in T[number]]: true
}[U]

type x = { false: true }
type y = x[false]

const a = { false: true }
const b = a[false]
type test = [
  Expect<Equal<Proc1<[1, 2]>, { 1: true; 2: true }>>,
  Expect<Equal<Proc2<[1, 2], 1>, true>>,
  Expect<Equal<Proc2<[1, 2], 2>, true>>,
  Expect<Equal<Proc2<[1, 2], 3>, unknown>>,
  Proc2<[1, false], false>]
 */

// これだとだめ
type Includes<T extends readonly any[], U> = U extends T[number] ? true : false

type DameIncludes2<T extends readonly any[], U> = U extends T[number]
  ? true
  : false

/* type Includes<T extends readonly unknown[], U> = T extends [
  infer First,
  ...infer Rest
]
  ? Equal<First, U> extends true
    ? true
    : Includes<Rest, U>
  : false
 */
type test = [
  Expect<Equal<1 extends 1 ? true : false, true>>,
  [1, 2, 3, 4][number],
  Includes<["Kars"], "Kars">,
  ["Kars", "Esidisi"][number] extends "Kars" ? true : false,
  Readonly<Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Kars">>
]
/* _____________ テストケース _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

type cases = [
  Expect<
    Equal<Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Kars">, true>
  >,
  Expect<
    Equal<Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">, false>
  >,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: "A" }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: "A" }], { readonly a: "A" }>, false>>,
  Expect<Equal<Includes<[{ readonly a: "A" }], { a: "A" }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/898/answer/ja
  > 解答を見る：https://tsch.js.org/898/solutions
  > その他の課題：https://tsch.js.org/ja
*/
