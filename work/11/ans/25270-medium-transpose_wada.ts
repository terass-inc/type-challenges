/*
  25270 - Transpose
  -------
  by Apollo Wayne (@Shinerising) #medium #array #math

  ### Question

  The transpose of a matrix is an operator which flips a matrix over its diagonal; that is, it switches the row and column indices of the matrix A by producing another matrix, often denoted by A<sup>T</sup>.

  ```ts
  type Matrix = Transpose <[[1]]>; // expected to be [[1]]
  type Matrix1 = Transpose <[[1, 2], [3, 4]]>; // expected to be [[1, 3], [2, 4]]
  type Matrix2 = Transpose <[[1, 2, 3], [4, 5, 6]]>; // expected to be [[1, 4], [2, 5], [3, 6]]
  ```

  > View on GitHub: https://tsch.js.org/25270
*/

/* _____________ Your Code Here _____________ */

// type Transpose<T extends number[][], V extends number[][] = []> = T extends [
//   infer RF,
//   ...infer RR,
// ]
//   ? RF extends [infer CF, ...infer CR]
//     ? ''
//     : ''
//   : ''

// type Transpose<
//   T extends number[][],
//   V extends any[],
//   Obj extends Record<string, number>,
// > = keyof T extends infer Key extends keyof T
//   ? keyof T[Key] extends infer ChildKey extends keyof T[Key]
//     ? T[Key][ChildKey]
//     : never
//   : never

// type Transpose<
//   T extends number[][],
//   V extends any[],
//   Obj extends Record<string, number>,
// > = {
//   [Key in keyof T as keyof T[Key] extends infer ChildKey extends keyof T[Key]
//     ? ChildKey
//     : never]: T[Key][ChildKey]
// }

// type Transpose<
//   T extends number[][],
//   RowMax = T['length'],
//   ColumnMax = T[0]['length'],
//   RowCounter = 0,
//   ColumnCounter = 0,
//   V extends number[][]=[],
// > = T extends [infer F_Row, ...infer R_Row] ? Transpose<F> : ''

type GetIndexes<T extends any[]> = {
  [Key in keyof T]: Key
}

type Transpose<
  T extends number[][],
  RowIndexes extends PropertyKey[] = GetIndexes<T>,
  ColumnIndexes extends PropertyKey[] = GetIndexes<T[0]>
> = {
  [ColumnKey in ColumnIndexes[number]]: {
    [RowKey in RowIndexes[number]]: T[RowKey][ColumnKey]
  }
}

// type Transpose<T extends number[][], U = T[0]> = {
//   [Key in keyof U]: {
//     [key2 in keyof T]: T[key2][key]
//   }
// }

// type Convert<
//   T extends number[],
//   U extends number[][],
//   ColumnKey = number,
//   V extends number[] = [],
// > = T extends [infer F extends keyof U, ...infer R]
//   ? Convert<T, U, ColumnKey, [...V, U[F][ColumnKey]]>
//   : V

// type Transpose<
//   T extends number[][],
//   RowIndexes extends PropertyKey[] = GetIndexes<T>,
//   ColumnIndexes extends PropertyKey[] = GetIndexes<T[0]>,
// > = {
//   [ColumnKey in ColumnIndexes[number]]: Convert<RowIndexes, T, ColumnKey>
// }

type hoge1 = Transpose<[[1, 2], [3, 4]]>
type hoge2 = Transpose<[[1, 4], [2, 5], [3, 6]]>

const X = {
  0: {
    0: 7,
    1: 8,
    2: 9,
  },
  1: {},
  2: {},
}

const y = {
  0: {
    0: 7,
  },
  1: {
    0: 8,
  },
  2: {
    0: 9,
  },
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils"
import { ExpectFalse, NotEqual } from "@type-challenges/utils"
import { ChildProcess } from "child_process"

type cases = [
  Expect<Equal<Transpose<[]>, []>>,
  Expect<Equal<Transpose<[[1]]>, [[1]]>>,
  Expect<Equal<Transpose<[[1, 2]]>, [[1], [2]]>>,
  Expect<Equal<Transpose<[[1, 2], [3, 4]]>, [[1, 3], [2, 4]]>>,
  Expect<Equal<Transpose<[[1, 2, 3], [4, 5, 6]]>, [[1, 4], [2, 5], [3, 6]]>>,
  Expect<Equal<Transpose<[[1, 4], [2, 5], [3, 6]]>, [[1, 2, 3], [4, 5, 6]]>>,
  Expect<
    Equal<
      Transpose<[[1, 2, 3], [4, 5, 6], [7, 8, 9]]>,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
    >
  >
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/25270/answer
  > View solutions: https://tsch.js.org/25270/solutions
  > More Challenges: https://tsch.js.org
*/
