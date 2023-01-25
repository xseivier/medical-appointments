import * as yup from 'yup';

export const createAppointmentSchema = yup.object().shape({
  patientId: yup.number().required(),
  serviceId: yup.number().required(),
  date: yup.date().min(new Date())
});

export const updateAppointmentSchema = yup.object().shape({
  serviceId: yup.number(),
  date: yup.date().min(new Date())
});
