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

type _Combination<T extends string, U = T> = U extends T
  ? U | `${U} ${_Combination<Exclude<T, U>>}`
  : never
/* 
`foo` | `foo _Combination<bar | baz>`
             `bar` | `bar _Combination<baz>`
                         `baz` | `baz _Combination<never>`
                                      `never`
                
*/
type x = `${never}`

// type Combination<T extends string[]> = _Combination<T[number]>

type Combination<
  T extends string[],
  U extends string = T[number],
  V extends string = T[number],
> = U extends V ? U | `${U} ${Combination<T, Exclude<V, U>, V>}` : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

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
