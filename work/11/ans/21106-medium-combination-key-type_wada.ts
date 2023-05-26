/*
  21106 - Combination key type
  -------
  by Nauxscript (@Nauxscript) #medium

  ### Question

  1. Combine multiple modifier keys, but the same modifier key combination cannot appear.
  2. In the `ModifierKeys` provided, the priority of the previous value is higher than the latter value; that is, `cmd ctrl` is OK, but `ctrl cmd` is not allowed.

  > View on GitHub: https://tsch.js.org/21106
*/

/* _____________ Your Code Here _____________ */

type ModifierKeys = ['cmd', 'ctrl', 'opt', 'fn']

// 实现 Combs
type Combs<T = ModifierKeys, V extends any[] = []> = V extends any
  ? V['length'] extends 2
    ? `${V[0]} ${V[1]}`
    : T extends [infer F, ...infer R]
    ? Combs<R, V | [...V, F]>
    : never
  : never

type hoge1 = Combs

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type CaseTypeOne =
  | 'cmd ctrl'
  | 'cmd opt'
  | 'cmd fn'
  | 'ctrl opt'
  | 'ctrl fn'
  | 'opt fn'

type cases = [Expect<Equal<Combs, CaseTypeOne>>]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/21106/answer
  > View solutions: https://tsch.js.org/21106/solutions
  > More Challenges: https://tsch.js.org
*/
