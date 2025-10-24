import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import CreateAppointmentDto from './dto/create_appointment_dto';
import UpdateAppointmentDto from './dto/update_appointment_dto';

@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) {}

    @Post()
    create(@Body() createDto: CreateAppointmentDto) {
        return this.appointmentsService.create(createDto);
    }

    @Get()
    findAll() {
        return this.appointmentsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.appointmentsService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateDto: UpdateAppointmentDto) {
        return this.appointmentsService.update(id, updateDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.appointmentsService.remove(id);
    }
}