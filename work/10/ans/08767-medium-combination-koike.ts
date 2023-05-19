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

/* _____________ Your Code Here _____________ */

// https://github.com/type-challenges/type-challenges/issues/5339
// type AllCombinations<
//   STR extends string,
//   S extends string = String2Union<STR>,
// > = [S] extends [never]
//   ? ''
//   : '' | { [K in S]: `${K}${AllCombinations<never, Exclude<S, K>>}` }[S];

type Combination<T extends string[], S extends string = T[number]> = {
  [K in S]: `${K} ${
    | Combination<never, Exclude<S, K>>
    | ''}` extends infer A extends string
    ? A extends `${infer S} `
      ? S
      : A
    : never
}[S]

type S = [
  `foo ${`bar ${'baz' | ''}` | `baz ${'bar' | ''}` | ''}`,
  `bar ${'...'}`,
  `baz ${'...'}`,
]

/* _____________ Test Cases _____________ */
import type { Debug, Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<
    Equal<
      Combination<['foo', 'bar', 'baz']>,
      | 'foo'
      | 'bar'
      | 'baz'
      | 'foo bar'
      | 'foo bar baz'
      | 'foo baz'
      | 'foo baz bar'
      | 'bar foo'
      | 'bar foo baz'
      | 'bar baz'
      | 'bar baz foo'
      | 'baz foo'
      | 'baz foo bar'
      | 'baz bar'
      | 'baz bar foo'
    >
  >,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/8767/answer
  > View solutions: https://tsch.js.org/8767/solutions
  > More Challenges: https://tsch.js.org
*/
