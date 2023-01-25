import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';
import { Appointment } from './Appointment';

export enum GenderFormat {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other'
}

@Entity()

export class Patient {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ type: 'text', nullable: true })
    firstName: string;

  @Column({ type: 'text', nullable: true })
    lastName: string;

  @Column({ type: 'text', nullable: true })
    age: string; 
    
  @Column({
    type: 'enum',
    enum: GenderFormat,
    default: GenderFormat.OTHER
  })    
    gender: GenderFormat;     

  @Column({ type: 'boolean', default: false })
    active: boolean;  
    
  @OneToMany(() => Appointment, (appoinment) => appoinment.patient)
    appointments: Appointment[];    
}
