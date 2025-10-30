import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Appointment from '../appointments/appointment.entity';
import Doctor from '../doctors/doctor.entity';
import Patient from '../patients/patient.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Appointment, Doctor, Patient])],
    controllers: [ReportsController],
    providers: [ReportsService],
})
export class ReportsModule { }