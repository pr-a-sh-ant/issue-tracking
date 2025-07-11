// Original file: src/proto/issue.proto

export const StatusEnum = {
  NEW: 0,
  ACK: 1,
  RESOLVED: 2,
  CLOSED: 3,
  PENDING: 4,
} as const;

export type StatusEnum =
  | 'NEW'
  | 0
  | 'ACK'
  | 1
  | 'RESOLVED'
  | 2
  | 'CLOSED'
  | 3
  | 'PENDING'
  | 4

export type StatusEnum__Output = typeof StatusEnum[keyof typeof StatusEnum]
