// Original file: src/proto/issue.proto

export const UrgencyEnum = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
} as const;

export type UrgencyEnum =
  | 'LOW'
  | 0
  | 'MEDIUM'
  | 1
  | 'HIGH'
  | 2

export type UrgencyEnum__Output = typeof UrgencyEnum[keyof typeof UrgencyEnum]
