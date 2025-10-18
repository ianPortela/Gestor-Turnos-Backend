import { PartialType } from '@nestjs/mapped-types';
import CreateAppointmentDto from 'src/modules/appointments/dto/create_appointment_dto';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {}