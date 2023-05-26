/*
  27133 - Square
  -------
  by null (@aswinsvijay) #medium #tuple #array #math

  ### Question

  Given a number, your type should return its square.

  > View on GitHub: https://tsch.js.org/27133
*/

/* _____________ Your Code Here _____________ */
// bit演算
// 愚直にtupleをextends する？
type CreateTuple<
  L extends number,
  A extends unknown[] = []
> = A["length"] extends L ? A : CreateTuple<L, [...A, unknown]>

type Abs<N extends number> = `${N}` extends `-${infer _N extends number}`
  ? _N
  : N

type Square<
  N extends number,
  _N extends number = Abs<N>,
  _P extends unknown[] = CreateTuple<_N>,
  A extends unknown[] = []
> = _P extends [unknown, ...infer R]
  ? Square<N, _N, R, [...A, ...CreateTuple<_N>]>
  : A["length"]

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

type cases = [
  Abs<-1>,
  Expect<Equal<Square<0>, 0>>,
  Expect<Equal<Square<1>, 1>>,
  Expect<Equal<Square<3>, 9>>,
  Expect<Equal<Square<20>, 400>>,
  Expect<Equal<Square<100>, 10000>>,

  // Negative numbers
  Square<-2>,
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
