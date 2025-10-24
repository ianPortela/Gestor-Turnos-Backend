import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Patient from './patient.entity';
import CreatePatientDto from './dto/create_patient_dto';
import UpdatePatientDto from './dto/update_patient_dto';

@Injectable()
export class PatientsService {
    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
    ) {}

    async create(createDto: CreatePatientDto): Promise<Patient> {
        const patient = this.patientRepository.create(createDto);
        return await this.patientRepository.save(patient);
    }

    async findAll(): Promise<Patient[]> {
        return await this.patientRepository.find({
        relations: ['appointments'],
        });
    }

    async findOne(id: number): Promise<Patient | null> {
        return await this.patientRepository.findOne({
        where: { id_patient: id },
        relations: ['appointments'],
        });
    }

    async update(id: number, updateDto: UpdatePatientDto): Promise<Patient> {
        await this.patientRepository.update(id, updateDto);
        return (await this.findOne(id))!;
    }

    async remove(id: number): Promise<void> {
        await this.patientRepository.delete(id);
    }
}