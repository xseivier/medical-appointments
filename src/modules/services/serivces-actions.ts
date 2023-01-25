import { Service } from '../../entities/Service';
import { AppDataSource } from '../../data-source';

export const findServiceById = async (id: number) => {
  const serviceFound = await AppDataSource.manager.findOne<Service>(Service, {
    where: {
      id,
    },
    relations: {
      appointments: true,
    },
  });

  if (!serviceFound) throw new Error(`Service with id ${id} not found`);

  return serviceFound;
};

export const createService = async (data: Partial<Service>) => {
  const serviceInput = AppDataSource.manager.create<Service>(Service, data);

  const serviceCreated = await AppDataSource.manager.save(serviceInput);

  return serviceCreated;
};

export const updateService = async (id: number, data: Partial<Service>) => {
  const serviceUpdated = await AppDataSource.manager.update<Service>(
    Service,
    { id },
    data,
  );

  return serviceUpdated;
};

export const deleteService = async (id: number) => {
  const serviceDeleted = await AppDataSource.manager.delete<Service>(Service, {
    id,
  });

  if (serviceDeleted?.affected === 0)
    throw new Error('Service to delete with id ' + id + ' not found');

  return serviceDeleted;
};
