/*
  1978 - Percentage Parser
  -------
  by SSShuai1999 (@SSShuai1999) #中級 #template-literal

  ### 質問

  Implement PercentageParser<T extends string>.
  According to the `/^(\+|\-)?(\d*)?(\%)?$/` regularity to match T and get three matches.

  The structure should be: [`plus or minus`, `number`, `unit`]
  If it is not captured, the default is an empty string.

  For example:

  ```ts
  type PString1 = ''
  type PString2 = '+85%'
  type PString3 = '-85%'
  type PString4 = '85%'
  type PString5 = '85'

  type R1 = PercentageParser<PString1> // expected ['', '', '']
  type R2 = PercentageParser<PString2> // expected ["+", "85", "%"]
  type R3 = PercentageParser<PString3> // expected ["-", "85", "%"]
  type R4 = PercentageParser<PString4> // expected ["", "85", "%"]
  type R5 = PercentageParser<PString5> // expected ["", "85", ""]
  ```

  > GitHubで確認する：https://tsch.js.org/1978/ja
*/

/* _____________ ここにコードを記入 _____________ */

type __PercentageParser<A extends string> = [
  A extends `${infer S extends '+' | '-'}${string}` ? S : '',
  A extends `${'+' | '-'}${infer V extends number}%`
    ? `${V}`
    : A extends `${'+' | '-'}${infer V extends number}`
    ? `${V}`
    : A extends `${infer V extends number}`
    ? `${V}`
    : A extends `${infer V extends number}%`
    ? `${V}`
    : '',
  A extends `${string}%` ? '%' : ''
]

// kosaka
type _PercentageParser<A extends string> = [
  A extends `${infer F}${infer _}` ? (F extends '+' | '-' ? F : '') : '',
  A extends `${infer F}${infer T}`
    ? F extends '+' | '-' | '%'
      ? PercentageParser<`${T}`>[1]
      : `${F}${PercentageParser<T>[1]}`
    : '',
  A extends `${infer _}%` ? '%' : ''
]

// koike (未完)
type __PercentageParser<A extends string> = A extends `${infer Head extends
  | '+'
  | '-'
  | ''}${infer Tail}`
  ? [Head, ...(Tail extends `${infer Body}%` ? [Body, '%'] : [Tail, ''])]
  : never

type AAAA = '100%' extends `${''}${infer A}` ? A : never

type test1<T extends string> = T extends `${infer F}${infer L}` ? [F, L] : never
type _case = [test1<''>, test1<'a'>]

type PercentageParser<T extends string, S = ''> = T extends `${infer H extends
  | '+'
  | '-'}${infer R}`
  ? PercentageParser<R, H>
  : T extends `${infer N}%`
  ? [S, N, '%']
  : [S, T, '']

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Case0 = ['', '', '']
type Case1 = ['+', '', '']
type Case2 = ['+', '1', '']
type Case3 = ['+', '100', '']
type Case4 = ['+', '100', '%']
type Case5 = ['', '100', '%']
type Case6 = ['-', '100', '%']
type Case7 = ['-', '100', '']
type Case8 = ['-', '1', '']
type Case9 = ['', '', '%']
type Case10 = ['', '1', '']
type Case11 = ['', '100', '']

type cases = [
  Expect<Equal<PercentageParser<''>, Case0>>,
  Expect<Equal<PercentageParser<'+'>, Case1>>,
  Expect<Equal<PercentageParser<'+1'>, Case2>>,
  Expect<Equal<PercentageParser<'+100'>, Case3>>,
  Expect<Equal<PercentageParser<'+100%'>, Case4>>,
  Expect<Equal<PercentageParser<'100%'>, Case5>>,
  Expect<Equal<PercentageParser<'-100%'>, Case6>>,
  Expect<Equal<PercentageParser<'-100'>, Case7>>,
  Expect<Equal<PercentageParser<'-1'>, Case8>>,
  Expect<Equal<PercentageParser<'%'>, Case9>>,
  Expect<Equal<PercentageParser<'1'>, Case10>>,
  Expect<Equal<PercentageParser<'100'>, Case11>>
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/1978/answer/ja
  > 解答を見る：https://tsch.js.org/1978/solutions
  > その他の課題：https://tsch.js.org/ja
*/
