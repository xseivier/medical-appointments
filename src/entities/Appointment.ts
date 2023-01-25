import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from 'typeorm';
import { Patient } from './Patient';
import { Service } from './Service';


@Entity()

export class Appointment {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ type: 'timestamp' })
    date: string;

  @Column({ type: 'boolean', default: false })
    cancelled: boolean; 
    
  @ManyToOne(() => Patient, (patient) => patient.appointments, {
    onDelete: 'RESTRICT',
  })
    patient: Patient;

  @ManyToOne(() => Service, (service) => service.appointments, {
    onDelete: 'RESTRICT',
  })
    service: Service;    
}
