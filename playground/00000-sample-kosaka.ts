import type { Equal, Expect, NotEqual } from "@type-challenges/utils"

type Dog = { kind: "aaa"; hight: number }
type DogProperty = keyof Dog
type keyofTest = Expect<Equal<DogProperty, "kind" | "hight">>
type Dog2 = { [P in DogProperty]: Dog[P] }
type mappedTest = Expect<Equal<Dog, Dog2>>
type Dog3 = { [P in DogProperty]: Dog[P] extends number ? string : Dog[P] }
type conditionalTest = Expect<NotEqual<Dog, Dog3>>

// https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
// When the type on the left of the extends is assignable to the one on the right,
// then you’ll get the type in the first branch(the “true” branch);
// otherwise you’ll get the type in the latter branch(the “false” branch).
type LiteralUnion = "a" | "b" | "c"
type x = keyof LiteralUnion
type y = Expect<Equal<"a" extends LiteralUnion ? true : false, true>> // "a" extends "a" | "b" | "c" -> true
type z = Expect<Equal<LiteralUnion extends "a" ? true : false, false>> // "a" | "b" | "c" extends "a" -> false

// keyof の挙動まとめたい
// 189 - Awaited　やる

// つづき
// playground/00898-easy-includes.ts

// #3 は62 ~ 191のmid
// #4 は296, 527 ~ 949
