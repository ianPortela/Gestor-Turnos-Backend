import Appointment from "../appointments/appointment.entity";
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'

@Entity()
export default class Patient {
    @PrimaryGeneratedColumn()
    id_patient : number;

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
        nullable: false,
        unique: true
    })
    dni : string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    phone : string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    address : string

    @OneToMany(() => Appointment, (appointment) => appointment.patient)
    appointments : Appointment[]

    constructor(name : string, lastname : string, dni : string, phone : string, address : string) {
        this.id_patient;
        this.name = name;
        this.lastname = lastname;
        this.dni = dni;
        this.phone = phone;
        this.address = address;
    }

    //methods
}