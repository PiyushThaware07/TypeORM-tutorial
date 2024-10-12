import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("address")
export class AddressEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    street: string;

    @Column()
    country: string;

    @Column()
    pincode: string;
}