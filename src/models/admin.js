import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity
export class Admins {

    @PrimaryGeneratedColumn()
    id

    @Column()
    username

    @Column()
    password

    @Column()
    isActive
}
