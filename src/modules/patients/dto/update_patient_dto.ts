import { PartialType } from '@nestjs/mapped-types';
import CreatePatientDto from 'src/modules/patients/dto/create_patient_dto';

export class UpdateAppointmentDto extends PartialType(CreatePatientDto) {}