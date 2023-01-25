import { Router } from "express";
import { activateOrDesactivatePatientHandler, createPatientHandler, deletePatientHandler, getPatientInformationHandler, updatePatientHandler } from "./patients-handlers";

export const patientsRouter = Router();

// Registrar paciente
patientsRouter.post('/', createPatientHandler);

// Solicitar información del paciente
patientsRouter.get('/:patientId', getPatientInformationHandler);

// Actualizar datos del paciente
patientsRouter.put('/:patientId', updatePatientHandler);

// Inactivar o desactivar paciente
patientsRouter.put('/active-status/:patientId', activateOrDesactivatePatientHandler);

// Eliminar paciente, tomando en cuenta que no debe tener citas e historial medico
patientsRouter.delete('/:patientId', deletePatientHandler);