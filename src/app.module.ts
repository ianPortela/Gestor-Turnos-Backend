import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Appointment from 'src/modules/appointments/appointment.entity'
import Doctor from './modules/doctors/doctor.entity';
import MedicalOffice from './modules/medical_office/medical_office.entity';
import MedicalSpecialty from './modules/medical_specialty/medical_specialty.entity';
import Patient from './modules/patients/patient.entity';
// Services
import { AppointmentsService } from './modules/appointments/appointments.service';
import { DoctorsService } from './modules/doctors/doctor.service';
import { PatientsService } from './modules/patients/patient.service';
import { MedicalOfficeService } from './modules/medical_office/medical_office.service';
import { MedicalSpecialtyService } from './modules/medical_specialty/medical_specialty.service';

// Controllers
import { AppointmentsController } from './modules/appointments/appointments.controller';
import { DoctorsController } from './modules/doctors/doctor.controller';
import { PatientsController } from './modules/patients/patient.controller';
import { MedicalOfficeController } from './modules/medical_office/medical_office.controller';
import { MedicalSpecialtyController } from './modules/medical_specialty/medical_specialty.controller';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [Appointment, Doctor, MedicalOffice, MedicalSpecialty, Patient],
        synchronize: true,
      })
    }),
    TypeOrmModule.forFeature([Appointment, Doctor, Patient, MedicalOffice, MedicalSpecialty]),
  ],
  controllers: [
    AppointmentsController,
    DoctorsController,
    PatientsController,
    MedicalOfficeController,
    MedicalSpecialtyController,
  ],
  providers: [
    AppointmentsService,
    DoctorsService,
    PatientsService,
    MedicalOfficeService,
    MedicalSpecialtyService,
  ],
})
export class AppModule {}
