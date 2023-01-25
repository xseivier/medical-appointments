import { GenderFormat } from './../../entities/Patient';
import * as yup from 'yup';

export const createPatientSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  age: yup.number().required().positive().integer(),
  gender: yup.mixed<GenderFormat>().oneOf(Object.values(GenderFormat)),
  active: yup.boolean()
});

export const updatePatientSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  age: yup.number().positive().integer(),
  gender: yup.mixed<GenderFormat>().oneOf(Object.values(GenderFormat)),
});