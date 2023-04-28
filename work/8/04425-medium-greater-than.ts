/*
  4425 - Greater Than
  -------
  by ch3cknull (@ch3cknull) #中級 #array

  ### 質問

  In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`

  Negative numbers do not need to be considered.

  For example

  ```ts
  GreaterThan<2, 1> //should be true
  GreaterThan<1, 1> //should be false
  GreaterThan<10, 100> //should be false
  GreaterThan<111, 11> //should be true
  ```

  Good Luck!

  > GitHubで確認する：https://tsch.js.org/4425/ja
*/

// Kosaka
type ParseInt<T> = T extends `${infer Digit extends number}` ? Digit : never

type NumberToTuple<
  T extends number,
  _T extends string = `${T}`,
  __T extends number[] = []
> = _T extends `${infer H}${infer R}`
  ? NumberToTuple<never, R, [...__T, ParseInt<H>]>
  : __T

type CreateTuple<
  T extends number,
  R extends number[] = []
> = R["length"] extends T ? R : CreateTuple<number, [1, ...R]>

type GreaterThanDigit<
  T extends number,
  U extends number,
  S extends number[] = CreateTuple<T>
> = S["length"] extends 10
  ? true
  : S["length"] extends U
  ? false
  : GreaterThanDigit<T, U, [1, ...S]>

type GreaterThan<
  T extends number,
  U extends number,
  _T extends number[] = NumberToTuple<T>,
  _U extends number[] = NumberToTuple<U>
> = _T["length"] extends _U["length"]
  ? _T extends [infer _TF, ...infer _TR]
    ? _U extends [infer _UF, ...infer _UR]
      ? false
      : false
    : false
  : false


// 最後のケースが通らない
// タプルV(初期値は[]）に要素を追加していく
// VのlengthがTに達した時点でfalse, その前にUに達したらtrue
type EchizenGreaterThan<T extends number, U extends number, V extends any[] = []> = V['length'] extends T
  ? false
  : V['length'] extends U
  ? true
  : EchizenGreaterThan<T, U, [true, ...V]>



// hayashi 究極のMinus One使った
type ParseInt<T extends string> = T extends `${infer Digit extends number}` ? Digit : never
type ReverseString<S extends string> = S extends `${infer First}${infer Rest}` ? `${ReverseString<Rest>}${First}` : ''
type RemoveLeadingZeros<S extends string> = S extends '0' ? S : S extends `${'0'}${infer R}` ? RemoveLeadingZeros<R> : S
type InternalMinusOne<
  S extends string
> = S extends `${infer Digit extends number}${infer Rest}` ?
    Digit extends 0 ?
      `9${InternalMinusOne<Rest>}` :
    `${[9, 0, 1, 2, 3, 4, 5, 6, 7, 8][Digit]}${Rest}`:
  never

type MinusOne<T extends number> = ParseInt<RemoveLeadingZeros<ReverseString<InternalMinusOne<ReverseString<`${T}`>>>>>

type GreaterThan<T extends number, U extends number> = T extends 0
  ? false
  : MinusOne<T> extends U
    ? true
    : GreaterThan<MinusOne<T>, U>


// kkb
type StringToNumber<T extends string> =
  T extends '0' ? 0 :
  T extends '1' ? 1 :
  T extends '2' ? 2 :
  T extends '3' ? 3 :
  T extends '4' ? 4 :
  T extends '5' ? 5 :
  T extends '6' ? 6 :
  T extends '7' ? 7 :
  T extends '8' ? 8 :
  T extends '9' ? 9 :
  never

type ToArray<T extends number | string> = T extends string
  ? T extends `${infer Head}${infer Tail}`
    ? [StringToNumber<Head>, ...ToArray<Tail>]
    : []
  : ToArray<`${T}`>

type ToUnknownArray<T extends number, U extends unknown[] = []> = T extends U['length']
  ? U
  : ToUnknownArray<T, [unknown, ...U]>

type GreaterThanUnknownArray<T extends unknown[], U extends unknown[]> = T extends U
  ? false
  : T extends [infer _, ...infer TT]
    ? U extends [infer _, ...infer UT]
      ? GreaterThanUnknownArray<TT, UT>
      : true
    : false

type hoge = GreaterThanUnknownArray<ToUnknownArray<4>, ToUnknownArray<4>>

type ZeroToNine = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

type GreaterThan<
  T extends number,
  U extends number,
  _T extends any[] = ToArray<T>,
  _U extends any[] = ToArray<U>,
> = _T['length'] extends _U['length']
  ? _T extends [infer TH, ...infer TT]
    ? _U extends [infer UH, ...infer UT]
      ? TH extends UH
        ? GreaterThan<T, T, TT, UT>
        : TH extends ZeroToNine
          ? UH extends ZeroToNine
            ? GreaterThanUnknownArray<ToUnknownArray<TH>, ToUnknownArray<UH>>
            : never
          : never
      : true
    : false
  : _T extends [infer _, ...infer TT]
    ? _U extends [infer _, ...infer UT]
      ? GreaterThan<T, U, TT, UT>
      : true
    : false



// いわせ(ちょっとこたえみた)
type iwaseGreaterThan<T extends number, U extends number> = ((
  ...args: [...Array<T>]
) => unknown) extends (x: unknown, ...args: [...Array<U>]) => unknown
  ? false
  : true





//wada
type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

// type CompareConverter = {
//   '9': '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
//   '8': '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7'
//   '7': '0' | '1' | '2' | '3' | '4' | '5' | '6'
//   '6': '0' | '1' | '2' | '3' | '4' | '5'
//   '5': '0' | '1' | '2' | '3' | '4'
//   '4': '0' | '1' | '2' | '3'
//   '3': '0' | '1' | '2'
//   '2': '0' | '1'
//   '1': '0'
//   '0': never
// }
// type CompareLeftDigit<
//   T extends Digit,
//   U extends Digit,
// > = U extends CompareConverter[T] ? true : false

type CompareLeftDigit<
  T extends Digit,
  U extends Digit,
  V extends any[] = [],
> = `${V['length']}` extends T
  ? false
  : `${V['length']}` extends U
  ? true
  : CompareLeftDigit<T, U, [true, ...V]>

type Compare<
  T extends string, // MUST be same legnth
  U extends string, // MUST be same legnth
> = T extends `${infer FT extends Digit}${infer RT}`
  ? U extends `${infer FU extends Digit}${infer RU}`
    ? RT extends ''
      ? CompareLeftDigit<FT, FU>
      : FT extends FU
      ? Compare<RT, RU>
      : CompareLeftDigit<FT, FU>
    : never
  : never
  
type IsLonger<
  T extends string,
  U extends string,
> = T extends `${infer _}${infer RT}`
  ? U extends `${infer _}${infer RU}`
    ? IsLonger<RT, RU>
    : true
  : U extends `${infer _}${infer _}`
  ? false
  : 'same'

type wadaGreaterThan<
  T extends number,
  U extends number,
  Z = IsLonger<`${T}`, `${U}`>,
> = Z extends 'same' ? Compare<`${T}`, `${U}`> : Z
//-wada
/* _____________ ここにコードを記入 _____________ */

type GreaterThan<T extends number, U extends number> = any

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>,
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/4425/answer/ja
  > 解答を見る：https://tsch.js.org/4425/solutions
  > その他の課題：https://tsch.js.org/ja
*/
