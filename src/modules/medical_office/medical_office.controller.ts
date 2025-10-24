import { Controller, Get, Param } from '@nestjs/common';
import { MedicalOfficeService } from './medical_office.service';

@Controller('medical-office')
export class MedicalOfficeController {
    constructor(private readonly medicalOfficeService: MedicalOfficeService) {}

    @Get()
    findAll() {
        return this.medicalOfficeService.findAll();
    }

    @Get(':number_office')
    findOne(@Param('number_office') number_office: number) {
        return this.medicalOfficeService.findOne(number_office);
    }
}