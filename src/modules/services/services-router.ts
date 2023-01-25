import { Router } from "express";
import {  createServiceHandler, deleteServiceHandler, updateServiceHandler } from "./services-handlers";

export const servicesRouter = Router();

// Crear servicios que ofrece la clínica para el paciente
servicesRouter.post('/', createServiceHandler);

// Editar
servicesRouter.put('/:serviceId', updateServiceHandler);

// Eliminar, tomando en cuento que el servicio no este asociado a una cita
servicesRouter.delete('/:serviceId', deleteServiceHandler);