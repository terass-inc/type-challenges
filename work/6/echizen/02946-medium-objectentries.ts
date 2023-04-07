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

// extends anyでdistributeさせる
type ObjectEntries<T, U extends keyof T = keyof T> = U extends any ? [U, T[U]] : never

type T = ObjectEntries<Model>

// undefinedをなくす？
type T2 = ObjectEntries<Partial<Model>>

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>,
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/2946/answer/ja
  > 解答を見る：https://tsch.js.org/2946/solutions
  > その他の課題：https://tsch.js.org/ja
*/
