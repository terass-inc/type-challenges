/*
  4179 - Flip
  -------
  by Farhan Kathawala (@kathawala) #中級 #object

  ### 質問

  Implement the type of `just-flip-object`. Examples:

  ```typescript
  Flip<{ a: "x", b: "y", c: "z" }>; // {x: 'a', y: 'b', z: 'c'}
  Flip<{ a: 1, b: 2, c: 3 }>; // {1: 'a', 2: 'b', 3: 'c'}
  Flip<{ a: false, b: true }>; // {false: 'a', true: 'b'}
  ```

  No need to support nested objects and values which cannot be object keys such as arrays

  > GitHubで確認する：https://tsch.js.org/4179/ja
*/

/* _____________ ここにコードを記入 _____________ */

type ToPropertyKey<T> = T extends boolean ? `${T}` : T

// 全部 `${T[K]}` でstringにすればいい
type EchizenFlip<T extends Record<PropertyKey, PropertyKey | boolean>> = {
  [K in keyof T as ToPropertyKey<T[K]>]: K
}

type koikeFlip<T extends Record<string | number, string | number | boolean>> = {
  [K in keyof T as `${T[K]}`]: K
}

type kosakaFlip<T extends { [key: PropertyKey]: string | boolean | number }> = {
  [P in keyof T as `${T[P]}`]: P
}
const x = { 3.14: 'pi', true: 'bool' }['3.14']

// hase
type HaseFlip<T extends Record<any, any>> = {
  [P in keyof T as `${T[P]}`]: P
}

const a: {} = 1

type HasLength = { length: number }
const obj: HasLength = 'foobar'

type T = Flip<{ pi: 3.14; bool: true }>

type wadaFlip<T extends Record<PropertyKey, any>> = {
  [key in keyof T as T[key] extends PropertyKey ? T[key] : `${T[key]}`]: key
}

// kkb
// PropertyKey を知らなかった
//type Flip<T> = {
//  [k in keyof T as `${T[k]}`]: k
//}

type Flip<T> = {
  [K in keyof T as T[K] extends PropertyKey ? T[K] : T[K] extends boolean ? `${T[K]}` : never]: K
}

/* _____________ テストケース _____________ */
import type { Equal, Expect, NotEqual } from '@type-challenges/utils'

type cases = [
  Expect<Equal<{ a: 'pi' }, Flip<{ pi: 'a' }>>>,
  Expect<NotEqual<{ b: 'pi' }, Flip<{ pi: 'a' }>>>,
  Expect<Equal<{ 3.14: 'pi'; true: 'bool' }, Flip<{ pi: 3.14; bool: true }>>>,
  Expect<Equal<{ val2: 'prop2'; val: 'prop' }, Flip<{ prop: 'val'; prop2: 'val2' }>>>,
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/4179/answer/ja
  > 解答を見る：https://tsch.js.org/4179/solutions
  > その他の課題：https://tsch.js.org/ja
*/
