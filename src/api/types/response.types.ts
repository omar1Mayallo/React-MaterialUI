export interface ValidationFieldError<T> {
  field: T;
  message: string;
}

export interface ResponseErrorsI<T extends string> {
  statusCode?: number;
  message?: string;
  error?: string; // NestHTTP & Database Errors
  errors?: ValidationFieldError<T>[]; // Validation Errors
}
