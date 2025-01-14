/*
  27133 - Square
  -------
  by null (@aswinsvijay) #medium #tuple #array #math

  ### Question

  Given a number, your type should return its square.

  > View on GitHub: https://tsch.js.org/27133
*/

/* _____________ Your Code Here _____________ */

type Fill<
  T,
  Length extends number,
  Result extends T[] = []
> = Result["length"] extends Length ? Result : Fill<T, Length, [T, ...Result]>
type ToPositive<T extends number> = `${T}` extends `-${infer N extends number}`
  ? N
  : T
type Flatten<T> = T extends [infer A, ...infer B]
  ? [...(A extends any[] ? A : [A]), ...Flatten<B>]
  : []
type Square<N extends number, Filled = Fill<any, ToPositive<N>>> = Flatten<{
  // [K in keyof Fill<any, ToPositive<N>>]: ... だとタプルにならない
  [K in keyof Filled]: Filled
}>["length"]

type T = Square<-2>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

type cases = [
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
