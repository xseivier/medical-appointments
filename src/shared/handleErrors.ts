import { Response, Request, NextFunction } from 'express';

export class APIError extends Error {
  constructor(
    message: string,
    public status = 400,
    public extra?: Record<string, unknown>,
  ) {
    super(message);
    this.status = status;
    this.extra = extra;
    Object.setPrototypeOf(this, APIError.prototype);
  }
}


export const handleErrors = (
  err: Error | APIError,
  req: Request,
  res: Response,
  next: NextFunction,
): Response<Record<string, string>> => {
  if (err instanceof APIError) {
    console.log('handle APIError: ', JSON.stringify(err, null, 2));
    let result = {
      message: err.message,
    };
    if (err.extra) result = { ...result, ...err.extra };
    return res.status(err.status).json(result);
  }
  if (err?.stack) {
    console.error('handle stack errors: ', JSON.stringify(err, null, 2));
    return res.status(400).json({ error: String(err) });
  }
  console.error('handle errors JSON: ', JSON.stringify(err, null, 2));
  return res.status(400).json(err);
};
