import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Doctor from './doctor.entity';

@Injectable()
export class DoctorsService {
    
    constructor(
        @InjectRepository(Doctor)
        private readonly doctorRepository: Repository<Doctor>,
    ) {}

    async findAll(): Promise<Doctor[]> {
        return await this.doctorRepository.find({
        relations: ['appointments', 'medical_specialty', 'medical_office'],
        });
    }

    async findOne(id: number): Promise<Doctor | null> {
        return await this.doctorRepository.findOne({
        where: { id_doctor: id },
        relations: ['appointments', 'medical_specialty', 'medical_office'],
        });
    }
}