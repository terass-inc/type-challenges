/*
  10969 - Integer
  -------
  by HuaBing (@hbcraft) #medium #template-literal

  ### Question

  Please complete type `Integer<T>`, type `T` inherits from `number`, if `T` is an integer return it, otherwise return `never`.

  > View on GitHub: https://tsch.js.org/10969
*/

/* _____________ Your Code Here _____________ */

type IsZero<T extends string> = T extends `${infer F}${infer R}`
  ? F extends '0'
    ? IsZero<R>
    : false
  : true
type hoge = IsZero<`0010`>

type Integer2<T extends number> = Equal<T, number> extends true
  ? never
  : `${T}` extends `${infer F}.${infer L}`
  ? IsZero<L> extends true
    ? F
    : never
  : T

type hoge4 = 1.0

type Integer<T extends number> = number extends T
  ? never
  : `${T}` extends `${string}.${string}`
  ? never
  : T

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
  Expect<Equal<Integer<typeof y>, 1>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/10969/answer
  > View solutions: https://tsch.js.org/10969/solutions
  > More Challenges: https://tsch.js.org
*/
