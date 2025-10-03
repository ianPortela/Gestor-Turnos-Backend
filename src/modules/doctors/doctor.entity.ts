import Appointment from "../appointments/appointment.entity";
import MedicalOffice from "../medical_office/medical_office.entity";
import MedicalSpecialty  from "../medical_specialty/medical_specialty.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, OneToOne } from "typeorm";

@Entity()
export default class Doctor {
    @PrimaryGeneratedColumn()
    id_doctor : number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    name : string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    lastname : string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    enrollment : string;

    @Column({
        type: 'time',
        nullable: false
    })
    start_time : string;

    @Column({
        type: 'time',
        nullable: false
    })
    end_time : string;

    @ManyToMany(() => MedicalSpecialty, (medical_specialty) => medical_specialty.doctor)
    @JoinTable()
    medical_specialty : MedicalSpecialty[];

    @OneToMany(() => Appointment, (appointment) => appointment.doctor)
    appointments : Appointment[];

    @OneToOne(() => MedicalOffice, (medical_office) => medical_office.doctor)
    medical_office : MedicalOffice;

    constructor(name : string, lastname : string, enrollment : string, start_time : string, end_time : string) {
        this.id_doctor;
        this.name = name;
        this.lastname = lastname;
        this.enrollment = enrollment;
        this.start_time = start_time;
        this.end_time = end_time
    }

    //methods
}