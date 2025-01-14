/*
  4260 - 文字の組み合わせ
  -------
  by 蛭子屋双六 (@sugoroku-y) #中級 #template-literal #infer #union

  ### 質問

  指定された文字列に含まれる文字をそれぞれ最大で1度だけ使った文字列のすべての組み合わせの型`AllCombinations`を実装します。

  例えば

  ```ts

  type AllCombinations_ABC = AllCombinations<'ABC'>;
  // should be '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'
  ```

  > GitHubで確認する：https://tsch.js.org/4260/ja
*/

/* _____________ ここにコードを記入 _____________ */

//wada
type ToUnion<T extends string> = T extends `${infer F}${infer R}` ? F | ToUnion<R> : ''
type U = ToUnion<'ABC'>
type V = ToUnion<'A' | 'BC'>
type PickOne<
  T extends string, // this is union
  U extends string = T,
> = [T] extends [never] ? '' : T extends T ? `${T | ''}${PickOne<Exclude<U, T>>}` : never

type wadaAllCombinations<
  T extends string, // this is union
  U extends string = ToUnion<T>,
  V extends string = ToUnion<T>,
> = U extends U ? `${U | ''}${PickOne<Exclude<V, U>>}` : never

type T = wadaAllCombinations<'ABCDE'>

// kkb
// 不完全
// type AllCombinations<S extends string, F extends string = ''> = S extends ''
//   ? ''
//   : S extends `${infer Head}${infer Tail}`
//   ? Head extends F
//     ? ''
//     : '' | Head | `${Head}${AllCombinations<Tail, Head>}` | `${AllCombinations<`${Tail}${Head}`, Head>}`
//   : ''
// type aa = AllCombinations<'ABC'>

// https://github.com/type-challenges/type-challenges/issues/5866
type AllCombinations<S extends string, PRE extends string = ''> = S extends `${infer C}${infer POST}`
  ? `${C}${AllCombinations<`${PRE}${POST}`>}` | AllCombinations<POST, `${PRE}${C}`>
  : ''
  
type W = AllCombinations<'ABC'>

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<AllCombinations<''>, ''>>,
  Expect<Equal<AllCombinations<'A'>, '' | 'A'>>,
  Expect<Equal<AllCombinations<'AB'>, '' | 'A' | 'B' | 'AB' | 'BA'>>,
  Expect<
    Equal<
      AllCombinations<'ABC'>,
      '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'
    >
  >,
  Expect<
    Equal<
      AllCombinations<'ABCD'>,
      | ''
      | 'A'
      | 'B'
      | 'C'
      | 'D'
      | 'AB'
      | 'AC'
      | 'AD'
      | 'BA'
      | 'BC'
      | 'BD'
      | 'CA'
      | 'CB'
      | 'CD'
      | 'DA'
      | 'DB'
      | 'DC'
      | 'ABC'
      | 'ABD'
      | 'ACB'
      | 'ACD'
      | 'ADB'
      | 'ADC'
      | 'BAC'
      | 'BAD'
      | 'BCA'
      | 'BCD'
      | 'BDA'
      | 'BDC'
      | 'CAB'
      | 'CAD'
      | 'CBA'
      | 'CBD'
      | 'CDA'
      | 'CDB'
      | 'DAB'
      | 'DAC'
      | 'DBA'
      | 'DBC'
      | 'DCA'
      | 'DCB'
      | 'ABCD'
      | 'ABDC'
      | 'ACBD'
      | 'ACDB'
      | 'ADBC'
      | 'ADCB'
      | 'BACD'
      | 'BADC'
      | 'BCAD'
      | 'BCDA'
      | 'BDAC'
      | 'BDCA'
      | 'CABD'
      | 'CADB'
      | 'CBAD'
      | 'CBDA'
      | 'CDAB'
      | 'CDBA'
      | 'DABC'
      | 'DACB'
      | 'DBAC'
      | 'DBCA'
      | 'DCAB'
      | 'DCBA'
    >
  >,
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/4260/answer/ja
  > 解答を見る：https://tsch.js.org/4260/solutions
  > その他の課題：https://tsch.js.org/ja
*/
