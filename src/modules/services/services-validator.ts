import { ServicesTypeFormat } from './../../entities/Service';
import * as yup from 'yup';

export const createServicesSchema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().required().positive(),
  type: yup.mixed<ServicesTypeFormat>().oneOf(Object.values(ServicesTypeFormat)),
});

export const updateServicesSchema = yup.object().shape({
  name: yup.string(),
  price: yup.number().positive(),
  type: yup.mixed<ServicesTypeFormat>().oneOf(Object.values(ServicesTypeFormat)),
});