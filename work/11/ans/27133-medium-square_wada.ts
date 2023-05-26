/*
  27133 - Square
  -------
  by null (@aswinsvijay) #medium #tuple #array #math

  ### Question

  Given a number, your type should return its square.

  > View on GitHub: https://tsch.js.org/27133
*/

/* _____________ Your Code Here _____________ */

type MyAbsolute<T extends number> = `${T}` extends `-${infer U extends number}`
  ? U
  : T
type hoge = MyAbsolute<-3>

type CreateArray<
  T extends number,
  element = any,
  V extends any[] = []
> = V["length"] extends T ? V : CreateArray<T, [...V, element]>

type Square<
  T extends number,
  U extends number = MyAbsolute<T>,
  Arr extends any[] = CreateArray<U>,
  Arr2 extends any[] = CreateArray<U, Arr>
> = Flat<Arr2>["length"]

type hoge = Square<1>

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
