import { NextFunction, Request, Response } from 'express';
import {
  createPatient,
  deletePatient,
  findPatientById,
  updatePatient,
} from './patients-actions';
import { createPatientSchema, updatePatientSchema } from './patients-validator';

export const getPatientInformationHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { patientId } = req.params;

  if (!patientId)
    return res.status(400).json({
      message:
        'Patient id is not provided, please check that the url params contains the patient id',
    });

  let patientInformation;
  try {
    patientInformation = await findPatientById(Number(patientId));
  } catch (error) {
    return next(error);
  }

  return res.json(patientInformation);
};

export const createPatientHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('req.body', req.body);
  const { firstName, lastName, age, type, gender, active } = req.body;

  const inputCreate = {
    firstName,
    lastName,
    age,
    type,
    gender,
    active,
  };

  try {
    await createPatientSchema.validate(inputCreate);
  } catch (error) {
    return next(error);
  }

  let patientCreated;
  try {
    patientCreated = await createPatient(inputCreate);
  } catch (error) {
    return next(error);
  }

  return res.json(patientCreated);
};

export const updatePatientHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { fistName, lastName, age, type, gender } = req.body;
  const { patientId } = req.params;

  if (!patientId)
    return res.status(400).json({
      message:
        'Patient id is not provided, please check that the url params contains the patient id',
    });

  const inputUpdate = {
    fistName,
    lastName,
    age,
    type,
    gender,
  };

  try {
    await updatePatientSchema.validate(inputUpdate);
  } catch (error) {
    return next(error);
  }

  let updateResult;
  try {
    updateResult = await updatePatient(Number(patientId), inputUpdate);
  } catch (error) {
    return next(error);
  }

  return res.json(updateResult);
};

export const activateOrDesactivatePatientHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { active } = req.body;
  const { patientId } = req.params;

  if (active !== true && active !== false)
    return res.status(400).json({
      message: '"active" params must be type boolean',
    });

  if (!patientId)
    return res.status(400).json({
      message:
        'Patient id is not provided, please check that the url params contains the patient id',
    });

  let updateResult;
  try {
    updateResult = await updatePatient(Number(patientId), {active});
  } catch (error) {
    return next(error);
  }

  return res.json(updateResult);
};

export const deletePatientHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { patientId } = req.params;

  if (!patientId)
    return res.status(400).json({
      message:
        'Patient id is not provided, please check that the url params contains the patient id',
    });

  let deleteResult;
  try {
    deleteResult = await deletePatient(Number(patientId));
  } catch (error) {
    return next(error);
  }

  return res.json(deleteResult);
};
