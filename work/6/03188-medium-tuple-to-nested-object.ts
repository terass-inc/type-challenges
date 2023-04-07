/*
  3188 - Tuple to Nested Object
  -------
  by jiangshan (@jiangshanmeta) #中級 #object #tuple

  ### 質問

  Given a tuple type ```T``` that only contains string type, and a type ```U```, build an object recursively.

  ```typescript
  type a = TupleToNestedObject<['a'], string> // {a: string}
  type b = TupleToNestedObject<['a', 'b'], number> // {a: {b: number}}
  type c = TupleToNestedObject<[], boolean> // boolean. if the tuple is empty, just return the U type
  ```

  > GitHubで確認する：https://tsch.js.org/3188/ja
*/

/* _____________ ここにコードを記入 _____________ */

type TupleToNestedObject<T, U> = T extends [
  infer K extends string,
  ...infer Tail
]
  ? { [k in K]: TupleToNestedObject<Tail, U> }
  : U

type kosakaTupleToNestedObject<T extends string[], U> = T extends [
  infer F extends string,
  ...infer L extends string[]
]
  ? { [K in F]: TupleToNestedObject<L, U> }
  : U

type EchizenTupleToNestedObject<T extends string[], U> = T extends [
  infer F,
  ...infer Rest
]
  ? {
      [P in F as P & PropertyKey]: TupleToNestedObject<Rest, U>
    }
  : U

type __TupleToNestedObject<T extends PropertyKey[], U> = T extends [
  infer K extends PropertyKey,
  ...infer R extends PropertyKey[]
]
  ? { [P in K]: TupleToNestedObject<R, U> }
  : U

/* _____________ テストケース _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

type cases = [
  Expect<Equal<TupleToNestedObject<["a"], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<["a", "b"], number>, { a: { b: number } }>>,
  Expect<
    Equal<
      TupleToNestedObject<["a", "b", "c"], boolean>,
      { a: { b: { c: boolean } } }
    >
  >,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/3188/answer/ja
  > 解答を見る：https://tsch.js.org/3188/solutions
  > その他の課題：https://tsch.js.org/ja
*/
