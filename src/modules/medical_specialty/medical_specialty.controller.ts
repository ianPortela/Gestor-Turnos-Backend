import { Controller, Get, Param } from '@nestjs/common';
import { MedicalSpecialtyService } from './medical_specialty.service';

@Controller('medical-specialty')
export class MedicalSpecialtyController {
    constructor(private readonly medicalSpecialtyService: MedicalSpecialtyService) {}

    @Get()
    findAll() {
        return this.medicalSpecialtyService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.medicalSpecialtyService.findOne(id);
    }
}