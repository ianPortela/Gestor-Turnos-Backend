import { Module } from '@nestjs/common';
import { AppointmentController } from './appointments.controller';
import { AppointmentService } from './appointments.service';

@Module({
    imports: [],
    controllers: [AppointmentController],
    providers: [AppointmentService]
})
export class AppointmentModule {}