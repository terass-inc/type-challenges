/*
  20 - Promise.all
  -------
  by Anthony Fu (@antfu) #中級 #array #promise

  ### 質問

  Promise ライクなオブジェクトの配列を受け取る関数 `PromiseAll` に型を付けてください。戻り値は `Promise<T>` である必要があります。ここで、`T` は解決された結果の配列です。

  ```ts
  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise<string>((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
  });

  // expected to be `Promise<[number, 42, string]>`
  const p = PromiseAll([promise1, promise2, promise3] as const)
  ```

  > GitHubで確認する：https://tsch.js.org/20/ja
*/

/* _____________ ここにコードを記入 _____________ */

/* type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer P>
  ? P extends PromiseLike<any>
    ? MyAwaited<P>
    : P
  : T

// declare function PromiseAll<V extends readonly any[]>(values: V): Promise<[V extends PromiseLike<any> ? MyAwaited<V>: V]>
// 時間切れわからんちん
declare function PromiseAll<V extends readonly any[]>(values: V): Promise<[V extends PromiseLike<any> ? MyAwaited<V> : V]>
 */

/* declare function PromiseAll<T>(values: T): Promise<AwaitArray<T>>
// ): Promise<T extends Readonly<infer Arr> ? AwaitArray<Arr> : AwaitArray<T>>
type AwaitArray<T> = T extends readonly [_: infer Head, ...__: infer Tail]
  ? [Head extends Promise<infer A> ? A : Head, ...AwaitArray<Tail>]
  : []
 */
// type UnwrapPromise<T> = T extends Promise<infer U> ? U : T
// declare function PromiseAll<T extends readonly any[]>(values: readonly [...T]): Promise<{ [K in keyof T]: UnwrapPromise<T[K]>}>

/* declare function PromiseAll<T extends any[]>(
  args: readonly [...T]
): Promise<{
  [P in keyof T]: T[P] extends Promise<infer r> ? r : T[P]
}>
 */
const a = [1, 2, Promise.resolve(3)]
type A = [...typeof a]

// lib.es2015.promise.d.ts
/**
 * Creates a Promise that is resolved with an array of results when all of the provided Promises
 * resolve, or rejected when any Promise is rejected.
 * @param values An array of Promises.
 * @returns A new Promise.
 */
declare function PromiseAll<T extends readonly unknown[] | []>(
  values: T
): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>

/* _____________ テストケース _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

const promiseAllTest1 = PromiseAll([1, 2, 3] as const)
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const)
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)])
const promiseAllTest4 = PromiseAll<Array<number | Promise<number>>>([1, 2, 3])

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
  Expect<Equal<typeof promiseAllTest4, Promise<number[]>>>
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/20/answer/ja
  > 解答を見る：https://tsch.js.org/20/solutions
  > その他の課題：https://tsch.js.org/ja
*/
