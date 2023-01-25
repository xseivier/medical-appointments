import { NextFunction, Request, Response } from 'express';
import { findPatientById } from '../patients/patients-actions';
import { findServiceById } from '../services/serivces-actions';
import {
  createAppointment,
  deleteAppointment,
  findAppointmentsByDate,
  updateAppointment,
} from './appointments-actions';
import { createAppointmentSchema, reportsAppointmentSchema, updateAppointmentSchema } from './appointments-validator';

export const createAppointmentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('req.body', req.body);
  const { date, patientId, serviceId } = req.body;

  try {
    await createAppointmentSchema.validate({date, patientId, serviceId});
  } catch (error) {
    return next(error);
  }

  let patient;
  try {
    patient = await findPatientById(patientId);
  } catch (error) {
    return next(error);
  }

  if(patient.active !== true) {
    return res.status(400).json({message:'Patient is not active'});
  }

  let service;
  try {
    service = await findServiceById(serviceId);
  } catch (error) {
    return next(error);
  }

  const inputCreate = {
    date,
    patient,
    service,
  };

  let appointmentCreated;
  try {
    appointmentCreated = await createAppointment(inputCreate);
  } catch (error) {
    return next(error);
  }

  return res.json(appointmentCreated);
};

export const updateAppointmentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { date, serviceId } = req.body;
  const { appointmentId } = req.params;

  if (!appointmentId)
    return res.status(400).json({
      message:
        'Appointment id is not provided, please check that the url params contains the patient id',
    });



  try {
    await updateAppointmentSchema.validate({date, serviceId});
  } catch (error) {
    return next(error);
  }

  let service;
  try {
    service = await findServiceById(serviceId);
  } catch (error) {
    return next(error);
  }

  const inputUpdate = {
    date,
    service,
  };

  let updateResult;
  try {
    updateResult = await updateAppointment(Number(appointmentId), inputUpdate);
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
  const { appointmentId } = req.params;

  if (!appointmentId)
    return res.status(400).json({
      message:
        'Appointment id is not provided, please check that the url params contains the patient id',
    });

  let deleteResult;
  try {
    deleteResult = await deleteAppointment(Number(appointmentId));
  } catch (error) {
    return next(error);
  }

  return res.json(deleteResult);
};

export const getAppointmentsByDateHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {

  const { patientId } = req.params;
  const { startDate, endDate } = req.query;

  try {
    await reportsAppointmentSchema.validate({startDate, endDate, patientId});
  } catch (error) {
    return next(error);
  }

  let patient;
  try {
    patient = await findPatientById(Number(patientId));
  } catch (error) {
    return next(error);
  }

  let report;
  try {
    report = await findAppointmentsByDate(startDate as string, endDate as string, Number(patientId));
  } catch (error) {
    return next(error);
  }

  return res.json(report);

};
