import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Appointment from './appointment.entity';
import CreateAppointmentDto from './dto/create_appointment_dto';
import UpdateAppointmentDto from './dto/update_appointment_dto';
import Patient from '../patients/patient.entity';
import Doctor from '../doctors/doctor.entity';
import MedicalOffice from '../medical_office/medical_office.entity';
import State from './enumState';

@Injectable()
export class AppointmentsService {

    constructor(
        @InjectRepository(Appointment)
        private readonly appointmentRepository: Repository<Appointment>,

        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
        @InjectRepository(Doctor)
        private readonly doctorRepository: Repository<Doctor>,
        @InjectRepository(MedicalOffice)
        private readonly medicalOfficeRepository: Repository<MedicalOffice>,
    ) { }

    async create(createDto: CreateAppointmentDto): Promise<Appointment> {
        const {
            date,
            hour,
            observations,
            patientIdPatient,
            doctorIdDoctor,
            medicalOfficeNumberOffice
        } = createDto;

        const patient = await this.patientRepository.findOneBy({ id_patient: patientIdPatient });
        const doctor = await this.doctorRepository.findOneBy({ id_doctor: doctorIdDoctor });
        const medical_office = await this.medicalOfficeRepository.findOneBy({ number_office: medicalOfficeNumberOffice });

        if (!patient) {
            throw new NotFoundException(`Paciente con ID ${patientIdPatient} no encontrado`);
        }
        if (!doctor) {
            throw new NotFoundException(`Doctor con ID ${doctorIdDoctor} no encontrado`);
        }
        if (!medical_office) {
            throw new NotFoundException(`Consultorio Nro ${medicalOfficeNumberOffice} no encontrado`);
        }

        //Validamos si ya existe un turno para evitar superposiciones
        try {
            // C. Crea la entidad usando los OBJETOS COMPLETOS
            const newAppointment = this.appointmentRepository.create({
                date,
                hour,
                observations,
                state: State.RESERVED,
                patient: patient,
                doctor: doctor,
                medical_office: medical_office,
            });

<<<<<<< HEAD

        return await this.appointmentRepository.save(newAppointment);
=======
            // D. Guarda la nueva entidad
            return await this.appointmentRepository.save(newAppointment);
            
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
                throw new BadRequestException('El médico ya tiene un turno reservado en ese horario');
            }
            throw error;
        }
>>>>>>> ea89f79db4c0b1da8912761f2533c681a9730684
    }

    async findAll(): Promise<Appointment[]> {
        return await this.appointmentRepository.find({
            relations: ['patient', 'doctor', 'medical_office'],
            order: { id_appointment: 'DESC' }
        });
    }

    async findOne(id: number): Promise<Appointment | null> {
        return await this.appointmentRepository.findOne({
            where: { id_appointment: id },
            relations: ['patient', 'doctor', 'medical_office'],
        });
    }

    async update(id: number, updateDto: UpdateAppointmentDto): Promise<Appointment> {

        const appointmentToUpdate = await this.findOne(id);
        if (!appointmentToUpdate) {
            throw new NotFoundException(`Turno con ID ${id} no encontrado`);
        }

        if (updateDto.patientIdPatient) {
            const patient = await this.patientRepository.findOneBy({ id_patient: updateDto.patientIdPatient });
            if (!patient) throw new NotFoundException(`Paciente ${updateDto.patientIdPatient} no encontrado`);
            appointmentToUpdate.patient = patient;
        }
        if (updateDto.doctorIdDoctor) {
            const doctor = await this.doctorRepository.findOneBy({ id_doctor: updateDto.doctorIdDoctor });
            if (!doctor) throw new NotFoundException(`Doctor ${updateDto.doctorIdDoctor} no encontrado`);
            appointmentToUpdate.doctor = doctor;
        }
        if (updateDto.medicalOfficeNumberOffice) {
            const medical_office = await this.medicalOfficeRepository.findOneBy({ number_office: updateDto.medicalOfficeNumberOffice });
            if (!medical_office) throw new NotFoundException(`Consultorio ${updateDto.medicalOfficeNumberOffice} no encontrado`);
            appointmentToUpdate.medical_office = medical_office;
        }

        if (updateDto.date) appointmentToUpdate.date = updateDto.date;
        if (updateDto.hour) appointmentToUpdate.hour = updateDto.hour;
        if (updateDto.observations) appointmentToUpdate.observations = updateDto.observations;
        if (updateDto.state) appointmentToUpdate.state = updateDto.state;

        return await this.appointmentRepository.save(appointmentToUpdate);
    }

    async remove(id: number): Promise<void> {
        await this.appointmentRepository.delete(id);
    }
}