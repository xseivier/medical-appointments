import { Router } from "express";
import {  createAppointmentHandler, deleteAppointmentHandler, getAppointmentsByDateHandler, updateAppointmentHandler } from "./appointments-handlers";

export const appointmentsRouter = Router();

// Crear una cita al paciente, es decir, debe tener asignado el tipo de examen que se va realizar el paciente, es una relación con la tabla servicios
appointmentsRouter.post('/', createAppointmentHandler);

// Editar Cita
appointmentsRouter.put('/:appointmentId', updateAppointmentHandler);

// Eliminar cita
appointmentsRouter.delete('/:appointmentId', deleteAppointmentHandler);

// Consultar un reporte por fecha de las citas medicas relacionada por paciente
appointmentsRouter.get('/:patientId', getAppointmentsByDateHandler);