export interface ValidationFieldError<T> {
  field: T;
  message: string;
}

export interface ResponseErrorsI<T = any> {
  statusCode?: number;
  message?: string;
  error?: string; // NestHTTP & Database Errors
  errors?: ValidationFieldError<T>[]; // Validation Errors
}
