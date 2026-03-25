export enum HttpStatus {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export const HttpStatusMessage: Record<HttpStatus, string> = {
  [HttpStatus.BAD_REQUEST]: "Bad Request",
  [HttpStatus.UNAUTHORIZED]: "Unauthorized",
  [HttpStatus.FORBIDDEN]: "Forbidden",
  [HttpStatus.NOT_FOUND]: "Not Found",
  [HttpStatus.INTERNAL_SERVER_ERROR]: "Internal Server Error",
};

export class HttpError extends Error {
  constructor(
    public status: HttpStatus,
    message: string = HttpStatusMessage[status],
  ) {
    super(message);
    this.name = "HttpError";
  }
}
