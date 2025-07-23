class AppError extends Error {
  public statusCode: number;

  constructor(message: string, code: number = 500) {
    super(message);
    this.statusCode = code;
    Error.captureStackTrace(this, this.constructor);
  }

  static mapGRPCCodeToHTTP(code: number): number {
    const map: Record<number, number> = {
      0: 200, // OK
      1: 499, // Canceled
      2: 500, // Unknown
      3: 400, // InvalidArgument
      4: 504, // DeadlineExceeded
      5: 404, // NotFound
      6: 409, // AlreadyExists
      7: 403, // PermissionDenied
      8: 429, // ResourceExhausted
      9: 412, // FailedPrecondition
      10: 409, // Aborted
      11: 400, // OutOfRange
      12: 501, // Unimplemented
      13: 500, // Internal
      14: 503, // Unavailable
      15: 401, // Unauthenticated
      16: 401, // Unauthorized
    };
    return map[code] || 500;
  }
}

export default AppError;
