import { PartialType } from '@nestjs/mapped-types';
import CreatePatientDto from 'src/modules/patients/dto/create_patient_dto';

export default class UpdateAppointmentDto extends PartialType(CreatePatientDto) {}