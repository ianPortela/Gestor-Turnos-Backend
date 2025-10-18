import { IsString, IsDate, IsEnum, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import State from 'src/modules/appointments/enumState'

export default class CreateAppointmentDto {
    @IsDate()
    @Type(() => Date)
    date: Date;

    @IsString()
    hour: string;

    @IsString()
    observations: string;

    @IsEnum(State)
    state: State;

    @IsNumber()
    id_patient: Number;

    @IsNumber()
    id_doctor: Number;

    @IsNumber()
    number_office: Number;
}