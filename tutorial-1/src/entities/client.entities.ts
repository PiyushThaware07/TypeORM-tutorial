import { Entity, BaseEntity, Column, CreateDateColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { PersonEntity } from "./person.entities";
import { TransactionEntity } from "./transactions";
import { BankerEntity } from "./banker.entities";

@Entity('clients') // Use plural for table name
export class ClientEntity extends PersonEntity {
    @Column({
        unique: true,
        length: 10
    })
    card_number: string;

    @Column({
        type: "decimal"
    })
    balance: number;

    @Column({
        default: true,
        name: "active"  // create column as active, not is_active
    })
    is_active: boolean;

    @Column({
        type: "simple-json",
        nullable: true
    })
    additional_info: {
        city: string,
        state: string,
        country: string,
        pincode: string,
        street: string
    };

    @Column({
        type: "simple-array"
    })
    family_members: string[];

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    // Relationship with TransactionEntity
    @OneToMany(() => TransactionEntity, (transaction) => transaction.client)
    transactions: TransactionEntity[];

    // Relationship with BankerEntity
    @ManyToMany(() => BankerEntity, (banker) => banker.clients)
    @JoinTable({
        name: "bankers_clients_map", // Name of the join table
        joinColumn: {
            name: "client_id", // Column in the join table for ClientEntity
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "banker_id", // Column in the join table for BankerEntity
            referencedColumnName: "id"
        }
    })
    bankers: BankerEntity[];
}
