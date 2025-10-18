import { Module } from '@nestjs/common';
import { MedicalSpecialtyController } from './medical_specialty.controller';
import { MedicalSpecialtyService } from './medical_specialty.service';

@Module({
    imports: [],
    controllers: [MedicalSpecialtyController],
    providers: [MedicalSpecialtyService]
})
export class MedicalSpecialtyModule {}