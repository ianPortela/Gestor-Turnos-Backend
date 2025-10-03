import Doctor from "../doctors/doctor.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";

@Entity()
export default class MedicalSpecialty {
    @PrimaryGeneratedColumn()
    id_specialty : number;

    @Column({ 
        type: 'varchar',
        unique: true,
        nullable: false
    })
    specialty_name : string;

    @ManyToMany(() => Doctor, (doctor) => doctor.medical_specialty)
    doctor : Doctor[];

    constructor(specialty_name : string) {
        this.id_specialty;
        this.specialty_name = specialty_name;
    }

    //methods
}