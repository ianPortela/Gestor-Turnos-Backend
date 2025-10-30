import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';

export type AppointmentFilterType = 'week' | 'month' | 'year' | 'custom';

@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) { }

    @Get('appointments')
    async getAppointmentsReport(
        @Query('filterType') filterType: AppointmentFilterType = 'week',
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
    ) {
        return this.reportsService.getAppointmentsReport(filterType, startDate, endDate);
    }

    @Get('doctors')
    async getDoctorsReport(
        @Query('filterType') filterType: AppointmentFilterType = 'week',
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
    ) {
        return this.reportsService.getDoctorsReport(filterType, startDate, endDate);
    }
}