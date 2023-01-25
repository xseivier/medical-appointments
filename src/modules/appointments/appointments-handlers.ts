import { NextFunction, Request, Response } from 'express';
import {
  createAppointment,
  deleteAppointment,
  updateAppointment,
} from './appointments-actions';
// import { createAppointmentSchema, updateAppointmentSchema } from './appointments-validator';

export const createAppointmentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('req.body', req.body);
  const { date, time, patient, service } = req.body;

  const inputCreate = {
    date,
    time,
    patient,
    service,
  };

  // try {
  //   await createAppointmentSchema.validate(inputCreate);
  // } catch (error) {
  //   return next(error);
  // }

  let patientCreated;
  try {
    patientCreated = await createAppointment(inputCreate);
  } catch (error) {
    return next(error);
  }

  return res.json(patientCreated);
};

export const updateAppointmentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { date, time, patient, service } = req.body;
  const { patientId } = req.params;

  if (!patientId)
    return res.status(400).json({
      message:
        'Appointment id is not provided, please check that the url params contains the patient id',
    });

  const inputUpdate = {
    date,
    time,
    patient,
    service,
  };

  // try {
  //   await updateAppointmentSchema.validate(inputUpdate);
  // } catch (error) {
  //   return next(error);
  // }

  let updateResult;
  try {
    updateResult = await updateAppointment(Number(patientId), inputUpdate);
  } catch (error) {
    return next(error);
  }

  return res.json(updateResult);
};

export const deleteAppointmentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { patientId } = req.params;

  if (!patientId)
    return res.status(400).json({
      message:
        'Appointment id is not provided, please check that the url params contains the patient id',
    });

  let deleteResult;
  try {
    deleteResult = await deleteAppointment(Number(patientId));
  } catch (error) {
    return next(error);
  }

  return res.json(deleteResult);
};
