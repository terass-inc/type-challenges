/*
  8640 - Number Range
  -------
  by AaronGuo (@HongxuanG) #中級

  ### 質問

  Sometimes we want to limit the range of numbers...
  For examples.
  ```
  type result = NumberRange<2 , 9> //  | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  ```

  > GitHubで確認する：https://tsch.js.org/8640/ja
*/

/* _____________ ここにコードを記入 _____________ */

type NumberRange<
  L extends number,
  H extends number,
  T extends number[] = [],
  F extends boolean = false
> = T["length"] extends H
  ? Exclude<[...T, H][number], -1>
  : NumberRange<
      L,
      H,
      [
        ...T,
        F extends true ? T["length"] : T["length"] extends L ? T["length"] : -1
      ],
      F extends false ? (T["length"] extends L ? true : false) : true
    >

/* _____________ テストケース _____________ */
import type { Equal, Expect } from "@type-challenges/utils"
type Result1 = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type Result2 = 0 | 1 | 2
type Result3 =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52
  | 53
  | 54
  | 55
  | 56
  | 57
  | 58
  | 59
  | 60
  | 61
  | 62
  | 63
  | 64
  | 65
  | 66
  | 67
  | 68
  | 69
  | 70
  | 71
  | 72
  | 73
  | 74
  | 75
  | 76
  | 77
  | 78
  | 79
  | 80
  | 81
  | 82
  | 83
  | 84
  | 85
  | 86
  | 87
  | 88
  | 89
  | 90
  | 91
  | 92
  | 93
  | 94
  | 95
  | 96
  | 97
  | 98
  | 99
  | 100
  | 101
  | 102
  | 103
  | 104
  | 105
  | 106
  | 107
  | 108
  | 109
  | 110
  | 111
  | 112
  | 113
  | 114
  | 115
  | 116
  | 117
  | 118
  | 119
  | 120
  | 121
  | 122
  | 123
  | 124
  | 125
  | 126
  | 127
  | 128
  | 129
  | 130
  | 131
  | 132
  | 133
  | 134
  | 135
  | 136
  | 137
  | 138
  | 139
  | 140
type cases = [
  NumberRange<2, 9>,
  Expect<Equal<NumberRange<2, 9>, Result1>>,
  Expect<Equal<NumberRange<0, 2>, Result2>>,
  Expect<Equal<NumberRange<0, 140>, Result3>>
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/8640/answer/ja
  > 解答を見る：https://tsch.js.org/8640/solutions
  > その他の課題：https://tsch.js.org/ja
*/