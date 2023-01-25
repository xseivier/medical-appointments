import { NextFunction, Request, Response } from 'express';
import { findServiceById, createService, updateService, deleteService } from './serivces-actions';
import { createServicesSchema, updateServicesSchema } from './services-validator';

export const createServiceHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('req.body', req.body);
  const { name, price, type } = req.body;

  const inputCreate = {
    name, price, type
  };

  try {
    await createServicesSchema.validate(inputCreate);
  } catch (error) {
    return next(error);
  }

  let serviceCreated;
  try {
    serviceCreated = await createService(inputCreate);
  } catch (error) {
    return next(error);
  }

  return res.json(serviceCreated);
};

export const updateServiceHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, type, price } = req.body;
  const { serviceId } = req.params;

  if (!serviceId)
    return res.status(400).json({
      message:
        'Service id is not provided, please check that the url params contains the service id',
    });

  const inputUpdate = {
    name, price, type
  };

  try {
    await updateServicesSchema.validate(inputUpdate);
  } catch (error) {
    return next(error);
  }

  let updateResult;
  try {
    updateResult = await updateService(Number(serviceId), inputUpdate);
  } catch (error) {
    return next(error);
  }

  return res.json(updateResult);
};

export const deleteServiceHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { serviceId } = req.params;

  if (!serviceId)
    return res.status(400).json({
      message:
        'Service id is not provided, please check that the url params contains the service id',
    });

  let deleteResult;
  try {
    deleteResult = await deleteService(Number(serviceId));
  } catch (error) {
    return next(error);
  }

  return res.json(deleteResult);
};
