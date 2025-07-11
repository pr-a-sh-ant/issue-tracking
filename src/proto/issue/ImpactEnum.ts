// Original file: src/proto/issue.proto

export const ImpactEnum = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
} as const;

export type ImpactEnum =
  | 'LOW'
  | 0
  | 'MEDIUM'
  | 1
  | 'HIGH'
  | 2

export type ImpactEnum__Output = typeof ImpactEnum[keyof typeof ImpactEnum]
