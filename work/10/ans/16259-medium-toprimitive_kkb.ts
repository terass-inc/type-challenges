/*
  16259 - ToPrimitive
  -------
  by 前端子鱼 (@mwc) #medium

  ### Question

  Convert a property of type literal (label type) to a primitive type.

  For example

  ```typescript
  type X = {
    name: 'Tom',
    age: 30,
    married: false,
    addr: {
      home: '123456',
      phone: '13111111111'
    }
  }

  type Expected = {
    name: string,
    age: number,
    married: boolean,
    addr: {
      home: string,
      phone: string
    }
  }
  type Todo = ToPrimitive<X> // should be same as `Expected`
  ```

  > View on GitHub: https://tsch.js.org/16259
*/

/* _____________ Your Code Here _____________ */

type hoge = string extends object ? true : false
type fuga = Function extends object ? true : false
type hogehoge = object extends Function ? true : false

type ToPrimitive_<T extends any> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends [infer TH, ...infer TT]
        ? [ToPrimitive_<TH>, ...ToPrimitive_<TT>]
        : T extends readonly [infer TH, ...infer TT]
          ? readonly [ToPrimitive_<TH>, ...ToPrimitive_<TT>]
          : T extends Function
            ? Function
            : T extends object
              ? {[k in keyof T]: ToPrimitive_<T[k]>} 
              : never

    
type ToPrimitive<T extends any> = {
  [k in keyof T]: ToPrimitive_<T[k]>
}

type a = ToPrimitive<PersonInfo>
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'
import { TopicBuilder } from 'firebase-functions/v1/pubsub'

type PersonInfo = {
  name: 'Tom'
  age: 30
  married: false
  addr: {
    home: '123456'
    phone: '13111111111'
  }
  hobbies: ['sing', 'dance']
  readonlyArr: readonly ['test']
  fn: () => any
}

type ExpectedResult = {
  name: string
  age: number
  married: boolean
  addr: {
    home: string
    phone: string
  }
  hobbies: [string, string]
  readonlyArr: readonly [string]
  fn: Function
}

type cases = [
  Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/16259/answer
  > View solutions: https://tsch.js.org/16259/solutions
  > More Challenges: https://tsch.js.org
*/
