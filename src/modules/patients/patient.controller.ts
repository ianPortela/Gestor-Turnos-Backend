import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PatientsService } from './patient.service';
import CreatePatientDto from './dto/create_patient_dto';
import UpdatePatientDto from './dto/update_patient_dto';

@Controller('patients')
export class PatientsController {
    constructor(private readonly patientsService: PatientsService) {}

    @Post()
    create(@Body() createDto: CreatePatientDto) {
        return this.patientsService.create(createDto);
    }

    @Get()
    findAll() {
        return this.patientsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.patientsService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateDto: UpdatePatientDto) {
        return this.patientsService.update(id, updateDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.patientsService.remove(id);
    }
}