import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import MedicalOffice from './medical_office.entity';

@Injectable()
export class MedicalOfficeService {
    
    constructor(
        @InjectRepository(MedicalOffice)
        private readonly medicalOfficeRepository: Repository<MedicalOffice>,
    ) {}

    async findAll(): Promise<MedicalOffice[]> {
        return await this.medicalOfficeRepository.find({
        relations: ['doctor', 'appointments'],
        });
    }

    async findOne(number_office: number): Promise<MedicalOffice | null> {
        return await this.medicalOfficeRepository.findOne({
        where: { number_office },
        relations: ['doctor', 'appointments'],
        });
    }
}