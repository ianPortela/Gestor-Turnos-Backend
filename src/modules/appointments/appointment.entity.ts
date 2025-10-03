import Doctor from "src/modules/doctors/doctor.entity";
import MedicalOffice from "src/modules/medical_office/medical_office.entity";
import Patient from "src/modules/patients/patient.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

enum State {
    reserved,
    attended,
    canceled
}

@Entity()
export default class Appointment {
    @PrimaryGeneratedColumn()
    id_appointment : number;

    @Column({
        type: 'date', 
        nullable: false
    })
    date : Date;

    @Column({
        type: 'varchar', 
        nullable: false
    })
    hour : string;

    @Column({
        type: 'text', 
        nullable: true
    })
    observations : string;

    @Column({
        type: 'enum',
        enum: State
    })
    state : State;

    //necesito el id de paciente
    @ManyToOne(() => Patient, (patient) => patient.appointments)
    patient : Patient;
    //necesito el id de medico
    @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
    doctor : Doctor;
    //necesito el id de consultorio
    @ManyToOne(() => MedicalOffice, (medical_office) => medical_office.appointments)
    medical_office : MedicalOffice;

    constructor(patient : Patient, doctor : Doctor, medical_office : MedicalOffice, date : string, hour : string, observations : string) {
        this.id_appointment;
        this.patient = patient;
        this.doctor = doctor;
        this.medical_office = medical_office;
        this.date = new Date(date);
        this.hour = hour;
        this.observations = observations;
        this.state = State.reserved;
    }
}