import {
    IsString,
    IsDate,
    IsNumber,
    IsNotEmpty,
    IsOptional,
    IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';

export default class CreateAppointmentDto {
    @IsDate()
    @Type(() => Date) 
    @IsNotEmpty()
    date: Date;

    @IsString()
    @IsNotEmpty() // Un turno no debería tener una hora vacía
    hour: string;

    @IsString()
    @IsOptional() // Hacemos que 'observations' sea opcional
    observations: string;

    @IsNumber()
    @IsPositive() // Los IDs generalmente son números positivos
    @IsNotEmpty()
    @Type(() => Number) // Asegura que se transforme a número si viene como string
    patientIdPatient: number;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @Type(() => Number)
    doctorIdDoctor: number;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @Type(() => Number)
    medicalOfficeNumberOffice: number;
}