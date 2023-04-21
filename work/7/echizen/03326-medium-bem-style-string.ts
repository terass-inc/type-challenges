/*
  3326 - BEM style string
  -------
  by Songhn (@songhn233) #中級 #template-literal #union #tuple

  ### 質問

  The Block, Element, Modifier methodology (BEM) is a popular naming convention for classes in CSS.

  For example, the block component would be represented as `btn`, element that depends upon the block would be represented as `btn__price`, modifier that changes the style of the block would be represented as `btn--big` or `btn__price--warning`.

  Implement `BEM<B, E, M>` which generate string union from these three parameters. Where `B` is a string literal, `E` and `M` are string arrays (can be empty).

  > GitHubで確認する：https://tsch.js.org/3326/ja
*/

/* _____________ ここにコードを記入 _____________ */
// EとMをそれぞれE[number] extends any みたいにしてdistributeさせる
// EとMそれぞれ空の場合の対応が別で必要

// Nはneverになる
type Empty = []
type N = Empty[number]

type EchizenBEM<B extends string, E extends string[], M extends string[]> = [E[number]] extends [never]
  ? [M[number]] extends [never]
    ? // E空、M空
      B
    : // E空、M有 -> Mをdistribute
    M[number] extends any
    ? `${B}--${M[number]}`
    : ''
  : [M[number]] extends [never]
  ? // E有、M空 -> Eをdistribute
    E[number] extends any
    ? `${B}__${E[number]}`
    : ''
  : // E有、M有 -> EとM両方distribute
  E[number] extends any
  ? M[number] extends any
    ? `${B}__${E[number]}--${M[number]}`
    : ''
  : ''

type _koskaaBEM<B extends string, E extends string[], M extends string[]> = `${B}${E extends []
  ? ''
  : `__${E[number]}`}${M extends [] ? '' : `--${M[number]}`}`

// nakano
type BEM<B extends string, E extends string[], M extends string[]> = `${B}${E['length'] extends 0
  ? ''
  : `__${E[number]}`}${M['length'] extends 0 ? '' : `--${M[number]}`}`

// haseryo
type HaseBEM<B extends string, E extends string[], M extends string[]> = E[number] extends any[]
  ? M[number] extends any[]
    ? never
    : `${B}--${M[number]}`
  : M[number] extends any[]
  ? `${B}__${E[number]}`
  : `${B}__${E[number]}--${M[number]}`

// hayashi
type BEM<B extends string, E extends string[], M extends string[]> = E extends []
  ? M extends []
    ? `${B}`
    : `${B}--${M[number]}`
  : M extends []
  ? `${B}__${E[number]}`
  : `${B}__${E[number]}--${M[number]}`

// koike
type koikeBEM<B extends string, E extends string[], M extends string[]> = `
  ${B}
  ${E extends [] ? '' : E extends (infer EE extends string)[] ? `__${EE}` : ''}
  ${M extends [] ? '' : M extends (infer MM extends string)[] ? `--${MM}` : ''}`

type T = BEM<'btn', ['price'], ['warning', 'success']>
type T2 = BEM<'btn', [], ['small', 'medium', 'large']>
type T3 = BEM<'btn', ['price', 'name'], ['small', 'medium', 'large']>

// kkb
type BEM<B extends string, E extends string[], M extends string[]> = `${B}${E extends []
  ? ''
  : `__${E[number]}`}${M extends [] ? '' : `--${M[number]}`}`

// twada
type Convert<M extends string[], Prefix extends string> = M extends [] ? '' : `${Prefix}${M[number]}`
type wadaBEM<B extends string, E extends string[], M extends string[]> = `${B}${Convert<E, '__'>}${Convert<M, '--'>}`

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<Equal<BEM<'btn', ['price'], ['warning', 'success']>, 'btn__price--warning' | 'btn__price--success'>>,
  Expect<Equal<BEM<'btn', [], ['small', 'medium', 'large']>, 'btn--small' | 'btn--medium' | 'btn--large'>>,
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/3326/answer/ja
  > 解答を見る：https://tsch.js.org/3326/solutions
  > その他の課題：https://tsch.js.org/ja
*/
