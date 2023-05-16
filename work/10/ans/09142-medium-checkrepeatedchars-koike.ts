/*
  9142 - CheckRepeatedChars
  -------
  by Hong (@RThong) #medium #union #string

  ### Question

  Implement type ```CheckRepeatedChars<S>``` which will return whether type ```S``` contains duplicated chars?

  For example:

  ```ts
  type CheckRepeatedChars<'abc'>   // false
  type CheckRepeatedChars<'aba'>   // true
  ```

  > View on GitHub: https://tsch.js.org/9142
*/

/* _____________ Your Code Here _____________ */

// type Split<T> = T extends `${infer H}${infer T}` ? [H, ...Split<T>] : []
// type CheckRepeatedChars<
//   T extends string,
//   S = Split<T>[number]
// > = S extends infer C extends string ? [C] : never

type CheckRepeatedChars<
  T extends string,
  U = ""
> = T extends `${infer H}${infer R}`
  ? H extends U
    ? true
    : CheckRepeatedChars<R, U | H>
  : false

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils"
import { ExpectFalse, NotEqual } from "@type-challenges/utils"

type cases = [
  Expect<Equal<CheckRepeatedChars<"abc">, false>>,
  Expect<Equal<CheckRepeatedChars<"abb">, true>>,
  Expect<Equal<CheckRepeatedChars<"cbc">, true>>,
  Expect<Equal<CheckRepeatedChars<"">, false>>
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9142/answer
  > View solutions: https://tsch.js.org/9142/solutions
  > More Challenges: https://tsch.js.org
*/
