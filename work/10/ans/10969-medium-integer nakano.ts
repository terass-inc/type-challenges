/*
  10969 - Integer
  -------
  by HuaBing (@hbcraft) #medium #template-literal

  ### Question

  Please complete type `Integer<T>`, type `T` inherits from `number`, if `T` is an integer return it, otherwise return `never`.

  > View on GitHub: https://tsch.js.org/10969
*/

/* _____________ Your Code Here _____________ */

type IsRepeated<
  S extends string,
  T extends string | number
> = S extends `${T}${infer R}`
  ? R extends ''
    ? true
    : IsRepeated<R, T>
  : false
type Numbers = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type Integer<T extends number> = IsRepeated<`${T}`, Numbers> extends true
  ? T
  : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'
import { ExpectFalse, NotEqual } from '@type-challenges/utils'

let x = 1
let y = 1 as const

type cases1 = [
  Expect<Equal<Integer<1>, 1>>,
  Expect<Equal<Integer<1.1>, never>>,
  Expect<Equal<Integer<1.0>, 1>>,
  Expect<Equal<Integer<1.0>, 1>>,
  Expect<Equal<Integer<typeof x>, never>>,
  Expect<Equal<Integer<typeof y>, 1>>
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/10969/answer
  > View solutions: https://tsch.js.org/10969/solutions
  > More Challenges: https://tsch.js.org
*/
