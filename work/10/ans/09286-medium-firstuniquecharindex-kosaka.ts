/*
  9286 - FirstUniqueCharIndex
  -------
  by jiangshan (@jiangshanmeta) #medium #string

  ### Question

  Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1. (Inspired by [leetcode 387](https://leetcode.com/problems/first-unique-character-in-a-string/))

  > View on GitHub: https://tsch.js.org/9286
*/

/* _____________ Your Code Here _____________ */
type Reverse<
  T extends string,
  A extends string = ""
> = T extends `${infer F}${infer L}` ? Reverse<L, `${F}${A}`> : A

type ToTuple<
  T extends string,
  A extends string[] = []
> = T extends `${infer F}${infer L}` ? ToTuple<L, [...A, F]> : A

type ToUnion<
  T extends string,
  A extends string = never
> = T extends `${infer F}${infer L}` ? ToUnion<L, F | A> : A

type Contains<T extends any, A extends any[]> = A extends [infer F, ...infer R]
  ? Equal<T, F> extends true
    ? true
    : Contains<T, R>
  : false

type Unique<T extends any[], A extends any[] = []> = T extends [
  infer F,
  ...infer R
]
  ? Contains<F, A> extends true
    ? Unique<R, A>
    : Unique<R, [...A, F]>
  : A

type FirstUniqueChar<
  T extends string,
  _T extends string = Unique<ToTuple<T>>[number]
> = T extends `${infer F}${infer L}`
  ? F extends Chars
    ? FirstUniqueChar<L, Chars, A>
    : FirstUniqueChar<L, Chars | F, [F, ...A]>
  : A[0]

type FirstUniqueCharIndex<T extends string> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

type cases = [
  Reverse<"abc">,
  ToUnion<"abc">,
  FirstUniqueChar<Reverse<"abc">>,
  FirstUniqueChar<Reverse<"aabc">>,
  Expect<Equal<FirstUniqueCharIndex<"leetcode">, 0>>,
  Expect<Equal<FirstUniqueCharIndex<"loveleetcode">, 2>>,
  Expect<Equal<FirstUniqueCharIndex<"aabb">, -1>>,
  Expect<Equal<FirstUniqueCharIndex<"">, -1>>,
  Expect<Equal<FirstUniqueCharIndex<"aaa">, -1>>
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9286/answer
  > View solutions: https://tsch.js.org/9286/solutions
  > More Challenges: https://tsch.js.org
*/
