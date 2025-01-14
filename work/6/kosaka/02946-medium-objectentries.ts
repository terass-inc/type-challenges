/*
  2946 - ObjectEntries
  -------
  by jiangshan (@jiangshanmeta) #中級 #object

  ### 質問

  Implement the type version of ```Object.entries```

  For example

  ```typescript
  interface Model {
    name: string;
    age: number;
    locations: string[] | null;
  }
  type modelEntries = ObjectEntries<Model> // ['name', string] | ['age', number] | ['locations', string[] | null];
  ```

  > GitHubで確認する：https://tsch.js.org/2946/ja
*/

/* _____________ ここにコードを記入 _____________ */

/* type ObjectEntries<
  T,
  S extends Required<T> = Required<T>,
  K extends keyof S = keyof S
> = K extends any ? [K, S[K]] : true */

type IgnoreUndefined<T> = [T] extends [undefined]
  ? undefined
  : T extends undefined
  ? never
  : T

type ObjectEntries<T, K extends keyof T = keyof T> = K extends any
  ? [K, IgnoreUndefined<T[K]>]
  : never

/* _____________ テストケース _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

interface Model {
  name: string
  age: number
  locations: string[] | null
}
type _ = { key?: undefined }
type __ = keyof { key?: undefined }

type a = IgnoreUndefined<string | undefined>
type ___<T> = {
  [P in keyof T]: [T[P]] extends [undefined]
    ? undefined
    : Exclude<T[P], undefined>
}
type ____ = ___<{ key?: string | undefined }>
type X = Required<_> // never
type Y<T = { key?: undefined }> = { [P in keyof T]-?: T[P] } // never
type z = Y

type ModelEntries =
  | ["name", string]
  | ["age", number]
  | ["locations", string[] | null]

type cases = [
  Required<{ key?: undefined }>,
  ObjectEntries<Partial<Model>>,
  ObjectEntries<{ key?: undefined }>,
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ["key", undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ["key", undefined]>>
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/2946/answer/ja
  > 解答を見る：https://tsch.js.org/2946/solutions
  > その他の課題：https://tsch.js.org/ja
*/
