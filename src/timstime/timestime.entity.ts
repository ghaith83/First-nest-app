import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm"

export class timestime{

    @CreateDateColumn({update:false})
    createdAt:Date
    @UpdateDateColumn()
    updateAt:Date

    @DeleteDateColumn()
    deleteAt:Date
}