type Flatten<S extends any[], T extends any[] = []> = S extends [
  infer X,
  ...infer Y
]
  ? X extends any[]
    ? Flatten<[...X, ...Y], T>
    : Flatten<[...Y], [...T, X]>
  : T
