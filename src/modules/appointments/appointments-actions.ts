import { Appointment } from '../../entities/Appointment';
import { AppDataSource } from '../../data-source';

export const findAppointmentById = async (id: number) => {
  const appointmentFound = await AppDataSource.manager.findOne<Appointment>(Appointment, {
    where:{
      id
    }
  });

  if(!appointmentFound) throw new Error(`Appointment with id ${id} not found`);

  return appointmentFound;
};

export const createAppointment = async (data: Partial<Appointment>) => {
  
  const appointmentInput = AppDataSource.manager.create<Appointment>(Appointment, data);

  const appointmentCreated = await AppDataSource.manager.save(appointmentInput);

  return appointmentCreated;
};

export const updateAppointment = async (id: number, data: Partial<Appointment>) => {

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
