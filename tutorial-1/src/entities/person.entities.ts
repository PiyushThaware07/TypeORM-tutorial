import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('person')
export class PersonEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fullname: string

    @Column({
        unique: true
    })
    email: string

    @Column()
    phone: string
}