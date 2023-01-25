import { Appointment } from '../../entities/Appointment';
import { AppDataSource } from '../../data-source';
import { Between, LessThan, MoreThan } from 'typeorm';

export const findAppointmentsByDate = async (
  startDate: string,
  endDate: string,
  patientId: number,
) => {
  let date;
  if (startDate && endDate) {
    date = Between(startDate, endDate);
  } else if (startDate) {
    date = MoreThan(startDate);
  } else if (endDate) {
    date = LessThan(endDate);
  }
  const appointmentFound = await AppDataSource.manager.find<Appointment>(
    Appointment,
    {
      where: {
        date,
        patient: {
          id: patientId,
        },
      },
      relations:{
        service: true
      }
    },
  );

  return appointmentFound;
};

export const createAppointment = async (data: Partial<Appointment>) => {
  const appointmentInput = AppDataSource.manager.create<Appointment>(
    Appointment,
    data,
  );

  const appointmentCreated = await AppDataSource.manager.save(appointmentInput);

  return appointmentCreated;
};

export const updateAppointment = async (
  id: number,
  data: Partial<Appointment>,
) => {
  const appointmentUpdated = await AppDataSource.manager.update<Appointment>(
    Appointment,
    { id },
    data,
  );

  return appointmentUpdated;
};

export const deleteAppointment = async (id: number) => {
  const appoinmentDeleted = await AppDataSource.manager.delete<Appointment>(
    Appointment,
    { id },
  );

  if (appoinmentDeleted?.affected === 0)
    throw new Error('Appointment to delete with id ' + id + ' not found');

  return appoinmentDeleted;
};
