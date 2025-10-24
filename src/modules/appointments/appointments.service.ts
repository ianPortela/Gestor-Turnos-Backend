import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Appointment from './appointment.entity';
import CreateAppointmentDto from './dto/create_appointment_dto';
import UpdateAppointmentDto from './dto/update_appointment_dto';

@Injectable()
export class AppointmentsService {
    
    constructor(
        @InjectRepository(Appointment)
        private readonly appointmentRepository: Repository<Appointment>,
    ) {}

    async create(createDto: CreateAppointmentDto): Promise<Appointment> {
        const appointment = this.appointmentRepository.create(createDto);
        return await this.appointmentRepository.save(appointment);
    }

    async findAll(): Promise<Appointment[]> {
        return await this.appointmentRepository.find({
        relations: ['patient', 'doctor', 'medical_office'],
        });
    }

    async findOne(id: number): Promise<Appointment | null> {
        return await this.appointmentRepository.findOne({
        where: { id_appointment: id },
        relations: ['patient', 'doctor', 'medical_office'],
        });
    }

    async update(id: number, updateDto: UpdateAppointmentDto): Promise<Appointment> {
        await this.appointmentRepository.update(id, updateDto);
        return (await this.findOne(id))!;
    }

    async remove(id: number): Promise<void> {
        await this.appointmentRepository.delete(id);
    }
}