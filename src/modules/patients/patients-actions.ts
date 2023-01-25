import { Patient } from './../../entities/Patient';
import { AppDataSource } from './../../data-source';

export const findPatientById = async (id: number) => {
  const patientFound = await AppDataSource.manager.findOne<Patient>(Patient, {
    where:{
      id
    },
    relations:{
      appointments: true
    }
  });

  if(!patientFound) throw new Error(`Patient with id ${id} not found`);

  return patientFound;
};

export const createPatient = async (data: Partial<Patient>) => {
  const patientInput = AppDataSource.manager.create<Patient>(Patient, data);

  const patientCreated = await AppDataSource.manager.save(patientInput);

  return patientCreated;
};

export const updatePatient = async (id: number, data: Partial<Patient>) => {

  const patientUpdated = await AppDataSource.manager.update<Patient>(
    Patient,
    { id },
    data,
  );

  return patientUpdated;
};

export const deletePatient = async (id: number) => {
  
  const patientDeleted = await AppDataSource.manager.delete<Patient>(
    Patient,
    { id },
  );

  if (patientDeleted?.affected === 0)
    throw new Error('Patient to delete with id ' + id + ' not found');

  return patientDeleted;
};
