import { BaseEntity, Entity, CreateDateColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { PersonEntity } from "./person.entities";
import { ClientEntity } from "./client.entities";

@Entity("banker")
export class BankerEntity extends PersonEntity {
    @Column()
    fullname: string

    @Column()
    position: string

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    // Relationships
    @ManyToMany(() => ClientEntity, (client) => client.bankers)
    client: ClientEntity; // Establishing relationship with ClientEntity
}