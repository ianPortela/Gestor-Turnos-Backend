import Appointment from "../appointments/appointment.entity";
import Doctor from "../doctors/doctor.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany} from "typeorm";

@Entity()
export default class MedicalOffice {
    @PrimaryGeneratedColumn()
    number_office : number;

    //necesito el id del doctor
    @OneToOne(() => Doctor, (doctor) => doctor.medical_office)
    @JoinColumn({name: 'doctorID'})
    doctor : Doctor;

    @OneToMany(() => Appointment, (appointment) => appointment.medical_office)
    appointments : Appointment[];

    constructor(number_office : number, doctor : Doctor) {
        this.number_office = number_office;
        this.doctor = doctor;
    }

    //methods
}