/*
  4471 - Zip
  -------
  by キリサメ qianxi (@qianxi0410) #中級 #tuple

  ### 質問

  In This Challenge, You should implement a type `Zip<T, U>`, T and U must be `Tuple`
  ```ts
  type exp = Zip<[1, 2], [true, false]> // expected to be [[1, true], [2, false]]
  ```

  > GitHubで確認する：https://tsch.js.org/4471/ja
*/

/* _____________ ここにコードを記入 _____________ */

type Zip<T, U> = [T, U] extends [[infer TF, ...infer TR], [infer UF, ...infer UR]] ? [[TF, UF], ...Zip<TR, UR>] : []

type T = Zip<[1, 2], [true, false]>
type T2 = Zip<[1, 2, 3], ['1', '2']>
/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>,
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/4471/answer/ja
  > 解答を見る：https://tsch.js.org/4471/solutions
  > その他の課題：https://tsch.js.org/ja
*/
