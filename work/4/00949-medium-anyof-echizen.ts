/*
  949 - AnyOf
  -------
  by null (@kynefuk) #中級 #array

  ### 質問

  Implement Python liked `any` function in the type system. A type takes the Array and returns `true` if any element of the Array is true. If the Array is empty, return `false`.

  For example:

  ```ts
  type Sample1 = AnyOf<[1, '', false, [], {}]> // expected to be true.
  type Sample2 = AnyOf<[0, '', false, [], {}]> // expected to be false.
  ```

  > GitHubで確認する：https://tsch.js.org/949/ja
*/

/* _____________ ここにコードを記入 _____________ */
import { Equal } from '@type-challenges/utils'

// type _AnyOf<T extends readonly any[]> = true extends T[number] ? true : false
type Falsy = 0 | '' | [] | false | undefined | null

// undefined, null以外は{}の部分型なので、{}だけ別で扱う必要がある
type Truthify<T> = Equal<T, {}> extends true ? false : T extends Falsy ? false : true

type AnyOf<T extends readonly any[]> = T extends [infer First, ...infer Rest]
  ? Truthify<First> extends true
    ? true
    : AnyOf<Rest>
  : false

type T = AnyOf<[0, '', false, [], { name: 'test' }]>
type T2 = AnyOf<[0, '', false, [1], {}]>

type B1 = Truthify<{}>
type B2 = Truthify<1>
type B3 = Truthify<0>
type B4 = Truthify<''>
type B5 = Truthify<undefined>

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[1, '', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, 'test', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], {}, undefined, null]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>,
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/949/answer/ja
  > 解答を見る：https://tsch.js.org/949/solutions
  > その他の課題：https://tsch.js.org/ja
*/
