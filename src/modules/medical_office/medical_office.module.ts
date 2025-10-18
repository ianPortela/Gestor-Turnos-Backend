import { Module } from '@nestjs/common';
import { MedicalOfficeController } from './medical_office.controller';
import { MedicalOfficeService } from './medical_office.service';

@Module({
    imports: [],
    controllers: [MedicalOfficeController],
    providers: [MedicalOfficeService]
})
export class MedicalOfficeModule {}