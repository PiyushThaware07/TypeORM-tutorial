import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { ClientEntity } from "./client.entities";
import { BankerEntity } from "./banker.entities";

export enum TransactionTypes {
    DEPOSIT = "deposit",
    WITHDRAW = "withdraw"
}

@Entity("transaction")
export class TransactionEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "enum",
        enum: TransactionTypes
    })
    type: string

    @Column({
        type: "numeric"
    })
    amount: number

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    // Relationships - client
    @ManyToOne(function () {
        return ClientEntity
    }, function (client) {
        client.transactions;
    })

    @JoinColumn({
        name: 'client_id',
    })
    client: ClientEntity


}