import { BaseEntity, Column, DataSource, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StudentEntity } from "./student.entity";

@Entity("enrollment")
export class EnrollmentEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "timestamp" })
    enrollment_date: Date;

    @Column({ type: "timestamp" })
    expiration_date: Date;

    @Column({
        type: "enum",
        enum: ["active", 'inactive']
    })
    status: "active" | "inactive"

    @ManyToOne(()=>StudentEntity,(student)=>student.enrollments,{onDelete:"CASCADE"})
    @JoinColumn({name : "student_id"})
    student : StudentEntity;

}