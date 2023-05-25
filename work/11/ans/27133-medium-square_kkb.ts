/*
  27133 - Square
  -------
  by null (@aswinsvijay) #medium #tuple #array #math

  ### Question

  Given a number, your type should return its square.

  > View on GitHub: https://tsch.js.org/27133
*/

/* _____________ Your Code Here _____________ */
type NRange = -50 | -31 | -5 | -2 | 0 | 1 | 2 | 3 | 5 | 20 | 31 | 50 | 100

type ABS<T extends NRange> = `${T}` extends `-${infer N extends NRange}`
  ? N
  : T
type fuga = ABS<-2>

type UnknownList<T extends NRange, U extends unknown[] = []> = T extends U['length']
    ? U
    : UnknownList<T, [unknown, ...U]>

type Square_<
  N extends NRange,
  U extends unknown[],
  Count extends unknown[] = [],
  Result extends unknown[] = []
> = N extends Count['length']
  ? Result['length']
  : Square_<N, U, [unknown, ...Count], [...U, ...Result]>

type Square<N extends NRange> = Square_<
  ABS<N>,
  UnknownList<ABS<N>>
>
  
type hoge = Square<-2>


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

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
  Expect<Equal<Square<-50>, 2500>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/27133/answer
  > View solutions: https://tsch.js.org/27133/solutions
  > More Challenges: https://tsch.js.org
*/
