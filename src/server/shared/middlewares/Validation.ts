import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { AnySchema, ObjectSchema, ValidationError } from "yup";

type Tproperty = 'body' | 'header' | 'params' | 'query';

type TGetSchema = <T extends object>(schema: ObjectSchema<T>) => ObjectSchema<T>;

type TAllSchemas = Record<Tproperty, AnySchema>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation = ( getAllSchemas ) => async (req, res, next) => {
  const schemas = getAllSchemas((schema) => schema);

  const errosResult: Record<string, Record<string, string>> = {};

  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validateSync(req[key as Tproperty],  { abortEarly: false });
      
    } catch (err) {
      const yupError = err as ValidationError;
      const errors: Record<string, string> = {};
 
      yupError.inner.forEach(error => {
        if (!error.path) return;
        errors[error.path] = error.message;
      });
 
      errosResult[key] = errors;
      
    }
  });
 
  if (Object.keys(errosResult).length === 0){
    return next();
  } else{
    res.status(StatusCodes.BAD_REQUEST).json ({errors: errosResult});
  };

};
