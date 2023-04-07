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

type ObjectEntries<T> = {
  // 要調査
  [K in keyof Required<T>]: [
    K,
    T[K] extends undefined ? undefined : Exclude<T[K], undefined>
  ]
}[keyof T]



// extends anyでdistributeさせる
type EchizenObjectEntries<T, K extends keyof T = keyof T> = K extends any
  ? [K, T[K]]
  : never

// type ObjectEntries<T, K extends keyof T = keyof T> = K extends any
//   ? [K, [Required<T>[K]] extends [never] ? undefined : Required<T>[K]]
//   : never

type IgnoreUndefined<T> = [T] extends [undefined]
  ? undefined
  : T extends undefined
  ? never
  : T

type KosakaObjectEntries<T, K extends keyof T = keyof T> = K extends any
  ? [K, IgnoreUndefined<T[K]>]
  : never

type _ = { key?: undefined }
type __ = keyof { key?: undefined }
type ___ = keyof { key: undefined }

type a = IgnoreUndefined<string | undefined></string>
type ___<T> = {
  [P in keyof T]: [T[P]] extends [undefined]
    ? undefined
    : Exclude<T[P], undefined>
}
type ____ = ___<{ key?: string | undefined }>
type X = Required<_> // never
type Y<T = { key?: undefined }> = { [P in keyof T]-?: T[P] } // never
type z = Y

/* _____________ テストケース _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries =
  | ["name", string]
  | ["age", number]
  | ["locations", string[] | null]

type cases = [
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
