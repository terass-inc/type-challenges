/*
  8767 - Combination
  -------
  by Homyee King (@HomyeeKing) #medium #array #application #string

  ### Question

  Given an array of strings, do Permutation & Combination.
  It's also useful for the prop types like video [controlsList](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList)

  ```ts
  // expected to be `"foo" | "bar" | "baz" | "foo bar" | "foo bar baz" | "foo baz" | "foo baz bar" | "bar foo" | "bar foo baz" | "bar baz" | "bar baz foo" | "baz foo" | "baz foo bar" | "baz bar" | "baz bar foo"`
  type Keys = Combination<['foo', 'bar', 'baz']>
  ```

  > View on GitHub: https://tsch.js.org/8767
*/

import { CompileFunctionOptions } from "vm"

/* _____________ Your Code Here _____________ */

type Combination<
  T extends string[],
  U extends string[] = T,
  V extends string[] = T
> = U extends [infer UH extends string, infer UM extends string, infer UT extends string]
  ? T extends [UT, UH, UM]
    ? [`${UT} ${UH} ${UM}`, `${UT} ${UM} ${UH}`,`${UT} ${UH}`, `${UT} ${UM}`, ...V][number]
    : Combination<T, [UT, UH, UM], [`${UT} ${UH} ${UM}`, `${UT} ${UM} ${UH}`, `${UT} ${UH}`, `${UT} ${UM}`, ...V]>
  : never

type hoge = ['foo', 'foo'][number]
type a = Combination<['foo', 'bar', 'baz']>
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Combination<['foo', 'bar', 'baz']>,
  'foo' | 'bar' | 'baz' | 'foo bar' | 'foo bar baz' | 'foo baz' | 'foo baz bar' | 'bar foo' | 'bar foo baz' | 'bar baz' | 'bar baz foo' | 'baz foo' | 'baz foo bar' | 'baz bar' | 'baz bar foo'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/8767/answer
  > View solutions: https://tsch.js.org/8767/solutions
  > More Challenges: https://tsch.js.org
*/
