/*
  27133 - Square
  -------
  by null (@aswinsvijay) #medium #tuple #array #math

  ### Question

  Given a number, your type should return its square.

  > View on GitHub: https://tsch.js.org/27133
*/

/* _____________ Your Code Here _____________ */

type Range<N extends number, C extends any[] = []> = C["length"] extends N
  ? C
  : Range<N, [any, ...C]>
type SquareRange<
  N extends number,
  C extends any[] = [],
  R extends any[] = []
> = C["length"] extends N
  ? R["length"]
  : SquareRange<N, [any, ...C], [...Range<N>, ...R]>
type Abs<T extends number> = `${T}` extends `-${infer N extends number}` ? N : T
type TrimZero<T extends number> = `${T}` extends `${infer N extends number}0`
  ? TrimZero<N>
  : T
type DupZero<
  T extends number,
  R extends string = ""
> = `${T}` extends `${infer N extends number}0` ? DupZero<N, `${R}00`> : R
type AsNumber<T> = T extends infer X extends number ? X : never
type ToNumber<T> = T extends `${infer X extends number}` ? X : never

type Square<N extends number> = ToNumber<`${AsNumber<
  SquareRange<TrimZero<Abs<N>>>
>}${DupZero<N>}`>

type SimpleSquare<N extends number> = SquareRange<Abs<N>>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

type cases = [
  Square<990>,
  Expect<Equal<Square<0>, 0>>,
  Expect<Equal<Square<1>, 1>>,
  Expect<Equal<Square<3>, 9>>,
  Expect<Equal<Square<20>, 400>>,
  Expect<Equal<Square<100>, 10000>>,

  // Negative numbers
  Expect<Equal<Square<-2>, 4>>,
  Expect<Equal<Square<-5>, 25>>,
  Expect<Equal<Square<-31>, 961>>,
  Expect<Equal<Square<-50>, 2500>>
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/27133/answer
  > View solutions: https://tsch.js.org/27133/solutions
  > More Challenges: https://tsch.js.org
*/
