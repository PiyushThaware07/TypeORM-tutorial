import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AddressEntity } from "./address.entity";
import { EnrollmentEntity } from "./enrollment.entity";
import { GroupEntity } from "./group.entity";

@Entity("student")
export class StudentEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: String;

    @OneToOne(() => AddressEntity, { cascade: true,eager:true })
    @JoinColumn({ name: "address_id" })
    address: AddressEntity;

    @OneToMany(()=>EnrollmentEntity,(enrollment)=>enrollment.student,{cascade:true,eager:true})
    enrollments : EnrollmentEntity[];

    @ManyToMany(()=>GroupEntity,(group)=>group.students,{cascade:true,eager:true})
    @JoinTable({
        name : "student_group_map",
        joinColumn : {
            name : "student_id",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "group_id",
            referencedColumnName: "id",
        },
    })
    groups : GroupEntity[];
}