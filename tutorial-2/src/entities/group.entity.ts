import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { StudentEntity } from "./student.entity";

@Entity("group")
export class GroupEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(()=>StudentEntity,(student)=>student.groups,{onDelete:"CASCADE"})
    students : StudentEntity[];
}