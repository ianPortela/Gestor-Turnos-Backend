import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import MedicalSpecialty from './medical_specialty.entity';

@Injectable()
export class MedicalSpecialtyService {
    
    constructor(
        @InjectRepository(MedicalSpecialty)
        private readonly medicalSpecialtyRepository: Repository<MedicalSpecialty>,
    ) {}

    async findAll(): Promise<MedicalSpecialty[]> {
        return await this.medicalSpecialtyRepository.find({
        relations: ['doctor'],
        });
    }

    async findOne(id: number): Promise<MedicalSpecialty | null> {
        return await this.medicalSpecialtyRepository.findOne({
        where: { id_specialty: id },
        relations: ['doctor'],
        });
    }
}