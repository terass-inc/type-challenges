/*
  2757 - PartialByKeys
  -------
  by jiangshan (@jiangshanmeta) #中級 #object

  ### 質問

  Implement a generic `PartialByKeys<T, K>` which takes two type argument `T` and `K`.

  `K` specify the set of properties of `T` that should set to be optional. When `K` is not provided, it should make all properties optional just like the normal `Partial<T>`.

  For example

  ```typescript
  interface User {
    name: string
    age: number
    address: string
  }

  type UserPartialName = PartialByKeys<User, 'name'> // { name?:string; age:number; address:string }
  ```

  > GitHubで確認する：https://tsch.js.org/2757/ja
*/

/* _____________ ここにコードを記入 _____________ */
type PartialByKeys<T, K extends keyof T = keyof T> = Partial<Pick<T, K>> &
  Omit<T, K> extends infer O
  ? { [K in keyof O]: O[K] }
  : never

// ----- kosaka
type _PartialByKeys<T, K extends keyof T = keyof T> = MergeInsertions<
  {
    [k in keyof T as k extends K ? k : never]?: T[k]
  } & {
    [k in keyof T as k extends K ? never : k]: T[k]
  }
>

type __PartialByKeys<
  T,
  K extends keyof T = keyof T,
  U = {
    [k in keyof T as k extends K ? k : never]?: T[k]
  } & {
    [k in keyof T as k extends K ? never : k]: T[k]
  }
> = {
  [k in keyof U]: U[k]
}

type ___PartialByKeys<T, K extends keyof T = keyof T> = Partial<Pick<T, K>> &
  Omit<T, K> extends infer I
  ? { [k in keyof I]: I[k] }
  : never

type PartialByKeys<T, K extends keyof T = keyof T> = Omit<
  Partial<Pick<T, K>> & Omit<T, K>,
  never
>
// ------- end kosaka-----------

// --echizen
type IntersectionToObj<T> = {
  [P in keyof T]: T[P]
}

type ____PartialByKeys<T, K extends keyof T = keyof T> = IntersectionToObj<
  {
    [P in K]?: T[P]
  } & {
    [P in Exclude<keyof T, K>]: T[P]
  }
>

/* _____________ テストケース _____________ */
import type { Equal, Expect, MergeInsertions } from "@type-challenges/utils"

interface User {
  name: string
  age: number
  address: string
}

interface UserPartialName {
  name?: string
  age: number
  address: string
}

interface UserPartialNameAndAge {
  name?: string
  age?: number
  address: string
}

type cases = [
  Expect<Equal<PartialByKeys<User, "name">, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, "name" | "age">, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>,
  // @ts-expect-error
  Expect<Equal<PartialByKeys<User, "name" | "unknown">, UserPartialName>>
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/2757/answer/ja
  > 解答を見る：https://tsch.js.org/2757/solutions
  > その他の課題：https://tsch.js.org/ja
*/
