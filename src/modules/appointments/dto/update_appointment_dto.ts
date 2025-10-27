import { PartialType } from '@nestjs/mapped-types';
import CreateAppointmentDto from 'src/modules/appointments/dto/create_appointment_dto';
import { IsEnum, IsOptional } from 'class-validator';
import State from '../enumState';

export default class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
    @IsEnum(State) 
    @IsOptional()
    state?: State;
}