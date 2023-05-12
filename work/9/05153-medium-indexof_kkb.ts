/*
  5153 - IndexOf
  -------
  by Pineapple (@Pineapple0919) #中級 #array

  ### 質問

  Implement the type version of Array.indexOf, indexOf<T, U> takes an Array T, any U and returns the index of the first U in Array T.

  ```ts
  type Res = IndexOf<[1, 2, 3], 2>; // expected to be 1
  type Res1 = IndexOf<[2,6, 3,8,4,1,7, 3,9], 3>; // expected to be 2
  type Res2 = IndexOf<[0, 0, 0], 2>; // expected to be -1
  ```

  > GitHubで確認する：https://tsch.js.org/5153/ja
*/

/* _____________ ここにコードを記入 _____________ */

type IndexOf_<T extends any[], U extends any, Count extends unknown[] = []> = T extends [infer TH, ...infer TT]
  ? Equal<TH, U> extends true
    ? Count['length']
    : IndexOf_<TT, U, [unknown, ...Count]>
  : -1

type isUnknown<T extends any> = unknown extends T ? true : false
type IndexOf<T extends any[], U extends any, Count extends unknown[] = []> = T extends [infer TH, ...infer TT]
  ? isUnknown<U> | isUnknown<TH> extends true
    ? Count['length']
    : isUnknown<U> extends true
      ? IndexOf<TT, U, [unknown, ...Count]>
      : isUnknown<TH> extends true
        ? IndexOf<TT, U, [unknown, ...Count]>
        : U extends TH
          ? TH extends U
            ? Count['length']
            : IndexOf<TT, U, [unknown, ...Count]>
          : IndexOf<TT, U, [unknown, ...Count]>
  : -1

type hoge = isUnknown<any> | isUnknown<unknown>
type a = IndexOf<[any, 1], 1>
type b = unknown extends 1 ? true : false
type c = Equal<any, 1>

/* _____________ テストケース _____________ */
import type { Equal, Expect, ExpectExtends } from '@type-challenges/utils'
import { UnderlyingSink, UnderlyingSinkAbortCallback } from 'stream/web'

type cases = [
  Expect<Equal<IndexOf<[1, 2, 3], 2>, 1>>,
  Expect<Equal<IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 2>>,
  Expect<Equal<IndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a'], number>, 2>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a', any], any>, 4>>,
  Expect<Equal<IndexOf<[string, 'a'], 'a'>, 1>>,
  Expect<Equal<IndexOf<[any, 1], 1>, 1>>,
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/5153/answer/ja
  > 解答を見る：https://tsch.js.org/5153/solutions
  > その他の課題：https://tsch.js.org/ja
*/
