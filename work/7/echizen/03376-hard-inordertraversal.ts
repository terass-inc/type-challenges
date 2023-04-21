/*
  3376 - InorderTraversal
  -------
  by jiangshan (@jiangshanmeta) #中級 #object

  ### 質問

  Implement the type version of binary tree inorder traversal.

  For example:

  ```typescript
  const tree1 = {
    val: 1,
    left: null,
    right: {
      val: 2,
      left: {
        val: 3,
        left: null,
        right: null,
      },
      right: null,
    },
  } as const

  type A = InorderTraversal<typeof tree1> // [1, 3, 2]
  ```

  > GitHubで確認する：https://tsch.js.org/3376/ja
*/

/* _____________ ここにコードを記入 _____________ */

interface TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
}

type _Flatten<T> = T extends [infer H, ...infer T] ? [..._Flatten<H>, ..._Flatten<T>] : T extends [] ? [] : [T]

// left tree -> root -> right tree
type EchizenInorderTraversal<T extends TreeNode | null> = _Flatten<
  T extends TreeNode ? [EchizenInorderTraversal<T['left']>, T['val'], EchizenInorderTraversal<T['right']>] : []
>

type koikeInorderTraversal<T extends TreeNode | null> = T extends TreeNode
  ? Flatten<[InorderTraversal<T['left']>, T['val'], InorderTraversal<T['right']>]>
  : []

type T = InorderTraversal<typeof tree1>

// kkb
type InorderTraversal_<T extends TreeNode | null> = [
  T['left'] extends null ? never : InorderTraversal<T['left']>,
  T['val'],
  T['right'] extends null ? never : InorderTraversal<T['right']>,
]

type Flatten<T extends any[]> = T extends [infer Head, ...infer Tail]
  ? Head extends any[]
    ? [...Flatten<Head>, ...Flatten<Tail>]
    : [Head, ...Flatten<Tail>]
  : []
type fuga = Flatten<[1, [2, 3]]>

type InorderTraversal__<T extends TreeNode | null> = T extends null
  ? []
  : Flatten<
      T['left'] extends null
        ? T['right'] extends null
          ? [T['val']]
          : [T['val'], InorderTraversal<T['right']>]
        : [InorderTraversal<T['left']>, T['val']]
    >

type InorderTraversal___<T extends TreeNode | null> = T extends null
  ? []
  : T['left'] extends null
  ? T['right'] extends null
    ? [T['val']]
    : [T['val'], ...InorderTraversal___<T['right']>]
  : [...InorderTraversal___<T['left']>, T['val']]

type aaaa = InorderTraversal___<typeof tree1>
type InorderTraversal<T extends TreeNode | null> = T extends null
  ? []
  : [...InorderTraversal<T['left']>, T['val'], ...InorderTraversal<T['right']>]

type hoge = InorderTraversal<typeof tree3>

// これが本命 [T] にするとなぜか再帰上限にどーのコーの言われない
type InorderTraversal_hoge<T extends TreeNode | null> = [T] extends [TreeNode]
  ? [...InorderTraversal_hoge<T['left']>, T['val'], InorderTraversal_hoge<T['right']>]
  : []

// type InorderTraversal<T extends TreeNode | null> = T extends TreeNode ? [...InorderTraversal<T['left']>, T['val'], ...InorderTraversal<T['right']>] : []

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const tree1 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
} as const

const tree2 = {
  val: 1,
  left: null,
  right: null,
} as const

const tree3 = {
  val: 1,
  left: {
    val: 2,
    left: null,
    right: null,
  },
  right: null,
} as const

const tree4 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: null,
    right: null,
  },
} as const

type cases = [
  Expect<Equal<InorderTraversal<null>, []>>,
  Expect<Equal<InorderTraversal<typeof tree1>, [1, 3, 2]>>,
  Expect<Equal<InorderTraversal<typeof tree2>, [1]>>,
  Expect<Equal<InorderTraversal<typeof tree3>, [2, 1]>>,
  Expect<Equal<InorderTraversal<typeof tree4>, [1, 2]>>,
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/3376/answer/ja
  > 解答を見る：https://tsch.js.org/3376/solutions
  > その他の課題：https://tsch.js.org/ja
*/
