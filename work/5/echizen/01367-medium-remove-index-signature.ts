/*
  1367 - Remove Index Signature
  -------
  by hiroya iizuka (@hiroyaiizuka) #中級 #object-keys

  ### 質問

  Implement `RemoveIndexSignature<T>` , exclude the index signature from object types.

  For example:

  ```

  type Foo = {
    [key: string]: any;
    foo(): void;
  }

  type A = RemoveIndexSignature<Foo>  // expected { foo(): void }

  ```

  > GitHubで確認する：https://tsch.js.org/1367/ja
*/

/* _____________ ここにコードを記入 _____________ */

type RemoveIndexSignature<T> = {
  [P in keyof T as PropertyKey extends T[P] ? never : P]: T[P]
}

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  [key: string]: any
  foo(): void
}

type T = {
  [P in keyof Foo]: Foo[P]
}

type K = keyof Foo

// なぜ？
type T2 = {
  [P in K]: Foo[P]
}

type F = {
  name: string
  age: number
  bar(): void
  [k: number]: boolean
}

type T3 = {
  [P in keyof F]: F[P]
}

type Bar = {
  [key: number]: any
  bar(): void
  0: string
}

const foobar = Symbol('foobar')
type FooBar = {
  [key: symbol]: any
  [foobar](): void
}

type Baz = {
  bar(): void
  baz: string
}

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void; 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>,
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/1367/answer/ja
  > 解答を見る：https://tsch.js.org/1367/solutions
  > その他の課題：https://tsch.js.org/ja
*/
