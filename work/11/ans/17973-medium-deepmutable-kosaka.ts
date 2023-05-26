/*
  17973 - DeepMutable
  -------
  by cutefcc (@cutefcc) #medium #readonly #deep

  ### Question

  Implement a generic DeepMutable<T> which make every parameter of an object - and its sub-objects recursively - mutable.

  For example

  ```ts
  type X = {
    readonly a: () => 1
    readonly b: string
    readonly c: {
      readonly d: boolean
      readonly e: {
        readonly g: {
          readonly h: {
            readonly i: true
            readonly j: "s"
          }
          readonly k: "hello"
        }
      }
    }
  }

  type Expected = {
    a: () => 1
    b: string
    c: {
      d: boolean
      e: {
        g: {
          h: {
            i: true
            j: "s"
          }
          k: "hello"
        }
      }
    }
  }

  type Todo = DeepMutable<X> // should be same as `Expected`
  ```

  You can assume that we are only dealing with Objects in this challenge. Arrays, Functions, Classes and so on do not need to be taken into consideration. However, you can still challenge yourself by covering as many different cases as possible.

  > View on GitHub: https://tsch.js.org/17973
*/

/* _____________ Your Code Here _____________ */

type DeepMutable<T extends Record<any, any>> = {
  -readonly [P in keyof T]: T[P] extends (..._: any[]) => any
    ? T[P]
    : DeepMutable<T[P]>
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect, Debug } from "@type-challenges/utils"

interface Test1 {
  readonly title: string
  readonly description: string
  readonly completed: boolean
  readonly meta: {
    readonly author: string
  }
}
type Test2 = {
  readonly a: () => 1
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: "s"
        }
        readonly k: "hello"
      }
      readonly l: readonly [
        "hi",
        {
          readonly m: readonly ["hey"]
        }
      ]
    }
  }
}
interface DeepMutableTest1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

type DeepMutableTest2 = {
  a: () => 1
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: "s"
        }
        k: "hello"
      }
      l: [
        "hi",
        {
          m: ["hey"]
        }
      ]
    }
  }
}

type cases = [
  DeepMutable<Test2>,
  DeepMutable<{ readonly a: () => 1 }>,
  Expect<Equal<DeepMutable<Test1>, DeepMutableTest1>>,
  Expect<Equal<DeepMutable<Test2>, DeepMutableTest2>>
]

// const s: DeepMutable<Test2> = {} as DeepMutableTest2
const s: DeepMutableTest2 = {} as DeepMutable<Test2>
const t: { a: () => 1 } = {} as DeepMutable<{ readonly a: () => 1 }>

type errors = [
  // @ts-expect-error
  DeepMutable<"string">,
  // @ts-expect-error
  DeepMutable<0>
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/17973/answer
  > View solutions: https://tsch.js.org/17973/solutions
  > More Challenges: https://tsch.js.org
*/
