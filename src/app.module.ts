import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Appointment from 'src/modules/appointments/appointment.entity'
import Doctor from './modules/doctors/doctor.entity';
import MedicalOffice from './modules/medical_office/medical_office.entity';
import MedicalSpecialty from './modules/medical_specialty/medical_specialty.entity';
import Patient from './modules/patients/patient.entity';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
