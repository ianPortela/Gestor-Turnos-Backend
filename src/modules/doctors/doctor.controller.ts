import { Controller, Get, Param } from '@nestjs/common';
import { DoctorsService } from './doctor.service';

@Controller('doctors')
export class DoctorsController {
    constructor(private readonly doctorsService: DoctorsService) {}

    @Get()
    findAll() {
        return this.doctorsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.doctorsService.findOne(id);
    }
}