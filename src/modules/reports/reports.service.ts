import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual, LessThan, FindOptionsWhere } from 'typeorm';
import Appointment from '../appointments/appointment.entity';
import { AppointmentFilterType } from './reports.controller';
import Doctor from '../doctors/doctor.entity';

//Sirve para mostrar en el filtro de reportes, por dia, mes, semana y horario
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, endOfDay } from 'date-fns';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Appointment) //TURNOS
        private appointmentsRepository: Repository<Appointment>,
        @InjectRepository(Doctor)//MEDICOS
        private doctorsRepository: Repository<Doctor>,
    ) { }

    async getAppointmentsReport(
        filterType: AppointmentFilterType,
        startDate?: string,
        endDate?: string,
    ) {
        const queryBuilder = this.appointmentsRepository.createQueryBuilder('appointment')
            .leftJoinAndSelect('appointment.patient', 'patient')
            .leftJoinAndSelect('appointment.doctor', 'doctor')
            .orderBy('appointment.date', 'ASC')
            .addOrderBy('appointment.hour', 'ASC');

        const dateFilter = this.getDateRange(filterType, startDate, endDate);
        if (dateFilter) {
            queryBuilder.where(dateFilter);
        }

        return queryBuilder.getMany();
    }

    async getDoctorsReport(
        filterType: AppointmentFilterType,
        startDate?: string,
        endDate?: string,
    ) {
        const dateFilter = this.getDateRange(filterType, startDate, endDate);

        // Buscamos todos los doctores y cargamos sus turnos que coincidan con el filtro de fecha
        const doctors = await this.doctorsRepository.find({
            relations: {
                appointments: {
                    patient: true, // Opcional: si quieres los datos del paciente en el turno
                },
            },
            where: {
                appointments: dateFilter,
            },
            order: {
                lastname: 'ASC',
                name: 'ASC',
                appointments: {
                    date: 'ASC',
                    hour: 'ASC',
                },
            },
        });

        return doctors;
    }

    private getDateRange(
        filterType: AppointmentFilterType,
        startDate?: string,
        endDate?: string,
    ): FindOptionsWhere<Appointment> | undefined {
        const now = new Date();

        switch (filterType) {
            case 'week':
                return { date: Between(startOfWeek(now), endOfWeek(now)) };
            case 'month':
                return { date: Between(startOfMonth(now), endOfMonth(now)) };
            case 'year':
                return { date: Between(startOfYear(now), endOfYear(now)) };
            case 'custom':
                if (startDate && endDate) {
                    return {
                        date: Between(new Date(startDate), new Date(endDate)),
                    };
                } else {
                    throw new BadRequestException(
                        'Para el filtro "custom", se requieren las fechas de inicio y fin',
                    );
                }
            default:
                return undefined;
        }
    }
}
