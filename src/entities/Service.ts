import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';
import { Appointment } from './Appointment';

export enum ServicesTypeFormat {
  ONE_TIME = 'One-time',
  WEEKLY = 'Weekly',
  MONTLY = 'Montly',
}

@Entity()

export class Service {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ type: 'text' })
    name: string;

  @Column({ type: 'text' })
    price: string;
    
  @Column({
    type: 'enum',
    enum: ServicesTypeFormat,
    default: ServicesTypeFormat.ONE_TIME
  })    
    type: ServicesTypeFormat; 
    
  @OneToMany(() => Appointment, (appoinment) => appoinment.service)
    appointments: Appointment[];      
}
