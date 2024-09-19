
import { Request, Response, NextFunction } from 'express';
import responseBody from './index';
import responseCode from './responseCode';

const responseHandler = (req: Request, res: any, next: NextFunction): void => {
  res.success = (data: any = {}): Response => {
    return res.status(responseCode.success).json(responseBody.success(data));
  };
  res.failure = (data: any = {}): Response => {
    return res.status(responseCode.success).json(responseBody.failure(data));
  };
  res.internalServerError = (data: any = {}): Response => {
    return res.status(responseCode.internalServerError).json(responseBody.internalServerError(data));
  };
  res.badRequest = (data: any = {}): Response => {
    return res.status(responseCode.badRequest).json(responseBody.badRequest(data));
  };
  res.recordNotFound = (data: any = {}): Response => {
    return res.status(responseCode.success).json(responseBody.recordNotFound(data));
  };
  res.validationError = (data: any = {}): Response => {
    return res.status(responseCode.validationError).json(responseBody.validationError(data));
  };
  res.unAuthorized = (data: any = {}): Response => {
    return res.status(responseCode.unAuthorized).json(responseBody.unAuthorized(data));
  };
  next();
};

export default responseHandler;