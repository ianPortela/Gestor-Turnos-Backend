import { Module } from '@nestjs/common';
import { PatientsController } from './patient.controller';
import { PatientsService } from './patient.service';

@Module({
    imports: [],
    controllers: [PatientsController],
    providers: [PatientsService]
})
export class PatientModule {}