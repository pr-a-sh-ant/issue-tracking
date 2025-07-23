class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: string = "INTERNAL"
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

export default AppError;
